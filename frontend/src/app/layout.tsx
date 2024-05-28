/* eslint-disable @typescript-eslint/no-explicit-any */
import '../styles/global.css'
import '@rainbow-me/rainbowkit/styles.css'
import classNames from 'classnames'
import { type Metadata } from 'next'
import { Hind_Siliguri } from 'next/font/google'
import { type ReactNode } from 'react'
import Providers from './providers'
import { Header, Footer } from './components'

// Load the Hind Siliguri font with specified settings
const hindSiliguri = Hind_Siliguri({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-hind-siliguri'
})

// Metadata for the application
export const metadata: Metadata = {
  title: 'KycWonder',
  description: '',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5
  }
}

// Props interface for RootLayout
interface Props {
  children: ReactNode
}

/**
 * Root layout component for the application.
 *
 * @param props - The properties for the RootLayout component.
 * @returns The JSX for the root layout.
 */
export default function RootLayout(props: Props): JSX.Element {
  const { children } = props

  return (
    <html
      lang="en"
      data-theme="kyc-wonder"
      dir="ltr"
      className={classNames('scroll-p-4 scroll-smooth bg-black md:scroll-p-6', [
        hindSiliguri.variable
      ])}
      style={{
        ['--mobile-navbar-height' as any]: '56px'
      }}
    >
      <head>
        {/* Charset do not currently have built-in support, read more here: https://nextjs.org/docs/api-reference/metadata#unsupported-metadata */}
        <meta charSet="utf-8"></meta>
      </head>

      <body className="h-full min-h-full">
        <Providers>
          <main className="mx-auto max-w-screen-md">
            <Header className="sticky top-0" />
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  )
}
