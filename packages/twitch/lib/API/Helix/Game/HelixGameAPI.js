"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TwitchClient_1 = require("../../../TwitchClient");
var BaseAPI_1 = require("../../BaseAPI");
var HelixPaginatedRequest_1 = require("../HelixPaginatedRequest");
var HelixPagination_1 = require("../HelixPagination");
var HelixGame_1 = require("./HelixGame");
/**
 * The Helix API methods that deal with games.
 *
 * Can be accessed using `client.helix.games` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const game = await client.helix.games.getGameByName('Hearthstone');
 * ```
 */
var HelixGameAPI = /** @class */ (function (_super) {
    tslib_1.__extends(HelixGameAPI, _super);
    function HelixGameAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves the game data for the given list of game IDs.
     *
     * @param ids The game IDs you want to look up.
     */
    HelixGameAPI.prototype.getGamesByIds = function (ids) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._getGames('id', ids)];
            });
        });
    };
    /**
     * Retrieves the game data for the given list of game names.
     *
     * @param names The game names you want to look up.
     */
    HelixGameAPI.prototype.getGamesByNames = function (names) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._getGames('name', names)];
            });
        });
    };
    /**
     * Retrieves the game data for the given game ID.
     *
     * @param id The game ID you want to look up.
     */
    HelixGameAPI.prototype.getGameById = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var games;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getGames('id', id)];
                    case 1:
                        games = _a.sent();
                        return [2 /*return*/, games.length ? games[0] : null];
                }
            });
        });
    };
    /**
     * Retrieves the game data for the given game name.
     *
     * @param name The game name you want to look up.
     */
    HelixGameAPI.prototype.getGameByName = function (name) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var games;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getGames('name', name)];
                    case 1:
                        games = _a.sent();
                        return [2 /*return*/, games.length ? games[0] : null];
                }
            });
        });
    };
    /**
     * Retrieves a list of the most viewed games at the moment.
     *
     * @param pagination Pagination info.
     */
    HelixGameAPI.prototype.getTopGames = function (pagination) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({
                            type: TwitchClient_1.TwitchAPICallType.Helix,
                            url: 'games/top',
                            query: HelixPagination_1.makePaginationQuery(pagination)
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, {
                                data: result.data.map(function (data) { return new HelixGame_1.default(data, _this._client); }),
                                cursor: result.pagination && result.pagination.cursor
                            }];
                }
            });
        });
    };
    /**
     * Creates a paginator for the most viewed games at the moment.
     */
    HelixGameAPI.prototype.getTopGamesPaginated = function () {
        var _this = this;
        return new HelixPaginatedRequest_1.default({
            url: 'games/top'
        }, this._client, function (data) { return new HelixGame_1.default(data, _this._client); });
    };
    HelixGameAPI.prototype._getGames = function (filterType, filterValues) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            var _a;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({
                            type: TwitchClient_1.TwitchAPICallType.Helix,
                            url: 'games',
                            query: (_a = {},
                                _a[filterType] = filterValues,
                                _a)
                        })];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, result.data.map(function (entry) { return new HelixGame_1.default(entry, _this._client); })];
                }
            });
        });
    };
    return HelixGameAPI;
}(BaseAPI_1.default));
exports.default = HelixGameAPI;
//# sourceMappingURL=HelixGameAPI.js.map