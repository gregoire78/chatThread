"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var HelixStreamMarker_1 = require("./HelixStreamMarker");
var HelixStreamMarkerWithVideo = /** @class */ (function (_super) {
    tslib_1.__extends(HelixStreamMarkerWithVideo, _super);
    /** @private */
    function HelixStreamMarkerWithVideo(data, _videoId, client) {
        var _this = _super.call(this, data, client) || this;
        _this._videoId = _videoId;
        return _this;
    }
    Object.defineProperty(HelixStreamMarkerWithVideo.prototype, "url", {
        /**
         * The URL of the video, which will start playing at the position of the stream marker.
         */
        get: function () {
            return this._data.URL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixStreamMarkerWithVideo.prototype, "videoId", {
        /**
         * The ID of the video.
         */
        get: function () {
            return this._videoId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves the video data of the video the marker was set in.
     */
    HelixStreamMarkerWithVideo.prototype.getVideo = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.videos.getVideoById(this._videoId)];
            });
        });
    };
    return HelixStreamMarkerWithVideo;
}(HelixStreamMarker_1.default));
exports.default = HelixStreamMarkerWithVideo;
//# sourceMappingURL=HelixStreamMarkerWithVideo.js.map