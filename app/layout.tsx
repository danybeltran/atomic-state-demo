import { AtomicState } from "atomic-state"
import "./globals.css"
import { GeistSans } from "geist/font/sans"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={GeistSans.className}>
        <div>
          <AtomicState>{children}</AtomicState>
        </div>
      </body>
    </html>
  )
}
