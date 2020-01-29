"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
/**
 * Information about the ban of a user.
 */
var HelixBan = /** @class */ (function () {
    /** @private */
    function HelixBan(_data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(HelixBan.prototype, "userId", {
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
    HelixBan.prototype.getUser = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.users.getUserById(this._data.user_id)];
            });
        });
    };
    Object.defineProperty(HelixBan.prototype, "userName", {
        /**
         * The name of the user.
         */
        get: function () {
            return this._data.user_name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixBan.prototype, "expiryDate", {
        /**
         * The date when the ban will expire; null for permanent bans.
         */
        get: function () {
            return this._data.expires_at ? new Date(this._data.expires_at) : null;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], HelixBan.prototype, "_client", void 0);
    return HelixBan;
}());
exports.default = HelixBan;
//# sourceMappingURL=HelixBan.js.map