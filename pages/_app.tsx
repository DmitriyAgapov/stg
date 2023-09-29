import '@/assets/styles/globals.scss'
import type { AppProps } from 'next/app';
import Layout from "@/components/Layout";
import { NextUIProvider } from "@nextui-org/react";
import { createContext } from "react";
import { getSide } from "@/utils/getSide";
import { useStore } from "@/store";

export const MobxContext = createContext(null);
export default function App({ Component, pageProps }: AppProps) {
    console.log("hello from _app - ", getSide());

    const store = useStore(pageProps.initialState);
  return (
      <NextUIProvider>
          <MobxContext.Provider value={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MobxContext.Provider>
      </NextUIProvider>
  )
}
