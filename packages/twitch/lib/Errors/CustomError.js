"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/** @private */
var CustomError = /** @class */ (function (_super) {
    tslib_1.__extends(CustomError, _super);
    function CustomError() {
        var _newTarget = this.constructor;
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var _this = _super.apply(this, tslib_1.__spread(params)) || this;
        // restore prototype chain
        var actualProto = _newTarget.prototype;
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(_this, actualProto);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            _this.__proto__ = actualProto;
        }
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, _newTarget.constructor);
        }
        return _this;
    }
    Object.defineProperty(CustomError.prototype, "name", {
        get: function () {
            return this.constructor.name;
        },
        enumerable: true,
        configurable: true
    });
    return CustomError;
}(Error));
exports.default = CustomError;
//# sourceMappingURL=CustomError.js.map