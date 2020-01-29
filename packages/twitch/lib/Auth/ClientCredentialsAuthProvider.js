"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../Toolkit/Decorators/NonEnumerable");
var TwitchClient_1 = require("../TwitchClient");
/**
 * An auth provider that retrieve tokens using client credentials.
 */
var ClientCredentialsAuthProvider = /** @class */ (function () {
    /**
     * Creates a new auth provider to receive an application token with using the client ID and secret.
     *
     * You don't usually have to create this manually. You should use `TwitchClient.withClientCredentials` instead.
     *
     * @param clientId The client ID of your application.
     * @param clientSecret The client secret of your application.
     *
     * You need to obtain one using one of the [Twitch OAuth flows](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).
     */
    function ClientCredentialsAuthProvider(clientId, clientSecret) {
        this._clientId = clientId;
        this._clientSecret = clientSecret;
    }
    /**
     * Retrieves an access token.
     *
     * If any scopes are provided, this throws. The client credentials flow does not support scopes.
     *
     * @param scopes The requested scopes.
     */
    ClientCredentialsAuthProvider.prototype.getAccessToken = function (scopes) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (scopes && scopes.length > 0) {
                    throw new Error('The client credentials flow does not support scopes');
                }
                if (!this._token || this._token.isExpired) {
                    return [2 /*return*/, this.refresh()];
                }
                return [2 /*return*/, this._token];
            });
        });
    };
    /**
     * Retrieves a new app access token.
     */
    ClientCredentialsAuthProvider.prototype.refresh = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, TwitchClient_1.default.getAppAccessToken(this._clientId, this._clientSecret)];
                    case 1: return [2 /*return*/, (_a._token = _b.sent())];
                }
            });
        });
    };
    /** @private */
    ClientCredentialsAuthProvider.prototype.setAccessToken = function (token) {
        this._token = token;
    };
    Object.defineProperty(ClientCredentialsAuthProvider.prototype, "clientId", {
        /**
         * The client ID.
         */
        get: function () {
            return this._clientId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientCredentialsAuthProvider.prototype, "currentScopes", {
        /**
         * The scopes that are currently available using the access token.
         */
        get: function () {
            return [];
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], ClientCredentialsAuthProvider.prototype, "_clientId", void 0);
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], ClientCredentialsAuthProvider.prototype, "_clientSecret", void 0);
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], ClientCredentialsAuthProvider.prototype, "_token", void 0);
    return ClientCredentialsAuthProvider;
}());
exports.default = ClientCredentialsAuthProvider;
//# sourceMappingURL=ClientCredentialsAuthProvider.js.map