import './globals.css';

export const metadata = {
  title: 'Tempo para Alice se formar',
  description: 'Contagem regressiva romântica de três anos para a formatura da Alice.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
