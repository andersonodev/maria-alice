# Tempo para Alice se formar

Uma experiência React romântica construída com Next.js para acompanhar a contagem regressiva de três anos até a formatura da Alice. O layout é mobile-first, utiliza animações de corações e traz o personagem Atenção manipulando o tempo em cada cartão de estatísticas.

## 🚀 Tecnologias

- [Next.js 14](https://nextjs.org/) com app router
- React 18 com componentes client-side e atualização em tempo real
- CSS puro com animações de corações e esquema cromático preto e rosa

## 📦 Scripts

```bash
npm install       # instala dependências
npm run dev       # inicia o servidor de desenvolvimento
npm run build     # cria o build de produção
npm start         # executa o build localmente
```

## 🔢 Destaques do produto

- Card central dedicado a **“3 anos”**, exibindo o total de dias e a contagem atual em anos, meses, dias, horas, minutos e segundos.
- Cards auxiliares com os totais de horas, minutos, segundos e períodos (semestres) contidos nos três anos.
- Vetores do personagem Atenção segurando um graveto em cada cartão, mantendo o repositório compatível com a Vercel (sem binários obrigatórios).

Para substituir os vetores pelos arquivos de imagem fornecidos, basta adicionar os assets dentro da pasta `public/` e alterar a função `buildStickFigure` em `app/page.js` para carregar as imagens com a tag `Image` do Next.

## ☁️ Deploy na Vercel

1. Conecte este repositório à Vercel.
2. Certifique-se de que o framework detectado é **Next.js** (a Vercel identifica automaticamente).
3. Use a versão recomendada do Node 18 ou superior.
4. Configure o comando de build como `npm run build` e o diretório de output padrão (`.next`).
5. Após o primeiro deploy, as atualizações futuras serão feitas automaticamente via `git push`.

Pronto! A contagem romântica estará disponível em um domínio Vercel em poucos minutos.
