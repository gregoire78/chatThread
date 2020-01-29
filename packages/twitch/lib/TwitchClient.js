"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fetchPonyfill = require("fetch-ponyfill");
var qs = require("qs");
var AccessToken_1 = require("./API/AccessToken");
var BadgesAPI_1 = require("./API/Badges/BadgesAPI");
var HelixAPIGroup_1 = require("./API/Helix/HelixAPIGroup");
var CheermoteList_1 = require("./API/Kraken/Bits/CheermoteList");
var KrakenAPIGroup_1 = require("./API/Kraken/KrakenAPIGroup");
var TokenInfo_1 = require("./API/TokenInfo");
var UnsupportedAPI_1 = require("./API/Unsupported/UnsupportedAPI");
var ClientCredentialsAuthProvider_1 = require("./Auth/ClientCredentialsAuthProvider");
var RefreshableAuthProvider_1 = require("./Auth/RefreshableAuthProvider");
var StaticAuthProvider_1 = require("./Auth/StaticAuthProvider");
var ConfigError_1 = require("./Errors/ConfigError");
var HTTPStatusCodeError_1 = require("./Errors/HTTPStatusCodeError");
var Cache_1 = require("./Toolkit/Decorators/Cache");
var _a = fetchPonyfill(), fetch = _a.fetch, Headers = _a.Headers;
/**
 * The endpoint to call, i.e. /kraken, /helix or a custom (potentially unsupported) endpoint.
 */
var TwitchAPICallType;
(function (TwitchAPICallType) {
    /**
     * Call a Kraken API endpoint.
     */
    TwitchAPICallType[TwitchAPICallType["Kraken"] = 0] = "Kraken";
    /**
     * Call a Helix API endpoint.
     */
    TwitchAPICallType[TwitchAPICallType["Helix"] = 1] = "Helix";
    /**
     * Call an authentication endpoint.
     */
    TwitchAPICallType[TwitchAPICallType["Auth"] = 2] = "Auth";
    /**
     * Call a custom (potentially unsupported) endpoint.
     */
    TwitchAPICallType[TwitchAPICallType["Custom"] = 3] = "Custom";
})(TwitchAPICallType = exports.TwitchAPICallType || (exports.TwitchAPICallType = {}));
/**
 * The main entry point of this library. Manages API calls and the use of access tokens in these.
 */
var TwitchClient = /** @class */ (function () {
    /**
     * Creates a new Twitch client instance.
     *
     * @param config Configuration for the client instance.
     */
    function TwitchClient(config) {
        var authProvider = config.authProvider, restConfig = tslib_1.__rest(config, ["authProvider"]);
        if (!authProvider) {
            throw new ConfigError_1.default('No auth provider given');
        }
        this._config = tslib_1.__assign({ preAuth: false, cheermotes: {
                defaultBackground: CheermoteList_1.CheermoteBackground.dark,
                defaultState: CheermoteList_1.CheermoteState.animated,
                defaultScale: CheermoteList_1.CheermoteScale.x1
            }, authProvider: authProvider }, restConfig);
        if (this._config.preAuth) {
            // tslint:disable-next-line:no-floating-promises
            authProvider.getAccessToken(this._config.initialScopes);
        }
    }
    TwitchClient_1 = TwitchClient;
    /**
     * Creates a new instance with fixed credentials.
     *
     * @param clientId The client ID of your application.
     * @param accessToken The access token to call the API with.
     *
     * You need to obtain one using one of the [Twitch OAuth flows](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).
     * @param scopes The scopes your supplied token has.
     *
     * If this argument is given, the scopes need to be correct, or weird things might happen. If it's not (i.e. it's `undefined`), we fetch the correct scopes for you.
     *
     * If you can't exactly say which scopes your token has, don't use this parameter/set it to `undefined`.
     * @param refreshConfig Configuration to automatically refresh expired tokens.
     * @param config Additional configuration to pass to the constructor.
     *
     * Note that if you provide a custom `authProvider`, this method will overwrite it. In this case, you should use the constructor directly.
     */
    TwitchClient.withCredentials = function (clientId, accessToken, scopes, refreshConfig, config) {
        if (config === void 0) { config = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var passedAccessToken, tokenData, authProvider;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        passedAccessToken = accessToken;
                        if (!(!scopes && accessToken)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.getTokenInfo(clientId, accessToken)];
                    case 1:
                        tokenData = _a.sent();
                        if (!!tokenData.valid) return [3 /*break*/, 5];
                        if (!refreshConfig) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.refreshAccessToken(clientId, refreshConfig.clientSecret, refreshConfig.refreshToken)];
                    case 2:
                        passedAccessToken = _a.sent();
                        if (refreshConfig.onRefresh) {
                            refreshConfig.onRefresh(passedAccessToken);
                        }
                        return [4 /*yield*/, this.getTokenInfo(clientId, passedAccessToken.accessToken)];
                    case 3:
                        tokenData = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!tokenData.valid) {
                            throw new ConfigError_1.default('Supplied an invalid access token to retrieve scopes with');
                        }
                        _a.label = 5;
                    case 5:
                        scopes = tokenData.scopes;
                        _a.label = 6;
                    case 6:
                        authProvider = refreshConfig
                            ? new RefreshableAuthProvider_1.default(new StaticAuthProvider_1.default(clientId, passedAccessToken, scopes), refreshConfig)
                            : new StaticAuthProvider_1.default(clientId, passedAccessToken, scopes);
                        return [2 /*return*/, new this(tslib_1.__assign(tslib_1.__assign({}, config), { authProvider: authProvider }))];
                }
            });
        });
    };
    /**
     * Creates a new instance with client credentials.
     *
     * @param clientId The client ID of your application.
     * @param clientSecret The client secret of your application.
     * @param config Additional configuration to pass to the constructor.
     *
     * Note that if you provide a custom `authProvider`, this method will overwrite it. In this case, you should use the constructor directly.
     */
    TwitchClient.withClientCredentials = function (clientId, clientSecret, config) {
        if (config === void 0) { config = {}; }
        var authProvider = clientSecret
            ? new ClientCredentialsAuthProvider_1.default(clientId, clientSecret)
            : new StaticAuthProvider_1.default(clientId);
        return new this(tslib_1.__assign(tslib_1.__assign({}, config), { authProvider: authProvider }));
    };
    /**
     * Makes a call to the Twitch API using given credetials.
     *
     * @param options The configuration of the call.
     * @param clientId The client ID of your application.
     * @param accessToken The access token to call the API with.
     *
     * You need to obtain one using one of the [Twitch OAuth flows](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TwitchClient.callAPI = function (options, clientId, accessToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var type, url, params, headers, body, requestOptions, response, _a, _b, text;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        type = options.type === undefined ? TwitchAPICallType.Kraken : options.type;
                        url = this._getUrl(options.url, type);
                        params = qs.stringify(options.query, { arrayFormat: 'repeat' });
                        headers = new Headers({
                            Accept: type === TwitchAPICallType.Kraken
                                ? "application/vnd.twitchtv.v" + (options.version || 5) + "+json"
                                : 'application/json'
                        });
                        if (options.body) {
                            body = qs.stringify(options.body);
                            headers.append('Content-Type', 'application/x-www-form-urlencoded');
                        }
                        else if (options.jsonBody) {
                            body = JSON.stringify(options.jsonBody);
                            headers.append('Content-Type', 'application/json');
                        }
                        if (clientId && type !== TwitchAPICallType.Auth) {
                            headers.append('Client-ID', clientId);
                        }
                        if (accessToken) {
                            headers.append('Authorization', (type === TwitchAPICallType.Helix ? 'Bearer' : 'OAuth') + " " + accessToken);
                        }
                        requestOptions = {
                            method: options.method || 'GET',
                            headers: headers,
                            body: body
                        };
                        return [4 /*yield*/, fetch(params ? url + "?" + params : url, requestOptions)];
                    case 1:
                        response = _c.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        _a = HTTPStatusCodeError_1.default.bind;
                        _b = [void 0, response.status, response.statusText];
                        return [4 /*yield*/, response.json()];
                    case 2: throw new (_a.apply(HTTPStatusCodeError_1.default, _b.concat([_c.sent()])))();
                    case 3:
                        if (response.status === 204) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            return [2 /*return*/, undefined]; // oof
                        }
                        return [4 /*yield*/, response.text()];
                    case 4:
                        text = _c.sent();
                        if (!text) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            return [2 /*return*/, undefined]; // mega oof - twitch doesn't return a response when it should
                        }
                        return [2 /*return*/, JSON.parse(text)];
                }
            });
        });
    };
    /**
     * Retrieves an access token with your client credentials and an authorization code.
     *
     * @param clientId The client ID of your application.
     * @param clientSecret The client secret of your application.
     * @param code The authorization code.
     * @param redirectUri The redirect URI. This serves no real purpose here, but must still match with the redirect URI you configured in the Twitch Developer dashboard.
     */
    TwitchClient.getAccessToken = function (clientId, clientSecret, code, redirectUri) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = AccessToken_1.default.bind;
                        return [4 /*yield*/, this.callAPI({
                                type: TwitchAPICallType.Auth,
                                url: 'token',
                                method: 'POST',
                                query: {
                                    grant_type: 'authorization_code',
                                    client_id: clientId,
                                    client_secret: clientSecret,
                                    code: code,
                                    redirect_uri: redirectUri
                                }
                            })];
                    case 1: return [2 /*return*/, new (_a.apply(AccessToken_1.default, [void 0, _b.sent()]))()];
                }
            });
        });
    };
    /**
     * Retrieves an app access token with your client credentials.
     *
     * @param clientId The client ID of your application.
     * @param clientSecret The client secret of your application.
     * @param clientSecret
     */
    TwitchClient.getAppAccessToken = function (clientId, clientSecret) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = AccessToken_1.default.bind;
                        return [4 /*yield*/, this.callAPI({
                                type: TwitchAPICallType.Auth,
                                url: 'token',
                                method: 'POST',
                                query: {
                                    grant_type: 'client_credentials',
                                    client_id: clientId,
                                    client_secret: clientSecret
                                }
                            })];
                    case 1: return [2 /*return*/, new (_a.apply(AccessToken_1.default, [void 0, _b.sent()]))()];
                }
            });
        });
    };
    /**
     * Refreshes an expired access token with your client credentials and the refresh token that was given by the initial authentication.
     *
     * @param clientId The client ID of your application.
     * @param clientSecret The client secret of your application.
     * @param refreshToken The refresh token.
     */
    TwitchClient.refreshAccessToken = function (clientId, clientSecret, refreshToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = AccessToken_1.default.bind;
                        return [4 /*yield*/, this.callAPI({
                                type: TwitchAPICallType.Auth,
                                url: 'token',
                                method: 'POST',
                                query: {
                                    grant_type: 'refresh_token',
                                    client_id: clientId,
                                    client_secret: clientSecret,
                                    refresh_token: refreshToken
                                }
                            })];
                    case 1: return [2 /*return*/, new (_a.apply(AccessToken_1.default, [void 0, _b.sent()]))()];
                }
            });
        });
    };
    /**
     * Retrieves information about an access token.
     *
     * @param clientId The client ID of your application.
     * @param accessToken The access token to get the information of.
     *
     * You need to obtain one using one of the [Twitch OAuth flows](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).
     */
    TwitchClient.getTokenInfo = function (clientId, accessToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.callAPI({ type: TwitchAPICallType.Auth, url: 'validate' }, clientId, accessToken)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, new TokenInfo_1.default(data)];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1 instanceof HTTPStatusCodeError_1.default && e_1.statusCode === 401) {
                            return [2 /*return*/, new TokenInfo_1.default()];
                        }
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves information about your access token.
     */
    TwitchClient.prototype.getTokenInfo = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.callAPI({ type: TwitchAPICallType.Auth, url: 'validate' })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, new TokenInfo_1.default(data)];
                    case 2:
                        e_2 = _a.sent();
                        if (e_2 instanceof HTTPStatusCodeError_1.default && e_2.statusCode === 401) {
                            return [2 /*return*/, new TokenInfo_1.default()];
                        }
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves an access token for the authentication provider.
     *
     * @param scopes The scopes to request.
     */
    TwitchClient.prototype.getAccessToken = function (scopes) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._config.authProvider.getAccessToken(scopes)];
            });
        });
    };
    /**
     * Forces the authentication provider to refresh the access token, if possible.
     */
    TwitchClient.prototype.refreshAccessToken = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._config.authProvider.refresh && this._config.authProvider.refresh()];
            });
        });
    };
    /**
     * Makes a call to the Twitch API using your access token.
     *
     * @param options The configuration of the call.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TwitchClient.prototype.callAPI = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var authProvider, accessToken;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authProvider = this._config.authProvider;
                        return [4 /*yield*/, authProvider.getAccessToken(options.scope ? [options.scope] : undefined)];
                    case 1:
                        accessToken = _a.sent();
                        if (!accessToken) {
                            return [2 /*return*/, TwitchClient_1.callAPI(options, authProvider.clientId)];
                        }
                        if (!(accessToken.isExpired && authProvider.refresh)) return [3 /*break*/, 3];
                        return [4 /*yield*/, authProvider.refresh()];
                    case 2:
                        accessToken = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, TwitchClient_1.callAPI(options, authProvider.clientId, accessToken.accessToken)];
                }
            });
        });
    };
    Object.defineProperty(TwitchClient.prototype, "kraken", {
        /**
         * A group of Kraken API methods.
         */
        get: function () {
            return new KrakenAPIGroup_1.default(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TwitchClient.prototype, "helix", {
        /**
         * A group of Helix API methods.
         */
        get: function () {
            return new HelixAPIGroup_1.default(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TwitchClient.prototype, "badges", {
        /**
         * The API methods that deal with badges.
         */
        get: function () {
            return new BadgesAPI_1.default(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TwitchClient.prototype, "unsupported", {
        /**
         * Various API methods that are not officially supported by Twitch.
         */
        get: function () {
            return new UnsupportedAPI_1.default(this);
        },
        enumerable: true,
        configurable: true
    });
    TwitchClient._getUrl = function (url, type) {
        switch (type) {
            case TwitchAPICallType.Kraken:
            case TwitchAPICallType.Helix:
                var typeName = type === TwitchAPICallType.Kraken ? 'kraken' : 'helix';
                return "https://api.twitch.tv/" + typeName + "/" + url.replace(/^\//, '');
            case TwitchAPICallType.Auth:
                return "https://id.twitch.tv/oauth2/" + url.replace(/^\//, '');
            case TwitchAPICallType.Custom:
                return url;
            default:
                return url; // wat
        }
    };
    var TwitchClient_1;
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], TwitchClient.prototype, "kraken", null);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], TwitchClient.prototype, "helix", null);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], TwitchClient.prototype, "badges", null);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], TwitchClient.prototype, "unsupported", null);
    TwitchClient = TwitchClient_1 = tslib_1.__decorate([
        Cache_1.Cacheable
    ], TwitchClient);
    return TwitchClient;
}());
exports.default = TwitchClient;
//# sourceMappingURL=TwitchClient.js.map