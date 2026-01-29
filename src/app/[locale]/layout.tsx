import type { Metadata } from "next";
import "../globals.css"; // Moved up one level
import Script from 'next/script';
import Navbar from "@/components/Navbar";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link, routing } from '@/i18n/routing';
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Edit-All | Unlimited Browser-based Audio Editor",
  description: "Merge, loop, and extend your audio files locally in your browser. No server uploads, total privacy, and high speed.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4791352770846055"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main className="pt-16 min-h-screen">{children}</main>
          <footer className="py-12 border-t border-gray-200 mt-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-gray-600 text-sm mb-4">
                &copy; {new Date().getFullYear()} Edit-All Audio Editor.
              </p>
              <div className="flex justify-center gap-6 text-sm text-gray-500">
                <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
                <Link href="/developers" className="hover:text-blue-600 transition-colors">Developers</Link>
                <Link href="/gallery" className="hover:text-blue-600 transition-colors">Gallery</Link>
              </div>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
