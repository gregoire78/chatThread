"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var UserTools_1 = require("../../../Toolkit/UserTools");
var TwitchClient_1 = require("../../../TwitchClient");
var BaseAPI_1 = require("../../BaseAPI");
var HelixPaginatedRequest_1 = require("../HelixPaginatedRequest");
var HelixPagination_1 = require("../HelixPagination");
var HelixVideo_1 = require("./HelixVideo");
/**
 * The Helix API methods that deal with videos.
 *
 * Can be accessed using `client.helix.videos` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const videos = await client.helix.videos.getVideosByUser('125328655');
 * ```
 */
var HelixVideoAPI = /** @class */ (function (_super) {
    tslib_1.__extends(HelixVideoAPI, _super);
    function HelixVideoAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves the video data for the given list of video IDs.
     *
     * @param ids The video IDs you want to look up.
     */
    HelixVideoAPI.prototype.getVideosByIds = function (ids) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getVideos('id', ids)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    /**
     * Retrieves the video data for the given video ID.
     *
     * @param id The video ID you want to look up.
     */
    HelixVideoAPI.prototype.getVideoById = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var videos;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getVideosByIds(id)];
                    case 1:
                        videos = _a.sent();
                        return [2 /*return*/, videos.length ? videos[0] : null];
                }
            });
        });
    };
    /**
     * Retrieves the videos of the given user.
     *
     * @param user The user you want to retrieve videos from.
     * @param filter Additional filters for the result set.
     */
    HelixVideoAPI.prototype.getVideosByUser = function (user, filter) {
        if (filter === void 0) { filter = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId;
            return tslib_1.__generator(this, function (_a) {
                userId = UserTools_1.extractUserId(user);
                return [2 /*return*/, this._getVideos('user_id', userId, filter)];
            });
        });
    };
    /**
     * Creates a paginator for videos of the given user.
     *
     * @param user The user you want to retrieve videos from.
     * @param filter Additional filters for the result set.
     */
    HelixVideoAPI.prototype.getVideosByUserPaginated = function (user, filter) {
        if (filter === void 0) { filter = {}; }
        var userId = UserTools_1.extractUserId(user);
        return this._getVideosPaginated('user_id', userId, filter);
    };
    /**
     * Retrieves the videos of the given game.
     *
     * @param gameId The game you want to retrieve videos from.
     * @param filter Additional filters for the result set.
     */
    HelixVideoAPI.prototype.getVideosByGame = function (gameId, filter) {
        if (filter === void 0) { filter = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._getVideos('game_id', gameId, filter)];
            });
        });
    };
    /**
     * Creates a paginator for videos of the given game.
     *
     * @param gameId The game you want to retrieve videos from.
     * @param filter Additional filters for the result set.
     */
    HelixVideoAPI.prototype.getVideosByGamePaginated = function (gameId, filter) {
        if (filter === void 0) { filter = {}; }
        return this._getVideosPaginated('game_id', gameId, filter);
    };
    HelixVideoAPI.prototype._getVideos = function (filterType, filterValues, filter) {
        if (filter === void 0) { filter = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({
                            url: 'videos',
                            type: TwitchClient_1.TwitchAPICallType.Helix,
                            query: tslib_1.__assign(tslib_1.__assign({}, HelixVideoAPI._makeVideosQuery(filterType, filterValues, filter)), HelixPagination_1.makePaginationQuery(filter))
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, {
                                data: result.data.map(function (data) { return new HelixVideo_1.default(data, _this._client); }),
                                cursor: result.pagination && result.pagination.cursor
                            }];
                }
            });
        });
    };
    HelixVideoAPI.prototype._getVideosPaginated = function (filterType, filterValues, filter) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        return new HelixPaginatedRequest_1.default({
            url: 'videos',
            query: HelixVideoAPI._makeVideosQuery(filterType, filterValues, filter)
        }, this._client, function (data) { return new HelixVideo_1.default(data, _this._client); });
    };
    HelixVideoAPI._makeVideosQuery = function (filterType, filterValues, filter) {
        var _a;
        if (filter === void 0) { filter = {}; }
        var language = filter.language, period = filter.period, orderBy = filter.orderBy, type = filter.type;
        return _a = {},
            _a[filterType] = filterValues,
            _a.language = language,
            _a.period = period,
            _a.sort = orderBy,
            _a.type = type,
            _a;
    };
    return HelixVideoAPI;
}(BaseAPI_1.default));
exports.default = HelixVideoAPI;
//# sourceMappingURL=HelixVideoAPI.js.map