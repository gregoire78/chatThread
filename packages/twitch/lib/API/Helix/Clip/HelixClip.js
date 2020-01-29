"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
var HelixClip = /** @class */ (function () {
    /** @private */
    function HelixClip(_data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(HelixClip.prototype, "id", {
        /**
         * The clip ID.
         */
        get: function () {
            return this._data.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixClip.prototype, "url", {
        /**
         * The URL of the clip.
         */
        get: function () {
            return this._data.url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixClip.prototype, "embedUrl", {
        /**
         * The embed URL of the clip.
         */
        get: function () {
            return this._data.embed_url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixClip.prototype, "broadcasterId", {
        /**
         * The user ID of the broadcaster of the stream where the clip was created.
         */
        get: function () {
            return this._data.broadcaster_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixClip.prototype, "broadcasterDisplayName", {
        /**
         * The display name of the broadcaster of the stream where the clip was created.
         */
        get: function () {
            return this._data.broadcaster_name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves information about the broadcaster of the stream where the clip was created.
     */
    HelixClip.prototype.getBroadcaster = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.users.getUserById(this._data.broadcaster_id)];
            });
        });
    };
    Object.defineProperty(HelixClip.prototype, "creatorId", {
        /**
         * The user ID of the creator of the clip.
         */
        get: function () {
            return this._data.creator_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixClip.prototype, "creatorDisplayName", {
        /**
         * The display name of the creator of the clip.
         */
        get: function () {
            return this._data.creator_name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves information about the creator of the clip.
     */
    HelixClip.prototype.getCreator = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.users.getUserById(this._data.creator_id)];
            });
        });
    };
    Object.defineProperty(HelixClip.prototype, "videoId", {
        /**
         * The ID of the video the clip is taken from.
         */
        get: function () {
            return this._data.video_id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves information about the video the clip is taken from.
     */
    HelixClip.prototype.getVideo = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.videos.getVideoById(this._data.video_id)];
            });
        });
    };
    Object.defineProperty(HelixClip.prototype, "gameId", {
        /**
         * The ID of the game that was being played when the clip was created.
         */
        get: function () {
            return this._data.game_id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves information about the game that was being played when the clip was created.
     */
    HelixClip.prototype.getGame = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.games.getGameById(this._data.game_id)];
            });
        });
    };
    Object.defineProperty(HelixClip.prototype, "language", {
        /**
         * The language of the stream where the clip was created.
         */
        get: function () {
            return this._data.language;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixClip.prototype, "title", {
        /**
         * The title of the clip.
         */
        get: function () {
            return this._data.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixClip.prototype, "views", {
        /**
         * The number of views of the clip.
         */
        get: function () {
            return this._data.view_count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixClip.prototype, "creationDate", {
        /**
         * The date when the clip was created.
         */
        get: function () {
            return new Date(this._data.created_at);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixClip.prototype, "thumbnailUrl", {
        /**
         * The URL of the thumbnail of the clip.
         */
        get: function () {
            return this._data.thumbnail_url;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], HelixClip.prototype, "_client", void 0);
    return HelixClip;
}());
exports.default = HelixClip;
//# sourceMappingURL=HelixClip.js.map