import { Oswald } from 'next/font/google'
import './globals.css'
import Head from "next/head"

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
      <Head>
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#cf152d" key="theme-color" />
      </Head>
      <body className={font.className}>{children}</body>
    </html>
  )
}
