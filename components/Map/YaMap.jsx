import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
const YaMap = () => {

	const defaultState = {
		center: [55.102050, 60.126901],
		zoom: 17,
		apikey: 'a8e10f63-7a3b-41bf-986d-b1fb5165c3ae'
	};

	return (
		<YMaps query={{
			ns: "use-load-option",
			load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
		}}>
			<Map defaultState={defaultState} width={"100%"} height={560} >
				<Placemark    defaultGeometry={[55.102050, 60.126901]}  defaultOptions={{

				}} properties={{
					balloonContentBody:
						"This is balloon loaded by the Yandex.Maps API module system",
					// Зададим содержимое всплывающей подсказки.
					balloonContent: 'sadasd',
					// Зададим содержимое нижней части балуна.
					balloonContentFooter: 'Информация предоставлена:<br/>OOO "Рога и копыта"',
					iconContent: "info@standart-group.pro",


					// Зададим содержимое всплывающей подсказки.
					hintContent: 'Рога и копыта'
				}} >{'dsadasd'}</Placemark>

			</Map>
		</YMaps>
	);
};

export default YaMap;
