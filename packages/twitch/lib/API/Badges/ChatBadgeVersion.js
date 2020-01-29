"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../Toolkit/Decorators/NonEnumerable");
/**
 * A version of a badge.
 */
var ChatBadgeVersion = /** @class */ (function () {
    /** @private */
    function ChatBadgeVersion(_data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(ChatBadgeVersion.prototype, "clickAction", {
        /**
         * The action to execute when the badge is clicked.
         */
        get: function () {
            return this._data.click_action;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatBadgeVersion.prototype, "clickUrl", {
        /**
         * The URL to visit when the badge is clicked.
         *
         * Only applies if clickAction === 'visit_url'.
         */
        get: function () {
            return this._data.click_url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatBadgeVersion.prototype, "description", {
        /**
         * The description of the badge.
         */
        get: function () {
            return this._data.description;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets an image URL for the given scale.
     *
     * @param scale The scale of the badge image.
     */
    ChatBadgeVersion.prototype.getImageUrl = function (scale) {
        return this._data["image_url_" + scale + "x"];
    };
    Object.defineProperty(ChatBadgeVersion.prototype, "title", {
        /**
         * The title of the badge.
         */
        get: function () {
            return this._data.title;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], ChatBadgeVersion.prototype, "_client", void 0);
    return ChatBadgeVersion;
}());
exports.default = ChatBadgeVersion;
//# sourceMappingURL=ChatBadgeVersion.js.map