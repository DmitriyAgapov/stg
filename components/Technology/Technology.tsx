import styles from './Technology.module.scss';
import { newShade } from "@/utils/utils";
import React from "react";
const CardTechnology = ({title, description} : {title:string, description:string}) => <li className={'card_tech'}>
    <h4>{title}</h4>
    <div className={"card_tech__description"}>
        {description}
    </div>
</li>
const Technology = ({ color = "#898989" } : {color: string} ) => {
    // console.log(color)
    const dark = newShade(color, -12);

    // console.log(dark)
    const num = [{color: "#0C4191", title: "Слой по технологии «DLT»", description: "«Dissimilar Layer Technology», на основе газонаполненного полиэтилена. Совмещает в себе звуко и теплоизолирующий материал с облгченным полимерным слоем и ламинированной акустической мембраной."}, {color: "#5BBF48", title: "Слой с максимальной адгезией", description: "«Dissimilar Layer Technology», на основе газонаполненного полиэтилена. Совмещает в себе звуко и теплоизолирующий материал с облгченным полимерным слоем и ламинированной акустической мембраной."}, {color: "#C0B32A", title: "Слой из облегчённой мастики", description: "«Dissimilar Layer Technology», на основе газонаполненного полиэтилена. Совмещает в себе звуко и теплоизолирующий материал с облгченным полимерным слоем и ламинированной акустической мембраной."}, {color: "#000000", title: "Защищённый слой", description: "description"}, {color: "#aaaaaa", title: "Звуковая мембрана", description: "description"} ]
    const cards = num.map((c, index) => <CardTechnology key={c.title + index} title={c.title} description={c.description}/> )
    const layers = num.map((l, index) =>
        <div  key={`layer-${index}`}  className="iso_box">
            <div className="iso_face" style={{color: l.color}}>
                <div className="iso_face_left"  style={{color: newShade(l.color, 15)}}/>
                <div className="iso_face_right" style={{color: newShade(l.color, 50)}}/>
            </div>
            <div className="iso_shadow"></div>
        </div>)

    return (
        <div className={styles.Technology}>
        <div className={styles.panel}>
            <div className={styles.TechnologyContainer}>
                 {layers}
            </div>
            </div>
            <aside><ol className={'cards_tech'}>{cards}</ol></aside>
    </div>
            )
};

export default Technology;
