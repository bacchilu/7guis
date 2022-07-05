export const Crud = function () {
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
                                    <input className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="list-group">
                                <button type="button" className="list-group-item list-group-item-action active">
                                    Emil, Hans
                                </button>
                                <button type="button" className="list-group-item list-group-item-action">
                                    Mustermann, Max
                                </button>
                                <button type="button" className="list-group-item list-group-item-action">
                                    Tisch, Roman
                                </button>
                            </div>
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
