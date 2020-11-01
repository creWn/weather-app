import React, { useCallback } from "react";
import { Weather } from "./Models";
import cloud from './assets/cloud.svg';
import cloudy from './assets/partly cloudy.svg';
import rain from './assets/rain.svg';
import storm from './assets/strom.svg';
import sun from './assets/sun.svg';

interface WeatherViewProps {
    weather: Weather | undefined;
}

function WeatherView(props: WeatherViewProps) {

    const selectIcon = useCallback(() => {
        if (props.weather) {
            const weather = props.weather.weather[0];
            if(weather.id == 800) {
                return sun;
            } else if (weather.id == 801) {
                return cloudy;
            } else if (weather.id > 801) {
                return cloud;
            } else if (weather.id >= 600) {
                return cloud;
            } else if (weather.id >= 300) {
                return rain;
            } else {
                return storm;
            }
        }
        return '';      
    }, [props]);

    return (
        <div className="weather" >
        {
            props?.weather && 
            <React.Fragment>
                <div className="flex">
                    <div><img src={selectIcon()} /></div>
                    <div className="temp">{props.weather?.main?.temp.toFixed(0) + '°'}</div>
                </div>
                <div className="description">{props.weather?.weather[0].description.charAt(0).toUpperCase() + props?.weather?.weather[0]?.description.slice(1)}</div>
            </React.Fragment>
        }
        
        </div>
    );
}

export default WeatherView;