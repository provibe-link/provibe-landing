import Script from "next/script"
import { Space_Grotesk, Outfit, DM_Sans, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { FloatingWaitlistButton } from "@/components/shared/floating-waitlist-button"
import { ScrollProgress } from "@/components/shared/scroll-progress"
import { cn } from "@/lib/utils"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "600", "500"],
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["700", "600", "500"],
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "600"],
  display: "swap",
})

export const metadata = {
  title: "ProVibe - Create. Connect. Grow.",
  description:
    "The creator business platform — storefront, products, bookings, analytics, and brand deals. Launching July 2026.",
  icons: {
    icon: "/logo-icon.webp",
    apple: "/logo-icon.webp",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://provibe.com",
    siteName: "ProVibe",
    title: "ProVibe - Create. Connect. Grow.",
    description:
      "The creator business platform — storefront, products, bookings, analytics, and brand deals. Launching July 2026.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProVibe - Create. Connect. Grow.",
    description:
      "The creator business platform — storefront, products, bookings, analytics, and brand deals. Launching July 2026.",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "antialiased",
        spaceGrotesk.variable,
        outfit.variable,
        dmSans.variable,
        jetbrainsMono.variable
      )}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C3QPD0CYHM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C3QPD0CYHM');
          `}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '885664674485044');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=885664674485044&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="font-body">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            <ScrollProgress />
            <Navbar />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
            <FloatingWaitlistButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
