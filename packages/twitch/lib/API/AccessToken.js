"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents the data of an OAuth access token returned by Twitch.
 */
var AccessToken = /** @class */ (function () {
    /** @private */
    function AccessToken(_data, obtainmentDate) {
        this._data = _data;
        this._obtainmentDate = obtainmentDate || new Date();
    }
    Object.defineProperty(AccessToken.prototype, "accessToken", {
        /**
         * The access token which is necessary for every request to the Twitch API.
         */
        get: function () {
            return this._data.access_token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccessToken.prototype, "refreshToken", {
        /**
         * The refresh token which is necessary to refresh the access token once it expires.
         */
        get: function () {
            return this._data.refresh_token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccessToken.prototype, "expiryDate", {
        /**
         * The time when the access token will expire.
         *
         * May be `null`, in which case the token does not expire.
         * This can only be the case with very old Client IDs.
         */
        get: function () {
            if (!this._data.expires_in) {
                return null;
            }
            return new Date(this._obtainmentDate.getTime() + this._data.expires_in * 1000);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccessToken.prototype, "isExpired", {
        get: function () {
            if (!this._data.expires_in) {
                return false;
            }
            return Date.now() > this._obtainmentDate.getTime() + this._data.expires_in * 1000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccessToken.prototype, "scope", {
        /**
         * The scope the access token is valid for, i.e. what this token enables you to do.
         */
        get: function () {
            return this._data.scope || [];
        },
        enumerable: true,
        configurable: true
    });
    return AccessToken;
}());
exports.default = AccessToken;
//# sourceMappingURL=AccessToken.js.map