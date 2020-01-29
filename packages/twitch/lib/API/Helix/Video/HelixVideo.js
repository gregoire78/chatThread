"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
var HellFreezesOverError_1 = require("../../../Errors/HellFreezesOverError");
var Cache_1 = require("../../../Toolkit/Decorators/Cache");
/**
 * A video on Twitch.
 */
var HelixVideo = /** @class */ (function () {
    /** @private */
    function HelixVideo(_data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(HelixVideo.prototype, "id", {
        /**
         * The ID of the video.
         */
        get: function () {
            return this._data.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixVideo.prototype, "userId", {
        /**
         * The ID of the user who created the video.
         */
        get: function () {
            return this._data.user_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixVideo.prototype, "userDisplayName", {
        /**
         * The display name of the user who created the video.
         */
        get: function () {
            return this._data.user_name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves information about the user who created the video.
     */
    HelixVideo.prototype.getUser = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.users.getUserById(this._data.user_id)];
            });
        });
    };
    Object.defineProperty(HelixVideo.prototype, "title", {
        /**
         * The title of the video.
         */
        get: function () {
            return this._data.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixVideo.prototype, "description", {
        /**
         * The description of the video.
         */
        get: function () {
            return this._data.description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixVideo.prototype, "creationDate", {
        /**
         * The date when the video was created.
         */
        get: function () {
            return new Date(this._data.created_at);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixVideo.prototype, "publishDate", {
        /**
         * The date when the video was published.
         */
        get: function () {
            return new Date(this._data.published_at);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixVideo.prototype, "url", {
        /**
         * The URL of the video.
         */
        get: function () {
            return this._data.url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixVideo.prototype, "thumbnailUrl", {
        /**
         * The URL of the thumbnail of the video.
         */
        get: function () {
            return this._data.thumbnail_url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixVideo.prototype, "isPublic", {
        /**
         * Whether the video is public or not.
         */
        get: function () {
            return this._data.viewable === 'public';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixVideo.prototype, "views", {
        /**
         * The number of views of the video.
         */
        get: function () {
            return this._data.view_count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixVideo.prototype, "language", {
        /**
         * The language of the video.
         */
        get: function () {
            return this._data.language;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixVideo.prototype, "type", {
        /**
         * The type of the video.
         */
        get: function () {
            return this._data.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixVideo.prototype, "duration", {
        /**
         * The duration of the video, as formatted by Twitch.
         */
        get: function () {
            return this._data.duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixVideo.prototype, "durationInSeconds", {
        /**
         * The duration of the video, in seconds.
         */
        get: function () {
            var parts = this._data.duration.match(/\d+[hms]/g);
            if (!parts) {
                throw new HellFreezesOverError_1.default("Could not parse duration string: " + this._data.duration);
            }
            return parts
                .map(function (part) {
                var partialMatch = part.match(/(\d+)([hms])/);
                if (!partialMatch) {
                    throw new HellFreezesOverError_1.default("Could not parse partial duration string: " + part);
                }
                var _a = tslib_1.__read(partialMatch, 3), num = _a[1], unit = _a[2];
                return parseInt(num, 10) * { h: 3600, m: 60, s: 1 }[unit];
            })
                .reduce(function (a, b) { return a + b; });
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], HelixVideo.prototype, "_client", void 0);
    tslib_1.__decorate([
        Cache_1.CachedGetter()
    ], HelixVideo.prototype, "durationInSeconds", null);
    HelixVideo = tslib_1.__decorate([
        Cache_1.Cacheable
    ], HelixVideo);
    return HelixVideo;
}());
exports.default = HelixVideo;
//# sourceMappingURL=HelixVideo.js.map