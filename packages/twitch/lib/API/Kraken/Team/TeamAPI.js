"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BaseAPI_1 = require("../../BaseAPI");
var Cache_1 = require("../../../Toolkit/Decorators/Cache");
var Team_1 = require("./Team");
var TeamWithUsers_1 = require("./TeamWithUsers");
/**
 * The API methods that deal with teams.
 *
 * Can be accessed using `client.kraken.teams` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const team = await client.kraken.teams.getTeamByName('staff');
 * ```
 */
var TeamAPI = /** @class */ (function (_super) {
    tslib_1.__extends(TeamAPI, _super);
    function TeamAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get a list of teams.
     *
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     */
    TeamAPI.prototype.getTeams = function (page, limit) {
        if (limit === void 0) { limit = 25; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var query, data;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {};
                        if (page) {
                            query.offset = ((page - 1) * limit).toString();
                        }
                        query.limit = limit.toString();
                        return [4 /*yield*/, this._client.callAPI({
                                url: 'teams',
                                query: query
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.teams.map(function (team) { return new Team_1.default(team, _this._client); })];
                }
            });
        });
    };
    /**
     * Retrieves the team data for the given team name.
     *
     * @param team The team name you want to look up.
     */
    TeamAPI.prototype.getTeamByName = function (team) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var teamData;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({ url: "teams/" + team })];
                    case 1:
                        teamData = _a.sent();
                        return [2 /*return*/, new TeamWithUsers_1.default(teamData, this._client)];
                }
            });
        });
    };
    tslib_1.__decorate([
        Cache_1.Cached(3600)
    ], TeamAPI.prototype, "getTeams", null);
    tslib_1.__decorate([
        Cache_1.Cached(3600)
    ], TeamAPI.prototype, "getTeamByName", null);
    TeamAPI = tslib_1.__decorate([
        Cache_1.Cacheable
    ], TeamAPI);
    return TeamAPI;
}(BaseAPI_1.default));
exports.default = TeamAPI;
//# sourceMappingURL=TeamAPI.js.map