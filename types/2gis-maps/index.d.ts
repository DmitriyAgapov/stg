declare module "2gis-maps" {
    type GeoJSON = any;
    type LatLng = any;
    type map = any;
    type Marker = any;

    const DG: {
        geoJson(object: any, options: any): GeoJSON;
        latLng(latitude: number, longitude: number): LatLng;
        map(name: string, options?: any): map;
        marker(latLng: LatLng): Marker;
    };

    export default DG;
}
