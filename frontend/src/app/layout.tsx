/* eslint-disable @typescript-eslint/no-explicit-any */
import "../styles/global.css";
import "@rainbow-me/rainbowkit/styles.css";
import { type Metadata } from "next";
import { type ReactNode } from "react";
import Providers from "./providers";
import { Header, Footer } from "./components";

// Props interface for RootLayout
interface Props {
  children: ReactNode;
}

/**
 * Root layout component for the application.
 *
 * @param props - The properties for the RootLayout component.
 * @returns The JSX for the root layout.
 */
export default function RootLayout(props: Props): JSX.Element {
  const { children } = props;

  return (
    <html
      lang="en"
      className={"h-full bg-gray-100  scroll-p-4 scroll-smooth  md:scroll-p-6"}
      data-theme="light"
    >
      <head>
        {/* Charset do not currently have built-in support, read more here: https://nextjs.org/docs/api-reference/metadata#unsupported-metadata */}
        <meta charSet="utf-8"></meta>
      </head>

      <body className="h-full min-h-full">
        <Providers>
          <Header />

          <main className="-mt-32">
            <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
              <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                {children}
              </div>
            </div>
          </main>
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
