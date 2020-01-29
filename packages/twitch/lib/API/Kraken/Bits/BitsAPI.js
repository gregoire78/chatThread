"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var UserTools_1 = require("../../../Toolkit/UserTools");
var Cache_1 = require("../../../Toolkit/Decorators/Cache");
var CheermoteList_1 = require("./CheermoteList");
var BaseAPI_1 = require("../../BaseAPI");
/**
 * The API methods that deal with Bits/Cheermotes.
 *
 * Can be accessed using `client.kraken.bits` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const cheermotes = await client.kraken.bits.getCheermotes();
 * ```
 */
var BitsAPI = /** @class */ (function (_super) {
    tslib_1.__extends(BitsAPI, _super);
    function BitsAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves global and channel cheermotes.
     *
     * @param channel The channel you want to retrieve the available cheermotes for.
     * If not given, this method retrieves a list of globally available cheermotes.
     * @param includeSponsored Whether to include sponsored cheermotes in the list.
     */
    BitsAPI.prototype.getCheermotes = function (channel, includeSponsored) {
        if (includeSponsored === void 0) { includeSponsored = true; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var query, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {};
                        if (channel) {
                            query.channel_id = UserTools_1.extractUserId(channel);
                        }
                        if (includeSponsored) {
                            query.include_sponsored = 'true';
                        }
                        return [4 /*yield*/, this._client.callAPI({ url: 'bits/actions', query: query })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, new CheermoteList_1.default(data.actions, this._client)];
                }
            });
        });
    };
    tslib_1.__decorate([
        Cache_1.Cached(3600)
    ], BitsAPI.prototype, "getCheermotes", null);
    BitsAPI = tslib_1.__decorate([
        Cache_1.Cacheable
    ], BitsAPI);
    return BitsAPI;
}(BaseAPI_1.default));
exports.default = BitsAPI;
//# sourceMappingURL=BitsAPI.js.map