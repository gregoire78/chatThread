"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var UserTools_1 = require("../../../Toolkit/UserTools");
var TwitchClient_1 = require("../../../TwitchClient");
var BaseAPI_1 = require("../../BaseAPI");
var HelixPaginatedRequestWithTotal_1 = require("../HelixPaginatedRequestWithTotal");
var HelixWebHookSubscription_1 = require("./HelixWebHookSubscription");
/**
 * The API methods that deal with WebHooks.
 *
 * Can be accessed using `client.helix.webHooks` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const accepted = await client.helix.webHooks.subscribeHook('https://api.twitch.tv/helix/streams?user_id=125328655', 'https://example.com');
 * ```
 */
var HelixWebHooksAPI = /** @class */ (function (_super) {
    tslib_1.__extends(HelixWebHooksAPI, _super);
    function HelixWebHooksAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves the current WebHook subscriptions for the current client.
     *
     * Requires an app access token to work; does not work with user tokens.
     */
    HelixWebHooksAPI.prototype.getSubscriptions = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new HelixPaginatedRequestWithTotal_1.default({
                        url: 'webhooks/subscriptions'
                    }, this._client, function (data) { return new HelixWebHookSubscription_1.default(data, _this._client); })];
            });
        });
    };
    /**
     * Sends an arbitrary request to subscribe to or unsubscribe from an event.
     *
     * @expandParams
     */
    HelixWebHooksAPI.prototype.sendHubRequest = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mode, callbackUrl, topicUrl, _a, validityInSeconds, secret, scope;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mode = options.mode, callbackUrl = options.callbackUrl, topicUrl = options.topicUrl, _a = options.validityInSeconds, validityInSeconds = _a === void 0 ? 3600 : _a, secret = options.secret, scope = options.scope;
                        return [4 /*yield*/, this._client.callAPI({
                                url: 'webhooks/hub',
                                type: TwitchClient_1.TwitchAPICallType.Helix,
                                method: 'POST',
                                scope: scope,
                                jsonBody: {
                                    'hub.mode': mode,
                                    'hub.topic': topicUrl,
                                    'hub.callback': callbackUrl,
                                    'hub.lease_seconds': mode === 'subscribe' ? validityInSeconds.toString() : undefined,
                                    'hub.secret': secret
                                }
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Subscribes to events representing a user following other users.
     *
     * @expandParams
     *
     * @param user The user for which to get notifications about the users they will follow.
     * @param options
     */
    HelixWebHooksAPI.prototype.subscribeToUserFollowsFrom = function (user, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendUserFollowsHubRequest('subscribe', 'from', user, options)];
            });
        });
    };
    /**
     * Subscribes to events representing a user being followed by other users.
     *
     * @expandParams
     *
     * @param user The user for which to get notifications about the users they will be followed by.
     * @param options
     */
    HelixWebHooksAPI.prototype.subscribeToUserFollowsTo = function (user, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendUserFollowsHubRequest('subscribe', 'to', user, options)];
            });
        });
    };
    /**
     * Unsubscribes from events representing a user following other users.
     *
     * @expandParams
     *
     * @param user The user for which to not get any more notifications about the users they will follow.
     * @param options
     */
    HelixWebHooksAPI.prototype.unsubscribeFromUserFollowsFrom = function (user, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendUserFollowsHubRequest('unsubscribe', 'from', user, options)];
            });
        });
    };
    /**
     * Unsubscribes from events representing a user being followed by other users.
     *
     * @expandParams
     *
     * @param user The user for which to not get any more notifications about the users they will be followed by.
     * @param options
     */
    HelixWebHooksAPI.prototype.unsubscribeFromUserFollowsTo = function (user, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendUserFollowsHubRequest('unsubscribe', 'to', user, options)];
            });
        });
    };
    /**
     * Subscribes to events representing a stream changing, e.g. going live, offline or changing its title.
     *
     * @expandParams
     *
     * @param user The user for which to get notifications about their streams changing.
     * @param options
     */
    HelixWebHooksAPI.prototype.subscribeToStreamChanges = function (user, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendStreamChangeHubRequest('subscribe', user, options)];
            });
        });
    };
    /**
     * Unsubscribes from events representing a stream changing, e.g. going live, offline or changing its title.
     *
     * @expandParams
     *
     * @param user The user for which not to get any more notifications about their streams changing.
     * @param options
     */
    HelixWebHooksAPI.prototype.unsubscribeFromStreamChanges = function (user, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendStreamChangeHubRequest('unsubscribe', user, options)];
            });
        });
    };
    /**
     * Subscribes to events representing a user changing a public setting or their email address.
     *
     * @expandParams
     *
     * @param user The user for which to get notifications about changing a setting.
     * @param options
     * @param withEmail Whether to subscribe to email address changes. This adds the necessary scope to read the email address to the request.
     */
    HelixWebHooksAPI.prototype.subscribeToUserChanges = function (user, options, withEmail) {
        if (withEmail === void 0) { withEmail = false; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendUserChangeHubRequest('subscribe', user, options, withEmail)];
            });
        });
    };
    /**
     * Unsubscribes from events representing a user changing a public setting or their email address.
     *
     * @expandParams
     *
     * @param user The user for which not to get any more notifications about changing a setting.
     * @param options
     */
    HelixWebHooksAPI.prototype.unsubscribeFromUserChanges = function (user, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendUserChangeHubRequest('unsubscribe', user, options)];
            });
        });
    };
    /**
     * Subscribes to events representing a channel subscription or unsubscription.
     *
     * @expandParams
     *
     * @param user The user for which to get notifications about subscriptions and unsubscriptions to their channel.
     * @param options
     */
    HelixWebHooksAPI.prototype.subscribeToSubscriptionEvents = function (user, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendSubscriptionEventsHubRequest('subscribe', user, options)];
            });
        });
    };
    /**
     * Unsubscribes from events representing a channel subscription or unsubscription.
     *
     * @expandParams
     *
     * @param user The user for which not to get any more notifications about subscriptions and unsubscriptions to their channel.
     * @param options
     */
    HelixWebHooksAPI.prototype.unsubscribeFromSubscriptionEvents = function (user, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendSubscriptionEventsHubRequest('unsubscribe', user, options)];
            });
        });
    };
    /**
     * Subscribes to extension transactions.
     *
     * @expandParams
     *
     * @param extensionId The extension ID for which to get notifications about transactions.
     * @param options
     */
    HelixWebHooksAPI.prototype.subscribeToExtensionTransactions = function (extensionId, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendExtensionTransactionsHubRequest('subscribe', extensionId, options)];
            });
        });
    };
    /**
     * Unsubscribes from extension transactions.
     *
     * @expandParams
     *
     * @param extensionId The extension ID for which not to get any more notifications about transactions.
     * @param options
     */
    HelixWebHooksAPI.prototype.unsubscribeFromExtensionTransactions = function (extensionId, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendExtensionTransactionsHubRequest('unsubscribe', extensionId, options)];
            });
        });
    };
    /**
     * Subscribes to events representing a ban or unban.
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster for which to get notifications about bans or unbans in their channel.
     * @param options
     */
    HelixWebHooksAPI.prototype.subscribeToBanEvents = function (broadcaster, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendBanEventsHubRequest('subscribe', broadcaster, options)];
            });
        });
    };
    /**
     * Unsubscribes from events representing a ban or unban.
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster for which not to get any more notifications about bans or unbans in their channel.
     * @param options
     */
    HelixWebHooksAPI.prototype.unsubscribeFromBanEvents = function (broadcaster, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendBanEventsHubRequest('unsubscribe', broadcaster, options)];
            });
        });
    };
    /**
     * Subscribes to events representing a ban or unban.
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster for which to get notifications about bans or unbans in their channel.
     * @param user The user that is being banned or unbanned.
     * @param options
     */
    HelixWebHooksAPI.prototype.subscribeToBanEventsForUser = function (broadcaster, user, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendBanEventsHubRequest('subscribe', broadcaster, options, user)];
            });
        });
    };
    /**
     * Unsubscribes from events representing a ban or unban.
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster for which not to get any more notifications about bans or unbans in their channel.
     * @param user The user that is being banned or unbanned.
     * @param options
     */
    HelixWebHooksAPI.prototype.unsubscribeFromBanEventsForUser = function (broadcaster, user, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendBanEventsHubRequest('unsubscribe', broadcaster, options, user)];
            });
        });
    };
    /**
     * Subscribes to events representing a user gaining or losing moderator privileges in a channel.
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster for which to get notifications about moderator changes in their channel.
     * @param options
     */
    HelixWebHooksAPI.prototype.subscribeToModeratorEvents = function (broadcaster, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendModeratorEventsHubRequest('subscribe', broadcaster, options)];
            });
        });
    };
    /**
     * Unsubscribes from events representing a user gaining or losing moderator privileges in a channel.
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster for which not to get any more notifications about moderator changes in their channel.
     * @param options
     */
    HelixWebHooksAPI.prototype.unsubscribeFromModeratorEvents = function (broadcaster, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendModeratorEventsHubRequest('unsubscribe', broadcaster, options)];
            });
        });
    };
    /**
     * Subscribes to events representing a user gaining or losing moderator privileges in a channel.
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster for which to get notifications about moderator changes in their channel.
     * @param user The user that is being banned or unbanned.
     * @param options
     */
    HelixWebHooksAPI.prototype.subscribeToModeratorEventsForUser = function (broadcaster, user, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendModeratorEventsHubRequest('subscribe', broadcaster, options, user)];
            });
        });
    };
    /**
     * Unsubscribes from events representing a user gaining or losing moderator privileges in a channel.
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster for which not to get any more notifications about moderator changes in their channel.
     * @param user The user that is being banned or unbanned.
     * @param options
     */
    HelixWebHooksAPI.prototype.unsubscribeFromModeratorEventsForUser = function (broadcaster, user, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._sendModeratorEventsHubRequest('unsubscribe', broadcaster, options, user)];
            });
        });
    };
    HelixWebHooksAPI.prototype._sendUserFollowsHubRequest = function (mode, direction, user, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId;
            return tslib_1.__generator(this, function (_a) {
                userId = UserTools_1.extractUserId(user);
                return [2 /*return*/, this.sendHubRequest(tslib_1.__assign({ mode: mode, topicUrl: "https://api.twitch.tv/helix/users/follows?first=1&" + direction + "_id=" + userId }, options))];
            });
        });
    };
    HelixWebHooksAPI.prototype._sendStreamChangeHubRequest = function (mode, user, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId;
            return tslib_1.__generator(this, function (_a) {
                userId = UserTools_1.extractUserId(user);
                return [2 /*return*/, this.sendHubRequest(tslib_1.__assign({ mode: mode, topicUrl: "https://api.twitch.tv/helix/streams?user_id=" + userId }, options))];
            });
        });
    };
    HelixWebHooksAPI.prototype._sendUserChangeHubRequest = function (mode, user, options, withEmail) {
        if (withEmail === void 0) { withEmail = false; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId;
            return tslib_1.__generator(this, function (_a) {
                userId = UserTools_1.extractUserId(user);
                return [2 /*return*/, this.sendHubRequest(tslib_1.__assign({ mode: mode, topicUrl: "https://api.twitch.tv/helix/users?id=" + userId, scope: withEmail ? 'user:read:email' : undefined }, options))];
            });
        });
    };
    HelixWebHooksAPI.prototype._sendSubscriptionEventsHubRequest = function (mode, user, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId;
            return tslib_1.__generator(this, function (_a) {
                userId = UserTools_1.extractUserId(user);
                return [2 /*return*/, this.sendHubRequest(tslib_1.__assign({ mode: mode, topicUrl: "https://api.twitch.tv/helix/subscriptions/events?broadcaster_id=" + userId + "&first=1", scope: 'channel:read:subscriptions' }, options))];
            });
        });
    };
    HelixWebHooksAPI.prototype._sendExtensionTransactionsHubRequest = function (mode, extensionId, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.sendHubRequest(tslib_1.__assign({ mode: mode, topicUrl: "https://api.twitch.tv/helix/extensions/transactions?extension_id=" + extensionId + "&first=1" }, options))];
            });
        });
    };
    HelixWebHooksAPI.prototype._sendBanEventsHubRequest = function (mode, broadcaster, options, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var broadcasterId, topicUrl;
            return tslib_1.__generator(this, function (_a) {
                broadcasterId = UserTools_1.extractUserId(broadcaster);
                topicUrl = "https://api.twitch.tv/helix/moderation/banned/events?broadcaster_id=" + broadcasterId + "&first=1";
                if (user) {
                    topicUrl += "&user_id=" + UserTools_1.extractUserId(user);
                }
                return [2 /*return*/, this.sendHubRequest(tslib_1.__assign({ mode: mode,
                        topicUrl: topicUrl, scope: 'moderation:read' }, options))];
            });
        });
    };
    HelixWebHooksAPI.prototype._sendModeratorEventsHubRequest = function (mode, broadcaster, options, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var broadcasterId, topicUrl;
            return tslib_1.__generator(this, function (_a) {
                broadcasterId = UserTools_1.extractUserId(broadcaster);
                topicUrl = "https://api.twitch.tv/helix/moderation/moderators/events?broadcaster_id=" + broadcasterId + "&first=1";
                if (user) {
                    topicUrl += "&user_id=" + UserTools_1.extractUserId(user);
                }
                return [2 /*return*/, this.sendHubRequest(tslib_1.__assign({ mode: mode,
                        topicUrl: topicUrl, scope: 'moderation:read' }, options))];
            });
        });
    };
    return HelixWebHooksAPI;
}(BaseAPI_1.default));
exports.default = HelixWebHooksAPI;
//# sourceMappingURL=HelixWebHooksAPI.js.map