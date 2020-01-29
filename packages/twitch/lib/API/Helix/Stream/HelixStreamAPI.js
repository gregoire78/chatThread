"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var HTTPStatusCodeError_1 = require("../../../Errors/HTTPStatusCodeError");
var StreamNotLiveError_1 = require("../../../Errors/StreamNotLiveError");
var ArrayTools_1 = require("../../../Toolkit/ArrayTools");
var UserTools_1 = require("../../../Toolkit/UserTools");
var TwitchClient_1 = require("../../../TwitchClient");
var BaseAPI_1 = require("../../BaseAPI");
var HelixPaginatedRequest_1 = require("../HelixPaginatedRequest");
var HelixPagination_1 = require("../HelixPagination");
var HelixStream_1 = require("./HelixStream");
var HelixStreamMarker_1 = require("./HelixStreamMarker");
var HelixStreamMarkerWithVideo_1 = require("./HelixStreamMarkerWithVideo");
/**
 * The Helix API methods that deal with streams.
 *
 * Can be accessed using `client.helix.streams` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const stream = await client.helix.streams.getStreamByUserId('125328655');
 * ```
 */
var HelixStreamAPI = /** @class */ (function (_super) {
    tslib_1.__extends(HelixStreamAPI, _super);
    function HelixStreamAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves a list of streams.
     *
     * @expandParams
     */
    HelixStreamAPI.prototype.getStreams = function (filter) {
        if (filter === void 0) { filter = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({
                            url: 'streams',
                            type: TwitchClient_1.TwitchAPICallType.Helix,
                            query: tslib_1.__assign(tslib_1.__assign({}, HelixPagination_1.makePaginationQuery(filter)), { community_id: filter.community, game_id: filter.game, language: filter.language, type: filter.type, user_id: filter.userId, user_login: filter.userName })
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, {
                                data: result.data.map(function (streamData) { return new HelixStream_1.default(streamData, _this._client); }),
                                cursor: result.pagination && result.pagination.cursor
                            }];
                }
            });
        });
    };
    /**
     * Creates a paginator for streams.
     *
     * @expandParams
     */
    HelixStreamAPI.prototype.getStreamsPaginated = function (filter) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        return new HelixPaginatedRequest_1.default({
            url: 'streams',
            query: {
                community_id: filter.community,
                game_id: filter.game,
                language: filter.language,
                type: filter.type,
                user_id: filter.userId,
                user_login: filter.userName
            }
        }, this._client, function (data) { return new HelixStream_1.default(data, _this._client); });
    };
    /**
     * Retrieves the current stream for the given user name.
     *
     * @param user The user name to retrieve the stream for.
     */
    HelixStreamAPI.prototype.getStreamByUserName = function (user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStreams({ userName: UserTools_1.extractUserName(user) })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data.length ? result.data[0] : null];
                }
            });
        });
    };
    /**
     * Retrieves the current stream for the given user ID.
     *
     * @param user The user ID to retrieve the stream for.
     */
    HelixStreamAPI.prototype.getStreamByUserId = function (user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStreams({ userId: UserTools_1.extractUserId(user) })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data.length ? result.data[0] : null];
                }
            });
        });
    };
    /**
     * Retrieves a list of all stream markers for an user.
     *
     * @param user The user to list the stream markers for.
     */
    HelixStreamAPI.prototype.getStreamMarkersForUser = function (user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._getStreamMarkers('user_id', UserTools_1.extractUserId(user))];
            });
        });
    };
    /**
     * Creates a paginator for all stream markers for an user.
     *
     * @param user The user to list the stream markers for.
     */
    HelixStreamAPI.prototype.getStreamMarkersForUserPaginated = function (user) {
        return this._getStreamMarkersPaginated('user_id', UserTools_1.extractUserId(user));
    };
    /**
     * Retrieves a list of all stream markers for a video.
     *
     * @param videoId The video to list the stream markers for.
     */
    HelixStreamAPI.prototype.getStreamMarkersForVideo = function (videoId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._getStreamMarkers('video_id', videoId)];
            });
        });
    };
    /**
     * Creates a paginator for all stream markers for a video.
     *
     * @param videoId The video to list the stream markers for.
     */
    HelixStreamAPI.prototype.getStreamMarkersForVideoPaginated = function (videoId) {
        return this._getStreamMarkersPaginated('video_id', videoId);
    };
    /**
     * Creates a new stream marker.
     *
     * Only works while your stream is live.
     */
    HelixStreamAPI.prototype.createStreamMarker = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._client.callAPI({
                                url: 'streams/markers',
                                method: 'POST',
                                type: TwitchClient_1.TwitchAPICallType.Helix,
                                scope: 'user:edit:broadcast'
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, new HelixStreamMarker_1.default(result.data[0], this._client)];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1 instanceof HTTPStatusCodeError_1.default && e_1.statusCode === 404) {
                            throw new StreamNotLiveError_1.default();
                        }
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HelixStreamAPI.prototype._getStreamMarkers = function (queryType, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({
                            url: 'streams/markers',
                            type: TwitchClient_1.TwitchAPICallType.Helix,
                            query: (_a = {},
                                _a[queryType] = id,
                                _a),
                            scope: 'user:read:broadcast'
                        })];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, {
                                data: ArrayTools_1.flatten(result.data.map(HelixStreamAPI._mapGetStreamMarkersResult.bind(this._client))),
                                cursor: result.pagination && result.pagination.cursor
                            }];
                }
            });
        });
    };
    HelixStreamAPI.prototype._getStreamMarkersPaginated = function (queryType, id) {
        var _a;
        return new HelixPaginatedRequest_1.default({
            url: 'streams/markers',
            query: (_a = {},
                _a[queryType] = id,
                _a),
            scope: 'user:read:broadcast'
        }, this._client, HelixStreamAPI._mapGetStreamMarkersResult.bind(this._client));
    };
    HelixStreamAPI._mapGetStreamMarkersResult = function (data) {
        var _this = this;
        return data.videos.reduce(function (result, video) { return tslib_1.__spread(result, video.markers.map(function (marker) { return new HelixStreamMarkerWithVideo_1.default(marker, video.video_id, _this); })); }, []);
    };
    return HelixStreamAPI;
}(BaseAPI_1.default));
exports.default = HelixStreamAPI;
//# sourceMappingURL=HelixStreamAPI.js.map