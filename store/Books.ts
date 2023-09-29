import { makeAutoObservable, toJS } from "mobx";
import { books, clientBooks } from "@/utils/getSide";

export interface imageBgProps {
	src?: string
	width?: number
	height?: number
	id?: string
}
export interface BooksStoreProps {
	searchParam: string;
	books: any[];
	activeSlideIndex: number
	numbers: number
	imageBg: imageBgProps
	setSearchParam: (param: any) => void;
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
	imageBg: imageBgProps;
	constructor() {
		this.books = [];
		this.imageBg = {};
		this.numbers = 0;
		this.activeSlideIndex = 0;
		this.searchParam = "";
		makeAutoObservable(this);
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
	setImageBg = (img: imageBgProps) => {
		this.imageBg = img;
	}
	setActiveSlideIndex = (activeIndex:number) => {
		this.activeSlideIndex = activeIndex;
		console.log(this.activeSlideIndex)
	}
	get activeIndex() {
		console.log(this.activeSlideIndex)
		return this.activeSlideIndex
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
