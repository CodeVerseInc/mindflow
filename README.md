<div align="center">
<img src="./public/img/mind.png" width='120' />
<h1>Mind Flow</h1>
<p>Hackathon Vercel | Midudev</p>
</div>

<div align="center">
    <a href="https://mindflow-nine.vercel.app/" target="_blank">
        Vista previa
    </a>
    <span>&nbsp;✦&nbsp;</span>
    <a href="#-getting-started">
        Como comenzar
    </a>
</div>

<div align="center">

![Next.js Badge](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=fff&style=flat)
![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=flat)

</div>

## 📝 Descripción

Mindflow es una aplicacion web la cual tiene como inspiracion el mejorar la salud mental de las personas a travez de Inteligencia Artificial y meditacion integrando esto de manera optimizada en una sola aplicacion web.

## 🛠️ Stack

- [**Vercel IA SDK**](https://sdk.vercel.ai/docs/introduction) - Vercel IA Skd for the API.
- [**Typescript**](https://www.typescriptlang.org/) - JavaScript with syntax for types.
- [**Tailwind**](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- [**Tabler Icons**](https://tabler.io/) - A collection of icons used.

## 🎨 Vista previa

[**Mind Flow**](https://mindflow.vercel.app/)

## 🚀 Como comenzar

1. [Fork](https://github.com/CodeVerseInc/mindflow/) o clona este repositorio.

```bash
git clone https://github.com/CodeVerseInc/codicon-mindFlow.git
```

1. Instala las dependencias:

> [!NOTE]
> Nosotros usamos [pnpm](https://pnpm.io) para manejar las dependencias.

```bash
pnpm install
```

2. Levantar la base de datos:

> [!IMPORTANT]
> Debes tener instalado Docker.

```bash
# Ejecuta el siguiente comando
docker compose up -d
```

3. Inicia el servidor de desarrollo.

```bash
pnpm run dev
```

4. Ejecuta la semilla para llenar la base de datos.
   Has una peticion GET al siguiente endpoint:

```bash
localhost:3000/api/seed
```

> [!NOTE]
> Esto llenara la base de datos con datos de prueba.

1. Abre el proyecto [**http://localhost:3000**](http://localhost:3000/) en tu navegador.

## Comandos de prisma

```bash
# Inicializar prisma
npx prisma init

# Crear una nueva migracion
npx prisma migrate dev
```

> [!WARNING]
> Esto borrara los datos de la base de datos.

```bash
# Agregar los cambios a la base de datos
npx prisma db push

# Traer cambios de la base de datos al schema
npx prisma db push

```

## Team

-[Angel Dev - Frontend](https://github.com/angelcruz07)

-[Luis- Frontend](https://github.com/LugpDev2022)

-[Lizandro - Backend](https://github.com/LizandroBackEnd)

-[Arif - Designer](https://github.com/Ariff-dev)

-[Porto - Frontend](https://github.com/Porto1090)
