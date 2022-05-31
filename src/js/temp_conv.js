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
                <p className="card-text">
                    My first idea was to use the inner state of this component as a Single Source of Truth, storing only
                    one of the two temperatures and deriving the other in real time. Actually this kind of solution
                    cannot work really well: the state of the component as a whole is a bit more complex than this; for
                    example when you blank one of the two input the other is not automatically updated.
                </p>
                <p className="card-text">
                    Another problem is the management of floating point numbers. As we know not all "rational numbers"
                    are always representable in an exact way as JavaScript Number types (floating point numbers). So my
                    solution is to store the state as strings and using the{' '}
                    <a href="http://mikemcl.github.io/big.js/" target="_blank">
                        big.js
                    </a>{' '}
                    library to manage the computation.
                </p>
            </div>
        </div>
    );
};
