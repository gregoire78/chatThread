"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
/**
 * A relation of a user following a broadcaster.
 */
var HelixFollow = /** @class */ (function () {
    /** @private */
    function HelixFollow(/** @private */ _data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(HelixFollow.prototype, "userId", {
        /**
         * The user ID of the following user.
         */
        get: function () {
            return this._data.from_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixFollow.prototype, "userDisplayName", {
        /**
         * The display name of the following user.
         */
        get: function () {
            return this._data.from_name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves the data of the following user.
     */
    HelixFollow.prototype.getUser = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.users.getUserById(this._data.from_id)];
            });
        });
    };
    Object.defineProperty(HelixFollow.prototype, "followedUserId", {
        /**
         * The user ID of the followed broadcaster.
         */
        get: function () {
            return this._data.to_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixFollow.prototype, "followedUserDisplayName", {
        /**
         * The display name of the followed user.
         */
        get: function () {
            return this._data.to_name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves the data of the followed broadcaster.
     */
    HelixFollow.prototype.getFollowedUser = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.users.getUserById(this._data.to_id)];
            });
        });
    };
    Object.defineProperty(HelixFollow.prototype, "followDate", {
        /**
         * The date when the user followed the broadcaster.
         */
        get: function () {
            return new Date(this._data.followed_at);
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], HelixFollow.prototype, "_client", void 0);
    return HelixFollow;
}());
exports.default = HelixFollow;
//# sourceMappingURL=HelixFollow.js.map