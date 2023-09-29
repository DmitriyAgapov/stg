import styles from './LocaleSwitcher.module.css';
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const LocaleSwitcher = () => {
	const router = useRouter();
	const currentLocale = router.locale;
	return <div className={styles.container}>
		<Link href="/" locale="ru" className={`${styles.link} + ${currentLocale === 'ru' && styles.active}`}>
			RU
		</Link>
		<Link href="/" locale="en" className={`${styles.link} + ${currentLocale === 'en' && styles.active}`}>
			EN
		</Link>
	</div>;
};

export default LocaleSwitcher;
