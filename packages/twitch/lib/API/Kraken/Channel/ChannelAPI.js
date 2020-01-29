"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Cache_1 = require("../../../Toolkit/Decorators/Cache");
var BaseAPI_1 = require("../../BaseAPI");
var Channel_1 = require("./Channel");
var UserTools_1 = require("../../../Toolkit/UserTools");
var ChannelSubscription_1 = require("./ChannelSubscription");
var NoSubscriptionProgramError_1 = require("../../../Errors/NoSubscriptionProgramError");
var PrivilegedChannel_1 = require("./PrivilegedChannel");
var User_1 = require("../User/User");
var ChannelFollow_1 = require("./ChannelFollow");
var HTTPStatusCodeError_1 = require("../../../Errors/HTTPStatusCodeError");
/**
 * The API methods that deal with channels.
 *
 * Can be accessed using `client.kraken.channels` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const channel = await client.kraken.channels.getMyChannel();
 * ```
 */
var ChannelAPI = /** @class */ (function (_super) {
    tslib_1.__extends(ChannelAPI, _super);
    function ChannelAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets the channel the client is logged in to.
     */
    ChannelAPI.prototype.getMyChannel = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = PrivilegedChannel_1.default.bind;
                        return [4 /*yield*/, this._client.callAPI({ url: 'channel', scope: 'channel_read' })];
                    case 1: return [2 /*return*/, new (_a.apply(PrivilegedChannel_1.default, [void 0, _b.sent(),
                            this._client]))()];
                }
            });
        });
    };
    /**
     * Retrieves the channel for the given user.
     *
     * @param user The user you want to retrieve the channel for.
     */
    ChannelAPI.prototype.getChannel = function (user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Channel_1.default.bind;
                        return [4 /*yield*/, this._client.callAPI({ url: "channels/" + UserTools_1.extractUserId(user) })];
                    case 1: return [2 /*return*/, new (_a.apply(Channel_1.default, [void 0, _b.sent(), this._client]))()];
                }
            });
        });
    };
    /**
     * Updates the given channel with the given data.
     *
     * @param channel The channel you want to update.
     * @param data The updated channel data.
     */
    ChannelAPI.prototype.updateChannel = function (channel, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channelId;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelId = UserTools_1.extractUserId(channel);
                        return [4 /*yield*/, this._client.callAPI({
                                url: "channels/" + channelId,
                                method: 'PUT',
                                jsonBody: { channel: data },
                                scope: 'channel_editor'
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves the list of users that have editor rights to the given channel.
     *
     * @param channel The channel you want to retrieve the list of editors for.
     */
    ChannelAPI.prototype.getChannelEditors = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channelId, data;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelId = UserTools_1.extractUserId(channel);
                        return [4 /*yield*/, this._client.callAPI({
                                url: "channels/" + channelId + "/editors",
                                scope: 'channel_read'
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.users.map(function (userData) { return new User_1.default(userData, _this._client); })];
                }
            });
        });
    };
    /**
     * Retrieves the list of followers of the given channel.
     *
     * @param channel The channel you want to retrieve the list of followers of.
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     * @param orderDirection The direction to order in - ascending or descending.
     */
    ChannelAPI.prototype.getChannelFollowers = function (channel, page, limit, orderDirection) {
        if (limit === void 0) { limit = 25; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channelId, query, data;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelId = UserTools_1.extractUserId(channel);
                        query = { limit: limit.toString() };
                        if (page) {
                            query.offset = ((page - 1) * limit).toString();
                        }
                        if (orderDirection) {
                            query.direction = orderDirection;
                        }
                        return [4 /*yield*/, this._client.callAPI({
                                url: "channels/" + channelId + "/follows",
                                query: query
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.follows.map(function (follow) { return new ChannelFollow_1.default(follow, _this._client); })];
                }
            });
        });
    };
    /**
     * Retrieves the list of subscribers of the given channel.
     *
     * @param channel The channel you want to retrieve the list of subscribers of.
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     * @param orderDirection The direction to order in - ascending or descending.
     */
    ChannelAPI.prototype.getChannelSubscriptions = function (channel, page, limit, orderDirection) {
        if (limit === void 0) { limit = 25; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getChannelSubscriptions(channel, page, limit, orderDirection)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.subscriptions.map(function (sub) { return new ChannelSubscription_1.default(sub, _this._client); })];
                }
            });
        });
    };
    /**
     * Retrieves the total number of subscribers for the given channel.
     *
     * @param channel The channel you want to retrieve the number of subscribers for.
     */
    ChannelAPI.prototype.getChannelSubscriptionCount = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getChannelSubscriptions(channel, 0, 1)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data._total];
                }
            });
        });
    };
    /**
     * Retrieves the subscription data for the given user to a given channel.
     *
     * Throws if the channel doesn't have a subscription program or the user is not subscribed to it.
     *
     * This method requires access to the channel. If you only have access to the user,
     * use {@UserAPI#getSubscriptionData} instead.
     *
     * @param channel The channel to check the subscription to.
     * @param byUser The user to check the subscription for.
     */
    ChannelAPI.prototype.getChannelSubscriptionByUser = function (channel, byUser) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channelId, userId, _a, e_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        channelId = UserTools_1.extractUserId(channel);
                        userId = UserTools_1.extractUserId(byUser);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = ChannelSubscription_1.default.bind;
                        return [4 /*yield*/, this._client.callAPI({
                                url: "channels/" + channelId + "/subscriptions/" + userId,
                                scope: 'channel_check_subscription'
                            })];
                    case 2: return [2 /*return*/, new (_a.apply(ChannelSubscription_1.default, [void 0, _b.sent(),
                            this._client]))()];
                    case 3:
                        e_1 = _b.sent();
                        if (e_1 instanceof HTTPStatusCodeError_1.default) {
                            if (e_1.statusCode === 404) {
                                return [2 /*return*/, null];
                            }
                            else if (e_1.statusCode === 422) {
                                throw new NoSubscriptionProgramError_1.default(channelId);
                            }
                        }
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Starts a commercial in the given channel.
     *
     * @param channel The channel to start the commercial in.
     * @param length The length of the commercial.
     */
    ChannelAPI.prototype.startChannelCommercial = function (channel, length) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channelId;
            return tslib_1.__generator(this, function (_a) {
                channelId = UserTools_1.extractUserId(channel);
                return [2 /*return*/, this._client.callAPI({
                        url: "channels/" + channelId + "/commercial",
                        method: 'POST',
                        jsonBody: { length: length },
                        scope: 'channel_commercial'
                    })];
            });
        });
    };
    /**
     * Resets the given channel's stream key.
     *
     * @param channel The channel to reset the stream key for.
     */
    ChannelAPI.prototype.resetChannelStreamKey = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channelId;
            return tslib_1.__generator(this, function (_a) {
                channelId = UserTools_1.extractUserId(channel);
                return [2 /*return*/, this._client.callAPI({
                        url: "channels/" + channelId + "/stream_key",
                        method: 'DELETE',
                        scope: 'channel_stream'
                    })];
            });
        });
    };
    ChannelAPI.prototype._getChannelSubscriptions = function (channel, page, limit, orderDirection) {
        if (limit === void 0) { limit = 25; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channelId, query, e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelId = UserTools_1.extractUserId(channel);
                        query = { limit: limit.toString() };
                        if (page) {
                            query.offset = ((page - 1) * limit).toString();
                        }
                        if (orderDirection) {
                            query.direction = orderDirection;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._client.callAPI({
                                url: "channels/" + channelId + "/subscriptions",
                                query: query,
                                scope: 'channel_subscriptions'
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        e_2 = _a.sent();
                        if (e_2 instanceof HTTPStatusCodeError_1.default && e_2.statusCode === 422) {
                            throw new NoSubscriptionProgramError_1.default(channelId);
                        }
                        throw e_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        Cache_1.Cached(3600)
    ], ChannelAPI.prototype, "getMyChannel", null);
    tslib_1.__decorate([
        Cache_1.Cached(3600)
    ], ChannelAPI.prototype, "getChannel", null);
    tslib_1.__decorate([
        Cache_1.ClearsCache('getChannel', 1)
    ], ChannelAPI.prototype, "updateChannel", null);
    tslib_1.__decorate([
        Cache_1.Cached(3600)
    ], ChannelAPI.prototype, "getChannelEditors", null);
    tslib_1.__decorate([
        Cache_1.Cached(30)
    ], ChannelAPI.prototype, "getChannelFollowers", null);
    tslib_1.__decorate([
        Cache_1.Cached(30)
    ], ChannelAPI.prototype, "getChannelSubscriptions", null);
    tslib_1.__decorate([
        Cache_1.Cached(30)
    ], ChannelAPI.prototype, "getChannelSubscriptionCount", null);
    tslib_1.__decorate([
        Cache_1.Cached(3600)
    ], ChannelAPI.prototype, "getChannelSubscriptionByUser", null);
    tslib_1.__decorate([
        Cache_1.ClearsCache('getMyChannel')
    ], ChannelAPI.prototype, "resetChannelStreamKey", null);
    ChannelAPI = tslib_1.__decorate([
        Cache_1.Cacheable
    ], ChannelAPI);
    return ChannelAPI;
}(BaseAPI_1.default));
exports.default = ChannelAPI;
//# sourceMappingURL=ChannelAPI.js.map