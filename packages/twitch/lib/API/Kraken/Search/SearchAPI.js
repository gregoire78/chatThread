"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Cache_1 = require("../../../Toolkit/Decorators/Cache");
var BaseAPI_1 = require("../../BaseAPI");
var Channel_1 = require("../Channel/Channel");
var Stream_1 = require("../Stream/Stream");
/**
 * The API methods that deal with searching.
 *
 * Can be accessed using `client.kraken.search` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const channel = await client.kraken.search.searchStreams('Hearthstone');
 * ```
 */
var SearchAPI = /** @class */ (function (_super) {
    tslib_1.__extends(SearchAPI, _super);
    function SearchAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves a list of channels that match the given search term.
     *
     * @param term The term you want to search for.
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     */
    SearchAPI.prototype.searchChannels = function (term, page, limit) {
        if (limit === void 0) { limit = 25; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var query, data;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = { query: term, limit: limit.toString() };
                        if (page) {
                            query.offset = ((page - 1) * limit).toString();
                        }
                        return [4 /*yield*/, this._client.callAPI({ url: 'search/channels', query: query })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.channels.map(function (channelData) { return new Channel_1.default(channelData, _this._client); })];
                }
            });
        });
    };
    /**
     * Retrieves a list of streams that match the given search term.
     *
     * @param term The term you want to search for.
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     * @param hls Whether you want only HLS or only non-HLS (RTMP) streams. If not set, finds both types of streams.
     */
    SearchAPI.prototype.searchStreams = function (term, page, limit, hls) {
        if (limit === void 0) { limit = 25; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var query, data;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = { query: term, limit: limit.toString() };
                        if (page) {
                            query.offset = ((page - 1) * limit).toString();
                        }
                        if (hls !== undefined) {
                            query.hls = hls.toString();
                        }
                        return [4 /*yield*/, this._client.callAPI({ url: 'search/streams', query: query })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.streams.map(function (streamData) { return new Stream_1.default(streamData, _this._client); })];
                }
            });
        });
    };
    tslib_1.__decorate([
        Cache_1.Cached(300)
    ], SearchAPI.prototype, "searchChannels", null);
    tslib_1.__decorate([
        Cache_1.Cached(300)
    ], SearchAPI.prototype, "searchStreams", null);
    SearchAPI = tslib_1.__decorate([
        Cache_1.Cacheable
    ], SearchAPI);
    return SearchAPI;
}(BaseAPI_1.default));
exports.default = SearchAPI;
//# sourceMappingURL=SearchAPI.js.map