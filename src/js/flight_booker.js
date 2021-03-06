import React from 'react';

const toLocaleString = function (d) {
    return new Date(d).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const useTimeout = function (functionRef, delay, dependencies) {
    const t = React.useRef(null);
    React.useEffect(function () {
        clearTimeout(t.current);
        t.current = setTimeout(functionRef, delay);
    }, dependencies);
};

const Message = function ({message, closeMessage}) {
    useTimeout(
        function () {
            closeMessage();
        },
        5000,
        [message]
    );

    const content =
        message.type === 'SINGLE' ? (
            <span>
                You have booked a one-way flight on <em>{toLocaleString(message.startDate)}</em>.
            </span>
        ) : (
            <span>
                You have booked a return-way flight from <em>{toLocaleString(message.startDate)}</em> to{' '}
                <em>{toLocaleString(message.endDate)}</em>.
            </span>
        );

    return (
        <div className="alert alert-success" role="alert">
            {content}
        </div>
    );
};

export const FlightBooker = function () {
    const today = `${new Date().toISOString()}`.split('T')[0];

    const [type, setType] = React.useState('SINGLE');
    const [startDate, setStartDate] = React.useState(today);
    const [endDate, setEndDate] = React.useState(today);
    const [message, setMessage] = React.useState(null);

    const onChange = function (e) {
        if (e.target.name === 'type') setType(e.target.value);
        if (e.target.name === 'start_date') setStartDate(e.target.value);
        if (e.target.name === 'end_date') setEndDate(e.target.value);
    };

    const closeMessage = function () {
        setMessage(null);
    };

    const onSubmit = function (e) {
        e.preventDefault();
        setMessage({type, startDate, endDate});
    };

    const isDateValid = function (v) {
        const d = new Date(v);
        return !isNaN(d);
    };

    const strictlyBefore = function () {
        console.assert(isDateValid(startDate));
        console.assert(isDateValid(endDate));
        return new Date(startDate) < new Date(endDate);
    };

    const isSubmitEnabled = function () {
        if (type === 'SINGLE') return isDateValid(startDate);
        if (type === 'RETURN') return isDateValid(startDate) && isDateValid(endDate) && strictlyBefore();
        console.assert(false);
    };

    return (
        <div className="card text-bg-light m-4">
            <div className="card-body">
                <h5 className="card-title">
                    <a href="https://eugenkiss.github.io/7guis/tasks/#flight" target="_blank">
                        Flight Booker
                    </a>
                </h5>
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
                        <button
                            type="submit"
                            className="btn btn-primary mb-3"
                            style={{marginTop: '8px'}}
                            disabled={!isSubmitEnabled()}
                        >
                            Book
                        </button>
                    </div>
                </form>
                {message !== null && <Message message={message} closeMessage={closeMessage} />}
            </div>
        </div>
    );
};
