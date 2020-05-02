import React from "react";
import { useRouter } from "next/router";
import { PageTransition } from "next-page-transitions";
import { NavBar } from "../components";

import "../public/styles/style.scss";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <NavBar />
      <PageTransition timeout={300} classNames="page-transition">
        <Component {...pageProps} key={router.route} />
      </PageTransition>
    </>
  );
}
