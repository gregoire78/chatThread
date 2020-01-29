"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var HelixModerator_1 = require("./HelixModerator");
/**
 * The different types a moderator event can have.
 */
var HelixModeratorEventType;
(function (HelixModeratorEventType) {
    /**
     * Sent when a user gains moderation privileges.
     */
    HelixModeratorEventType["Add"] = "moderation.moderator.add";
    /**
     * Sent when a user loses moderation privileges.
     */
    HelixModeratorEventType["Remove"] = "moderation.moderator.remove";
})(HelixModeratorEventType = exports.HelixModeratorEventType || (exports.HelixModeratorEventType = {}));
/**
 * An event that indicates the change of a moderator status, i.e. gaining or losing moderation privileges.
 */
var HelixModeratorEvent = /** @class */ (function (_super) {
    tslib_1.__extends(HelixModeratorEvent, _super);
    /** @private */
    function HelixModeratorEvent(_eventData, client) {
        var _this = _super.call(this, _eventData.event_data, client) || this;
        _this._eventData = _eventData;
        return _this;
    }
    Object.defineProperty(HelixModeratorEvent.prototype, "eventId", {
        /**
         * The unique ID of the moderator event.
         */
        get: function () {
            return this._eventData.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixModeratorEvent.prototype, "eventType", {
        /**
         * The type of the moderator event.
         */
        get: function () {
            return this._eventData.event_type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixModeratorEvent.prototype, "eventDate", {
        /**
         * The date of the moderator event.
         */
        get: function () {
            return new Date(this._eventData.event_timestamp);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixModeratorEvent.prototype, "eventVersion", {
        /**
         * The version of the moderator event.
         */
        get: function () {
            return this._eventData.version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixModeratorEvent.prototype, "broadcasterId", {
        /**
         * The id of the broadcaster where the user gained/lost moderation privileges.
         */
        get: function () {
            return this._eventData.event_data.broadcaster_id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves more data about the broadcaster.
     */
    HelixModeratorEvent.prototype.getBroadcaster = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.users.getUserById(this._eventData.event_data.broadcaster_id)];
            });
        });
    };
    Object.defineProperty(HelixModeratorEvent.prototype, "broadcasterName", {
        /**
         * The name of the broadcaster where the user gained/lost moderation privileges.
         */
        get: function () {
            return this._eventData.event_data.broadcaster_id;
        },
        enumerable: true,
        configurable: true
    });
    return HelixModeratorEvent;
}(HelixModerator_1.default));
exports.default = HelixModeratorEvent;
//# sourceMappingURL=HelixModeratorEvent.js.map