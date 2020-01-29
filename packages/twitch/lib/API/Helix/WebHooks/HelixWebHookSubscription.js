"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
/**
 * A subscription to a Twitch WebHook.
 */
var HelixWebHookSubscription = /** @class */ (function () {
    /** @private */
    function HelixWebHookSubscription(_data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(HelixWebHookSubscription.prototype, "topicUrl", {
        /**
         * The topic the WebHook is listening to.
         */
        get: function () {
            return this._data.topic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixWebHookSubscription.prototype, "callbackUrl", {
        /**
         * The URL that will be called for every subscribed event.
         */
        get: function () {
            return this._data.callback;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixWebHookSubscription.prototype, "expiryDate", {
        /**
         * The time when the subscription will expire.
         */
        get: function () {
            return new Date(this._data.expires_at);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Unsubscribe from the WebHook.
     */
    HelixWebHookSubscription.prototype.unsubscribe = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.webHooks.sendHubRequest({
                        mode: 'unsubscribe',
                        topicUrl: this.topicUrl,
                        callbackUrl: this.callbackUrl
                    })];
            });
        });
    };
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], HelixWebHookSubscription.prototype, "_client", void 0);
    return HelixWebHookSubscription;
}());
exports.default = HelixWebHookSubscription;
//# sourceMappingURL=HelixWebHookSubscription.js.map