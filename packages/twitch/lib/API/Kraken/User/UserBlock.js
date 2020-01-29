"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
var User_1 = require("./User");
/**
 * A relation of a previously givn user blocking another user.
 */
var UserBlock = /** @class */ (function () {
    /** @private */
    function UserBlock(_data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(UserBlock.prototype, "blockedUser", {
        /**
         * The blocked user.
         */
        get: function () {
            return new User_1.default(this._data.user, this._client);
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], UserBlock.prototype, "_client", void 0);
    return UserBlock;
}());
exports.default = UserBlock;
//# sourceMappingURL=UserBlock.js.map