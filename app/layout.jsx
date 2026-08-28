import './globals.css';
import { CLASSES_FONTES } from '../lib/fontes';

export const metadata = {
  icons: { icon: '/logos/eletrocanalizacoes.png', shortcut: '/logos/eletrocanalizacoes.png', apple: '/logos/eletrocanalizacoes.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-PT" className={CLASSES_FONTES}>
      <body>{children}</body>
    </html>
  );
}
