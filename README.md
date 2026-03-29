# Portefolio - Rafael Lopes

Projeto final da UC604. Site de portefolio pessoal desenvolvido de raiz com HTML, CSS e JavaScript.

---

## Sobre o Projeto

O objetivo foi construir um site completo, responsivo e interativo que servisse como portefólio pessoal. O tema escolhido foi o portefólio de desenvolvedor, com foco em apresentar o meu percurso, competências e projetos de forma clara e profissional.

O site é composto por quatro páginas com navegação consistente, um único ficheiro CSS partilhado e um único ficheiro JavaScript que gere toda a interatividade.

---

## Estrutura de Ficheiros

```
portefolio/
├── css/
│   └── styles.css
├── html/
│   ├── index.html
│   ├── sobre.html
│   ├── projetos.html
│   └── contacto.html
├── imgs/
│   └── (imagens e ícones do site)
├── js/
│   └── script.js
└── README.md
```

---

## Páginas

**index.html** — Página principal com secção hero, carrossel animado de tecnologias, barra de estatísticas com contadores animados, projetos em destaque e chamada à ação.

**sobre.html** — Apresentação pessoal com foto, texto sobre o meu percurso, grelha de competências técnicas e linha temporal de formação.

**projetos.html** — Galeria completa de projetos com sistema de filtro por categoria (HTML & CSS, JavaScript, Página Completa).

**contacto.html** — Informações de contacto e formulário com validação em tempo real e mensagem de confirmação após envio.

---

## Tecnologias Utilizadas

- HTML5 com marcação semântica
- CSS3 com variáveis, Flexbox, Grid, animações e media queries
- JavaScript puro (sem jQuery ou outras bibliotecas)
- Google Fonts — Open Sans

---

## Funcionalidades

- Navegação responsiva com menu hamburger em dispositivos móveis
- Navbar com efeito glassmorphism ao fazer scroll
- Carrossel infinito de logos de tecnologias (CSS puro)
- Contadores animados que disparam ao entrar no viewport
- Animações de entrada em scroll com IntersectionObserver
- Filtro de projetos por categoria com animação
- Formulário de contacto com validação de campos em tempo real
- Layout totalmente responsivo para mobile, tablet e desktop
