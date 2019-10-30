"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError(httpStatus, title, detail) {
        var _this = _super.call(this, httpStatus + " " + title) || this;
        _this.isHttpError = true;
        _this.toJsonapi = function () {
            var obj = {
                status: _this.status.toString(),
            };
            if (_this.title) {
                obj.title = _this.title;
            }
            if (_this.detail) {
                obj.detail = _this.detail;
            }
            return obj;
        };
        _this.status = httpStatus;
        _this.title = title;
        _this.detail = detail;
        return _this;
    }
    return HttpError;
}(Error));
exports.HttpError = HttpError;
var NotFound = /** @class */ (function (_super) {
    __extends(NotFound, _super);
    function NotFound(title, detail) {
        return _super.call(this, http_status_codes_1.default.NOT_FOUND, title || http_status_codes_1.default.getStatusText(http_status_codes_1.default.NOT_FOUND), detail) || this;
    }
    return NotFound;
}(HttpError));
exports.NotFound = NotFound;
var BadRequest = /** @class */ (function (_super) {
    __extends(BadRequest, _super);
    function BadRequest(title, detail) {
        return _super.call(this, http_status_codes_1.default.BAD_REQUEST, title || http_status_codes_1.default.getStatusText(http_status_codes_1.default.BAD_REQUEST), detail) || this;
    }
    return BadRequest;
}(HttpError));
exports.BadRequest = BadRequest;
var Conflict = /** @class */ (function (_super) {
    __extends(Conflict, _super);
    function Conflict(title, detail) {
        return _super.call(this, http_status_codes_1.default.CONFLICT, title || http_status_codes_1.default.getStatusText(http_status_codes_1.default.CONFLICT), detail) || this;
    }
    return Conflict;
}(HttpError));
exports.Conflict = Conflict;
var Forbidden = /** @class */ (function (_super) {
    __extends(Forbidden, _super);
    function Forbidden(title, detail) {
        return _super.call(this, http_status_codes_1.default.FORBIDDEN, title || http_status_codes_1.default.getStatusText(http_status_codes_1.default.FORBIDDEN), detail) || this;
    }
    return Forbidden;
}(HttpError));
exports.Forbidden = Forbidden;
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(title, detail) {
        return _super.call(this, http_status_codes_1.default.INTERNAL_SERVER_ERROR, title || http_status_codes_1.default.getStatusText(http_status_codes_1.default.INTERNAL_SERVER_ERROR), detail) || this;
    }
    return InternalServerError;
}(HttpError));
exports.InternalServerError = InternalServerError;
var Unauthorized = /** @class */ (function (_super) {
    __extends(Unauthorized, _super);
    function Unauthorized(title, detail) {
        return _super.call(this, http_status_codes_1.default.UNAUTHORIZED, title || http_status_codes_1.default.getStatusText(http_status_codes_1.default.UNAUTHORIZED), detail) || this;
    }
    return Unauthorized;
}(HttpError));
exports.Unauthorized = Unauthorized;
//# sourceMappingURL=errors.js.map