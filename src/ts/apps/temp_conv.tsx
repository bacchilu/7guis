import Decimal from 'decimal.js';
import React from 'react';

import {Card, Form} from '../libs/bootstrap';

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
        </Card>
    );
};
