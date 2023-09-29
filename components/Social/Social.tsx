import styles from './Social.module.css';
import vk from '@/public/icons/Social Media/Small/Dark/Vk.svg'
import inst from '@/public/icons/Social Media/Small/Dark/Instagram.svg'
import facebook from '@/public/icons/Social Media/Small/Dark/Instagram.svg'
import Image from "next/image";

const Social = () => {
	return <div className={styles.container}>
		<a href={"https://vk.com"}><Image src={vk} alt={''}/></a>
		<a href={"https://instagram.com"}><Image src={inst} alt={''}/></a>
		<a href={"https://facebook.com"}><Image src={facebook} alt={''}/></a>
	</div>;
};

export default Social;
