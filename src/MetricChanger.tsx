import React, { useState, useCallback, useRef } from "react";

interface MetricChangerProps {
    onChange: (units: string) => void;
}

function MetricChanger(props: MetricChangerProps) {

    const celsiusEl = useRef<HTMLDivElement>(null);
    const fahrenheitEl = useRef<HTMLDivElement>(null);

    const [metric, setMetric] = useState(true);

    const changeUnits = useCallback((el: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        if (!el.currentTarget.classList.contains('active')) {
            if (metric) {
                celsiusEl.current?.classList.remove('active');
                fahrenheitEl.current?.classList.add('active');
                setMetric(false);
                props.onChange('imperial');
            } else {
                fahrenheitEl.current?.classList.remove('active');
                celsiusEl.current?.classList.add('active');
                setMetric(true);  
                props.onChange('metric');
            }
        }
    }, [metric, props]);

    return (
        <div className="units">
            <div ref={celsiusEl} className="metric active" onClick={changeUnits}>C</div>
            <div ref={fahrenheitEl} className="imperial" onClick={changeUnits}>F</div>
        </div>
    );
}

export default MetricChanger;