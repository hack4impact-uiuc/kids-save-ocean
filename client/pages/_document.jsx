import Document, { Head, Html, Main, NextScript } from "next/document";
/**
 * Extends functionality of the default Next document.
 */
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
