"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BaseAPI_1 = require("../BaseAPI");
var Cache_1 = require("../../Toolkit/Decorators/Cache");
var ChatBadgeList_1 = require("./ChatBadgeList");
var TwitchClient_1 = require("../../TwitchClient");
var UserTools_1 = require("../../Toolkit/UserTools");
/**
 * The API methods that deal with badges.
 *
 * Can be accessed using `client.badges` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const cheermotes = await client.badges.getGlobalBadges();
 * ```
 */
var BadgesAPI = /** @class */ (function (_super) {
    tslib_1.__extends(BadgesAPI, _super);
    function BadgesAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves all globally applicable chat badges.
     */
    BadgesAPI.prototype.getGlobalBadges = function (language) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({
                            url: "https://badges.twitch.tv/v1/badges/global/display" + (language ? "?language=" + language : ''),
                            type: TwitchClient_1.TwitchAPICallType.Custom
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, new ChatBadgeList_1.default(data.badge_sets, this._client)];
                }
            });
        });
    };
    /**
     * Retrieves all applicable chat badges for a given channel.
     *
     * @param channel The channel to retrieve the chat badges for.
     * @param includeGlobal Whether to include global badges in the result list.
     */
    BadgesAPI.prototype.getChannelBadges = function (channel, includeGlobal, language) {
        if (includeGlobal === void 0) { includeGlobal = true; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, channelBadges;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({
                            url: "https://badges.twitch.tv/v1/badges/channels/" + UserTools_1.extractUserId(channel) + "/display" + (language ? "?language=" + language : ''),
                            type: TwitchClient_1.TwitchAPICallType.Custom
                        })];
                    case 1:
                        data = _a.sent();
                        channelBadges = new ChatBadgeList_1.default(data.badge_sets, this._client);
                        if (!includeGlobal) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getGlobalBadges(language)];
                    case 2: return [2 /*return*/, (_a.sent())._merge(channelBadges)];
                    case 3: return [2 /*return*/, channelBadges];
                }
            });
        });
    };
    tslib_1.__decorate([
        Cache_1.Cached(3600)
    ], BadgesAPI.prototype, "getGlobalBadges", null);
    tslib_1.__decorate([
        Cache_1.Cached(3600)
    ], BadgesAPI.prototype, "getChannelBadges", null);
    BadgesAPI = tslib_1.__decorate([
        Cache_1.Cacheable
    ], BadgesAPI);
    return BadgesAPI;
}(BaseAPI_1.default));
exports.default = BadgesAPI;
//# sourceMappingURL=BadgesAPI.js.map