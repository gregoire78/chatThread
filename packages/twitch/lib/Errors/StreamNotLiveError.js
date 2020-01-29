"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CustomError_1 = require("./CustomError");
/**
 * Thrown whenever you try something that requires your own stream to be live.
 */
var StreamNotLiveError = /** @class */ (function (_super) {
    tslib_1.__extends(StreamNotLiveError, _super);
    function StreamNotLiveError() {
        return _super.call(this, 'Your stream needs to be live to do this') || this;
    }
    return StreamNotLiveError;
}(CustomError_1.default));
exports.default = StreamNotLiveError;
//# sourceMappingURL=StreamNotLiveError.js.map