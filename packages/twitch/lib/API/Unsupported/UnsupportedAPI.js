"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Cache_1 = require("../../Toolkit/Decorators/Cache");
var BaseAPI_1 = require("../BaseAPI");
var ChattersList_1 = require("./ChattersList");
var UserTools_1 = require("../../Toolkit/UserTools");
var ChannelEvent_1 = require("./ChannelEvent");
var TwitchClient_1 = require("../../TwitchClient");
/**
 * Different API methods that are not officially supported by Twitch.
 *
 * Can be accessed using `client.unsupported` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const events = await client.unsupported.getEvents('125328655');
 * ```
 */
var UnsupportedAPI = /** @class */ (function (_super) {
    tslib_1.__extends(UnsupportedAPI, _super);
    function UnsupportedAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves a list of chatters in the Twitch chat of the given channel.
     *
     * **WARNING**: In contrast to most other methods, this takes a channel *name*, not a user ID.
     *
     * @param channel The channel to retrieve the chatters for.
     */
    UnsupportedAPI.prototype.getChatters = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channelName, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelName = UserTools_1.extractUserName(channel);
                        return [4 /*yield*/, this._client.callAPI({
                                url: "https://tmi.twitch.tv/group/user/" + channelName + "/chatters",
                                type: TwitchClient_1.TwitchAPICallType.Custom
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, new ChattersList_1.default(data)];
                }
            });
        });
    };
    /**
     * Retrieves a list of event planned for the given channel.
     *
     * @param channel The channel to retrieve the events for.
     */
    UnsupportedAPI.prototype.getEvents = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channelId, data;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelId = UserTools_1.extractUserId(channel);
                        return [4 /*yield*/, this._client.callAPI({ url: "channels/" + channelId + "/events" })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.events.map(function (event) { return new ChannelEvent_1.default(event, _this._client); })];
                }
            });
        });
    };
    tslib_1.__decorate([
        Cache_1.Cached(60)
    ], UnsupportedAPI.prototype, "getChatters", null);
    tslib_1.__decorate([
        Cache_1.Cached(60)
    ], UnsupportedAPI.prototype, "getEvents", null);
    UnsupportedAPI = tslib_1.__decorate([
        Cache_1.Cacheable
    ], UnsupportedAPI);
    return UnsupportedAPI;
}(BaseAPI_1.default));
exports.default = UnsupportedAPI;
//# sourceMappingURL=UnsupportedAPI.js.map