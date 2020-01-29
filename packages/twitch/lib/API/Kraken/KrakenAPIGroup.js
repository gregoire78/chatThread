"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BaseAPI_1 = require("../BaseAPI");
var Cache_1 = require("../../Toolkit/Decorators/Cache");
var BitsAPI_1 = require("./Bits/BitsAPI");
var ChannelAPI_1 = require("./Channel/ChannelAPI");
var ChatAPI_1 = require("./Chat/ChatAPI");
var SearchAPI_1 = require("./Search/SearchAPI");
var StreamAPI_1 = require("./Stream/StreamAPI");
var UserAPI_1 = require("./User/UserAPI");
var TeamAPI_1 = require("./Team/TeamAPI");
/**
 * Groups all API calls available in Kraken v5.
 *
 * Can be accessed using {@TwitchClient#kraken}.
 */
var KrakenAPIGroup = /** @class */ (function (_super) {
    tslib_1.__extends(KrakenAPIGroup, _super);
    function KrakenAPIGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(KrakenAPIGroup.prototype, "bits", {
        /**
         * The API methods that deal with bits.
         */
        get: function () {
            return new BitsAPI_1.default(this._client);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KrakenAPIGroup.prototype, "channels", {
        /**
         * The API methods that deal with channels.
         */
        get: function () {
            return new ChannelAPI_1.default(this._client);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KrakenAPIGroup.prototype, "chat", {
        /**
         * The API methods that deal with chat.
         */
        get: function () {
            return new ChatAPI_1.default(this._client);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KrakenAPIGroup.prototype, "search", {
        /**
         * The API methods that deal with searching.
         */
        get: function () {
            return new SearchAPI_1.default(this._client);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KrakenAPIGroup.prototype, "streams", {
        /**
         * The API methods that deal with streams.
         */
        get: function () {
            return new StreamAPI_1.default(this._client);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KrakenAPIGroup.prototype, "users", {
        /**
         * The API methods that deal with users.
         */
        get: function () {
            return new UserAPI_1.default(this._client);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KrakenAPIGroup.prototype, "teams", {
        /**
         * The API methods that deal with teams.
         */
        get: function () {
            return new TeamAPI_1.default(this._client);
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], KrakenAPIGroup.prototype, "bits", null);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], KrakenAPIGroup.prototype, "channels", null);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], KrakenAPIGroup.prototype, "chat", null);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], KrakenAPIGroup.prototype, "search", null);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], KrakenAPIGroup.prototype, "streams", null);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], KrakenAPIGroup.prototype, "users", null);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], KrakenAPIGroup.prototype, "teams", null);
    KrakenAPIGroup = tslib_1.__decorate([
        Cache_1.Cacheable
    ], KrakenAPIGroup);
    return KrakenAPIGroup;
}(BaseAPI_1.default));
exports.default = KrakenAPIGroup;
//# sourceMappingURL=KrakenAPIGroup.js.map