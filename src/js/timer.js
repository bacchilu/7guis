import React from 'react';

const Progress = function ({current, max}) {
    const width = (100 * current) / max;
    console.log(width);

    return (
        <div class="progress">
            <div className="progress-bar" style={{width: `${width}%`}}>
                {current / 10}s
            </div>
        </div>
    );
};

export const Timer = function () {
    const [current, setCurrent] = React.useState(0);
    const [max, setMax] = React.useState(150);
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
            if (current > max) clearInterval(intervalRef.current);
        },
        [current]
    );
    console.log(current / 10);

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
                        <Progress current={current} max={max} />
                    </div>
                </div>
            </div>
        </div>
    );
};
