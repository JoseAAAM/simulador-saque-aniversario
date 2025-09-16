import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Provider } from './proviver';
import { Header } from '@/components/header';
import { FormIntro } from '@/components/form-intro';

const montserrat = Montserrat({
  variable: '--font',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Calculadora de saque aniversário FGTS',
  description:
    'Use nossa calculadora de Saque-Aniversário do FGTS e descubra em segundos quanto você pode sacar. Simule valores, compare opções e planeje melhor seu dinheiro.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <div className="w-[90vw] max-w-[350px] md:max-w-[700px] mx-auto pb-8">
          <Header />
          <Provider>
            <FormIntro />
            {children}
          </Provider>
        </div>
      </body>
    </html>
  );
}
