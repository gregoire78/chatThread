"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ircv3_1 = require("ircv3");
/** @private */
var UserState = /** @class */ (function (_super) {
    tslib_1.__extends(UserState, _super);
    function UserState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            type: 'channel'
        })
    ], UserState.prototype, "type", void 0);
    UserState = tslib_1.__decorate([
        ircv3_1.MessageType('USERSTATE')
    ], UserState);
    return UserState;
}(ircv3_1.Message));
exports.default = UserState;
//# sourceMappingURL=UserState.js.map