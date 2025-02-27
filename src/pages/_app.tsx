import { Layout } from "@/components/Common/layout/Layout";
import { AlertContextProvider } from "@/contexts/AlertContext";
import { AuthContextProvider } from "@/contexts/AuthContext";
import type { AppProps } from "next/app";

import "@/styles/globals.css";
import { BackdropLoaderContextProvider } from "@/contexts/LoaderContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <AlertContextProvider>
        <BackdropLoaderContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </BackdropLoaderContextProvider>
      </AlertContextProvider>
    </AuthContextProvider>
  );
}
