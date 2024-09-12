import { Inter } from "next/font/google"
import "./globals.css"
import Script from 'next/script'
import { ThemeProvider } from "../components/theme-provider"
import { cn } from "@/src/lib/utils"
import { Toaster } from "@/src/components/ui/toaster"
import { ModeToggle } from "@/src/components/mode-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "BTEC Pearson L3 ICT Calculator",
  description: "An easy way to quickly calculate your BTEC Pearson L3 ICT grades.",
}

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" className="dark">
      <Script
        async
        src="https://umami-azure-one.vercel.app/script.js"
        data-website-id="684d1fef-f173-44dc-a1ed-a0159f144315"
      />

      <body 
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            <div className="fixed top-4 right-4 z-50">
              <ModeToggle />
            </div>
            <main className="pt-16 px-4">
              {children}
            </main>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}