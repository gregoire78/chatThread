"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var UserTools_1 = require("../../../Toolkit/UserTools");
var Cache_1 = require("../../../Toolkit/Decorators/Cache");
var BaseAPI_1 = require("../../BaseAPI");
var Stream_1 = require("./Stream");
/**
 * The API methods that deal with streams.
 *
 * Can be accessed using `client.kraken.streams` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const stream = await client.kraken.streams.getStreamByChannel('125328655');
 * ```
 */
var StreamAPI = /** @class */ (function (_super) {
    tslib_1.__extends(StreamAPI, _super);
    function StreamAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves the current stream on the given channel.
     *
     * @param channel
     */
    StreamAPI.prototype.getStreamByChannel = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channelId, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelId = UserTools_1.extractUserId(channel);
                        return [4 /*yield*/, this._client.callAPI({ url: "streams/" + channelId })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.stream ? new Stream_1.default(data.stream, this._client) : null];
                }
            });
        });
    };
    /**
     * Retrieves a list of streams.
     *
     * @param channels A channel ID or a list thereof.
     * @param game Show only streams playing a certain game.
     * @param languageCode Show only streams in a certain language.
     * @param type Show only streams of a certain type.
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     */
    StreamAPI.prototype.getStreams = function (channels, game, languageCode, type, page, limit) {
        if (limit === void 0) { limit = 25; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var query, data;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = { limit: limit.toString() };
                        if (channels) {
                            query.channel = typeof channels === 'string' ? channels : channels.join(',');
                        }
                        if (game) {
                            query.game = game;
                        }
                        if (languageCode) {
                            query.broadcaster_language = languageCode;
                        }
                        if (type) {
                            query.stream_type = type;
                        }
                        if (page) {
                            query.offset = ((page - 1) * limit).toString();
                        }
                        return [4 /*yield*/, this._client.callAPI({ url: 'streams', query: query })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.streams.map(function (streamData) { return new Stream_1.default(streamData, _this._client); })];
                }
            });
        });
    };
    /**
     * Retrieves a list of all streams.
     *
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     */
    StreamAPI.prototype.getAllStreams = function (page, limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getStreams(undefined, undefined, undefined, Stream_1.StreamType.All, page, limit)];
            });
        });
    };
    /**
     * Retrieves a list of all live streams.
     *
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     */
    StreamAPI.prototype.getAllLiveStreams = function (page, limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getStreams(undefined, undefined, undefined, Stream_1.StreamType.Live, page, limit)];
            });
        });
    };
    /**
     * Retrieves a list of all streams on channels the currently authenticated user is following.
     *
     * @param type Show only streams of a certain type.
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     */
    StreamAPI.prototype.getFollowedStreams = function (type, page, limit) {
        if (limit === void 0) { limit = 25; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var query, data;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = { limit: limit.toString() };
                        if (type) {
                            query.type = type;
                        }
                        if (page) {
                            query.offset = ((page - 1) * limit).toString();
                        }
                        return [4 /*yield*/, this._client.callAPI({
                                url: 'streams/followed',
                                query: query,
                                scope: 'user_read'
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.streams.map(function (streamData) { return new Stream_1.default(streamData, _this._client); })];
                }
            });
        });
    };
    tslib_1.__decorate([
        Cache_1.Cached(60)
    ], StreamAPI.prototype, "getStreamByChannel", null);
    tslib_1.__decorate([
        Cache_1.Cached(60)
    ], StreamAPI.prototype, "getFollowedStreams", null);
    StreamAPI = tslib_1.__decorate([
        Cache_1.Cacheable
    ], StreamAPI);
    return StreamAPI;
}(BaseAPI_1.default));
exports.default = StreamAPI;
//# sourceMappingURL=StreamAPI.js.map