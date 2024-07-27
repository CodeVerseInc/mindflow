"use client"

import clsx from "clsx";
import { useEffect, useRef, useState, useActionState } from "react";
import { toast } from "sonner";
import { usePlayer } from "@/lib/usePlayer";

type Message = {
  role: "user" | "assistant";
  content: string;
  latency?: number;
};


export const Chat = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const player = usePlayer();

  useEffect(() => {
    function keyDown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevents form submission on Enter key press
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setInput("");
      }
    }

    window.addEventListener("keydown", keyDown);
    return () => window.removeEventListener("keydown", keyDown);
  }, [])


  const [messages, submit, isPending] = useActionState<
    Array<Message>,
    string | Blob
  >(async (prevMessages, data) => {
    const formData = new FormData()

    if (typeof data === "string") {
      formData.append("input", data)
    }

    for (const message of prevMessages) {
      formData.append("message", JSON.stringify(message));
    }

    const submittedAt = Date.now();

    const response = await fetch("/api/chat2/", {
      method: "POST",
      body: formData,
    });


    const transcript = decodeURIComponent(
      response.headers.get("X-Transcript") || ""
    );
    const text = decodeURIComponent(
      response.headers.get("X-Response") || ""
    );


    if (!response.ok || !transcript || !text || !response.body) {
      if (response.status === 429) {
        toast.error("Too many requests. Please try again later.");
      } else {
        toast.error((await response.text()) || "An error occurred.");
      }

      return prevMessages;
    }

    const latency = Date.now() - submittedAt;

    player.play(response.body, () => {
      const isFirefox = navigator.userAgent.includes("Firefox");
    })
    setInput(transcript);


    return [
      ...prevMessages,
      {
        role: "user",
        content: transcript,
      },
      {
        role: "assistant",
        content: text,
        latency,
      },
    ];

  }, [])



  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit(input);
  }

  return (
    <section className="[grid-area:chat] flex flex-col gap-5 min-h-[calc(100vh-40px)] md:min-h-0">
      <main className="bg-secundary rounded-2xl p-5 h-full overflow-y-scroll no-scrollbar flex flex-col gap-5 scroll-smooth">
        <h1 className="text-center text-green text-2xl font-semibold">
          Mind Flow
        </h1>


        {messages.length > 0 && (
          <p>
            {messages.at(-1)?.content}
            <span className="text-xs font-mono text-neutral-300 dark:text-neutral-700">
              {" "}
              ({messages.at(-1)?.latency}ms)
            </span>
          </p>
        )}

      </main>

      <form onSubmit={handleFormSubmit}>
        <div className="flex gap-x-5">
          <input
            type="text"
            placeholder="Mensaje..."
            className="w-full bg-light rounded-2xl h-16 px-5"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
          />
          <button
            type="submit"
            className="bg-secundary bottom-5 w-20 rounded-2xl flex justify-center items-center"
            disabled={isPending}
          >
            Enviar
          </button>
        </div>
      </form>
    </section>
  );
};
