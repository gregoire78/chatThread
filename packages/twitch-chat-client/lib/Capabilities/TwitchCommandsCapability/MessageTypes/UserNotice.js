"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ircv3_1 = require("ircv3");
var ChatUser_1 = require("../../../ChatUser");
var ChatTools_1 = require("../../../Toolkit/ChatTools");
/** @private */
var UserNotice = /** @class */ (function (_super) {
    tslib_1.__extends(UserNotice, _super);
    function UserNotice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UserNotice.prototype, "userInfo", {
        get: function () {
            return new ChatUser_1.default(this._prefix.nick, this._tags);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserNotice.prototype, "emoteOffsets", {
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
        ircv3_1.MessageParamDefinition({
            type: 'channel'
        })
    ], UserNotice.prototype, "channel", void 0);
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            trailing: true,
            optional: true
        })
    ], UserNotice.prototype, "message", void 0);
    UserNotice = tslib_1.__decorate([
        ircv3_1.MessageType('USERNOTICE')
    ], UserNotice);
    return UserNotice;
}(ircv3_1.Message));
exports.default = UserNotice;
//# sourceMappingURL=UserNotice.js.map