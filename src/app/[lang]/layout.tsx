import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import  LanguageSwitcher from '@components/LanguageSwitcher';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shop',
  description: 'la base shop',
}

export default async function RootLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  let messages;
  try {
    messages = (await import(`@/dictionaries/${lang}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={lang} messages={messages}>
          <header>
            <LanguageSwitcher />
          </header>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}