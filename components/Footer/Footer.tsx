import styles from './Footer.module.scss';
import { Logo } from "@/components/Header/Header";
import Link from "next/link";
import Image from "next/image";
import Social from "@/components/Social";

const Footer = () => {
	return (
	<footer className={styles.container}>
		<Logo/>
		<div className={styles.sidebar}>
			<div className={styles.col}>
				<h4>Продукция</h4>
				<ul>
					<li><Link href={'#'}>Шумоизоляция</Link></li>
					<li><Link href={'#'}>Виброизоляция</Link></li>
					<li><Link href={'#'}>Теплоизоляция</Link></li>
					<li><Link href={'#'}>Подбор материалов</Link></li>
				</ul>
			</div>
			<div className={styles.col}>
				<h4>Компания</h4>
				<ul>
					<li><Link href={'#'}>О компании</Link></li>
					<li><Link href={'#'}>Партнёрам</Link></li>
					<li><Link href={'#'}>Блог</Link></li>
					<li><Link href={'#'}>Контакты</Link></li>
					<li><Link href={'#'}>Вопросы и ответы</Link></li>
				</ul>
			</div>
			<div className={styles.col}>
				<h4>Контакты</h4>
				<ul>
					<li><Link href={'#'}>+7 (3513) 25-00-82</Link></li>
					<li><Link href={'#'}>+7 (3513) 25-00-83</Link></li>
					<li><Link href={'#'}>+7 (3513) 25-00-84</Link></li>
					<li><Link href={'#'}>Подбор материалов</Link></li>
				</ul>
				<Social/>
			</div>

		</div>
	</footer>
);
};

export default Footer;
