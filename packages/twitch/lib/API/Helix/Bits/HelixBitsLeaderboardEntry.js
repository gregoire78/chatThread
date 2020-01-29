"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
/**
 * A Bits leaderboard entry.
 */
var HelixBitsLeaderboardEntry = /** @class */ (function () {
    /** @private */
    function HelixBitsLeaderboardEntry(_data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(HelixBitsLeaderboardEntry.prototype, "userId", {
        /**
         * The ID of the user on the leaderboard.
         */
        get: function () {
            return this._data.user_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixBitsLeaderboardEntry.prototype, "userDisplayName", {
        /**
         * The display name of the user on the leaderboard.
         */
        get: function () {
            return this._data.user_name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixBitsLeaderboardEntry.prototype, "rank", {
        /**
         * The position of the user on the leaderboard.
         */
        get: function () {
            return this._data.rank;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixBitsLeaderboardEntry.prototype, "amount", {
        /**
         * The amount of bits used in the given period of time.
         */
        get: function () {
            return this._data.score;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves the user that's on this place on the leaderboard.
     */
    HelixBitsLeaderboardEntry.prototype.getUser = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.users.getUserById(this._data.user_id)];
            });
        });
    };
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], HelixBitsLeaderboardEntry.prototype, "_client", void 0);
    return HelixBitsLeaderboardEntry;
}());
exports.default = HelixBitsLeaderboardEntry;
//# sourceMappingURL=HelixBitsLeaderboardEntry.js.map