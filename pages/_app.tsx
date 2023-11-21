import '@/assets/styles/globals.scss';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import Layout from "@/components/Layout";
import { NextUIProvider } from "@nextui-org/react";
import {getData} from "@/utils/getData";
import { queryMenu } from "@/utils/queries/menu";
import { createContext } from "react";
import { useStore } from "@/store";
import { useRouter } from "next/router";

export const MobxContext =  createContext(null)

type AppMenuProps = { menu: any }

export default function MyApp({ Component, pageProps, menu }: AppProps & AppMenuProps) {
    const router = useRouter();
    const store = useStore();
    return (
      <NextUIProvider navigate={router.push}>
          <MobxContext.Provider value={store}>
            <Layout seo={pageProps?.data?.seo || {
                metaDescription: "def",
                metaTitle: "def",
                keywords: "def"
            }}
                menu={menu}
            >
              <Component {...pageProps} />
            </Layout>
          </MobxContext.Provider>
      </NextUIProvider>
  )
}

MyApp.getInitialProps = async (context: AppContext): Promise<AppMenuProps & AppInitialProps> => {

    const ctx = await App.getInitialProps(context);

    const header  = await getData(queryMenu, {
        navslug: "header",
        locale: context.router.locale
    });
     const footer  = await getData(queryMenu, {
        navslug: "footer",
        locale: context.router.locale
    });

    return {
        ...ctx,
        menu: {
            header: header.data,
            footer: footer.data
        }
    }
}
