import Decimal from 'decimal.js';
import React from 'react';

import {Card, Form} from './libs/bootstrap';

const toFahrenheit = function (n: Decimal) {
    return n.times(new Decimal('9').div(new Decimal('5'))).plus('32');
};

const toCelsius = function (n: Decimal) {
    return n.minus('32').times(new Decimal('5').div(new Decimal('9')));
};

export const TempConv = function () {
    const [celsius, setCelsius] = React.useState('');
    const [fahrenheit, setFahrenheit] = React.useState('');

    const onChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        const name = e.target.name as 'celsius' | 'fahrenheit';
        const value = e.target.value;
        const [setSource, setTarget, convert] =
            name === 'celsius' ? [setCelsius, setFahrenheit, toFahrenheit] : [setFahrenheit, setCelsius, toCelsius];
        setSource(value);
        try {
            setTarget(convert(new Decimal(value)).toDecimalPlaces(2).toString());
        } catch {}
    };

    return (
        <Card title="Temperature Converter" url="https://eugenkiss.github.io/7guis/tasks/#temp">
            <Form>
                <div className="row row-cols-lg-auto">
                    <div className="col-auto">
                        <div className="form-floating">
                            <input
                                className="form-control"
                                type="number"
                                step="0.01"
                                value={celsius}
                                onChange={onChange}
                                placeholder="Celsius"
                                name="celsius"
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
                                onChange={onChange}
                                placeholder="Fahrenheit"
                                name="fahrenheit"
                            />
                            <label>Fahrenheit</label>
                        </div>
                    </div>
                </div>
            </Form>
            <p className="card-text mt-4">
                My first idea was to use the inner state of this component as a Single Source of Truth, storing only one
                of the two temperatures and deriving the other in real time. Actually this kind of solution cannot work
                really well: the state of the component as a whole is a bit more complex than this; for example when you
                blank one of the two input the other is not automatically updated.
            </p>
            <p className="card-text mt-4">
                Another problem is the management of floating point numbers. As we know not all "rational numbers" are
                always representable in an exact way as JavaScript Number types (floating point numbers). So my solution
                is to store the state as strings and using the{' '}
                <a href="https://mikemcl.github.io/decimal.js/" target="_blank">
                    decimal.js
                </a>{' '}
                library to manage the computation.
            </p>
        </Card>
    );
};
