import Document, { Head, Html, Main, NextScript } from "next/document";
import { NavBar } from "../components";
/**
 * Extends functionality of the default Next document.
 */
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <NavBar />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
