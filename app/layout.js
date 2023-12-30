import { Oswald } from 'next/font/google'
import './globals.css'

const font = Oswald({
  subsets: ['latin'],
  weight: '400'
})

export const metadata = {
  title: 'Monarch Pass Ski Area Info',
  description: 'General inforamation for ski areas on the Monarch Season Pass',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
