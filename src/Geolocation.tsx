import React, { useCallback } from "react";
import {Location, Coords} from './Models';

interface GeolocationProps {
    onClick: (location: Location | undefined) => void;
    currentLocation: Location | undefined;
}

function Geolocation(props: GeolocationProps) {

    const locationByIP = useCallback(async () => {
        let response = await fetch('http://ip-api.com/json?lang=ru&fields=city');
        let data = await response.json();
        props.onClick(data);
    }, [props]);

    const handleClick = useCallback(async () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => { 
                    if (position) {
                        let coords: Coords = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                        props.onClick({coords: coords });
                    }                    
                },
                () => {
                    locationByIP();
                }
            );
        } else {
            locationByIP();
        }
    }, [props, locationByIP]);

    return (
        <div className="geolocation" onClick={handleClick}>Моё местоположение</div>
    );
}

export default Geolocation;