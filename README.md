# Thiago Blog

Blog estático em Astro com dois fluxos de conteúdo:

- `posts`: artigos autorais publicados em `/` e `/artigos/...`
- `links`: links salvos/referências publicados em `/links`

## Requisitos

- Node.js 18+
- npm

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:4321`.

## Build de produção

```bash
npm run build
npm run preview
```

## Estrutura de conteúdo

- `src/content/posts/`: posts principais (um diretório por post)
- `src/content/links/`: links salvos
- `src/content.config.ts`: schemas das coleções

## Como escrever um post

1. Crie um diretório para o post em `src/content/posts/<slug>/`.
2. Dentro dele, crie `index.mdx`.
3. Use este frontmatter:

```md
---
title: "Título do post"
description: "Resumo curto"
date: 2026-05-10
draft: false
---

Conteúdo do post...
```

4. Para rascunho não publicado, use `draft: true`.
5. O post publicado aparece na home, paginação, busca, RSS e página individual em `/artigos/<slug>`.

### Padrão recomendado por post

```text
src/content/posts/
  meu-primeiro-post/
    index.mdx
    capa.jpg
    grafico.png
```

### Como adicionar imagens no post (local, por pasta)

No `index.mdx`, importe a imagem e use `src`:

```mdx
---
title: "Meu post"
description: "Resumo"
date: 2026-05-10
draft: false
---

import capa from "./capa.jpg";

![Capa do post](capa.src)
```

## Como criar um link salvo

1. Crie um arquivo `.md` ou `.mdx` em `src/content/links/`.
2. Use este frontmatter:

```md
---
title: "Título da referência"
description: "Por que esse link é relevante"
url: "https://exemplo.com/artigo"
date: 2026-05-10
draft: false
---

Notas opcionais sobre o link.
```

3. Para manter privado, use `draft: true`.
4. Os links publicados aparecem em `/links` e não se misturam com os posts autorais.

## Navbar

A navegação principal inclui:

- `Busca` (`/busca`)
- `Links` (`/links`)
- `Sobre` (`/sobre`)
- `RSS` (`/rss.xml`)

## Observações

- Use slugs curtos e descritivos para diretórios de posts.
- `date` deve estar em formato `YYYY-MM-DD`.
- Em links externos, a página `/links` já abre em nova aba por padrão.
