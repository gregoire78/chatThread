"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
var Channel_1 = require("../Channel/Channel");
/**
 * The type of a stream.
 */
var StreamType;
(function (StreamType) {
    /**
     * A live stream.
     */
    StreamType["Live"] = "live";
    /**
     * An upload to the channel (VoD) that is streamed live for the first time.
     */
    StreamType["Premiere"] = "premiere";
    /**
     * A rerun of a past live stream.
     */
    StreamType["ReRun"] = "rerun";
    /**
     * All types of streams. Used for filtering.
     */
    StreamType["All"] = "all";
})(StreamType = exports.StreamType || (exports.StreamType = {}));
/**
 * A Twitch stream.
 */
var Stream = /** @class */ (function () {
    /** @private */
    function Stream(_data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(Stream.prototype, "id", {
        /**
         * The ID of the stream.
         */
        get: function () {
            return this._data._id.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "game", {
        /**
         * The game played on the stream.
         */
        get: function () {
            return this._data.game;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "viewers", {
        /**
         * The current number of concurrent viewers.
         */
        get: function () {
            return this._data.viewers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "videoHeight", {
        /**
         * The height of the stream video.
         */
        get: function () {
            return this._data.video_height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "averageFPS", {
        /**
         * The average FPS (frames per second) that are shown on the stream.
         */
        get: function () {
            return this._data.average_fps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "delay", {
        /**
         * The delay of the stream, in seconds.
         */
        get: function () {
            return this._data.delay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "startDate", {
        /**
         * The time when the stream started.
         */
        get: function () {
            return new Date(this._data.created_at);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "isPlaylist", {
        /**
         * Whether the stream is running a playlist.
         */
        get: function () {
            return this._data.is_playlist;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "type", {
        /**
         * The type of the stream.
         */
        get: function () {
            return this._data.stream_type;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the URL of a preview image for the stream
     *
     * @param size The size of the image.
     */
    Stream.prototype.getPreviewUrl = function (size) {
        return this._data.preview[size];
    };
    Object.defineProperty(Stream.prototype, "channel", {
        /**
         * The channel where the stream is shown.
         */
        get: function () {
            return new Channel_1.default(this._data.channel, this._client);
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], Stream.prototype, "_client", void 0);
    return Stream;
}());
exports.default = Stream;
//# sourceMappingURL=Stream.js.map