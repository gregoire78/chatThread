"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var HelixUser_1 = require("./HelixUser");
/**
 * A user you have extended privilges for, i.e. yourself.
 */
var HelixPrivilegedUser = /** @class */ (function (_super) {
    tslib_1.__extends(HelixPrivilegedUser, _super);
    function HelixPrivilegedUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(HelixPrivilegedUser.prototype, "email", {
        /**
         * The email address of the user.
         */
        get: function () {
            return this._data.email;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Changes the description of the user.
     *
     * @param description The new description.
     */
    HelixPrivilegedUser.prototype.setDescription = function (description) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.users.updateUser({ description: description })];
            });
        });
    };
    return HelixPrivilegedUser;
}(HelixUser_1.default));
exports.default = HelixPrivilegedUser;
//# sourceMappingURL=HelixPrivilegedUser.js.map