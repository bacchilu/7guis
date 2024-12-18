import React from 'react';

import {Card, Form} from '../libs/bootstrap';

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

const useTimingMessage = function () {
    const [message, setMessage] = React.useState<MessageType | null>(null);
    useTimeout(
        () => {
            setMessage(null);
        },
        5000,
        [message]
    );
    return [message, setMessage] as [MessageType | null, (m: MessageType | null) => void];
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
    const [message, setMessage] = useTimingMessage();

    const [startDate, endDate] = [parseDate(startStrDate), parseDate(endStrDate)];

    const onChange = function (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        if (e.target.name === 'type') setType(SingleOrReturn[e.target.value]);
        if (e.target.name === 'start_date') setStartStrDate(e.target.value);
        if (e.target.name === 'end_date') setEndStrDate(e.target.value);
    };

    const onSubmit = function () {
        setMessage({type, startDate: startDate!, endDate: endDate!});
    };

    const isSubmitEnabled = function () {
        if (type === SingleOrReturn.SINGLE) return startDate !== null;
        if (type === SingleOrReturn.RETURN) return startDate !== null && endDate !== null && startDate < endDate;
        console.assert(false);
    };

    return (
        <Card title="Flight Booker" url="https://eugenkiss.github.io/7guis/tasks/#flight">
            <Form onSubmit={onSubmit}>
                <div className="row row-cols-lg-auto">
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
                </div>
            </Form>
            {message !== null && <Message message={message} />}
        </Card>
    );
};
