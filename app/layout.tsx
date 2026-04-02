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
    "Join 10K+ creators building their brand and connecting with opportunities",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://provibe.com",
    siteName: "ProVibe",
    title: "ProVibe - Create. Connect. Grow.",
    description:
      "Join 10K+ creators building their brand and connecting with opportunities",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProVibe - Create. Connect. Grow.",
    description:
      "Join 10K+ creators building their brand and connecting with opportunities",
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
