"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ircv3_1 = require("ircv3");
/** @private */
var ClearChat = /** @class */ (function (_super) {
    tslib_1.__extends(ClearChat, _super);
    function ClearChat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            type: 'channel'
        })
    ], ClearChat.prototype, "channel", void 0);
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            trailing: true,
            optional: true
        })
    ], ClearChat.prototype, "user", void 0);
    ClearChat = tslib_1.__decorate([
        ircv3_1.MessageType('CLEARCHAT')
    ], ClearChat);
    return ClearChat;
}(ircv3_1.Message));
exports.default = ClearChat;
//# sourceMappingURL=ClearChat.js.map