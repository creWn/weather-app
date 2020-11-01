import React, { useRef, useEffect, useCallback } from "react";
import { Location } from './Models';

interface CityChangerProps {
    show: boolean | string;
    onChange: (location: Location) => void;
}

function CityChanger(props: CityChangerProps) {

    const changerEl = useRef<HTMLDivElement>(null);
    const inputEl = useRef<HTMLInputElement>(null);
    const warningEl = useRef<HTMLDivElement>(null);

    const enterPress = useCallback((input: React.KeyboardEvent<HTMLInputElement>) => {
        if (input.key === 'Enter' && inputEl.current?.value) {
            props.onChange({city: inputEl.current.value});
        }
    }, [props]);

    const okClick = useCallback((button: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (inputEl.current?.value) {
            props.onChange({city: inputEl.current.value});
        }
    }, [props]);

    useEffect(
        () => {
            if (props.show) {                
                if (changerEl.current && changerEl.current.classList.contains('hide')) 
                    changerEl.current.classList.remove('hide');
                changerEl.current?.focus();

                if (typeof props.show === 'string') {
                    if (warningEl.current?.classList.contains('hide'))
                        warningEl.current.classList.remove('hide');
                } else {
                    if (warningEl.current?.classList.contains('hide'))
                        warningEl.current.classList.add('hide'); 
                }
            } else {
                if (changerEl.current && !changerEl.current.classList.contains('hide')) 
                changerEl.current.classList.add('hide');
            }            
        }, [props]
    );

    return (
        <div ref={changerEl} className="city-changer hide">
            <input ref={inputEl} onKeyUp={enterPress} />
            <button onClick={okClick}>OK</button>
            <div ref={warningEl} className="warning hide">{props.show}</div>
        </div>
    );
}

export default CityChanger;