"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
/**
 * Information about a user's chat appearance and privileges.
 */
var UserChatInfo = /** @class */ (function () {
    /** @private */
    function UserChatInfo(_data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(UserChatInfo.prototype, "userId", {
        /**
         * The ID of the user.
         */
        get: function () {
            return this._data._id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves more data about the user.
     */
    UserChatInfo.prototype.getUser = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.users.getUser(this._data._id)];
            });
        });
    };
    Object.defineProperty(UserChatInfo.prototype, "userName", {
        /**
         * The name of the user.
         */
        get: function () {
            return this._data.login;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserChatInfo.prototype, "displayName", {
        /**
         * The display name of the user.
         */
        get: function () {
            return this._data.display_name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserChatInfo.prototype, "color", {
        /**
         * The color that the user appears in in chat.
         */
        get: function () {
            return this._data.color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserChatInfo.prototype, "isKnownBot", {
        /**
         * Whether the user is a known bot.
         */
        get: function () {
            return this._data.is_known_bot;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserChatInfo.prototype, "isVerifiedBot", {
        /**
         * Whether the user is a verified bot.
         */
        get: function () {
            return this._data.is_verified_bot;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserChatInfo.prototype, "isAtLeastKnownBot", {
        /**
         * Whether the user is at least a known bot (i.e. known or verified).
         */
        get: function () {
            return this._data.is_known_bot || this._data.is_verified_bot;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks whether the user has access to a given global badge.
     *
     * @param id The ID of a badge.
     */
    UserChatInfo.prototype.hasBadge = function (id) {
        return this._data.badges.some(function (badge) { return badge.id === id; });
    };
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], UserChatInfo.prototype, "_client", void 0);
    return UserChatInfo;
}());
exports.default = UserChatInfo;
//# sourceMappingURL=UserChatInfo.js.map