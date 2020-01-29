"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var HellFreezesOverError_1 = require("../../../Errors/HellFreezesOverError");
var HTTPStatusCodeError_1 = require("../../../Errors/HTTPStatusCodeError");
var NoSubscriptionProgramError_1 = require("../../../Errors/NoSubscriptionProgramError");
var Cache_1 = require("../../../Toolkit/Decorators/Cache");
var ObjectTools_1 = require("../../../Toolkit/ObjectTools");
var UserTools_1 = require("../../../Toolkit/UserTools");
var BaseAPI_1 = require("../../BaseAPI");
var EmoteSetList_1 = require("../Channel/EmoteSetList");
var PrivilegedUser_1 = require("./PrivilegedUser");
var User_1 = require("./User");
var UserBlock_1 = require("./UserBlock");
var UserChatInfo_1 = require("./UserChatInfo");
var UserFollow_1 = require("./UserFollow");
var UserSubscription_1 = require("./UserSubscription");
/**
 * The API methods that deal with users.
 *
 * Can be accessed using `client.kraken.users` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const user = await client.kraken.users.getUser('125328655');
 * ```
 */
var UserAPI = /** @class */ (function (_super) {
    tslib_1.__extends(UserAPI, _super);
    function UserAPI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._userByNameCache = new Map();
        return _this;
    }
    /**
     * Retrieves the user data of the currently authenticated user.
     */
    UserAPI.prototype.getMe = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = PrivilegedUser_1.default.bind;
                        return [4 /*yield*/, this._client.callAPI({ url: 'user', scope: 'user_read' })];
                    case 1: return [2 /*return*/, new (_a.apply(PrivilegedUser_1.default, [void 0, _b.sent(), this._client]))()];
                }
            });
        });
    };
    /**
     * Retrieves the user data for the given user ID.
     *
     * @param userId The user ID you want to look up.
     */
    UserAPI.prototype.getUser = function (userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userData;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({ url: "users/" + UserTools_1.extractUserId(userId) })];
                    case 1:
                        userData = _a.sent();
                        if (!userData) {
                            throw new HellFreezesOverError_1.default('Could not get authenticated user');
                        }
                        return [2 /*return*/, new User_1.default(userData, this._client)];
                }
            });
        });
    };
    /**
     * Retrieves the user data for the given user name.
     *
     * @param userName The user name you want to look up.
     */
    UserAPI.prototype.getUserByName = function (userName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var users, user;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // not using the decorator's cache here as users-by-name is slightly more complex to cache
                        this._cleanUserCache();
                        if (this._userByNameCache.has(userName)) {
                            return [2 /*return*/, this._userByNameCache.get(userName).value];
                        }
                        return [4 /*yield*/, this._client.callAPI({ url: 'users', query: { login: userName } })];
                    case 1:
                        users = (_a.sent()).users;
                        if (users.length === 0) {
                            return [2 /*return*/, null];
                        }
                        user = new User_1.default(users[0], this._client);
                        this._userByNameCache.set(userName, {
                            value: user,
                            expires: Date.now() + 3600 * 1000
                        });
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * Retrieves the user data for the given user names.
     *
     * @param userNames The user names you want to look up.
     */
    UserAPI.prototype.getUsersByNames = function (userNames) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cachedEntries, cachedObject, cachedUsers, toFetch, usersData, usersArr, users;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._cleanUserCache();
                        userNames = userNames.map(function (name) { return name.toLowerCase(); });
                        cachedEntries = Array.from(this._userByNameCache.entries()).filter(function (_a) {
                            var _b = tslib_1.__read(_a, 1), key = _b[0];
                            return userNames.includes(key);
                        });
                        cachedObject = ObjectTools_1.entriesToObject(cachedEntries);
                        cachedUsers = ObjectTools_1.mapObject(cachedObject, function (entry) { return entry.value; });
                        toFetch = userNames.filter(function (name) { return !(name in cachedUsers); });
                        if (!toFetch.length) {
                            return [2 /*return*/, cachedUsers];
                        }
                        return [4 /*yield*/, this._client.callAPI({ url: 'users', query: { login: toFetch.join(',') } })];
                    case 1:
                        usersData = _a.sent();
                        usersArr = usersData.users.map(function (data) { return new User_1.default(data, _this._client); });
                        usersArr.forEach(function (user) {
                            return _this._userByNameCache.set(user.name, {
                                value: user,
                                expires: Date.now() + 3600 * 1000
                            });
                        });
                        users = ObjectTools_1.indexBy(usersArr, 'name');
                        return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, cachedUsers), users)];
                }
            });
        });
    };
    /**
     * Retrieves information about the user's chat appearance and privileges.
     *
     * @param user The user you want to get chat info for.
     */
    UserAPI.prototype.getChatInfo = function (user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = UserTools_1.extractUserId(user);
                        return [4 /*yield*/, this._client.callAPI({ url: "users/" + userId + "/chat" })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, new UserChatInfo_1.default(data, this._client)];
                }
            });
        });
    };
    /**
     * Retrieves the emotes a given user can use.
     *
     * @param user The user you want to get emotes for.
     */
    UserAPI.prototype.getUserEmotes = function (user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = UserTools_1.extractUserId(user);
                        return [4 /*yield*/, this._client.callAPI({ url: "users/" + userId + "/emotes", scope: 'user_subscriptions' })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, new EmoteSetList_1.default(data.emoticon_sets)];
                }
            });
        });
    };
    /**
     * Retrieves the subscription data for a given user to a given channel.
     *
     * @param user The user to retrieve the subscription data of.
     * @param toChannel The channel you want to retrieve the subscription data to.
     */
    UserAPI.prototype.getSubscriptionData = function (user, toChannel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId, channelId, _a, e_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = UserTools_1.extractUserId(user);
                        channelId = UserTools_1.extractUserId(toChannel);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = UserSubscription_1.default.bind;
                        return [4 /*yield*/, this._client.callAPI({
                                url: "users/" + userId + "/subscriptions/" + channelId,
                                scope: 'user_subscriptions'
                            })];
                    case 2: return [2 /*return*/, new (_a.apply(UserSubscription_1.default, [void 0, _b.sent(),
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
     * Get a list of channels a given user follows.
     *
     * @param user The user you want to retrieve the follows of.
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     * @param orderBy The field to order by.
     * @param orderDirection The direction to order in - ascending or descending.
     */
    UserAPI.prototype.getFollowedChannels = function (user, page, limit, orderBy, orderDirection) {
        if (limit === void 0) { limit = 25; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId, query, data;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = UserTools_1.extractUserId(user);
                        query = {};
                        if (page) {
                            query.offset = ((page - 1) * limit).toString();
                        }
                        query.limit = limit.toString();
                        if (orderBy) {
                            query.sortby = orderBy;
                        }
                        if (orderDirection) {
                            query.direction = orderDirection;
                        }
                        return [4 /*yield*/, this._client.callAPI({
                                url: "users/" + userId + "/follows/channels",
                                query: query
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.follows.map(function (follow) { return new UserFollow_1.default(follow, _this._client); })];
                }
            });
        });
    };
    /**
     * Get follow data for a given user to a given channel.
     *
     * @param user The user you want to retrieve follow data of.
     * @param channel The channel you want to retrieve follow data to.
     */
    UserAPI.prototype.getFollowedChannel = function (user, channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId, channelId, data, e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = UserTools_1.extractUserId(user);
                        channelId = UserTools_1.extractUserId(channel);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._client.callAPI({ url: "users/" + userId + "/follows/channels/" + channelId })];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, new UserFollow_1.default(data, this._client)];
                    case 3:
                        e_2 = _a.sent();
                        if (e_2 instanceof HTTPStatusCodeError_1.default) {
                            if (e_2.statusCode === 404) {
                                return [2 /*return*/, null];
                            }
                        }
                        throw e_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Follows a given channel with a given user.
     *
     * @param user The user you want to follow with.
     * @param channel The channel to follow.
     * @param notifications Whether the user will receive notifications.
     */
    UserAPI.prototype.followChannel = function (user, channel, notifications) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId, channelId, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = UserTools_1.extractUserId(user);
                        channelId = UserTools_1.extractUserId(channel);
                        return [4 /*yield*/, this._client.callAPI({
                                url: "users/" + userId + "/follows/channels/" + channelId,
                                method: 'PUT',
                                scope: 'user_follows_edit',
                                body: { notifications: Boolean(notifications).toString() }
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, new UserFollow_1.default(data, this._client)];
                }
            });
        });
    };
    /**
     * Unfollows a given channel with a given user.
     *
     * @param user The user you want to unfollow with.
     * @param channel The channel to unfollow.
     */
    UserAPI.prototype.unfollowChannel = function (user, channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId, channelId;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = UserTools_1.extractUserId(user);
                        channelId = UserTools_1.extractUserId(channel);
                        return [4 /*yield*/, this._client.callAPI({
                                url: "users/" + userId + "/follows/channels/" + channelId,
                                scope: 'user_follows_edit',
                                method: 'DELETE'
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves a list of users a given user has blocked.
     *
     * @param user The user you want to retrieve the block list of.
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     */
    UserAPI.prototype.getBlockedUsers = function (user, page, limit) {
        if (limit === void 0) { limit = 25; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId, query, data;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = UserTools_1.extractUserId(user);
                        query = { limit: limit.toString() };
                        if (page) {
                            query.offset = ((page - 1) * limit).toString();
                        }
                        return [4 /*yield*/, this._client.callAPI({
                                url: "users/" + userId + "/blocks",
                                query: query,
                                scope: 'user_blocks_read'
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.blocks.map(function (block) { return new UserBlock_1.default(block, _this._client); })];
                }
            });
        });
    };
    /**
     * Blocks a given user with another given user.
     *
     * @param user The user you want to block with.
     * @param userToBlock The user to block.
     */
    UserAPI.prototype.blockUser = function (user, userToBlock) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId, userIdToBlock, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = UserTools_1.extractUserId(user);
                        userIdToBlock = UserTools_1.extractUserId(userToBlock);
                        return [4 /*yield*/, this._client.callAPI({
                                url: "users/" + userId + "/blocks/" + userIdToBlock,
                                method: 'PUT',
                                scope: 'user_blocks_edit'
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, new UserBlock_1.default(data, this._client)];
                }
            });
        });
    };
    /**
     * Unblocks a given user with another given user.
     *
     * @param user The user you want to unblock with.
     * @param userToUnblock The user to unblock.
     */
    UserAPI.prototype.unblockUser = function (user, userToUnblock) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId, userIdToUnblock;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = UserTools_1.extractUserId(user);
                        userIdToUnblock = UserTools_1.extractUserId(userToUnblock);
                        return [4 /*yield*/, this._client.callAPI({
                                url: "users/" + userId + "/blocks/" + userIdToUnblock,
                                method: 'DELETE',
                                scope: 'user_blocks_edit'
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserAPI.prototype._cleanUserCache = function () {
        var _this = this;
        var now = Date.now();
        this._userByNameCache.forEach(function (val, key) {
            if (val.expires < now) {
                _this._userByNameCache.delete(key);
            }
        });
    };
    tslib_1.__decorate([
        Cache_1.Cached(3600)
    ], UserAPI.prototype, "getMe", null);
    tslib_1.__decorate([
        Cache_1.Cached(3600)
    ], UserAPI.prototype, "getUser", null);
    tslib_1.__decorate([
        Cache_1.Cached(3600)
    ], UserAPI.prototype, "getChatInfo", null);
    tslib_1.__decorate([
        Cache_1.Cached(3600)
    ], UserAPI.prototype, "getUserEmotes", null);
    tslib_1.__decorate([
        Cache_1.Cached(3600)
    ], UserAPI.prototype, "getSubscriptionData", null);
    tslib_1.__decorate([
        Cache_1.Cached(300)
    ], UserAPI.prototype, "getFollowedChannels", null);
    tslib_1.__decorate([
        Cache_1.Cached(300)
    ], UserAPI.prototype, "getFollowedChannel", null);
    tslib_1.__decorate([
        Cache_1.ClearsCache('getFollowedChannels', 1),
        Cache_1.ClearsCache('getFollowedChannel', 2)
    ], UserAPI.prototype, "followChannel", null);
    tslib_1.__decorate([
        Cache_1.ClearsCache('getFollowedChannels', 1),
        Cache_1.ClearsCache('getFollowedChannel', 2)
    ], UserAPI.prototype, "unfollowChannel", null);
    tslib_1.__decorate([
        Cache_1.Cached(3600)
    ], UserAPI.prototype, "getBlockedUsers", null);
    tslib_1.__decorate([
        Cache_1.ClearsCache('getBlockedUsers', 1)
    ], UserAPI.prototype, "blockUser", null);
    tslib_1.__decorate([
        Cache_1.ClearsCache('getBlockedUsers', 1)
    ], UserAPI.prototype, "unblockUser", null);
    UserAPI = tslib_1.__decorate([
        Cache_1.Cacheable
    ], UserAPI);
    return UserAPI;
}(BaseAPI_1.default));
exports.default = UserAPI;
//# sourceMappingURL=UserAPI.js.map