import React from 'react';

const Progress = function ({current, duration}) {
    const width = (100 * current) / duration;

    return (
        <div className="progress">
            <div className="progress-bar" style={{width: `${width}%`}}>
                {current / 10}s
            </div>
        </div>
    );
};

export const Timer = function () {
    const [current, setCurrent] = React.useState(0);
    const [duration, setDuration] = React.useState(150);
    const intervalRef = React.useRef(null);
    React.useEffect(function () {
        intervalRef.current = setInterval(function () {
            setCurrent(function (c) {
                return c + 1;
            });
        }, 100);
    }, []);
    React.useEffect(
        function () {
            if (current > duration) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        },
        [current]
    );

    const changeDuration = function (e) {
        setDuration(parseInt(e.target.value));
    };

    const resetTimer = function () {
        setCurrent(0);
        if (intervalRef.current === null)
            intervalRef.current = setInterval(function () {
                setCurrent(function (c) {
                    return c + 1;
                });
            }, 100);
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
                            min="0"
                            max="300"
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
