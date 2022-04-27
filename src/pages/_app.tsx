import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { PrismicProvider } from "@prismicio/react";

import { Header } from "../components/Header";

import "../styles/global.scss";
import { linkResolver } from "../services/prismic";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, ...props }) => (
        <Link href={href}>
          <a {...props}>{children}</a>
        </Link>
      )}
    >
      <SessionProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </PrismicProvider>
  );
}

export default MyApp;
