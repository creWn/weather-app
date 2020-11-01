import React from "react";
import loader from './assets/loader.svg';

interface CityNameProps {
    name: string | undefined;
}

function CityName(props: CityNameProps) {

    return (
        <div className="city-name">{props.name ? props.name : <img src={loader} alt="Загрузка..." />}</div>
    );
}

export default CityName;