import styles from './LocaleSwitcher.module.css';
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const LocaleSwitcher = () => {
	const router = useRouter();
	const { locales, locale: activeLocale } = router
	// @ts-ignore
	const otherLocales = locales.filter((locale) => locale)
	return <div className={styles.container}>
		{otherLocales.map((locale) => {
			const { pathname, query, asPath } = router
			///УБрать как Es готово будет
			// if(locale !== 'es')
			return (

					<Link key={locale} href={{ pathname, query }} as={asPath} locale={locale}
						// className={`${styles.link}  ${activeLocale === locale ? styles.active : ""}`}
						className={`${styles.link} + ${activeLocale === locale && styles.active}`}
					>{locale}
					</Link>

			)
		})}

	</div>;
};


export default LocaleSwitcher;
