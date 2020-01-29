"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var UserTools_1 = require("../../../Toolkit/UserTools");
var TwitchClient_1 = require("../../../TwitchClient");
var BaseAPI_1 = require("../../BaseAPI");
var HelixPaginatedRequest_1 = require("../HelixPaginatedRequest");
var HelixSubscription_1 = require("./HelixSubscription");
var HelixSubscriptionEvent_1 = require("./HelixSubscriptionEvent");
/**
 * The Helix API methods that deal with subscriptions.
 *
 * Can be accessed using `client.helix.subscriptions` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const subscriptions = await client.helix.subscriptions.getSubscriptionsForUsers('61369223', '125328655');
 * ```
 */
var HelixSubscriptionAPI = /** @class */ (function (_super) {
    tslib_1.__extends(HelixSubscriptionAPI, _super);
    function HelixSubscriptionAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves a list of all subscriptions to a given broadcaster.
     *
     * @param broadcaster The broadcaster to list subscriptions to.
     */
    HelixSubscriptionAPI.prototype.getSubscriptions = function (broadcaster) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({
                            url: 'subscriptions',
                            scope: 'channel:read:subscriptions',
                            query: {
                                broadcaster_id: UserTools_1.extractUserId(broadcaster)
                            }
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, {
                                data: result.data.map(function (data) { return new HelixSubscription_1.default(data, _this._client); }),
                                cursor: result.pagination && result.pagination.cursor
                            }];
                }
            });
        });
    };
    /**
     * Creates a paginator for all subscriptions to a given broadcaster.
     *
     * @param broadcaster The broadcaster to list subscriptions to.
     */
    HelixSubscriptionAPI.prototype.getSubscriptionsPaginated = function (broadcaster) {
        var _this = this;
        return new HelixPaginatedRequest_1.default({
            url: 'subscriptions',
            scope: 'channel:read:subscriptions',
            query: {
                broadcaster_id: UserTools_1.extractUserId(broadcaster)
            }
        }, this._client, function (data) { return new HelixSubscription_1.default(data, _this._client); });
    };
    /**
     * Retrieves the subset of the given user list that is subscribed to the given broadcaster.
     *
     * @param broadcaster The broadcaster to find subscriptions to.
     * @param users The users that should be checked for subscriptions.
     */
    HelixSubscriptionAPI.prototype.getSubscriptionsForUsers = function (broadcaster, users) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({
                            url: 'subscriptions',
                            scope: 'channel:read:subscriptions',
                            type: TwitchClient_1.TwitchAPICallType.Helix,
                            query: {
                                broadcaster_id: UserTools_1.extractUserId(broadcaster),
                                user_id: users.map(UserTools_1.extractUserId)
                            }
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data.map(function (data) { return new HelixSubscription_1.default(data, _this._client); })];
                }
            });
        });
    };
    /**
     * Retrieves the subscription data for a given user to a given broadcaster.
     *
     * @param broadcaster The broadcaster to check.
     * @param user The user to check.
     */
    HelixSubscriptionAPI.prototype.getSubscriptionForUser = function (broadcaster, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var list;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSubscriptionsForUsers(broadcaster, [user])];
                    case 1:
                        list = _a.sent();
                        return [2 /*return*/, list.length ? list[0] : null];
                }
            });
        });
    };
    /**
     * Retrieves the most recent subscription events for a given broadcaster.
     *
     * @param broadcaster The broadcaster to retrieve subscription events for.
     */
    HelixSubscriptionAPI.prototype.getSubscriptionEventsForBroadcaster = function (broadcaster) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._getSubscriptionEvents('broadcaster_id', UserTools_1.extractUserId(broadcaster))];
            });
        });
    };
    /**
     * Creates a paginator for the recent subscription events for a given broadcaster.
     *
     * @param broadcaster The broadcaster to retrieve subscription events for.
     */
    HelixSubscriptionAPI.prototype.getSubscriptionEventsForBroadcasterPaginated = function (broadcaster) {
        var _this = this;
        return new HelixPaginatedRequest_1.default({
            url: 'subscriptions/events',
            scope: 'channel:read:subscriptions',
            query: {
                broadcaster_id: UserTools_1.extractUserId(broadcaster)
            }
        }, this._client, function (data) { return new HelixSubscriptionEvent_1.default(data, _this._client); });
    };
    /**
     * Retrieves a single subscription event by ID.
     *
     * @param id The event ID.
     */
    HelixSubscriptionAPI.prototype.getSubscriptionEventById = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._getSubscriptionEvents('id', id)];
            });
        });
    };
    HelixSubscriptionAPI.prototype._getSubscriptionEvents = function (by, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            var _a;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._client.callAPI({
                            type: TwitchClient_1.TwitchAPICallType.Helix,
                            url: 'subscriptions/events',
                            scope: 'channel:read:subscriptions',
                            query: (_a = {},
                                _a[by] = id,
                                _a)
                        })];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, {
                                data: result.data.map(function (data) { return new HelixSubscriptionEvent_1.default(data, _this._client); }),
                                cursor: result.pagination && result.pagination.cursor
                            }];
                }
            });
        });
    };
    return HelixSubscriptionAPI;
}(BaseAPI_1.default));
exports.default = HelixSubscriptionAPI;
//# sourceMappingURL=HelixSubscriptionAPI.js.map