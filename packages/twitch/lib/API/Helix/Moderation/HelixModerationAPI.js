"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var UserTools_1 = require("../../../Toolkit/UserTools");
var TwitchClient_1 = require("../../../TwitchClient");
var BaseAPI_1 = require("../../BaseAPI");
var HelixPaginatedRequest_1 = require("../HelixPaginatedRequest");
var HelixPagination_1 = require("../HelixPagination");
var HelixBan_1 = require("./HelixBan");
var HelixBanEvent_1 = require("./HelixBanEvent");
var HelixModerator_1 = require("./HelixModerator");
var HelixModeratorEvent_1 = require("./HelixModeratorEvent");
/**
 * The Helix API methods that deal with moderation.
 *
 * Can be accessed using `client.helix.moderation` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const game = await client.helix.moderation.getBannedUsers('61369223');
 * ```
 */
var HelixModerationAPI = /** @class */ (function (_super) {
    tslib_1.__extends(HelixModerationAPI, _super);
    function HelixModerationAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves a list of banned users in a given channel.
     *
     * @param channel The channel to retrieve the banned users from.
     * @param filter Additional filters for the result set.
     */
    HelixModerationAPI.prototype.getBannedUsers = function (channel, filter) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({
                            type: TwitchClient_1.TwitchAPICallType.Helix,
                            url: 'moderation/banned',
                            scope: 'moderation:read',
                            query: tslib_1.__assign({ broadcaster_id: UserTools_1.extractUserId(channel), user_id: (_a = filter) === null || _a === void 0 ? void 0 : _a.userId }, HelixPagination_1.makePaginationQuery(filter))
                        })];
                    case 1:
                        result = _c.sent();
                        return [2 /*return*/, {
                                data: result.data.map(function (data) { return new HelixBan_1.default(data, _this._client); }),
                                cursor: (_b = result.pagination) === null || _b === void 0 ? void 0 : _b.cursor
                            }];
                }
            });
        });
    };
    /**
     * Creates a paginator for banned users in a given channel.
     *
     * @param channel The channel to retrieve the banned users from.
     */
    HelixModerationAPI.prototype.getBannedUsersPaginated = function (channel) {
        var _this = this;
        return new HelixPaginatedRequest_1.default({
            url: 'moderation/banned',
            scope: 'moderation:read',
            query: {
                broadcaster_id: UserTools_1.extractUserId(channel)
            }
        }, this._client, function (data) { return new HelixBan_1.default(data, _this._client); });
    };
    /**
     * Checks whether a given user is banned in a given channel.
     *
     * @param channel The channel to check for a ban of the given user.
     * @param user The user to check for a ban in the given channel.
     */
    HelixModerationAPI.prototype.checkUserBan = function (channel, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = UserTools_1.extractUserId(user);
                        return [4 /*yield*/, this.getBannedUsers(channel, { userId: userId })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data.some(function (ban) { return ban.userId === userId; })];
                }
            });
        });
    };
    /**
     * Retrieves a list of ban events for a given channel.
     *
     * @param channel The channel to retrieve the ban events from.
     * @param filter Additional filters for the result set.
     */
    HelixModerationAPI.prototype.getBanEvents = function (channel, filter) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({
                            type: TwitchClient_1.TwitchAPICallType.Helix,
                            url: 'moderation/banned/events',
                            scope: 'moderation:read',
                            query: tslib_1.__assign({ broadcaster_id: UserTools_1.extractUserId(channel), user_id: (_a = filter) === null || _a === void 0 ? void 0 : _a.userId }, HelixPagination_1.makePaginationQuery(filter))
                        })];
                    case 1:
                        result = _c.sent();
                        return [2 /*return*/, {
                                data: result.data.map(function (data) { return new HelixBanEvent_1.default(data, _this._client); }),
                                cursor: (_b = result.pagination) === null || _b === void 0 ? void 0 : _b.cursor
                            }];
                }
            });
        });
    };
    /**
     * Creates a paginator for ban events for a given channel.
     *
     * @param channel The channel to retrieve the ban events from.
     */
    HelixModerationAPI.prototype.getBanEventsPaginated = function (channel) {
        var _this = this;
        return new HelixPaginatedRequest_1.default({
            url: 'moderation/banned/events',
            scope: 'moderation:read',
            query: {
                broadcaster_id: UserTools_1.extractUserId(channel)
            }
        }, this._client, function (data) { return new HelixBanEvent_1.default(data, _this._client); });
    };
    /**
     * Retrieves a list of moderators in a given channel.
     *
     * @param channel The channel to retrieve moderators from.
     * @param filter Additional filters for the result set.
     */
    HelixModerationAPI.prototype.getModerators = function (channel, filter) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({
                            type: TwitchClient_1.TwitchAPICallType.Helix,
                            url: 'moderation/moderators',
                            scope: 'moderation:read',
                            query: tslib_1.__assign({ broadcaster_id: UserTools_1.extractUserId(channel), user_id: (_a = filter) === null || _a === void 0 ? void 0 : _a.userId }, HelixPagination_1.makePaginationQuery(filter))
                        })];
                    case 1:
                        result = _c.sent();
                        return [2 /*return*/, {
                                data: result.data.map(function (data) { return new HelixModerator_1.default(data, _this._client); }),
                                cursor: (_b = result.pagination) === null || _b === void 0 ? void 0 : _b.cursor
                            }];
                }
            });
        });
    };
    /**
     * Creates a paginator for moderators in a given channel.
     *
     * @param channel The channel to retrieve moderators from.
     */
    HelixModerationAPI.prototype.getModeratorsPaginated = function (channel) {
        var _this = this;
        return new HelixPaginatedRequest_1.default({
            url: 'moderation/moderators',
            scope: 'moderation:read',
            query: {
                broadcaster_id: UserTools_1.extractUserId(channel)
            }
        }, this._client, function (data) { return new HelixModerator_1.default(data, _this._client); });
    };
    /**
     * Checks whether a given user is a moderator of a given channel.
     *
     * @param channel The channel to check.
     * @param user The user to check.
     */
    HelixModerationAPI.prototype.checkUserMod = function (channel, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = UserTools_1.extractUserId(user);
                        return [4 /*yield*/, this.getModerators(channel, { userId: userId })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data.some(function (mod) { return mod.userId === userId; })];
                }
            });
        });
    };
    /**
     * Retrieves a list of moderator events for a given channel.
     *
     * @param channel The channel to retrieve the moderator events from.
     * @param filter Additional filters for the result set.
     */
    HelixModerationAPI.prototype.getModeratorEvents = function (channel, filter) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({
                            type: TwitchClient_1.TwitchAPICallType.Helix,
                            url: 'moderation/moderators/events',
                            scope: 'moderation:read',
                            query: tslib_1.__assign({ broadcaster_id: UserTools_1.extractUserId(channel), user_id: (_a = filter) === null || _a === void 0 ? void 0 : _a.userId }, HelixPagination_1.makePaginationQuery(filter))
                        })];
                    case 1:
                        result = _c.sent();
                        return [2 /*return*/, {
                                data: result.data.map(function (data) { return new HelixModeratorEvent_1.default(data, _this._client); }),
                                cursor: (_b = result.pagination) === null || _b === void 0 ? void 0 : _b.cursor
                            }];
                }
            });
        });
    };
    /**
     * Creates a paginator for moderator events for a given channel.
     *
     * @param channel The channel to retrieve the moderator events from.
     */
    HelixModerationAPI.prototype.getModeratorEventsPaginated = function (channel) {
        var _this = this;
        return new HelixPaginatedRequest_1.default({
            url: 'moderation/moderators/events',
            scope: 'moderation:read',
            query: {
                broadcaster_id: UserTools_1.extractUserId(channel)
            }
        }, this._client, function (data) { return new HelixModeratorEvent_1.default(data, _this._client); });
    };
    return HelixModerationAPI;
}(BaseAPI_1.default));
exports.default = HelixModerationAPI;
//# sourceMappingURL=HelixModerationAPI.js.map