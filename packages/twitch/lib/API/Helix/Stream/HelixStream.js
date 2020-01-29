"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
/**
 * The type of a stream.
 */
var HelixStreamType;
(function (HelixStreamType) {
    /**
     * Returned by Twitch in case of an error.
     */
    HelixStreamType["None"] = "";
    /**
     * A live stream.
     */
    HelixStreamType["Live"] = "live";
    /**
     * A vodcast.
     *
     * Currently not supported by Twitch - but one can only hope and leave it in here.
     */
    HelixStreamType["Vodcast"] = "vodcast";
})(HelixStreamType = exports.HelixStreamType || (exports.HelixStreamType = {}));
/**
 * A Twitch stream.
 */
var HelixStream = /** @class */ (function () {
    /** @private */
    function HelixStream(_data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(HelixStream.prototype, "id", {
        /**
         * The stream ID.
         */
        get: function () {
            return this._data.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixStream.prototype, "userId", {
        /**
         * The user ID.
         */
        get: function () {
            return this._data.user_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixStream.prototype, "userDisplayName", {
        /**
         * The user's display name.
         */
        get: function () {
            return this._data.user_name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves information about the user broadcasting the stream.
     */
    HelixStream.prototype.getUser = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.users.getUserById(this._data.user_id)];
            });
        });
    };
    Object.defineProperty(HelixStream.prototype, "gameId", {
        /**
         * The game ID.
         */
        get: function () {
            return this._data.game_id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves information about the game that is being played on this stream.
     */
    HelixStream.prototype.getGame = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.games.getGameById(this._data.game_id)];
            });
        });
    };
    Object.defineProperty(HelixStream.prototype, "type", {
        /**
         * The type of the stream.
         */
        get: function () {
            return this._data.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixStream.prototype, "title", {
        /**
         * The title of the stream.
         */
        get: function () {
            return this._data.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixStream.prototype, "viewers", {
        /**
         * The number of viewers the stream currently has.
         */
        get: function () {
            return this._data.viewer_count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixStream.prototype, "startDate", {
        /**
         * The time when the stream started.
         */
        get: function () {
            return new Date(this._data.started_at);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixStream.prototype, "language", {
        /**
         * The language of the stream.
         */
        get: function () {
            return this._data.language;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixStream.prototype, "thumbnailUrl", {
        /**
         * The URL of the thumbnail of the stream.
         */
        get: function () {
            return this._data.thumbnail_url;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], HelixStream.prototype, "_client", void 0);
    return HelixStream;
}());
exports.default = HelixStream;
//# sourceMappingURL=HelixStream.js.map