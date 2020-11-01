export interface Coords {
    latitude: number;
    longitude: number;
}
export interface Location {
    city?: string;
    coords?: Coords;
}
export interface WeatherState {
    id: number;
    main: string;
    description: string;
    icon: string;
}
export interface WeatherAttributes {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}
export interface Wind {
    speed: number;
    deg: number;
}

interface Rain {
    '1h': number;
}

export interface Weather {
    name: string;
    cod: number;
    weather: Array<WeatherState>;
    main: WeatherAttributes;
    wind: Wind;
    rain?: Rain;
}
export interface Dictionary<K, V> {
    key: K;
    value: V;
}
