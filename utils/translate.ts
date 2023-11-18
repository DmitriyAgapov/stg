import { useRouter } from "next/router";

export const translateText = (value: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    if (value in translate) {
        // @ts-ignore
        return translate[value][router.locale]
    }
    return value
}
const translations = {
    productProperties: {
        labels: {

            thickness: [ 'Толщина', 'Thickness' ],
            size: [ 'Размер', 'Size' ],

            'quanity_in_box': [ 'Количество в упакове', 'Quantity in package' ],
            sqrt: [ 'Площадь', 'square' ],
            'specific_weight': [ 'Вес уп-ки, кг', 'Weight package' ],
            weight: [ 'Вес', 'Weight' ],
            kmp: [ 'Кмп', 'Mechanical loss coefficient' ],
            adhesion: [ 'Адгезия', 'Adhesion' ],
            temp: [ 'Температура', 'Temperature' ]
        },
        values: {
            place: {
                'door': ['Дверь','door'],
                'floor': ['Пол','floor'],
                'roof': ['Крыша','roof'],
                'arches': ['Арки','arches'],
                'hood': ['Капот','hood'],
                'trunklid': ['Крышка багажника','trunklid'],
                'luggage_rack': ['Багажник','luggage_rack']
            }
        }
    }
}
export const translate:any = {
        door: {
            en: "door",
            ru: "Дверь"
        },
        type: {
            en: "Type",
            ru: "Тип"
        },
        series: {
            en: "Series",
            ru: "Серия"
        },
        place: {
            ru:  'Место применения',
            en:  'Place of application'
        },
        floor: {
            en: "floor",
            ru: "Пол"
        },

        roof: {
            en: "roof",
            ru: "Крыша"
        },
        arches: {
            en: "door",
            ru: "Арки"
        },
        hood: {
            en: "door",
            ru: "Капот"
        },
        trunklid: {
            en: "trunklid",
            ru: "Крышка багажника"
        },
        luggage_rack: {
            en: "luggage_rack",
            ru: "Багажник"
        },
        size: {
            en: "size",
            ru: "размер"
        },
         thickness: {
            en: "Thickness",
            ru: "толщина, мм"
        },
         quanity_in_box: {
            en: "quanity in package",
            ru: "Листов в упаковке"
        },
         sqrt: {
            en: "Area, square meters.",
            ru: "Площадь, м.кв"
        },
         "weight": {
            en: "package weight",
            ru: "Вес уп-ки, кг"
        },
         "specific_weight": {
            en: "Specific weight, kg/sq.m.",
            ru: "Уд. вес, кг/м.кв."
        },
         "kmp": {
            en: "CML",
            ru: "КМП"
        },
         "adhesion": {
            en: "adhesion",
            ru: "адгезия"
        },
         "temp": {
            en: "Temperature in degrees Celsius",
            ru: "Темп-ра С"
        },

}
