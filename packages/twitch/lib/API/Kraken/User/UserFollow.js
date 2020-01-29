"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Channel_1 = require("../Channel/Channel");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
/**
 * A relation of a previously given user following a channel.
 */
var UserFollow = /** @class */ (function () {
    /** @private */
    function UserFollow(_data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(UserFollow.prototype, "followDate", {
        /**
         * The date when the user followed the channel.
         */
        get: function () {
            return new Date(this._data.created_at);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFollow.prototype, "hasNotifications", {
        /**
         * Whether the user has notifications enabled for the channel.
         */
        get: function () {
            return this._data.notifications;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFollow.prototype, "channel", {
        /**
         * The followed channel.
         */
        get: function () {
            return new Channel_1.default(this._data.channel, this._client);
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], UserFollow.prototype, "_client", void 0);
    return UserFollow;
}());
exports.default = UserFollow;
//# sourceMappingURL=UserFollow.js.map