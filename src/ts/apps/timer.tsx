import React from 'react';

import {Card} from '../libs/bootstrap';

const MAX_DURATION = 300;

const useInterval = function (MAX_DURATION: number) {
    const [value, setValue] = React.useState(0);
    const intervalRef = React.useRef<number | undefined>(undefined);

    const restart = function () {
        setValue(0);
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setValue((c) => c + 1);
        }, 100);
    };

    React.useEffect(restart, []);
    React.useEffect(() => {
        if (value >= MAX_DURATION) clearInterval(intervalRef.current);
    }, [value]);

    return {value, restart};
};

const Progress: React.FC<{current: number; duration: number}> = function ({current, duration}) {
    const width = current >= duration ? 100 : (100 * current) / duration;

    return (
        <div className="progress">
            <div className="progress-bar" style={{width: `${width}%`}}>
                {((current >= duration ? duration : current) / 10).toFixed(1).toLocaleString()}s
            </div>
        </div>
    );
};

export const Timer = function () {
    const [duration, setDuration] = React.useState(MAX_DURATION / 2);
    const {value, restart} = useInterval(MAX_DURATION);

    const changeDuration = function (e: React.ChangeEvent<HTMLInputElement>) {
        setDuration(+e.target.value);
    };

    return (
        <Card title="Timer" url="https://eugenkiss.github.io/7guis/tasks/#timer">
            <div className="row align-items-start">
                <div className="col-2">Elapsed Time:</div>
                <div className="col-10">
                    <Progress current={value} duration={duration} />
                </div>
            </div>
            <div className="row align-items-start">
                <div className="col-2">Duration:</div>
                <div className="col-10">
                    <input
                        type="range"
                        className="form-range"
                        min={0}
                        max={MAX_DURATION}
                        value={duration}
                        onChange={changeDuration}
                    />
                </div>
            </div>
            <button className="btn btn-primary" onClick={restart}>
                Reset Timer
            </button>
        </Card>
    );
};
