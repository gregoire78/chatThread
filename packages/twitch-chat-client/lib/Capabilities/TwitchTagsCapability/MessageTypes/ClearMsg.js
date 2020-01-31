"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ircv3_1 = require("ircv3");
/**
 * @private
 */
var ClearMsg = /** @class */ (function (_super) {
    tslib_1.__extends(ClearMsg, _super);
    function ClearMsg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ClearMsg.prototype, "userName", {
        get: function () {
            return this._tags.get('login');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClearMsg.prototype, "targetMessageId", {
        get: function () {
            return this._tags.get('target-msg-id');
        },
        enumerable: true,
        configurable: true
    });
    ClearMsg.COMMAND = 'CLEARMSG';
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            type: 'channel'
        })
    ], ClearMsg.prototype, "channel", void 0);
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            trailing: true
        })
    ], ClearMsg.prototype, "message", void 0);
    return ClearMsg;
}(ircv3_1.Message));
exports.default = ClearMsg;
//# sourceMappingURL=ClearMsg.js.map