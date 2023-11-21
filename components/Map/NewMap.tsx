import React from "react";

const [ymaps3React] = await Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready]);
const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
const {YMap, YMapDefaultSchemeLayer, YMapControls} = reactify.module(ymaps3);
import { type YMapLocationRequest } from 'ymaps3';
const {YMapZoomControl} = reactify.module(await ymaps3.import('@yandex/ymaps3-controls@0.0.1'));

export default function NewMap() {
    const [show, toggleShow] = React.useState(true);


    return (
        <>
            <div className="toolbar">
                <button type="button" onClick={() => toggleShow(!show)}>
                    {show ? 'Delete map' : 'Create map'}
                </button>
            </div>
            {show && (
                // @ts-ignore
                <YMap location={[55.102050, 60.126901]} ref={(x) => (map = x)}>
                    <YMapDefaultSchemeLayer />
                    <YMapControls position="right">
                        <YMapZoomControl />
                    </YMapControls>
                </YMap>
            )}
        </>
    );
}
