"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
var ChannelPlaceholder_1 = require("../Channel/ChannelPlaceholder");
var NoSubscriptionProgramError_1 = require("../../../Errors/NoSubscriptionProgramError");
/**
 * A Twitch user.
 */
var User = /** @class */ (function () {
    /** @private */
    function User(/** @private */ _data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(User.prototype, "cacheKey", {
        /** @private */
        get: function () {
            return this._data._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "id", {
        /**
         * The ID of the user.
         */
        get: function () {
            return this._data._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "bio", {
        /**
         * The bio of the user.
         */
        get: function () {
            return this._data.bio;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "creationDate", {
        /**
         * The date when the user was created, i.e. when they registered on Twitch.
         */
        get: function () {
            return new Date(this._data.created_at);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "updateDate", {
        /**
         * The last date when the user changed anything in their profile, e.g. their description or their profile picture.
         */
        get: function () {
            return new Date(this._data.updated_at);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "name", {
        /**
         * The user name of the user.
         */
        get: function () {
            return this._data.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "displayName", {
        /**
         * The display name of the user.
         */
        get: function () {
            return this._data.display_name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "logoUrl", {
        /**
         * The URL to the profile picture of the user.
         */
        get: function () {
            return this._data.logo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "type", {
        /**
         * The type of the user.
         */
        get: function () {
            return this._data.type;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves the channel data of the user.
     */
    User.prototype.getChannel = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.channels.getChannel(this)];
            });
        });
    };
    /**
     * Gets a channel placeholder object for the user, which can do anything you can do to a channel with just the ID.
     */
    User.prototype.getChannelPlaceholder = function () {
        return new ChannelPlaceholder_1.default(this._data._id, this._client);
    };
    /**
     * Retrieves the currently running stream of the user.
     */
    User.prototype.getStream = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getChannelPlaceholder().getStream()];
            });
        });
    };
    /**
     * Retrieves the subscription data for the user to the given channel.
     *
     * Throws if the channel doesn't have a subscription program or the user is not subscribed to it.
     *
     * This method requires access to the user. If you only have access to the channel,
     * use {@ChannelPlaceholder#getSubscriptionBy} instead.
     *
     * @param channel The channel you want to get the subscription data for.
     */
    User.prototype.getSubscriptionTo = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.users.getSubscriptionData(this, channel)];
            });
        });
    };
    /**
     * Checks whether the user is subscribed to the given channel.
     *
     * @param channel The channel you want to check the subscription for.
     */
    User.prototype.isSubscribedTo = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getSubscriptionTo(channel)];
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
    /**
     * Retrieves a list of channels followed by the user.
     *
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     * @param orderBy The field to order by.
     * @param orderDirection The direction to order in - ascending or descending.
     */
    User.prototype.getFollows = function (page, limit, orderBy, orderDirection) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.users.getFollowedChannels(this, page, limit, orderBy, orderDirection)];
            });
        });
    };
    /**
     * Retrieves the follow data of the user to a given channel.
     *
     * @param channel The channel to retrieve the follow data for.
     */
    User.prototype.getFollowTo = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.users.getFollowedChannel(this, channel)];
            });
        });
    };
    /**
     * Checks whether the user is following the given channel.
     *
     * @param channel The channel to check for the user's follow.
     */
    User.prototype.follows = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getFollowTo(channel)];
                    case 1: return [2 /*return*/, (_a.sent()) !== null];
                    case 2:
                        e_2 = _a.sent();
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Follows the channel with the authenticated user.
     */
    User.prototype.follow = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var currentUser;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._client.kraken.users.getMe()];
                    case 1:
                        currentUser = _a.sent();
                        return [2 /*return*/, currentUser.followChannel(this)];
                }
            });
        });
    };
    /**
     * Unfollows the channel with the authenticated user.
     */
    User.prototype.unfollow = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var currentUser;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._client.kraken.users.getMe()];
                    case 1:
                        currentUser = _a.sent();
                        return [2 /*return*/, currentUser.unfollowChannel(this)];
                }
            });
        });
    };
    /**
     * Retrieves the emotes the user can use.
     */
    User.prototype.getEmotes = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.users.getUserEmotes(this)];
            });
        });
    };
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], User.prototype, "_client", void 0);
    return User;
}());
exports.default = User;
//# sourceMappingURL=User.js.map