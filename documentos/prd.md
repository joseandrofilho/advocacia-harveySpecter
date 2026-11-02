# PRD: Specter & Associates (fan-site de advogado)

> Documento de produto e planejamento do site. Serve de referência para quem for editar o código (você ou uma IA no VS Code). Sempre leia este arquivo antes de alterar o projeto.

---

## 1. Visão geral

**O que é:** uma landing page de escritório de advocacia temática do personagem Harvey Specter (série _Suits_). O escritório, os casos e os contatos são fictícios.

**Autor:** Joseandro Araujo (@joseandro.dev): design e código.

**Objetivos:**

1. **Conteúdo para TikTok/Instagram:** vídeo mostrando o site, para divulgar o trabalho de criação de sites (mesmo formato do fan-site de Red Dead Redemption 2).
2. **Portfólio:** mostrar domínio de animação, design premium e front-end.
3. **Modelo vendável:** base para landing pages de advogados reais. Trocando fotos, textos e contatos, o site vira um produto.

**Sensação desejada:** elegância, luxo e autoridade. Manhattan à noite, vidro, madeira escura e iluminação de cinema.

---

## 2. Status atual

| Item                                                | Status                                 |
| --------------------------------------------------- | -------------------------------------- |
| Abertura animada (martelo + cortina)                | ✅ Pronto                              |
| Hero com vídeo em loop + retrato + partículas       | ✅ Pronto                              |
| Números (cards de vidro sobre o hero)               | ✅ Pronto                              |
| Áreas de atuação (4 cards com ícones)               | ✅ Pronto                              |
| Por que nos escolher (seção clara)                  | ✅ Pronto                              |
| O sócio (retrato em camadas + citação + assinatura) | ✅ Pronto                              |
| Casos emblemáticos                                  | ✅ Pronto                              |
| Nos bastidores (galeria duotone)                    | ✅ Pronto                              |
| Frase de impacto                                    | ✅ Pronto                              |
| Contato (formulário + martelo + canais)             | ✅ Pronto (formulário só demonstração) |
| Botão flutuante de WhatsApp                         | ✅ Pronto (número fictício)            |
| Rodapé com aviso de projeto conceitual              | ✅ Pronto                              |
| Publicação no GitHub Pages                          | ✅ joseandrofilho.github.io/advocacia-harveySpecter |
| Vídeo para o TikTok                                 | ⏳ Pendente                            |

---

## 3. Estrutura de arquivos

```
lp-adv-harveySpecter/
├── index.html                      # estrutura de todas as seções (só HTML)
├── documentos/
│   ├── plan.md                     # regras gerais do projeto
│   └── prd.md                      # este documento
├── css/
│   ├── tokens.css                  # cores, fontes, espaçamentos, movimento (única fonte)
│   ├── base.css                    # reset, tipografia, botões, vidro, duotone, cursor, grão
│   └── sections.css                # cada seção na ordem do HTML, com seus breakpoints
├── js/                             # scripts clássicos (abrem direto no navegador, sem servidor)
│   ├── utils.js                    # $, $$, flags de movimento, formatNumber
│   ├── gavel.js                    # monta o martelo (template) e anima a batida
│   ├── intro.js                    # abertura: martelo bate → cortina abre
│   ├── particles.js                # poeira dourada 3D do hero (Three.js)
│   ├── cursor.js                   # cursor champagne
│   ├── scroll.js                   # rolagem suave (Lenis), âncoras, estado da nav
│   ├── animations.js               # hero, reveals, contadores, assinatura, parallax
│   ├── form.js                     # validação do formulário (demonstração)
│   └── main.js                     # ordem de inicialização
└── assets/
    ├── favicon.svg                 # monograma "S."
    ├── hero-skyline-1080.webm      # vídeo do hero (prioridade, mais leve, ~1,5 MB)
    ├── hero-skyline-1080.mp4       # vídeo do hero (fallback, ~3,5 MB)
    ├── hero-skyline-1080-poster.jpg# capa do vídeo + fundo da frase de impacto
    ├── harvey-hero.webp / .png     # retrato de costas recortado, com grade noturno (hero)
    ├── harvey-terno.png            # silhueta antiga do hero (não usada)
    ├── harvey-terno-risca.jpg      # retrato da seção "O sócio"
    ├── harvey-bola.jpg             # galeria: cena 01
    ├── harvey-olhar.jpg            # galeria: cena 02
    └── janela.jpg                  # galeria: cena 03
```

**Dependências externas (CDN):**

- GSAP 3.12.5 + ScrollTrigger: `cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/`
- Three.js r128 (partículas do hero): `cdnjs.cloudflare.com/ajax/libs/three.js/r128/`
- Lenis 1.1.13 (rolagem suave): `cdn.jsdelivr.net/npm/lenis@1.1.13/`
- Google Fonts: Bodoni Moda, Manrope, IBM Plex Mono, Mrs Saint Delafield

Não há build, framework nem npm. É HTML/CSS/JS puro. Se alguma biblioteca não carregar, o site continua funcionando sem a animação correspondente.

---

## 4. Identidade visual

### 4.1 Cores (variáveis CSS em `:root`)

| Token                         | Valor                   | Uso                                         |
| ----------------------------- | ----------------------- | ------------------------------------------- |
| `--ink`                       | `#0B0B0C`               | fundo principal (preto levemente quente)    |
| `--ink-2`                     | `#141416`               | seções alternadas (O sócio, formulário)     |
| `--ink-deep`                  | `#000000`               | fundos de foto e da frase de impacto        |
| `--champ`                     | `#D4BE8D`               | dourado champagne: destaques, CTAs, linhas  |
| `--champ-hi`                  | `#EADBB5`               | champagne claro: hover e brilhos            |
| `--wood`                      | `#3B2416`               | madeira escura (martelo)                    |
| `--paper`                     | `#F2EEE6`               | texto principal (off-white)                 |
| `--smoke`                     | `#8C8A85`               | texto secundário                            |
| `--line`                      | `rgba(212,190,141,.18)` | bordas e divisórias finas                   |
| `--cream`                     | `#F1ECE2`               | fundo da seção clara "Por que nos escolher" |
| `--on-cream` / `--on-cream-2` | `#16140F` / `#5C564B`   | textos sobre o creme                        |
| `--champ-deep`                | `#7A6338`               | champagne escurecido, legível sobre creme   |

**Regras:**

- O dourado ocupa **no máximo ~10% da tela**: linhas, números, o ponto do "S.", CTAs e palavras em itálico. Se aparecer em tudo, perde o efeito de luxo.
- Nunca usar laranja, amarelo vivo ou dourado saturado.
- Toda cor nova deve virar variável em `:root`. Nada de cor solta no meio do CSS.
- A paleta "azul meia-noite" foi testada e **descartada**. O padrão definitivo é o preto.

### 4.2 Tipografia

| Papel      | Fonte                                  | Uso                                         |
| ---------- | -------------------------------------- | ------------------------------------------- |
| Display    | **Bodoni Moda** (500, itálico 400/500) | títulos, números, citações                  |
| Texto      | **Manrope** (300–600)                  | parágrafos, botões, menu                    |
| Utilitária | **IBM Plex Mono** (400/500)            | eyebrows, nº de processo, legendas, rótulos |
| Assinatura | **Mrs Saint Delafield**                | assinatura "Harvey Specter"                 |

- Palavras de ênfase nos títulos vão em _itálico champagne_ (`<em>`).
- Eyebrows: mono, maiúsculas, `letter-spacing: .24em`, com um traço de 36px antes.
- Textos corridos com no máximo ~60 caracteres por linha.

### 4.3 Atmosfera e elementos

- Monograma **"S."**, com o ponto em champagne: logo, favicon e marca d'água gigante na seção "O sócio".
- **Grão de filme** sutil sobre a página inteira (opacidade 0,07).
- **Vidro:** `backdrop-filter: blur()` + fundo translúcido + borda `--line` (cards de números, formulário, nav ao rolar).
- **Fotos em duotone champagne:** `grayscale(1) sepia(.38) contrast(1.12) brightness(.82)`. A cor volta no hover/foco, com um leve zoom.
- **Linhas finas champagne** que se desenham no hover (cards, casos, botões fantasma).

---

## 5. Seções (ordem e conteúdo)

### 5.0 Abertura (`.intro`)

- O martelo SVG sobe, bate na base com flash, ondas, faíscas e um tremor. Logo após a batida, a cortina preta se abre ao meio, revelando o hero.
- Duração de ~2,5s, com botão "Pular abertura".
- Com `prefers-reduced-motion`, a abertura não roda.

### 5.1 Navegação (`.nav`)

- Fixa no topo. Fica transparente sobre o hero e ganha fundo de vidro escuro depois de 40px de scroll.
- Logo "S." + "Specter & Associates / Attorneys at law · NYC".
- Links: Atuação, O sócio, Casos, Bastidores, Contato. Somem abaixo de 980px.
- CTA "Agendar consulta", que some abaixo de 640px.

### 5.2 Hero (`.hero`)

- **Fundo:** vídeo do skyline de Manhattan em loop (webm → mp4 → poster), com overlay em degradê escuro da esquerda e de baixo.
- **Partículas douradas** em `<canvas>` subindo devagar.
- **Retrato de costas** (`harvey-hero.webp`, fallback `.png`) no canto inferior direito, olhando para o título. A foto foi recortada com IA (o braço direito foi completado à mão), escurecida com grade noturno (sombras azuladas) e recebeu um contorno de luz champagne do lado da cidade. O rosto só aparece em "O sócio".
- **Conteúdo:** eyebrow "Direito corporativo · Manhattan, NY", título em 3 linhas com revelação por máscara, parágrafo, 2 CTAs e uma linha de metadados (Desde 2004 · endereço · 24/7).
- **Parallax:** o vídeo e o retrato se movem em velocidades diferentes, e o conteúdo some ao rolar.

**Título atual:** "Quando eu entro na sala, o acordo já está _fechado._"

### 5.3 Números (`.stats`)

- 4 cards de vidro que sobem 84px por cima do fim do hero.
- 17 anos · US$ 4,2 bi em M&A · 312 acordos · **0 casos perdidos** (em champagne).
- Contadores animados ao entrar na tela.

### 5.4 Áreas de atuação (`#atuacao`)

- Título "Onde o seu negócio _não pode_ perder."
- 4 cards com ícone em linha, código (§ 01 a § 04), título, descrição e 2 tópicos: Direito Corporativo, Fusões e Aquisições, Contratos de Alto Valor, Litígio Estratégico.

### 5.5 Por que nos escolher (`#diferenciais`, seção clara)

- Fundo creme, para quebrar a sequência de seções escuras.
- Título "Quatro razões para nos ter _do seu lado._"
- 4 diferenciais com ícone: Sigilo absoluto, Sócio no comando, Disponível 24/7, Estratégia antes do tribunal.

### 5.6 O sócio (`#socio`)

- Retrato (`harvey-terno-risca.jpg`) em duotone, com moldura champagne deslocada atrás e card escuro de citação sobreposto: "Eu não aceito casos para participar. Aceito casos para vencer."
- Nome, bio, credenciais (Harvard Law School · NY State Bar · Promotoria de NY) e a assinatura SVG que se desenha sozinha.

### 5.7 Casos emblemáticos (`#casos`)

- Lista em formato de processo: nº do processo, partes/tipo, resumo e resultado.
- Casos fictícios: Meridian Holdings × Atlas Capital, Halvorsen Pharma e Northgate Realty.

### 5.8 Nos bastidores (`#bastidores`)

- Galeria com 3 fotos em duotone (a primeira em destaque, mais larga). A cor volta no hover, foco ou toque.

### 5.9 Frase de impacto (`.verdict`)

- "Vencer não é _sorte._ É método.", sobre o skyline escurecido com parallax.

### 5.10 Contato (`#contato`)

- Título, texto e canais (telefone, e-mail, WhatsApp, endereço).
- Martelo SVG que bate quando a seção aparece e de novo ao enviar o formulário.
- Formulário de vidro com nome, empresa, e-mail, área e resumo do caso. **Atualmente só demonstração:** valida e mostra uma mensagem, sem enviar nada.

### 5.11 Botão flutuante de WhatsApp (`.wa`)

- Canto inferior direito, champagne, com pulso. Expande o texto "Falar no WhatsApp" no hover.
- Link: `https://wa.me/558391667053` (+55 83 9166-7053). O mesmo número aparece no canal "WhatsApp" do contato.

### 5.12 Rodapé

- Logo, aviso legal e crédito "Design & código · @joseandro.dev".

---

## 6. Animações (GSAP)

| Elemento           | Animação                                                                 |
| ------------------ | ------------------------------------------------------------------------ |
| Abertura           | timeline do martelo → cortina                                            |
| Título do hero     | linhas sobem de dentro de uma máscara (`yPercent: 110 → 0`, `expo.out`)  |
| Hero               | zoom-out do vídeo, entrada do retrato, parallax no scroll                |
| `[data-reveal]`    | sobe 40px e vai de opacidade .15 para 1 ao entrar na tela (`once: true`) |
| `[data-count]`     | contador numérico ao entrar na tela                                      |
| Assinatura         | `stroke-dashoffset` desenhando o texto, depois preenche                  |
| Martelo do contato | batida com ondas ao entrar na tela e ao enviar                           |
| Cursor (desktop)   | círculo champagne que segue o mouse e cresce sobre links e cards         |
| CSS                | grão de filme, indicação de scroll, pulso do WhatsApp, linhas no hover   |

**Regras de animação:**

- Respeitar `prefers-reduced-motion`: sem abertura, sem partículas, sem GSAP.
- Os conteúdos nunca ficam em opacidade 0 esperando o scroll. Partem de .15.
- Animar só `transform` e `opacity` sempre que possível, para manter 60fps.

---

## 7. Responsividade

| Breakpoint | Mudanças principais                                                                                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| > 980px    | layout completo                                                                                                                                                                    |
| ≤ 980px    | menu some, números em 2 colunas, seções de 2 colunas viram 1, galeria 2 colunas                                                                                                    |
| ≤ 640px    | hero em altura de tela com overlay de baixo para cima, retrato menor e mais translúcido à direita, CTA do menu some, tudo em 1 coluna, citação do sócio sai de cima da foto, martelo do contato some |

- Margem lateral mínima de 20px, respeitando `safe-area-inset`.
- Nenhuma rolagem horizontal em 390px.

---

## 8. Performance e acessibilidade

- Vídeo: `autoplay muted loop playsinline`, com `poster`, WebM antes do MP4 e sem áudio.
- Fotos em JPG otimizado. O retrato do hero usa WebP com transparência (24 KB) e PNG de fallback.
- Foco visível (contorno champagne) em links, botões e campos.
- `alt` descritivo em todas as imagens de conteúdo e `aria-hidden` nas decorativas.
- Formulário com `label` ligado a cada campo.

---

## 9. Cuidados legais e de marca

- O rodapé sempre mostra: "Projeto conceitual inspirado na série Suits. Escritório, casos e contatos fictícios."
- **Não copiar falas da série.** Todas as frases são originais, no estilo do personagem. Ex.: "I don't play the odds, I play the man" é fala real, então não usar.
- Não usar logo oficial da série nem o nome real do escritório da série.
- As fotos do ator servem **só para o fan-site e o vídeo de conteúdo**. Não usar em anúncio pago nem em post que venda serviços diretamente.
- **Versão para cliente real:** trocar as fotos do ator pelas do advogado, o nome, os textos, os casos, os contatos e o link do WhatsApp, e remover o aviso de fan-site.

---

## 10. Backlog (próximos passos)

**Prioridade alta**

- [x] Publicar no GitHub Pages (repo `joseandrofilho/advocacia-harveySpecter`)
- [ ] Revisar e ajustar os textos com a voz do Joseandro
- [x] Favicon com o monograma "S." (SVG)
- [x] Meta tags Open Graph (imagem de compartilhamento com o hero). Já com a URL absoluta do GitHub Pages.

**Prioridade média**

- [x] Separar o código em arquivos CSS e JS (ver seção 3)
- [x] `loading="lazy"` nas imagens abaixo da dobra
- [ ] Som opcional na batida do martelo (só após interação do usuário)
- [ ] Menu mobile (hambúrguer) com animação de cortina

**Para a versão comercial**

- [ ] Formulário real (Formspree ou envio direto para o WhatsApp com a mensagem preenchida)
- [x] Trocar o número do WhatsApp (+55 83 9166-7053)
- [ ] Seção de depoimentos (somente reais e autorizados) e FAQ
- [ ] Testar no Lighthouse (meta: Performance ≥ 90, Acessibilidade ≥ 95)

---

## 11. Roteiro do vídeo (TikTok, 9:16, ~30s)

1. **0–3s (gancho):** texto na tela "Fiz o site que o Harvey Specter teria". Abertura com o martelo batendo.
2. **3–8s:** a cortina abre, o hero aparece com o vídeo e o título subindo.
3. **8–20s:** scroll pelas seções, com cortes rápidos: números contando, hover nas áreas, assinatura se desenhando, galeria ganhando cor.
4. **20–26s:** close no cursor dourado e no martelo do contato batendo ao enviar.
5. **26–30s (CTA):** "Advogado? Faço o seu. Link na bio / chama no WhatsApp", com @joseandro.dev1 na tela.

Gravar a tela em 1080×1920, com trilha dramática e corte no ritmo das batidas do martelo.

---

## 12. Convenções para quem for editar

- Usar **sempre** as variáveis CSS de `:root`. Nunca colocar cores ou fontes soltas.
- Novos blocos que devem aparecer no scroll recebem o atributo `data-reveal`.
- Novos números animados: `<span data-count="123">123</span>`. Para decimais, use `data-dec="1"`. Para contar a partir de outro valor (ex.: o "0 casos perdidos" desce de 12), use `data-from="12"`.
- Cor ou espaçamento novo: crie o token em `css/tokens.css` e use a variável.
- Estilo de uma seção: fica no bloco numerado dela em `css/sections.css`, com os breakpoints logo abaixo.
- O martelo é desenhado uma vez no `<template id="gavel-template">` e clonado em qualquer `[data-gavel]`.
- Parâmetros de animação ficam no topo de cada JS (`REVEAL`, `PARTICLES`, `NAV_SCROLL_OFFSET`…).
- Novas fotos no estilo duotone: coloque a classe `photo` no contêiner.
- Manter os breakpoints 980px e 640px.
- Antes de qualquer mudança visual grande, conferir as regras da seção 4.
- Textos em português do Brasil, frases curtas e diretas.
