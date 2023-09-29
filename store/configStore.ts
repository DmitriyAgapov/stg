import { makeAutoObservable } from "mobx";
export interface configStoreProps  {
	data: number
	increment: () => void| any
	decrement: () => void | any
}
export const configStore = () => {
	let data = 0;
	const increment = () => {
		data++;
		console.log('Run', data);
	}
	const decrement = () => {
		data--;
		console.log('Run', data);
	}
	const getData = () => data;

	return makeAutoObservable({
		increment : increment,
		decrement : decrement,
		getData : getData,
		data: data
	})
}
