import type { Metadata } from "next";
import "../globals.css"; // Moved up one level
import Navbar from "@/components/Navbar";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export const metadata: Metadata = {
  title: "Edit-All | Unlimited Browser-based Audio Editor",
  description: "Merge, loop, and extend your audio files locally in your browser. No server uploads, total privacy, and high speed.",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4791352770846055"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main className="pt-16 min-h-screen">{children}</main>
          <footer className="py-12 border-t border-gray-200 mt-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-gray-600 text-sm mb-4">
                &copy; {new Date().getFullYear()} Edit-All Audio Editor.
              </p>
              {/* Footer translation will be handled inside a client component or simplified here */}
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
