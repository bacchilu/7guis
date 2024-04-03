import React from 'react';

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

const MAX_DURATION = 300;

export const Timer = function () {
    const [current, setCurrent] = React.useState(0);
    const [duration, setDuration] = React.useState(MAX_DURATION / 2);
    const intervalRef = React.useRef<number | undefined>(undefined);
    const resetInterval = function () {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(function () {
            setCurrent(function (c) {
                return c + 1;
            });
        }, 100);
    };
    React.useEffect(resetInterval, []);
    React.useEffect(() => {
        if (current >= MAX_DURATION) clearInterval(intervalRef.current);
    }, [current]);

    const changeDuration = function (e: React.ChangeEvent<HTMLInputElement>) {
        setDuration(+e.target.value);
    };

    const resetTimer = function () {
        setCurrent(0);
        resetInterval();
    };

    return (
        <div className="card text-bg-light m-4">
            <div className="card-body">
                <h5 className="card-title">
                    <a href="https://eugenkiss.github.io/7guis/tasks/#timer" target="_blank">
                        Timer
                    </a>
                </h5>
                <div className="row align-items-start">
                    <div className="col-2">Elapsed Time:</div>
                    <div className="col-10">
                        <Progress current={current} duration={duration} />
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
                <button className="btn btn-primary" onClick={resetTimer}>
                    Reset Timer
                </button>
            </div>
        </div>
    );
};
