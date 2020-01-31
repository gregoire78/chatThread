"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/** @private */
function parseEmotes(emotes) {
    if (!emotes) {
        return new Map();
    }
    return new Map(emotes.split('/').map(function (emote) {
        var _a = tslib_1.__read(emote.split(':', 2), 2), emoteId = _a[0], placements = _a[1];
        return [emoteId, placements.split(',')];
    }));
}
exports.parseEmotes = parseEmotes;
//# sourceMappingURL=ChatTools.js.map