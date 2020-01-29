"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CustomError_1 = require("./CustomError");
/**
 * These are the kind of errors that should never happen.
 *
 * If you see one thrown, please file a bug in the GitHub issue tracker.
 */
var HellFreezesOverError = /** @class */ (function (_super) {
    tslib_1.__extends(HellFreezesOverError, _super);
    function HellFreezesOverError(message) {
        return _super.call(this, message + " - this should never happen, please file a bug in the GitHub issue tracker") || this;
    }
    return HellFreezesOverError;
}(CustomError_1.default));
exports.default = HellFreezesOverError;
//# sourceMappingURL=HellFreezesOverError.js.map