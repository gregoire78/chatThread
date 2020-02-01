"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ircv3_1 = require("ircv3");
/** @private */
var RoomState = /** @class */ (function (_super) {
    tslib_1.__extends(RoomState, _super);
    function RoomState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            type: 'channel'
        })
    ], RoomState.prototype, "channel", void 0);
    RoomState = tslib_1.__decorate([
        ircv3_1.MessageType('ROOMSTATE')
    ], RoomState);
    return RoomState;
}(ircv3_1.Message));
exports.default = RoomState;
//# sourceMappingURL=RoomState.js.map