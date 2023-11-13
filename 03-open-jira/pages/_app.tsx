import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto, Ubuntu, Tilt_Neon } from "next/font/google";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { UIProvider } from "@/context/ui";
import { EntriesProvider } from "@/context/entries";

import { darkTheme, lightTheme } from "@/themes";

const ubuntu = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-ubuntu",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <main className={ubuntu.className}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  );
}
