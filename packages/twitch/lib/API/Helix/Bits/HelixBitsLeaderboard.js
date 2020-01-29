"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
var HelixBitsLeaderboardEntry_1 = require("./HelixBitsLeaderboardEntry");
var Cache_1 = require("../../../Toolkit/Decorators/Cache");
/**
 * A leaderboard where the users who used the most bits to a broadcaster are listed.
 */
var HelixBitsLeaderboard = /** @class */ (function () {
    /** @private */
    function HelixBitsLeaderboard(_data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(HelixBitsLeaderboard.prototype, "entries", {
        /**
         * The entries of the leaderboard.
         */
        get: function () {
            var _this = this;
            return this._data.data.map(function (entry) { return new HelixBitsLeaderboardEntry_1.default(entry, _this._client); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixBitsLeaderboard.prototype, "totalCount", {
        /**
         * The total amount of people on the requested leaderboard.
         */
        get: function () {
            return this._data.total;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], HelixBitsLeaderboard.prototype, "_client", void 0);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], HelixBitsLeaderboard.prototype, "entries", null);
    HelixBitsLeaderboard = tslib_1.__decorate([
        Cache_1.Cacheable
    ], HelixBitsLeaderboard);
    return HelixBitsLeaderboard;
}());
exports.default = HelixBitsLeaderboard;
//# sourceMappingURL=HelixBitsLeaderboard.js.map