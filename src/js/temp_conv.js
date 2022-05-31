import React from 'react';
import Big from 'big.js';

export const TempConv = function () {
    const [celsius, setCelsius] = React.useState('');
    const [fahrenheit, setFahrenheit] = React.useState('');

    const onCelcius = function (e) {
        const v = e.target.value;
        setCelsius(v);
        try {
            const n = Big(v);
            const res = n.times(Big('9').div(Big('5'))).plus('32');
            setFahrenheit(res.round(2).toString());
        } catch {}
    };

    const onFahrenheit = function (e) {
        const v = e.target.value;
        setFahrenheit(v);
        try {
            const n = Big(v);
            const res = n.minus('32').times(Big('5').div(Big('9')));
            setCelsius(res.round(2).toString());
        } catch {}
    };

    return (
        <div className="card text-bg-light m-4">
            <div className="card-body">
                <h5 className="card-title">Temperature Converter</h5>
                <form className="row row-cols-lg-auto m-4">
                    <div className="col-auto">
                        <div className="form-floating">
                            <input
                                className="form-control"
                                type="number"
                                step="0.01"
                                value={celsius}
                                onChange={onCelcius}
                                placeholder="Celcius"
                            />
                            <label>Celcius</label>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="form-floating">
                            <input
                                className="form-control"
                                type="number"
                                step="0.01"
                                value={fahrenheit}
                                onChange={onFahrenheit}
                                placeholder="Fahrenheit"
                            />
                            <label>Fahrenheit</label>
                        </div>
                    </div>
                </form>
                <p className="card-text">
                    This is the{' '}
                    <a href="https://eugenkiss.github.io/7guis/tasks/#temp" target="_blank">
                        Temperature Converter
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};
