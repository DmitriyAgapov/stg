import styles from './Footer.module.scss';
import { Logo } from "@/components/Header/Header";
import Link from "next/link";
import Social from "@/components/Social";
import { useRouter } from "next/router";

const Footer = ({ menu, ...props }:any) => {
	const router = useRouter()
	const Menu = () => {
		return menu.map((i:any) => <div key={i.id}
			className={styles.col}>
			<h4>{i.title}</h4>
			<ul>
				{i.items.map((li: {
					id: string
					path: string
					title: string
				}) => {

					li.path.replace('/#', "");

					if (li.path.includes('mailto:')) {

						let tempPath = li.path;
						const ar = tempPath.split('/')
						return <li key={li.id}>
							<a href={`${ar[ar.length - 1]}`}
								className={'hover-2'}>{li.title}</a></li>
					}

					return <li key={li.id}>
						<Link href={`${li.path.replace('/#', "")}`}
							className={'hover-2'}>{li.title}</Link></li>
				})}
			</ul>
		</div>)
	}

	return (
		<footer className={styles.container}>
			<div className={styles.firstCol}>
				<Logo/>

			</div>
			<Social key={'social'} className={'social_footer'}/>
			<div className={styles.sidebar}>
				<Menu />
			</div>
			<div className={styles.bottomRow}>

				<div className={"md:flex justify-between items-center"}>
					<Link href={'/policy'}>Политика конфиденциальности</Link>
					<p>{router.locale === "ru" ? `Группа компаний «Standart-group»` : `The "Standart-group" company group`}{`@ 2004 — ${new Date().getFullYear()} `}</p>
				</div>
			</div>

		</footer>
	);
};

export default Footer;
