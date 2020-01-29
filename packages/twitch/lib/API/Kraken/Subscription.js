"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../Toolkit/Decorators/NonEnumerable");
/**
 * A subscription to a Twitch channel.
 */
var Subscription = /** @class */ (function () {
    /** @private */
    function Subscription(/** @private */ _data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(Subscription.prototype, "id", {
        /**
         * The ID of the subscription.
         */
        get: function () {
            return this._data._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Subscription.prototype, "subPlan", {
        /**
         * The identifier of the subscription plan.
         */
        get: function () {
            return this._data.sub_plan;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Subscription.prototype, "subPlanName", {
        /**
         * The name of the subscription plan.
         */
        get: function () {
            return this._data.sub_plan_name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Subscription.prototype, "startDate", {
        /**
         * The date when the subscription was started.
         */
        get: function () {
            return new Date(this._data.created_at);
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], Subscription.prototype, "_client", void 0);
    return Subscription;
}());
exports.default = Subscription;
//# sourceMappingURL=Subscription.js.map