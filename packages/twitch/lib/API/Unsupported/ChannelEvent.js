"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Channel_1 = require("../Kraken/Channel/Channel");
var NonEnumerable_1 = require("../../Toolkit/Decorators/NonEnumerable");
/**
 * An event held on a Twitch channel.
 */
var ChannelEvent = /** @class */ (function () {
    /** @private */
    function ChannelEvent(_data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(ChannelEvent.prototype, "id", {
        /**
         * The ID of the event.
         */
        get: function () {
            return this._data._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelEvent.prototype, "startDate", {
        /**
         * The time when the event starts.
         */
        get: function () {
            return new Date(this._data.start_time);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelEvent.prototype, "endDate", {
        /**
         * The time when the event ends.
         */
        get: function () {
            return new Date(this._data.end_time);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelEvent.prototype, "timeZoneId", {
        /**
         * The ID of the timezone that the start and end times of the event are local to.
         */
        get: function () {
            return this._data.time_zone_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelEvent.prototype, "title", {
        /**
         * The title of the event.
         */
        get: function () {
            return this._data.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelEvent.prototype, "description", {
        /**
         * The description of the event.
         */
        get: function () {
            return this._data.description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelEvent.prototype, "language", {
        /**
         * The language of the event.
         */
        get: function () {
            return this._data.language;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelEvent.prototype, "channel", {
        /**
         * The channel where the event is held.
         */
        get: function () {
            return new Channel_1.default(this._data.channel, this._client);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Generates a URL to the cover image of the event with the given dimensions.
     *
     * @param width The width of the image.
     * @param height The height of the image.
     */
    ChannelEvent.prototype.buildCoverImageUrl = function (width, height) {
        return this._data.cover_image_url.replace('{width}', width.toString()).replace('{height}', height.toString());
    };
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], ChannelEvent.prototype, "_client", void 0);
    return ChannelEvent;
}());
exports.default = ChannelEvent;
//# sourceMappingURL=ChannelEvent.js.map