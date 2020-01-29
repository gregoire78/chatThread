"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BaseAPI_1 = require("../../BaseAPI");
var HelixUser_1 = require("./HelixUser");
var HelixPrivilegedUser_1 = require("./HelixPrivilegedUser");
var UserTools_1 = require("../../../Toolkit/UserTools");
var HelixFollow_1 = require("./HelixFollow");
var TwitchClient_1 = require("../../../TwitchClient");
var HelixPaginatedRequestWithTotal_1 = require("../HelixPaginatedRequestWithTotal");
var HellFreezesOverError_1 = require("../../../Errors/HellFreezesOverError");
/** @private */
var UserLookupType;
(function (UserLookupType) {
    UserLookupType["Id"] = "id";
    UserLookupType["Login"] = "login";
})(UserLookupType = exports.UserLookupType || (exports.UserLookupType = {}));
/**
 * The Helix API methods that deal with users.
 *
 * Can be accessed using `client.helix.users` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const user = await client.helix.users.getUserById('125328655');
 * ```
 */
var HelixUserAPI = /** @class */ (function (_super) {
    tslib_1.__extends(HelixUserAPI, _super);
    function HelixUserAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves the user data for the given list of user IDs.
     *
     * @param userIds The user IDs you want to look up.
     */
    HelixUserAPI.prototype.getUsersByIds = function (userIds) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._getUsers(UserLookupType.Id, userIds.map(UserTools_1.extractUserId))];
            });
        });
    };
    /**
     * Retrieves the user data for the given list of user names.
     *
     * @param userNames The user names you want to look up.
     */
    HelixUserAPI.prototype.getUsersByNames = function (userNames) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._getUsers(UserLookupType.Login, userNames.map(UserTools_1.extractUserName))];
            });
        });
    };
    /**
     * Retrieves the user data for the given user ID.
     *
     * @param userId The user ID you want to look up.
     */
    HelixUserAPI.prototype.getUserById = function (userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var users;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getUsers(UserLookupType.Id, UserTools_1.extractUserId(userId))];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users.length ? users[0] : null];
                }
            });
        });
    };
    /**
     * Retrieves the user data for the given user name.
     *
     * @param userName The user name you want to look up.
     */
    HelixUserAPI.prototype.getUserByName = function (userName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var users;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getUsers(UserLookupType.Login, UserTools_1.extractUserName(userName))];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users.length ? users[0] : null];
                }
            });
        });
    };
    /**
     * Retrieves the user data of the currently authenticated user.
     *
     * @param withEmail Whether you need the user's email address.
     */
    HelixUserAPI.prototype.getMe = function (withEmail) {
        if (withEmail === void 0) { withEmail = false; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({
                            type: TwitchClient_1.TwitchAPICallType.Helix,
                            url: 'users',
                            scope: withEmail ? 'user:read:email' : ''
                        })];
                    case 1:
                        result = _a.sent();
                        if (!result.data || !result.data.length) {
                            throw new HellFreezesOverError_1.default('Could not get authenticated user');
                        }
                        return [2 /*return*/, new HelixPrivilegedUser_1.default(result.data[0], this._client)];
                }
            });
        });
    };
    /**
     * Updates the currently authenticated user's data.
     *
     * @param data The data to update.
     */
    HelixUserAPI.prototype.updateUser = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({
                            type: TwitchClient_1.TwitchAPICallType.Helix,
                            url: 'users',
                            method: 'PUT',
                            scope: 'user:edit',
                            query: {
                                description: data.description
                            }
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, new HelixPrivilegedUser_1.default(result.data[0], this._client)];
                }
            });
        });
    };
    /**
     * Retrieves a list of follow relations.
     *
     * @param filter Several filtering and pagination parameters. See the {@HelixFollowFilter} documentation.
     */
    HelixUserAPI.prototype.getFollows = function (filter) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var query, result;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = HelixUserAPI._makeFollowsQuery(filter);
                        return [4 /*yield*/, this._client.callAPI({
                                url: 'users/follows',
                                type: TwitchClient_1.TwitchAPICallType.Helix,
                                query: query
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, {
                                data: result.data.map(function (data) { return new HelixFollow_1.default(data, _this._client); }),
                                cursor: result.pagination.cursor,
                                total: result.total
                            }];
                }
            });
        });
    };
    /**
     * Creates a paginator for follow relations.
     *
     * @param filter Several filtering and pagination parameters. See the {@HelixFollowFilter} documentation.
     */
    HelixUserAPI.prototype.getFollowsPaginated = function (filter) {
        var _this = this;
        var query = HelixUserAPI._makeFollowsQuery(filter);
        return new HelixPaginatedRequestWithTotal_1.default({
            url: 'users/follows',
            query: query
        }, this._client, function (data) { return new HelixFollow_1.default(data, _this._client); });
    };
    HelixUserAPI._makeFollowsQuery = function (filter) {
        var query = {};
        var hasUserIdParam = false;
        if (filter.user) {
            query.from_id = UserTools_1.extractUserId(filter.user);
            hasUserIdParam = true;
        }
        if (filter.followedUser) {
            query.to_id = UserTools_1.extractUserId(filter.followedUser);
            hasUserIdParam = true;
        }
        if (!hasUserIdParam) {
            throw new TypeError('At least one of user and followedUser have to be set');
        }
        return query;
    };
    HelixUserAPI.prototype._getUsers = function (lookupType, param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var query, result;
            var _a;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = (_a = {}, _a[lookupType] = param, _a);
                        return [4 /*yield*/, this._client.callAPI({
                                type: TwitchClient_1.TwitchAPICallType.Helix,
                                url: 'users',
                                query: query
                            })];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, result.data.map(function (userData) { return new HelixUser_1.default(userData, _this._client); })];
                }
            });
        });
    };
    return HelixUserAPI;
}(BaseAPI_1.default));
exports.default = HelixUserAPI;
//# sourceMappingURL=HelixUserAPI.js.map