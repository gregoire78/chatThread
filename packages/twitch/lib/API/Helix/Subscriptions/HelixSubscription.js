"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
/**
 * A (paid) subscription of a user to a broadcaster.
 */
var HelixSubscription = /** @class */ (function () {
    /** @private */
    function HelixSubscription(_data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(HelixSubscription.prototype, "broadcasterId", {
        /**
         * The user ID of the broadcaster.
         */
        get: function () {
            return this._data.broadcaster_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixSubscription.prototype, "broadcasterDisplayName", {
        /**
         * The display name of the broadcaster.
         */
        get: function () {
            return this._data.broadcaster_name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves more data about the broadcaster.
     */
    HelixSubscription.prototype.getBroadcaster = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.users.getUserById(this.broadcasterId)];
            });
        });
    };
    Object.defineProperty(HelixSubscription.prototype, "isGift", {
        /**
         * Whether the subscription has been gifted by another user.
         */
        get: function () {
            return this._data.is_gift;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixSubscription.prototype, "tier", {
        /**
         * The tier of the subscription.
         */
        get: function () {
            return this._data.tier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixSubscription.prototype, "userId", {
        /**
         * The user ID of the subscribed user.
         */
        get: function () {
            return this._data.user_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixSubscription.prototype, "userDisplayName", {
        /**
         * The display name of the subscribed user.
         */
        get: function () {
            return this._data.user_name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves more data about the subscribed user.
     */
    HelixSubscription.prototype.getUser = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.users.getUserById(this.userId)];
            });
        });
    };
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], HelixSubscription.prototype, "_client", void 0);
    return HelixSubscription;
}());
exports.default = HelixSubscription;
//# sourceMappingURL=HelixSubscription.js.map