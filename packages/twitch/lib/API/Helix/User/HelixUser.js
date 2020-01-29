"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
var NoSubscriptionProgramError_1 = require("../../../Errors/NoSubscriptionProgramError");
/**
 * The type of a broadcaster.
 */
var HelixBroadcasterType;
(function (HelixBroadcasterType) {
    /**
     * A Twitch Partner.
     */
    HelixBroadcasterType["Partner"] = "partner";
    /**
     * A Twitch Affiliate.
     */
    HelixBroadcasterType["Affiliate"] = "affiliate";
    /**
     * A user that's neither a partner nor an affiliate.
     */
    HelixBroadcasterType["None"] = "";
})(HelixBroadcasterType = exports.HelixBroadcasterType || (exports.HelixBroadcasterType = {}));
/**
 * The type of a user.
 */
var HelixUserType;
(function (HelixUserType) {
    /**
     * A Twitch staff member.
     */
    HelixUserType["Staff"] = "staff";
    /**
     * A Twitch administrator.
     */
    HelixUserType["Admin"] = "admin";
    /**
     * A global moderator.
     */
    HelixUserType["GlobalMod"] = "global_mod";
    /**
     * A user with no special permissions across Twitch.
     */
    HelixUserType["None"] = "";
})(HelixUserType = exports.HelixUserType || (exports.HelixUserType = {}));
/**
 * A Twitch user.
 */
var HelixUser = /** @class */ (function () {
    /** @private */
    function HelixUser(/** @private */ _data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(HelixUser.prototype, "cacheKey", {
        /** @private */
        get: function () {
            return this._data.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixUser.prototype, "id", {
        /**
         * The ID of the user.
         */
        get: function () {
            return this._data.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixUser.prototype, "name", {
        /**
         * The user name of the user.
         */
        get: function () {
            return this._data.login;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixUser.prototype, "displayName", {
        /**
         * The display name of the user.
         */
        get: function () {
            return this._data.display_name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixUser.prototype, "description", {
        /**
         * The description of the user.
         */
        get: function () {
            return this._data.description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixUser.prototype, "type", {
        /**
         * The type of the user.
         */
        get: function () {
            return this._data.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixUser.prototype, "broadcasterType", {
        /**
         * The type of the user.
         */
        get: function () {
            return this._data.broadcaster_type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixUser.prototype, "profilePictureUrl", {
        /**
         * The URL to the profile picture of the user.
         */
        get: function () {
            return this._data.profile_image_url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixUser.prototype, "offlinePlaceholderUrl", {
        /**
         * The URL to the offline video placeholder of the user.
         */
        get: function () {
            return this._data.offline_image_url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixUser.prototype, "views", {
        /**
         * The total number of views of the user's channel.
         */
        get: function () {
            return this._data.view_count;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves the channel's stream data.
     */
    HelixUser.prototype.getStream = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.streams.getStreamByUserId(this)];
            });
        });
    };
    /**
     * Retrieves a list of broadcasters the user follows.
     */
    HelixUser.prototype.getFollows = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.users.getFollows({ user: this })];
            });
        });
    };
    /**
     * Retrieves the follow data of the user to the given broadcaster.
     *
     * @param broadcaster The broadcaster to check the follow to.
     */
    HelixUser.prototype.getFollowTo = function (broadcaster) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var params, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            user: this.id,
                            followedUser: broadcaster
                        };
                        return [4 /*yield*/, this._client.helix.users.getFollows(params)];
                    case 1:
                        result = (_a.sent()).data;
                        return [2 /*return*/, result.length ? result[0] : null];
                }
            });
        });
    };
    /**
     * Checks whether the user is following the given broadcaster.
     *
     * @param broadcaster The broadcaster to check the user's follow to.
     */
    HelixUser.prototype.follows = function (broadcaster) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFollowTo(broadcaster)];
                    case 1: return [2 /*return*/, (_a.sent()) !== null];
                }
            });
        });
    };
    /**
     * Follows the broadcaster.
     */
    HelixUser.prototype.follow = function () {
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
     * Unfollows the broadcaster.
     */
    HelixUser.prototype.unfollow = function () {
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
     * Retrieves the subscription data for the user to the given broadcaster, or `null` if the user is not subscribed.
     *
     * @param broadcaster The broadcaster you want to get the subscription data for.
     */
    HelixUser.prototype.getSubscriptionTo = function (broadcaster) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.subscriptions.getSubscriptionForUser(broadcaster, this)];
            });
        });
    };
    /**
     * Checks whether the user is subscribed to the given broadcaster.
     *
     * @param broadcaster The broadcaster you want to check the subscription for.
     */
    HelixUser.prototype.isSubscribedTo = function (broadcaster) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getSubscriptionTo(broadcaster)];
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
    ], HelixUser.prototype, "_client", void 0);
    return HelixUser;
}());
exports.default = HelixUser;
//# sourceMappingURL=HelixUser.js.map