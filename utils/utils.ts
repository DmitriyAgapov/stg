/**
 * // useWindowDimension.ts
 * * This hook returns the viewport/window height and width
 */
'use client'
import { JSX, MutableRefObject, useEffect, useRef, useState } from 'react';
import { useRouter } from "next/router";
export const newShade = (hexColor, magnitude) => {
	hexColor = hexColor.replace(`#`, ``);
	if (hexColor.length === 6) {
		const decimalColor = parseInt(hexColor, 16);
		let r = (decimalColor >> 16) + magnitude;
		r > 255 && (r = 255);
		r < 0 && (r = 0);
		let g = (decimalColor & 0x0000ff) + magnitude;
		g > 255 && (g = 255);
		g < 0 && (g = 0);
		let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
		b > 255 && (b = 255);
		b < 0 && (b = 0);
		return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
	} else {
		return hexColor;
	}
};
export const fullPath = ({ product_category, series, item }: { product_category: { title: string, slug: string}, series: {title: string, slug: string}[], item: {title: string, slug: string} }):[] => {

	const newPath = [];
	if(product_category && product_category.title) {
		newPath.push({
			label: product_category.title.toLowerCase().charAt(0).toUpperCase() + product_category.title.toLowerCase().slice(1),
			path: { pathname: '/catalog/[category]', query: { category: product_category.slug } }}

		)
	}
	if(series && series.length > 0 && series[0].slug) {
		newPath.push({
			label: series[0].title,
			path: { pathname: '/catalog/series/[slug]', query: { slug: series[0].slug } }}
		)
	}
	newPath.push({ label: item.title.toLowerCase().charAt(0).toUpperCase() + item.title.toLowerCase().slice(1), path: item.slug })
	return newPath
}
type WindowDimentions = {
	width: number | undefined;
	height: number | undefined;
	scrollbar: number;
	state: Promise<boolean> | boolean | undefined;
};

export const isServer = typeof window === 'undefined';

export const backUrl =  (isServer ? process.env.BACK_URL : process.env.NEXT_PUBLIC_BACK_URL);
export const resolutionQuality =  (width:number) => {

	const videoSize = [ 240, 360, 480, 720, 1080, 1440, 2160 ];

	if (width) {
		const resQuality = (it: number) => width / 4 * 3 < it

		const qlty = () => {
			if (videoSize.findIndex(resQuality) > 0) return videoSize[videoSize.findIndex(resQuality)];
			if (videoSize.findIndex(resQuality) - 1 < 0) return videoSize[videoSize.length - 1];
		}
		let quality = qlty();
		return [
			{ src: `https://nestrecovery.b-cdn.net/nest_promo_${quality}p.webm`, type: 'video/webm' },
			{ src: `https://nestrecovery.b-cdn.net/nest_promo_${quality}p.mp4`, type: 'video/mp4' }
		]
	}
}
const useWindowDimensions = (): WindowDimentions => {
	const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
		width: undefined,
		height: undefined,
		state: undefined,
		scrollbar: 27
	});
	useEffect(() => {
		function handleResize(): void {
			setWindowDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
				state: window.innerWidth < window.innerHeight,
				scrollbar: window.innerWidth - document.documentElement.clientWidth
			});
		}
		handleResize();

		window.addEventListener('resize', handleResize);
		return (): void => window.removeEventListener('resize', handleResize);
	}, []); // Empty array ensures that effect is only run on mount

	return windowDimensions;
};

export default useWindowDimensions;

export function useIntersectionObserver(ref: MutableRefObject<Element | null>, options: IntersectionObserverInit = {}, forward: boolean = true) {
	const [element, setElement] = useState<Element | null>(null);
	const [isIntersecting, setIsIntersecting] = useState(false);
	const observer = useRef<null | IntersectionObserver>(null);

	const cleanOb = () => {
		if (observer.current) {
			observer.current.disconnect()
		}
	}

	useEffect(() => {
		setElement(ref.current);
	}, [ref]);

	useEffect(() => {
		if (!element) return;
		cleanOb()
		const ob = observer.current = new IntersectionObserver(([entry]) => {
			const isElementIntersecting = entry.isIntersecting;
			if (!forward) {
				setIsIntersecting(isElementIntersecting)
			} else if (forward && !isIntersecting && isElementIntersecting) {
				setIsIntersecting(isElementIntersecting);
				cleanOb()
			}
		}, { ...options })
		ob.observe(element);
		return () => {
			cleanOb()
		}
	}, [element, options ])


	return isIntersecting;
}

export function num_plural(value:number){
	const words = ['лист','листа', 'листов']
	value = Math.abs(value) % 100;
	const num = value % 10;

	if(num > 1 && num < 5) return `${value} ${words[1]}`;
	if(num == 1) return `${value} ${words[0]}`;
	if(value > 4) return `${value} ${words[2]}`;
	return `${value} ${words[2]}`;
}

export function translateIt(key:string, dict: any) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();
	for (const k  in dict) {
		if(k === key)  {
			return router.locale === 'ru' ? dict[k][0] : dict[k][1]
		}
	}
}
