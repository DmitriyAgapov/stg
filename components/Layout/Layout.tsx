import styles from './Layout.module.scss';
import React, { JSX, ReactElement, ReactNode, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from 'next/font/google';
import Head from "next/head";
import { useRouter } from "next/router";
import Container from "@/components/ui/Container";
import useWindowDimensions from "@/utils/utils";


export interface PageLayoutProps {
    heading?: JSX.Element | ReactNode
    children: ReactNode
    shortText?: ReactNode
    breadcrumbs?: ReactNode
}

export function PageLayout({ heading, shortText, children, breadcrumbs }: PageLayoutProps) {
    const router = useRouter()
    return <main className={styles.mainPage}>
        {breadcrumbs}
        <Container>{heading}
            <div className={styles.pageShortText}>{shortText}</div>
            Category: {router.query.category}{children}</Container>
    </main>;
}

const Layout = ({children, seo, menu = {
        metaTitle: "untitled",
        metaDescription: "metaDescription",
        keywords: "",

    }}: { children: ReactNode, seo: any, menu: any }) => {

    return (
        <>

            <Head>
                <title>{seo.metaTitle}</title>
                <meta name="description"
                    content={seo.metaDescription}/>
                <meta name="keywords"
                    content={seo.keywords}/>
                <meta name="viewport"
                    content="width=device-width, initial-scale=1"/>
                <link rel="icon"
                    href="/favicon.ico"/>
            </Head>
            <div className={styles.container}>
                <Header menu={menu.header}/>
                {children}
                <Footer menu={menu.footer}/>
            </div>
        </>
    );
};

export default Layout;
