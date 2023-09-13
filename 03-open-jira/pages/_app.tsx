import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { UIProvider } from "@/context/ui";
import { EntriesProvider } from "@/context/entries";

import { darkTheme, lightTheme } from "@/themes";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <main className={roboto.className}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  );
}
