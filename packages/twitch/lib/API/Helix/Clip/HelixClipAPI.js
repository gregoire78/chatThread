"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BaseAPI_1 = require("../../BaseAPI");
var TwitchClient_1 = require("../../../TwitchClient");
var HelixClip_1 = require("./HelixClip");
var HelixPaginatedRequest_1 = require("../HelixPaginatedRequest");
/**
 * The Helix API methods that deal with clips.
 *
 * Can be accessed using `client.helix.clips` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const clipId = await client.helix.clips.createClip({ channelId: '125328655' });
 * ```
 */
var HelixClipAPI = /** @class */ (function (_super) {
    tslib_1.__extends(HelixClipAPI, _super);
    function HelixClipAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves the latest clips for the specified broadcaster.
     *
     * @param userId The broadcaster's user ID.
     * @param filter
     *
     * @expandParams
     */
    HelixClipAPI.prototype.getClipsForBroadcaster = function (userId, filter) {
        if (filter === void 0) { filter = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._getClips(tslib_1.__assign(tslib_1.__assign({}, filter), { filterType: 'broadcaster_id', ids: userId }))];
            });
        });
    };
    /**
     * Creates a paginator for the latest clips for the specified broadcaster.
     *
     * @param userId The broadcaster's user ID.
     * @param filter
     *
     * @expandParams
     */
    HelixClipAPI.prototype.getClipsForBroadcasterPaginated = function (userId, filter) {
        if (filter === void 0) { filter = {}; }
        return this._getClipsPaginated(tslib_1.__assign(tslib_1.__assign({}, filter), { filterType: 'broadcaster_id', ids: userId }));
    };
    /**
     * Retrieves the latest clips for the specified game.
     *
     * @param gameId The game ID.
     * @param filter
     *
     * @expandParams
     */
    HelixClipAPI.prototype.getClipsForGame = function (gameId, filter) {
        if (filter === void 0) { filter = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._getClips(tslib_1.__assign(tslib_1.__assign({}, filter), { filterType: 'game_id', ids: gameId }))];
            });
        });
    };
    /**
     * Creates a paginator for the latest clips for the specified game.
     *
     * @param gameId The game ID.
     * @param filter
     *
     * @expandParams
     */
    HelixClipAPI.prototype.getClipsForGamePaginated = function (gameId, filter) {
        if (filter === void 0) { filter = {}; }
        return this._getClipsPaginated(tslib_1.__assign(tslib_1.__assign({}, filter), { filterType: 'game_id', ids: gameId }));
    };
    /**
     * Retrieves the clips identified by the given IDs.
     *
     * @param ids The clip IDs.
     */
    HelixClipAPI.prototype.getClipsByIds = function (ids) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getClips({
                            filterType: 'id',
                            ids: ids
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    /**
     * Retrieves the clip identified by the given ID.
     *
     * @param id The clip ID.
     */
    HelixClipAPI.prototype.getClipById = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var clips;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClipsByIds([id])];
                    case 1:
                        clips = _a.sent();
                        return [2 /*return*/, clips.length ? clips[0] : null];
                }
            });
        });
    };
    /**
     * Creates a clip of a running stream.
     *
     * Returns the ID of the clip.
     *
     * @expandParams
     */
    HelixClipAPI.prototype.createClip = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channelId, _a, createAfterDelay, result;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        channelId = params.channelId, _a = params.createAfterDelay, createAfterDelay = _a === void 0 ? false : _a;
                        return [4 /*yield*/, this._client.callAPI({
                                type: TwitchClient_1.TwitchAPICallType.Helix,
                                url: 'clips',
                                method: 'POST',
                                scope: 'clips:edit',
                                query: {
                                    broadcaster_id: channelId,
                                    has_delay: createAfterDelay.toString()
                                }
                            })];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, result.data[0].id];
                }
            });
        });
    };
    HelixClipAPI.prototype._getClips = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var filterType, ids, startDate, endDate, _a, limit, result;
            var _b;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        filterType = params.filterType, ids = params.ids, startDate = params.startDate, endDate = params.endDate, _a = params.limit, limit = _a === void 0 ? 20 : _a;
                        return [4 /*yield*/, this._client.callAPI({
                                type: TwitchClient_1.TwitchAPICallType.Helix,
                                url: 'clips',
                                query: (_b = {},
                                    _b[filterType] = ids,
                                    _b.started_at = startDate,
                                    _b.ended_at = endDate,
                                    _b.first = limit.toString(),
                                    _b)
                            })];
                    case 1:
                        result = _c.sent();
                        return [2 /*return*/, {
                                data: result.data.map(function (data) { return new HelixClip_1.default(data, _this._client); }),
                                cursor: result.pagination && result.pagination.cursor
                            }];
                }
            });
        });
    };
    HelixClipAPI.prototype._getClipsPaginated = function (params) {
        var _a;
        var _this = this;
        var filterType = params.filterType, ids = params.ids, startDate = params.startDate, endDate = params.endDate;
        return new HelixPaginatedRequest_1.default({
            url: 'clips',
            query: (_a = {},
                _a[filterType] = ids,
                _a.started_at = startDate,
                _a.ended_at = endDate,
                _a)
        }, this._client, function (data) { return new HelixClip_1.default(data, _this._client); });
    };
    return HelixClipAPI;
}(BaseAPI_1.default));
exports.default = HelixClipAPI;
//# sourceMappingURL=HelixClipAPI.js.map