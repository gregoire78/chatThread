"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ircv3_1 = require("ircv3");
var ChatUser_1 = require("../../../ChatUser");
var ChatTools_1 = require("../../../Toolkit/ChatTools");
/** @private */
var Whisper = /** @class */ (function (_super) {
    tslib_1.__extends(Whisper, _super);
    function Whisper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Whisper.prototype, "userInfo", {
        get: function () {
            return new ChatUser_1.default(this._prefix.nick, this._tags);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Whisper.prototype, "emoteOffsets", {
        get: function () {
            if (!this._tags) {
                return new Map();
            }
            return ChatTools_1.parseEmotes(this._tags.get('emotes'));
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition()
    ], Whisper.prototype, "target", void 0);
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            trailing: true,
            optional: true
        })
    ], Whisper.prototype, "message", void 0);
    Whisper = tslib_1.__decorate([
        ircv3_1.MessageType('WHISPER')
    ], Whisper);
    return Whisper;
}(ircv3_1.Message));
exports.default = Whisper;
//# sourceMappingURL=Whisper.js.map