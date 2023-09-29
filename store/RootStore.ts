// import { CounterHydration, CounterStore } from "./configStore";
import { configStore, configStoreProps } from "./configStore";
import BooksStore, { BooksStoreProps } from "./Books";

export type RootStoreHydration = {
	stopwatchStore?: configStoreProps;
};
export default class RootStore {
	configStore: configStoreProps;
	booksStore: BooksStoreProps;

	constructor() {
		this.configStore = configStore();
		this.booksStore = new BooksStore();
	}

	hydrate(data: RootStoreHydration) {
		if (data.stopwatchStore) {
			// @ts-ignore
			this.counterStore.hydrate(data.stopwatchStore);
		}
	}
}
// const rootStore = new RootStore()
// export default rootStore
