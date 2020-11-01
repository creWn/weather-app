import React from "react";
import { Weather } from "./Models";
import {useCallback} from 'react';

interface WeatherAttributesProps {
    weather: Weather | undefined;
    units: string;
}

function WeatherAttributes(props: WeatherAttributesProps) {

    const speedUnits = useCallback(() => {
        switch (props.units) {
            case 'imperial':                
                return 'mph';

            case 'metric':
            default:
                return 'м/с';
        }
    }, [props.units]);

    const windDegreeToDirection = useCallback((degree) => {
        if (degree >= 45 && degree < 135) {
            return 'восточный';
        } else if (degree >= 135 && degree < 225) {
            return 'южный';
        } else if (degree >= 225 && degree < 315) {
            return 'западный';
        } else {
            return 'северный';
        }
    }, []);

    return (
        <div className="attributes">
            <div className="wind">
                <div className="caption">Ветер</div>
                <div className="value">{props.weather ? props.weather.wind.speed + speedUnits() + ', ' + windDegreeToDirection(props.weather.wind.deg) : '-'}</div>                
            </div>
            <div className="pressure">
                <div className="caption">Давление</div>
                <div className="value">{props.weather ? props.weather.main.pressure + 'мм рт. ст.' : '-'}</div>
            </div>
            <div className="humidity">
                <div className="caption">Влажность</div>
                <div className="value">{props.weather ? props.weather.main.humidity + '%' : '-'}</div>
            </div>
            <div className="rain-chance">
                <div className="caption">Осадки</div>
                <div className="value">{props.weather && props.weather.rain ? props.weather.rain["1h"] + 'мм' : '-'}</div>
            </div>
        </div>
    );
}

export default WeatherAttributes;