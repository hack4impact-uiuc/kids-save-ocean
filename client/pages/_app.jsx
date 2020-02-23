import App from "next/app";
import { Head } from "../components";

export default class NextApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head />
        <Component {...pageProps} />
      </>
    );
  }
}
