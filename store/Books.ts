import { makeAutoObservable, toJS, autorun } from "mobx";
import { books, clientBooks } from "@/utils/getSide";
import { getData } from "@/utils/getData";
import { queryAllCategories, queryLastNews } from "@/utils/queries/news";
import { queryCalcResult } from "@/utils/queries/calc";


export type CalcProps = {
	size: string
	variant: string
}
export type imageBgProps = {
	src?: string
	width?: number
	height?: number
	idBg?: string | undefined | null
}
export interface BooksStoreProps {
	searchParam: string;
	books: any[];
	activeSlideIndex: number
	numbers: number
	imageBg: imageBgProps
	calc: {
		size?: string | undefined | any
		variant?: string | undefined | any
	}
	imageBgIndex?: string
	setSearchParam: (param: any) => void;
	setActveImageBgIndex: (id:string) => void;
	setBooks: (books: any) => any;
	fetchBooks: () => Promise<({ image: string; release: string; author: string; id: number; title: string } | { image: string; release: string; author: string; id: number; title: string })[]>;

	fetchAndSetBooksOnClient: () => Promise<void>;
	readonly filteredBooks: any[];
	readonly totalBooks: number;
	hydrate: (data: any) => void;
}
class BooksStore implements BooksStoreProps {
	searchParam: string;
	books: any[];
	activeSlideIndex: number
	numbers: number;
	locale: string;
	calc: {
		size?: string | undefined | any
		variant?: string | undefined | any
	};
	news: {
		post: [];
		loading: boolean;
	}
	calcResult: {
		data: [];
		loading: boolean;
	}

	categories: {
		data: [];
		loading: boolean;
	}
	imageBg: imageBgProps;
	imageBgIndex: string;
	constructor() {
		this.books = [];
		this.categories = {
			data: [],
			loading: false
		}
		this.calcResult = {
			data: [],
			loading: false
		}
		this.news = {
			post: [],
			loading: false
		}
		this.calc = {
			// @ts-ignore
			size: undefined,
			// @ts-ignore
			variant: undefined
		};
		this.locale = "ru";
		this.imageBg = {};
		this.imageBgIndex = " ";
		this.numbers = 0;
		this.activeSlideIndex = 0;
		this.searchParam = "";
		makeAutoObservable(this);

	}

	async fetchNews(locale: string | undefined) {
		this.news.loading = true;
		try {
			const news = await getData(queryLastNews, {
				locale: locale
			})
			this.news.post = news.data;
		} catch (error) {
			console.error('Error', error);
		} finally {
			this.news.loading = false;
		}
	}
	async fetchResult(locale: string | undefined) {
		this.calcResult.data = []
		this.calcResult.loading = true;

		if(this.calc.size !== undefined && this.calc.variant !== undefined) {
			try {
				const result = await getData(queryCalcResult, {
					"carclass": this.calc.size,
					"series": this.calc.variant,
					locale: locale
				})

				this.calcResult.data = result.data;
				this.setResult(result.data)
			} catch (error) {
				console.error('Error', error);
			} finally {
				this.calcResult.loading = false;
			}
		} else  {
			this.calcResult.data = []
		}

	}

	async fetchCategories(locale: string | undefined) {
		this.categories.loading = true;
		try {
			const {data} = await getData(queryAllCategories, {
				locale: locale
			})
			this.categories.data = data;

		} catch (error) {
			console.error('Error', error);
		} finally {
			this.categories.loading = false;
		}
	}

	lastNews =  async (locale: string | undefined) => {
		await this.fetchCategories(locale);
		await this.fetchNews(locale);
		let ready = (!this.news.loading && !this.categories.loading);

		if(ready) return  {
			news: toJS(this.news),
			cats: toJS(this.categories)
		}
	}
	getResult = async ( locale:  string | undefined) => {

		await this.fetchResult(locale);
		let ready = !this.calcResult.loading;
		if(ready) return  toJS(this.calcResult.data)
	}
	setCalcSize = (size: string) => {
		this.calc = {
			...this.calc,
			size: size
		}
		console.log(this.calc)
	}
	setResult = (data: []) => {
		this.calcResult.data = data
		console.log(this.calcResult.data)
	}

	setCalcVariant = (variant: string) => {
		this.calc = {
			...this.calc,
			variant: variant
		}
		console.log(this.calc.variant)
	}

	setSearchParam = (param: any) => {
		this.searchParam = param;
	};
	increment = () => {
		this.numbers ++
	}
	decrement = () => {
		this.numbers --
		console.log(this.numbers)
	}
	setActveImageBgIndex = (id: string) => {
		this.imageBgIndex = id
	}
	setImageBg = (img: imageBgProps) => {

		this.imageBg = img;
		// console.log(img)
		// this.imageBgIndex = "";
		// console.log('time 0')
		// this.imageBgIndex = img.id
		// setTimeout(() => {
		// 	console.log('time 500')
		// 	this.imageBgIndex = img.id
		// }, 500)

	}
	setActiveSlideIndex = (activeIndex:number) => {
		this.activeSlideIndex = activeIndex;
		// console.log(this.activeSlideIndex)
	}
	get activeIndex() {
		// console.log(this.activeSlideIndex)
		return this.activeSlideIndex
	}
	get activeImageBgIndex() {
		// console.log(this.imageBgIndex)
		return this.imageBgIndex
	}

	setBooks = (books: any) => (this.books = books);

	fetchBooks = async () => {
		return Promise.resolve(books);
	};

	fetchAndSetBooksOnClient = async () => {
		const newBooks = await Promise.resolve([ ...books, ...clientBooks ]);

		this.setBooks(newBooks);
	};

	get filteredBooks() {
		return this.books.filter((book) =>
			book.title.toLowerCase().includes(this.searchParam.toLowerCase())
		);
	}

	get totalBooks() {
		return this.books.length;
	}

	hydrate = (data: any) => {
		if (!data) return;
		this.setBooks(data.books);
	};

}

export default BooksStore;
