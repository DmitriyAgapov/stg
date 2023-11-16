import { useState } from "react";
import { SectionCards } from "@/components/Section/SectionCards";
import styles from './Section.module.scss'
import { SectionProps } from "./Section";

export const ProdSection = ({ children, header, shortText, media, text, cards, action, className = "" }: SectionProps) => {

	const [imgBackground, setBackground] = useState(null);

	return (
		<section className={`section ${styles.container} ${className}`}>
			{header && <h2 className={'section__title'}>{header}</h2>}
			{shortText && <div className={`section__shortText ${styles.shortText}`} dangerouslySetInnerHTML={{__html: shortText}}/>}
			{text && <div className={`section__text ${styles.text}`} dangerouslySetInnerHTML={{__html: text}}/>}
			<SectionCards
				// @ts-ignore
				cards={cards}

				background={imgBackground}
				// onMouseLeave={() => setBackground(null)}
				// onMouseOver={handleOver}
			/>
			{media && <div className={`section__media ${styles.media}`}>{media}</div>}
			{children && children}
		</section>
	);
};
