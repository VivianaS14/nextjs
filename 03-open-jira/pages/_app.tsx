import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto, Ubuntu, Tilt_Neon } from "next/font/google";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { UIProvider } from "@/context/ui";
import { EntriesProvider } from "@/context/entries";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { darkTheme, lightTheme } from "@/themes";

const ubuntu = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-ubuntu",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <EntriesProvider> */}
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <main className={ubuntu.className}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </UIProvider>
      {/* </EntriesProvider> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
