import React from 'react';

export const Counter = function () {
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
                    .
                </p>
                <p className="card-text">Nothing particular here: this is a classic React test.</p>
            </div>
        </div>
    );
};
