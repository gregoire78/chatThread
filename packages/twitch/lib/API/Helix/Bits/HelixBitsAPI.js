"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BaseAPI_1 = require("../../BaseAPI");
var TwitchClient_1 = require("../../../TwitchClient");
var HelixBitsLeaderboard_1 = require("./HelixBitsLeaderboard");
/**
 * The Helix API methods that deal with bits.
 *
 * Can be accessed using `client.helix.bits` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const leaderboard = await client.helix.bits.getLeaderboard({ period: 'day' });
 * ```
 */
var HelixBitsAPI = /** @class */ (function (_super) {
    tslib_1.__extends(HelixBitsAPI, _super);
    function HelixBitsAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a bits leaderboard of your channel.
     *
     * @expandParams
     */
    HelixBitsAPI.prototype.getLeaderboard = function (params) {
        if (params === void 0) { params = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, count, _b, period, startDate, contextUserId, result;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = params.count, count = _a === void 0 ? 10 : _a, _b = params.period, period = _b === void 0 ? 'all' : _b, startDate = params.startDate, contextUserId = params.contextUserId;
                        return [4 /*yield*/, this._client.callAPI({
                                type: TwitchClient_1.TwitchAPICallType.Helix,
                                url: 'bits/leaderboard',
                                scope: 'bits:read',
                                query: {
                                    count: count.toString(),
                                    period: period,
                                    started_at: startDate ? startDate.toISOString() : undefined,
                                    user_id: contextUserId
                                }
                            })];
                    case 1:
                        result = _c.sent();
                        return [2 /*return*/, new HelixBitsLeaderboard_1.default(result, this._client)];
                }
            });
        });
    };
    return HelixBitsAPI;
}(BaseAPI_1.default));
exports.default = HelixBitsAPI;
//# sourceMappingURL=HelixBitsAPI.js.map