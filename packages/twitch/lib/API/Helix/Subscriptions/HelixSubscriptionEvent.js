"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var HelixSubscription_1 = require("./HelixSubscription");
/**
 * The different types a subscription event can have.
 */
var HelixSubscriptionEventType;
(function (HelixSubscriptionEventType) {
    /**
     * Sent when a new user subscribes.
     */
    HelixSubscriptionEventType["Subscribe"] = "subscriptions.subscribe";
    /**
     * Sent when a previous subscriber stops subscribing.
     */
    HelixSubscriptionEventType["Unsubscribe"] = "subscriptions.unsubscribe";
    /**
     * Sent when a new or recurring subscriber sends their monthly notification.
     */
    HelixSubscriptionEventType["Notification"] = "subscriptions.notification";
})(HelixSubscriptionEventType = exports.HelixSubscriptionEventType || (exports.HelixSubscriptionEventType = {}));
/**
 * An event that indicates the change of a subscription status, i.e. subscribing, unsubscribing or sending the monthly notification.
 */
var HelixSubscriptionEvent = /** @class */ (function (_super) {
    tslib_1.__extends(HelixSubscriptionEvent, _super);
    /** @private */
    function HelixSubscriptionEvent(_eventData, client) {
        var _this = _super.call(this, _eventData.event_data, client) || this;
        _this._eventData = _eventData;
        return _this;
    }
    Object.defineProperty(HelixSubscriptionEvent.prototype, "eventId", {
        /**
         * The unique ID of the subscription event.
         */
        get: function () {
            return this._eventData.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixSubscriptionEvent.prototype, "eventType", {
        /**
         * The type of the subscription event.
         */
        get: function () {
            return this._eventData.event_type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixSubscriptionEvent.prototype, "eventDate", {
        /**
         * The date of the subscription event.
         */
        get: function () {
            return new Date(this._eventData.event_timestamp);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixSubscriptionEvent.prototype, "eventVersion", {
        /**
         * The version of the subscription event.
         */
        get: function () {
            return this._eventData.version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixSubscriptionEvent.prototype, "eventMessage", {
        /**
         * The message sent with the subscription event.
         */
        get: function () {
            return this._eventData.event_data.message || '';
        },
        enumerable: true,
        configurable: true
    });
    return HelixSubscriptionEvent;
}(HelixSubscription_1.default));
exports.default = HelixSubscriptionEvent;
//# sourceMappingURL=HelixSubscriptionEvent.js.map