"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ircv3_1 = require("ircv3");
// this command has no *useful* parameters, all information is in tags
/** @private */
var HostTarget = /** @class */ (function (_super) {
    tslib_1.__extends(HostTarget, _super);
    function HostTarget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            type: 'channel'
        })
    ], HostTarget.prototype, "channel", void 0);
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            trailing: true
        })
    ], HostTarget.prototype, "targetAndViewers", void 0);
    HostTarget = tslib_1.__decorate([
        ircv3_1.MessageType('HOSTTARGET')
    ], HostTarget);
    return HostTarget;
}(ircv3_1.Message));
exports.default = HostTarget;
//# sourceMappingURL=HostTarget.js.map