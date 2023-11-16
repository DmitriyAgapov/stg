import styles from './Footer.module.scss';
import { Logo } from "@/components/Header/Header";
import Link from "next/link";
import Image from "next/image";
import Social from "@/components/Social";

const Footer = ({ menu, ...props }:any) => {

	return (
		<footer className={styles.container}>
			<Logo/>
			<div className={styles.sidebar}>
				{menu.map(i => <div key={i.id} className={styles.col}>
					<h4>{i.title}</h4>
					<ul>
						{i.items.map(li => <li key={li.id}>
							<Link href={`${li.path}`}>{li.title}</Link></li>
							)}
					</ul>
				</div>)}

				<div className={styles.col}>
					<h4>Компания</h4>
					<ul>
						<li><Link href={'#'}>О компании</Link></li>
						<li><Link href={'#'}>Партнёрам</Link></li>
						<li><Link href={'/blog'}>Блог</Link></li>
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
