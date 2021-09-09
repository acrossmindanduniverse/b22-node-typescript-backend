"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var response = function (res, _a) {
    var status = _a.status, data = _a.data, statusCode = _a.statusCode;
    var result = {
        data: data,
        statusCode: statusCode,
        status: status
    };
    result.data = data;
    result.statusCode = statusCode;
    result.status = status;
    return res.status(result.statusCode).json({
        result: result.status,
        data: result.data
    });
};
exports.default = response;
