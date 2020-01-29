"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Cache_1 = require("../../../Toolkit/Decorators/Cache");
/**
 * A list of emotes, grouped into emote sets, that a user can use.
 */
var EmoteSetList = /** @class */ (function () {
    /** @private */
    function EmoteSetList(_data) {
        this._data = _data;
    }
    /**
     * Finds the emote ID for the given emote code.
     *
     * @param emoteCode The emote code to check for.
     */
    EmoteSetList.prototype.findEmoteId = function (emoteCode) {
        var e_1, _a, e_2, _b;
        try {
            for (var _c = tslib_1.__values(Object.values(this._data)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var emoteSet = _d.value;
                try {
                    for (var emoteSet_1 = (e_2 = void 0, tslib_1.__values(emoteSet)), emoteSet_1_1 = emoteSet_1.next(); !emoteSet_1_1.done; emoteSet_1_1 = emoteSet_1.next()) {
                        var emote = emoteSet_1_1.value;
                        if (new RegExp(emote.code).test(emoteCode)) {
                            return emote.id;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (emoteSet_1_1 && !emoteSet_1_1.done && (_b = emoteSet_1.return)) _b.call(emoteSet_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return undefined;
    };
    tslib_1.__decorate([
        Cache_1.Cached(Infinity, true)
    ], EmoteSetList.prototype, "findEmoteId", null);
    EmoteSetList = tslib_1.__decorate([
        Cache_1.Cacheable
    ], EmoteSetList);
    return EmoteSetList;
}());
exports.default = EmoteSetList;
//# sourceMappingURL=EmoteSetList.js.map