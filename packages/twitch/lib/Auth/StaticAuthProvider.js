"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AccessToken_1 = require("../API/AccessToken");
var NonEnumerable_1 = require("../Toolkit/Decorators/NonEnumerable");
var TwitchClient_1 = require("../TwitchClient");
/**
 * An auth provider that always returns the same initially given credentials.
 *
 * You are advised to roll your own auth provider that can handle scope upgrades,
 * or to plan ahead and supply only access tokens that account for all scopes
 * you will ever need.
 */
var StaticAuthProvider = /** @class */ (function () {
    /**
     * Creates a new auth provider with static credentials.
     *
     * You don't usually have to create this manually. You should use `TwitchClient.withCredentials` instead.
     *
     * @param clientId The client ID.
     * @param accessToken The access token to provide.
     *
     * You need to obtain one using one of the [Twitch OAuth flows](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).
     * @param scopes The scopes this token has.
     */
    function StaticAuthProvider(clientId, accessToken, scopes) {
        if (scopes === void 0) { scopes = []; }
        this._clientId = clientId || '';
        if (accessToken) {
            this._accessToken =
                typeof accessToken === 'string'
                    ? new AccessToken_1.default({
                        access_token: accessToken,
                        scope: scopes,
                        refresh_token: ''
                    })
                    : accessToken;
            this._scopes = scopes;
        }
    }
    /**
     * Retrieves an access token.
     *
     * If the current access token does not have the requested scopes, this method throws.
     * This makes supplying an access token with the correct scopes from the beginning necessary.
     *
     * @param scopes The requested scopes.
     */
    StaticAuthProvider.prototype.getAccessToken = function (scopes) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tokenInfo;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(scopes && scopes.length > 0)) return [3 /*break*/, 3];
                        if (!!this._scopes) return [3 /*break*/, 2];
                        if (!this._accessToken) {
                            throw new Error('Auth provider has not been initialized with a token yet and is requesting scopes');
                        }
                        return [4 /*yield*/, TwitchClient_1.default.getTokenInfo(this._clientId, this._accessToken.accessToken)];
                    case 1:
                        tokenInfo = _a.sent();
                        if (!tokenInfo.valid) {
                            throw new Error('Auth provider has been initialized with an invalid token');
                        }
                        this._scopes = tokenInfo.scopes;
                        _a.label = 2;
                    case 2:
                        if (typeof scopes === 'string') {
                            scopes = scopes.split(' ');
                        }
                        if (scopes.some(function (scope) { return !_this._scopes.includes(scope); })) {
                            throw new Error("This token does not have the requested scopes (" + scopes.join(', ') + ") and can not be upgraded");
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, this._accessToken || null];
                }
            });
        });
    };
    /** @private */
    StaticAuthProvider.prototype.setAccessToken = function (token) {
        this._accessToken = token;
    };
    Object.defineProperty(StaticAuthProvider.prototype, "clientId", {
        /**
         * The client ID.
         */
        get: function () {
            return this._clientId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StaticAuthProvider.prototype, "currentScopes", {
        /**
         * The scopes that are currently available using the access token.
         */
        get: function () {
            return this._scopes || [];
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], StaticAuthProvider.prototype, "_clientId", void 0);
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], StaticAuthProvider.prototype, "_accessToken", void 0);
    return StaticAuthProvider;
}());
exports.default = StaticAuthProvider;
//# sourceMappingURL=StaticAuthProvider.js.map