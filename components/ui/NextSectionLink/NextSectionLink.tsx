import styles from './NextSectionLink.module.scss';
import svg from  "@/public/icons/Chevron_down.svg";
import Image from "next/image";
import { useRouter } from "next/router";

const NextSectionLink = () => {
	const router = useRouter()
	return <a className={styles.NextSectionLink + " next_link"}>{router.locale === "ru" ? "Далее" : "Next"}<Image src={svg} alt={''}/></a>;
};

export default NextSectionLink;
