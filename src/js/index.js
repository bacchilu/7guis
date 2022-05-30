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
        <div className="card text-bg-light m-4">
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

const FlightBooker = function () {
    const today = `${new Date().toISOString()}`.split('T')[0];

    const [type, setType] = React.useState('SINGLE');
    const [startDate, setStartDate] = React.useState(today);
    const [endDate, setEndDate] = React.useState(today);

    const onChange = function (e) {
        if (e.target.name === 'type') setType(e.target.value);
        if (e.target.name === 'start_date') setStartDate(e.target.value);
        if (e.target.name === 'end_date') setEndDate(e.target.value);
    };

    const onSubmit = function (e) {
        e.preventDefault();
    };

    const isDateValid = function (v) {
        const d = new Date(v);
        return !isNaN(d);
    };

    return (
        <div className="card text-bg-light m-4">
            <div className="card-body">
                <h5 className="card-title">Flight Booker</h5>
                <form className="row row-cols-lg-auto m-4" onSubmit={onSubmit}>
                    <div className="col-auto">
                        <div className="form-floating">
                            <select className="form-select" name="type" value={type} onChange={onChange}>
                                <option value="SINGLE">one-way flight</option>
                                <option value="RETURN">return flight</option>
                            </select>
                            <label>Single or Return</label>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="form-floating">
                            <input
                                className={`form-control ${isDateValid(startDate) ? '' : 'is-invalid'}`}
                                type="date"
                                placeholder="Start Date"
                                name="start_date"
                                value={startDate}
                                onChange={onChange}
                            />
                            <label>Start Date</label>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="form-floating">
                            <input
                                className={`form-control ${
                                    type !== 'SINGLE' && !isDateValid(endDate) ? 'is-invalid' : ''
                                }`}
                                type="date"
                                placeholder="Return Date"
                                name="end_date"
                                value={endDate}
                                onChange={onChange}
                                disabled={type === 'SINGLE'}
                            />
                            <label>Return Date</label>
                        </div>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary mb-3" style={{marginTop: '8px'}}>
                            Confirm identity
                        </button>
                    </div>
                </form>
                <p className="card-text">
                    This is the{' '}
                    <a href="https://eugenkiss.github.io/7guis/tasks/#flight" target="_blank">
                        Flight Booker
                    </a>
                    . Nothing particular here: this is a classic React test.
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
            <FlightBooker />
        </>
    );
};

createRoot(document.getElementById('app')).render(<App />);
