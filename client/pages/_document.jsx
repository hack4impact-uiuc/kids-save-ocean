import Document, { Head, Html, Main, NextScript } from "next/document";
/**
 * Extends functionality of the default Next document.
 */
export default class MyDocument extends Document {
  /**
   * Fetches initial props.
   * @param ctx the Next document context.
   * @returns the document's initial props.
   */
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
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
