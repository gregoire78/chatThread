"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BaseAPI_1 = require("../../BaseAPI");
var Cache_1 = require("../../../Toolkit/Decorators/Cache");
var UserTools_1 = require("../../../Toolkit/UserTools");
var ChatEmoteList_1 = require("./ChatEmoteList");
var ChatRoom_1 = require("./ChatRoom");
/**
 * The API methods that deal with chat and chatrooms.
 *
 * Can be accessed using `client.kraken.chat` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const channel = await client.kraken.chat.getBadges('125328655');
 * ```
 */
var ChatAPI = /** @class */ (function (_super) {
    tslib_1.__extends(ChatAPI, _super);
    function ChatAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves a list of emotes for a given list of enote set IDs.
     *
     * @param emotesets The list of emote set IDs, either as array of strings or as a comma separated string.
     */
    ChatAPI.prototype.getEmotesBySets = function (emotesets) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof emotesets !== 'string') {
                            emotesets = emotesets.join(',');
                        }
                        return [4 /*yield*/, this._client.callAPI({
                                url: 'chat/emoticon_images',
                                query: {
                                    emotesets: emotesets
                                }
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, new ChatEmoteList_1.default(data.emoticons, this._client)];
                }
            });
        });
    };
    /**
     * Retrieves a list of chat rooms for a given channel.
     *
     * @param channel The channel to retrieve the chat rooms of.
     */
    ChatAPI.prototype.getChatRoomsForChannel = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({
                            url: "chat/" + UserTools_1.extractUserId(channel) + "/rooms"
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.rooms.map(function (room) { return new ChatRoom_1.default(room, _this._client); })];
                }
            });
        });
    };
    tslib_1.__decorate([
        Cache_1.Cached(3600)
    ], ChatAPI.prototype, "getEmotesBySets", null);
    tslib_1.__decorate([
        Cache_1.Cached(3600)
    ], ChatAPI.prototype, "getChatRoomsForChannel", null);
    ChatAPI = tslib_1.__decorate([
        Cache_1.Cacheable
    ], ChatAPI);
    return ChatAPI;
}(BaseAPI_1.default));
exports.default = ChatAPI;
//# sourceMappingURL=ChatAPI.js.map