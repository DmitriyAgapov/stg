export const translateText = (value: string, locale: string) => {
    if (value in translate) {
        return translate[value][locale]
    }
}
export const translate:any = {
        door: {
            en: "door",
            ru: "Дверь"
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
            en: "thickness",
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
