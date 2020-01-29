"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Cache_1 = require("../../Toolkit/Decorators/Cache");
var BaseAPI_1 = require("../BaseAPI");
var HelixBitsAPI_1 = require("./Bits/HelixBitsAPI");
var HelixClipAPI_1 = require("./Clip/HelixClipAPI");
var HelixExtensionsAPI_1 = require("./Extensions/HelixExtensionsAPI");
var HelixGameAPI_1 = require("./Game/HelixGameAPI");
var HelixModerationAPI_1 = require("./Moderation/HelixModerationAPI");
var HelixStreamAPI_1 = require("./Stream/HelixStreamAPI");
var HelixSubscriptionAPI_1 = require("./Subscriptions/HelixSubscriptionAPI");
var HelixUserAPI_1 = require("./User/HelixUserAPI");
var HelixVideoAPI_1 = require("./Video/HelixVideoAPI");
var HelixWebHooksAPI_1 = require("./WebHooks/HelixWebHooksAPI");
/**
 * Groups all API calls available in Helix a.k.a. the "New Twitch API".
 *
 * Can be accessed using {@TwitchClient#helix}.
 */
var HelixAPIGroup = /** @class */ (function (_super) {
    tslib_1.__extends(HelixAPIGroup, _super);
    function HelixAPIGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(HelixAPIGroup.prototype, "bits", {
        /**
         * The Helix bits API methods.
         */
        get: function () {
            return new HelixBitsAPI_1.default(this._client);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixAPIGroup.prototype, "clips", {
        /**
         * The Helix clips API methods.
         */
        get: function () {
            return new HelixClipAPI_1.default(this._client);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixAPIGroup.prototype, "extensions", {
        /**
         * The Helix extensions API methods.
         */
        get: function () {
            return new HelixExtensionsAPI_1.default(this._client);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixAPIGroup.prototype, "games", {
        /**
         * The Helix game API methods.
         */
        get: function () {
            return new HelixGameAPI_1.default(this._client);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixAPIGroup.prototype, "moderation", {
        /**
         * The Helix moderation API methods.
         */
        get: function () {
            return new HelixModerationAPI_1.default(this._client);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixAPIGroup.prototype, "streams", {
        /**
         * The Helix stream API methods.
         */
        get: function () {
            return new HelixStreamAPI_1.default(this._client);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixAPIGroup.prototype, "subscriptions", {
        /**
         * The Helix subscription API methods.
         */
        get: function () {
            return new HelixSubscriptionAPI_1.default(this._client);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixAPIGroup.prototype, "users", {
        /**
         * The Helix user API methods.
         */
        get: function () {
            return new HelixUserAPI_1.default(this._client);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixAPIGroup.prototype, "webHooks", {
        /**
         * The Helix WebHook API methods.
         */
        get: function () {
            return new HelixWebHooksAPI_1.default(this._client);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixAPIGroup.prototype, "videos", {
        /**
         * The Helix video API methods.
         */
        get: function () {
            return new HelixVideoAPI_1.default(this._client);
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], HelixAPIGroup.prototype, "bits", null);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], HelixAPIGroup.prototype, "clips", null);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], HelixAPIGroup.prototype, "extensions", null);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], HelixAPIGroup.prototype, "games", null);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], HelixAPIGroup.prototype, "moderation", null);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], HelixAPIGroup.prototype, "streams", null);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], HelixAPIGroup.prototype, "subscriptions", null);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], HelixAPIGroup.prototype, "users", null);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], HelixAPIGroup.prototype, "webHooks", null);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], HelixAPIGroup.prototype, "videos", null);
    HelixAPIGroup = tslib_1.__decorate([
        Cache_1.Cacheable
    ], HelixAPIGroup);
    return HelixAPIGroup;
}(BaseAPI_1.default));
exports.default = HelixAPIGroup;
//# sourceMappingURL=HelixAPIGroup.js.map