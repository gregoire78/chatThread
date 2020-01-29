"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
var NoSubscriptionProgramError_1 = require("../../../Errors/NoSubscriptionProgramError");
/**
 * A placeholder for a channel.
 *
 * This is used for example when you only have retrieved user data, but not channel data.
 * This can do anything you can do with only a channel ID, as it's equivalent to the user ID.
 */
var ChannelPlaceholder = /** @class */ (function () {
    /** @private */
    function ChannelPlaceholder(id, client) {
        this._data = { _id: id };
        this._client = client;
    }
    Object.defineProperty(ChannelPlaceholder.prototype, "cacheKey", {
        /** @private */
        get: function () {
            return this._data._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelPlaceholder.prototype, "id", {
        /**
         * The ID of the channel.
         */
        get: function () {
            return this._data._id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves the list of cheermotes you can use in the channel.
     */
    ChannelPlaceholder.prototype.getCheermotes = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.bits.getCheermotes(this)];
            });
        });
    };
    /**
     * Retrieves the channel data.
     */
    ChannelPlaceholder.prototype.getChannel = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.channels.getChannel(this)];
            });
        });
    };
    /**
     * Retrieves the channel's stream data.
     */
    ChannelPlaceholder.prototype.getStream = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.streams.getStreamByChannel(this)];
            });
        });
    };
    /**
     * Retrieves the channel's followers.
     */
    ChannelPlaceholder.prototype.getFollowers = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.channels.getChannelFollowers(this)];
            });
        });
    };
    /**
     * Retrieves the channel's subscribers.
     */
    ChannelPlaceholder.prototype.getSubscriptions = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.channels.getChannelSubscriptions(this)];
            });
        });
    };
    /**
     * Retrieves the subscription data for the given user to the channel.
     *
     * Throws if the channel doesn't have a subscription program or the user is not subscribed to it.
     *
     * This method requires access to the channel. If you only have access to the user,
     * use {@User#getSubscriptionTo} instead.
     *
     * @param user The user you want to get the subscription data for.
     */
    ChannelPlaceholder.prototype.getSubscriptionBy = function (user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.channels.getChannelSubscriptionByUser(this, user)];
            });
        });
    };
    /**
     * Checks whether the given user is subscribed to the channel.
     *
     * @param user The user you want to check the subscription for.
     */
    ChannelPlaceholder.prototype.hasSubscriber = function (user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getSubscriptionBy(user)];
                    case 1: return [2 /*return*/, (_a.sent()) !== null];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1 instanceof NoSubscriptionProgramError_1.default) {
                            return [2 /*return*/, false];
                        }
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], ChannelPlaceholder.prototype, "_client", void 0);
    return ChannelPlaceholder;
}());
exports.default = ChannelPlaceholder;
//# sourceMappingURL=ChannelPlaceholder.js.map