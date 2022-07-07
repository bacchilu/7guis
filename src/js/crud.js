import React from 'react';

export const Crud = function () {
    const [filter, setFilter] = React.useState('');
    const [list, setList] = React.useState([
        {id: 1, name: 'Hans', surname: 'Emil', selected: true},
        {id: 2, name: 'Max', surname: 'Mustermann', selected: false},
        {id: 3, name: 'Roman', surname: 'Tisch', selected: false},
    ]);

    const onFilter = function (e) {
        setFilter(e.target.value);
    };

    const listItems = list.map(function (item) {
        const onClick = function () {
            setList(
                list.map(function (e) {
                    return {...e, selected: item.id === e.id};
                })
            );
        };

        return (
            <button
                key={item.id}
                type="button"
                className={`list-group-item list-group-item-action${item.selected ? ' active' : ''}`}
                onClick={onClick}
            >
                {item.surname}, {item.name}
            </button>
        );
    });
    return (
        <div className="card text-bg-light m-4">
            <div className="card-body">
                <h5 className="card-title">
                    <a href="https://eugenkiss.github.io/7guis/tasks/#crud" target="_blank">
                        CRUD
                    </a>
                </h5>
                <form>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label">Filter prefix:</label>
                                <div className="col-sm-9">
                                    <input className="form-control" value={filter} onChange={onFilter} />
                                </div>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="list-group">{listItems}</div>
                        </div>
                        <div className="col">
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label">Name:</label>
                                <div className="col-sm-9">
                                    <input className="form-control" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label">Surname:</label>
                                <div className="col-sm-9">
                                    <input className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <button type="button" className="btn btn-primary me-3">
                                Create
                            </button>
                            <button type="button" className="btn btn-warning me-3">
                                Update
                            </button>
                            <button type="button" className="btn btn-danger me-3">
                                Delete
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
