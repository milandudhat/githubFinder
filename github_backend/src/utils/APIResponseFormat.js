class APIResponseFormat {
    constructor(status, success, message, data, error) {
        this.status = status;
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}

const _ResSuccess = (res, message, data) => {
    res.status(200).json(new APIResponseFormat(200, true, message, data));
}

const _ResCreated = (res, message, data) => {
    res.status(201).json(new APIResponseFormat(201, true, message, data));
}

const _ResError = (res, message) => {
    res.status(400).json(new APIResponseFormat(400, false, message));
}

const _ResErrorLimitExceeded = (res, message) => {
    res.status(403).json(new APIResponseFormat(403, false, message));
}

const _ResInvalidCredentials = (res) => {
    res.status(401).json(new APIResponseFormat(401, false, "Invalid credentials"));
}

const _ResRouteNotFound = (res) => {
    res.status(404).json(new APIResponseFormat(404, false, "Route not found"));
}

const _ResServerError = (res, err) => {
    res.status(500).json(new APIResponseFormat(500, false, "Internal server error", null, err));
}

module.exports = {
    _ResSuccess,
    _ResCreated,
    _ResError,
    _ResInvalidCredentials,
    _ResRouteNotFound,
    _ResServerError,
    _ResErrorLimitExceeded
}