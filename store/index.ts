import { enableStaticRendering } from "mobx-react-lite";
import RootStore from "./RootStore";
import rootStore from "./RootStore";

enableStaticRendering(typeof window === "undefined");

let clientStore:any;

const initStore = (initData:any) => {
	const store = clientStore ?? rootStore;
	if (initData?.booksStore) store.hydrate(initData.booksStore);

	if (typeof window === "undefined") return store;
	if (!clientStore) clientStore = store;
	return store;
};

export function useStore(initData?:any | undefined) {
	return initStore(initData);
}
