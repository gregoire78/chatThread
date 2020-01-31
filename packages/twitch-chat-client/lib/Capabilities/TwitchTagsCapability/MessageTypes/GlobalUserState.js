"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ircv3_1 = require("ircv3");
/**
 * This command has no parameters, all information is in tags.
 *
 * @private
 */
var GlobalUserState = /** @class */ (function (_super) {
    tslib_1.__extends(GlobalUserState, _super);
    function GlobalUserState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GlobalUserState.COMMAND = 'GLOBALUSERSTATE';
    return GlobalUserState;
}(ircv3_1.Message));
exports.default = GlobalUserState;
//# sourceMappingURL=GlobalUserState.js.map