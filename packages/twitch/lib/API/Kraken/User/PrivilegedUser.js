"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var User_1 = require("./User");
/**
 * A user you have extended privileges for, i.e. the currently authenticated user.
 *
 * @inheritDoc
 */
var PrivilegedUser = /** @class */ (function (_super) {
    tslib_1.__extends(PrivilegedUser, _super);
    function PrivilegedUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PrivilegedUser.prototype, "email", {
        /**
         * The user's email address.
         */
        get: function () {
            return this._data.email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrivilegedUser.prototype, "isEmailVerified", {
        /**
         * Whether the user's email address is verified.
         */
        get: function () {
            return this._data.email_verified;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrivilegedUser.prototype, "hasEmailNotifications", {
        /**
         * Whether the user has email notifications enabled.
         */
        get: function () {
            return this._data.notifications.email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrivilegedUser.prototype, "hasPushNotifications", {
        /**
         * Whether the user has push notifications enabled.
         */
        get: function () {
            return this._data.notifications.push;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrivilegedUser.prototype, "isPartnered", {
        /**
         * Whether the user is partnered.
         */
        get: function () {
            return this._data.partnered;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrivilegedUser.prototype, "hasTwitter", {
        /**
         * Whether the user has a Twitter account connected.
         */
        get: function () {
            return this._data.twitter_connected;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Follows a channel.
     *
     * @param channel The channel to follow.
     * @param notifications Whether the user will receive notifications.
     */
    PrivilegedUser.prototype.followChannel = function (channel, notifications) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.users.followChannel(this, channel, notifications)];
            });
        });
    };
    /**
     * Unfollows a channel.
     *
     * @param channel The channel to unfollow.
     */
    PrivilegedUser.prototype.unfollowChannel = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.users.unfollowChannel(this, channel)];
            });
        });
    };
    /**
     * Blocks a user.
     *
     * @param userToBlock The user to block.
     */
    PrivilegedUser.prototype.blockUser = function (userToBlock) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.users.blockUser(this, userToBlock)];
            });
        });
    };
    /**
     * Unblocks a user.
     *
     * @param userToUnblock The user to unblock.
     */
    PrivilegedUser.prototype.unblockUser = function (userToUnblock) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.users.unblockUser(this, userToUnblock)];
            });
        });
    };
    return PrivilegedUser;
}(User_1.default));
exports.default = PrivilegedUser;
//# sourceMappingURL=PrivilegedUser.js.map