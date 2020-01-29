"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
/**
 * Information about the moderator status of a user.
 */
var HelixModerator = /** @class */ (function () {
    /** @private */
    function HelixModerator(_data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(HelixModerator.prototype, "userId", {
        /**
         * The ID of the user.
         */
        get: function () {
            return this._data.user_id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves more data about the user.
     */
    HelixModerator.prototype.getUser = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.users.getUserById(this._data.user_id)];
            });
        });
    };
    Object.defineProperty(HelixModerator.prototype, "userName", {
        /**
         * The name of the user.
         */
        get: function () {
            return this._data.user_name;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], HelixModerator.prototype, "_client", void 0);
    return HelixModerator;
}());
exports.default = HelixModerator;
//# sourceMappingURL=HelixModerator.js.map