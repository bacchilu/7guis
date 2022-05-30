import React from 'react';
import {createRoot} from 'react-dom/client';
import Big from 'big.js';

const Counter = function () {
    const [value, setValue] = React.useState(0);

    const onClick = function (e) {
        e.preventDefault();
        setValue(value + 1);
    };

    return (
        <div className="card m-4">
            <div className="card-body">
                <h5 className="card-title">Counter</h5>
                <form className="row row-cols-lg-auto m-4">
                    <div>
                        <input className="form-control" value={value} disabled />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary" onClick={onClick}>
                            Count
                        </button>
                    </div>
                </form>
                <p className="card-text">
                    This is the{' '}
                    <a href="https://eugenkiss.github.io/7guis/tasks/#counter" target="_blank">
                        Counter
                    </a>
                    . Nothing particular here: this is a classic React test.
                </p>
            </div>
        </div>
    );
};

const TempConv = function () {
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
        <div className="card m-4">
            <div className="card-body">
                <h5 className="card-title">Temperature Converter</h5>
                <form className="row row-cols-lg-auto m-4">
                    <div className="col-auto">
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="number"
                                step="0.01"
                                value={celsius}
                                onChange={onCelcius}
                            />
                            <span className="input-group-text">Celsius</span>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="number"
                                step="0.01"
                                value={fahrenheit}
                                onChange={onFahrenheit}
                            />
                            <span className="input-group-text">Fahrenheit</span>
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

const App = function () {
    return (
        <>
            <Counter />
            <TempConv />
        </>
    );
};

createRoot(document.getElementById('app')).render(<App />);
