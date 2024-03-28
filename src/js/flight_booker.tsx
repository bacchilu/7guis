import React from 'react';

enum SingleOrReturn {
    SINGLE = 'SINGLE',
    RETURN = 'RETURN',
}

interface MessageType {
    type: SingleOrReturn;
    startDate: Date;
    endDate: Date;
}

const toLocaleString = function (d: Date) {
    return d.toLocaleString(navigator.language, {year: 'numeric', month: 'long', day: 'numeric'});
};

const parseDate = function (strDate: string) {
    const d = new Date(strDate);
    return d.toString() !== 'Invalid Date' ? new Date(strDate) : null;
};

const useTimeout = function (functionRef: () => void, delay: number, dependencies: any[]) {
    const t = React.useRef<number | undefined>(undefined);
    React.useEffect(() => {
        clearTimeout(t.current);
        t.current = setTimeout(functionRef, delay);
    }, dependencies);
};

const Message: React.FC<{message: MessageType}> = function ({message}) {
    const content =
        message.type === SingleOrReturn.SINGLE ? (
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

    const [type, setType] = React.useState<SingleOrReturn>(SingleOrReturn.SINGLE);
    const [startStrDate, setStartStrDate] = React.useState(today);
    const [endStrDate, setEndStrDate] = React.useState(today);
    const [message, setMessage] = React.useState<MessageType | null>(null);
    useTimeout(
        () => {
            setMessage(null);
        },
        5000,
        [message]
    );

    const [startDate, endDate] = [parseDate(startStrDate), parseDate(endStrDate)];

    const onChange = function (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        if (e.target.name === 'type') setType(SingleOrReturn[e.target.value]);
        if (e.target.name === 'start_date') setStartStrDate(e.target.value);
        if (e.target.name === 'end_date') setEndStrDate(e.target.value);
    };

    const onSubmit = function (e: React.FormEvent) {
        e.preventDefault();
        setMessage({type, startDate: startDate!, endDate: endDate!});
    };

    const isSubmitEnabled = function () {
        if (type === SingleOrReturn.SINGLE) return startDate !== null;
        if (type === SingleOrReturn.RETURN) return startDate !== null && endDate !== null && startDate < endDate;
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
                                className={`form-control ${startDate !== null ? '' : 'is-invalid'}`}
                                type="date"
                                placeholder="Start Date"
                                name="start_date"
                                value={startStrDate}
                                onChange={onChange}
                            />
                            <label>Start Date</label>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="form-floating">
                            <input
                                className={`form-control ${
                                    type !== SingleOrReturn.SINGLE && endDate === null ? 'is-invalid' : ''
                                }`}
                                type="date"
                                placeholder="Return Date"
                                name="end_date"
                                value={endStrDate}
                                onChange={onChange}
                                disabled={type === SingleOrReturn.SINGLE}
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
                {message !== null && <Message message={message} />}
            </div>
        </div>
    );
};
