import React from 'react';

import {Card} from './libs/bootstrap';

export const Counter = function () {
    const [value, setValue] = React.useState(0);

    const onSubmit = function (e: React.FormEvent) {
        e.preventDefault();
        setValue(value + 1);
    };

    return (
        <Card title="Counter" url="https://eugenkiss.github.io/7guis/tasks/#counter">
            <form className="row row-cols-lg-auto" onSubmit={onSubmit}>
                <div>
                    <input className="form-control" value={value} disabled />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">
                        Count
                    </button>
                </div>
            </form>
            <p className="card-text mt-4">Nothing particular here: this is a classic React test.</p>
        </Card>
    );
};
