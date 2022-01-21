import "../styles/globals.css";
import "../components/python-module.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
