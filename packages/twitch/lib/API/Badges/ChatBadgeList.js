"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../Toolkit/Decorators/NonEnumerable");
var ChatBadgeSet_1 = require("./ChatBadgeSet");
/**
 * A list of badge sets.
 */
var ChatBadgeList = /** @class */ (function () {
    /** @private */
    function ChatBadgeList(_data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(ChatBadgeList.prototype, "badgeSetNames", {
        /**
         * Names of all badge sets in the list.
         */
        get: function () {
            return Object.keys(this._data);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets a specific badge set by name.
     *
     * @param name The name of the badge set.
     */
    ChatBadgeList.prototype.getBadgeSet = function (name) {
        return new ChatBadgeSet_1.default(this._data[name], this._client);
    };
    /** @private */
    ChatBadgeList.prototype._merge = function (additionalData) {
        if (additionalData instanceof ChatBadgeList) {
            additionalData = additionalData._data;
        }
        return new ChatBadgeList(tslib_1.__assign(tslib_1.__assign({}, this._data), additionalData), this._client);
    };
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], ChatBadgeList.prototype, "_client", void 0);
    return ChatBadgeList;
}());
exports.default = ChatBadgeList;
//# sourceMappingURL=ChatBadgeList.js.map