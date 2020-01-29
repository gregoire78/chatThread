"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Information about an access token.
 */
var TokenInfo = /** @class */ (function () {
    /** @private */
    function TokenInfo(_data) {
        this._data = _data;
        this._obtainmentDate = new Date();
    }
    Object.defineProperty(TokenInfo.prototype, "clientId", {
        /**
         * The client ID.
         */
        get: function () {
            return this._data ? this._data.client_id : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenInfo.prototype, "userId", {
        /**
         * The ID of the authenticated user.
         */
        get: function () {
            return this._data ? this._data.user_id : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenInfo.prototype, "userName", {
        /**
         * The user name of the authenticated user.
         */
        get: function () {
            return this._data ? this._data.login : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenInfo.prototype, "scopes", {
        /**
         * The scopes for which this token is valid.
         */
        get: function () {
            return this._data ? this._data.scopes : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenInfo.prototype, "valid", {
        /**
         * Whether the token is valid or not.
         *
         * @deprecated This will be replaced with an exception soon; you can already add a try-catch for this future case.
         */
        get: function () {
            return !!this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenInfo.prototype, "expiryDate", {
        /**
         * The time when the token will expire.
         *
         * If this returns null, it means that the token is either invalid or never expires (happens with old client IDs).
         */
        get: function () {
            if (!this._data || !this._data.expires_in) {
                return null;
            }
            return new Date(this._obtainmentDate.getTime() + this._data.expires_in * 1000);
        },
        enumerable: true,
        configurable: true
    });
    return TokenInfo;
}());
exports.default = TokenInfo;
//# sourceMappingURL=TokenInfo.js.map