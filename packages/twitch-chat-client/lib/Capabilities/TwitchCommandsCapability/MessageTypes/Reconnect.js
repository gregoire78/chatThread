"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ircv3_1 = require("ircv3");
/** @private */
var Reconnect = /** @class */ (function (_super) {
    tslib_1.__extends(Reconnect, _super);
    function Reconnect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Reconnect.COMMAND = 'RECONNECT';
    return Reconnect;
}(ircv3_1.Message));
exports.default = Reconnect;
//# sourceMappingURL=Reconnect.js.map