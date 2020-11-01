import React from "react";
import { WeatherState } from "./Models";

interface WeatherViewProps {
    weather: WeatherState | undefined;
}

function WeatherView(props: WeatherViewProps) {
    
    return (
        <div className="weather" >
            <div className="icon" />
            <div className="temp">{props.weather?.main}</div>
            <div>{props.weather?.description}</div>
        </div>
    );
}

export default WeatherView;