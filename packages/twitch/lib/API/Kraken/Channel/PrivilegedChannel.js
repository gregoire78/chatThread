"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Channel_1 = require("./Channel");
/**
 * A channel you have extended privileges for, i.e. the channel of the currently authenticated user.
 */
var PrivilegedChannel = /** @class */ (function (_super) {
    tslib_1.__extends(PrivilegedChannel, _super);
    function PrivilegedChannel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PrivilegedChannel.prototype, "streamKey", {
        /**
         * The channel's stream key.
         */
        get: function () {
            return this._data.stream_key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrivilegedChannel.prototype, "email", {
        /**
         * The channel's email address.
         */
        get: function () {
            return this._data.email;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves the list of editors of the channel.
     */
    PrivilegedChannel.prototype.getEditors = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.channels.getChannelEditors(this)];
            });
        });
    };
    /**
     * Starts a commercial in the channel.
     *
     * @param length The length of the commercial.
     */
    PrivilegedChannel.prototype.startCommercial = function (length) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.channels.startChannelCommercial(this, length)];
            });
        });
    };
    /**
     * Resets the given channel's stream key.
     */
    PrivilegedChannel.prototype.resetStreamKey = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channelData, streamKey;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._client.kraken.channels.resetChannelStreamKey(this)];
                    case 1:
                        channelData = _a.sent();
                        streamKey = channelData.stream_key;
                        this._data.stream_key = streamKey;
                        return [2 /*return*/, streamKey];
                }
            });
        });
    };
    return PrivilegedChannel;
}(Channel_1.default));
exports.default = PrivilegedChannel;
//# sourceMappingURL=PrivilegedChannel.js.map