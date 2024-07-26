
"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { usePlayer } from "@/lib/usePlayer";

type Message = {
  role: "user" | "assistant";
  content: string;
  latency?: number;
};

export const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [isPending, setIsPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const player = usePlayer();

  useEffect(() => {
    function keyDown(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        inputRef.current?.focus();
        handleFormSubmit(e);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setInput("");
      }
    }

    window.addEventListener("keydown", keyDown);
    return () => window.removeEventListener("keydown", keyDown);
  }, []);

  const submit = async (data: string) => {
    setIsPending(true);

    const formData = new FormData();
    formData.append("input", data);

    for (const message of messages) {
      formData.append("message", JSON.stringify(message));
    }

    const submittedAt = Date.now();

    try {
      const response = await fetch("/api/chat2/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("Too many requests. Please try again later.");
        } else {
          toast.error((await response.text()) || "An error occurred.");
        }
        return;
      }

      const transcript = decodeURIComponent(
        response.headers.get("X-Transcript") || ""
      );
      const text = decodeURIComponent(
        response.headers.get("X-Response") || ""
      );

      if (!transcript || !text) {
        toast.error("Invalid response data.");
        return;
      }

      const latency = Date.now() - submittedAt;

      const audioBlob = await response.blob();
      console.log(audioBlob)

      player.play(audioBlob, () => { });

      setInput(transcript);
      setMessages([
        ...messages,
        {
          role: "user",
          content: transcript,
        },
        {
          role: "assistant",
          content: text,
          latency,
        },
      ]);
    } catch (error) {
      toast.error("An error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim()) {
      submit(input);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <section className="[grid-area:chat] flex flex-col gap-5 min-h-[calc(100vh-40px)] md:min-h-0">
      <main className="bg-secundary rounded-2xl p-5 h-full overflow-y-scroll no-scrollbar flex flex-col gap-5 scroll-smooth">
        <h1 className="text-center text-green text-2xl font-semibold">
          Mind Flow
        </h1>

        {messages.map((message, index) => (
          <div
            key={index}
            className={clsx("message", message.role)}
          >
            {message.content}
          </div>
        ))}
      </main>

      <form onSubmit={handleFormSubmit}>
        <div className="flex gap-x-5">
          <input
            type="text"
            placeholder="Mensaje..."
            className="w-full bg-light rounded-2xl h-16 px-5"
            value={input}
            onChange={handleInputChange}
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
