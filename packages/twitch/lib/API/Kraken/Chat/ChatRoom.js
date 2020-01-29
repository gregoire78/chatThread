"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/** @private */
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
var ChatRoom = /** @class */ (function () {
    /** @private */
    function ChatRoom(_data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(ChatRoom.prototype, "id", {
        /**
         * The ID of the chat room.
         */
        get: function () {
            return this._data._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatRoom.prototype, "ownerId", {
        /**
         * The user ID of the chat room owner.
         */
        get: function () {
            return this._data.owner_id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves the user data of the chat room owner.
     */
    ChatRoom.prototype.getOwner = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.kraken.users.getUser(this._data.owner_id)];
            });
        });
    };
    Object.defineProperty(ChatRoom.prototype, "name", {
        /**
         * The name of the chat room.
         */
        get: function () {
            return this._data.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatRoom.prototype, "topic", {
        /**
         * The topic of the chat room.
         */
        get: function () {
            return this._data.topic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatRoom.prototype, "isPreviewable", {
        /**
         * Whether the chat room is previewable.
         */
        get: function () {
            return this._data.is_previewable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatRoom.prototype, "minRole", {
        /**
         * The minimum role allowed to enter this chat room.
         */
        get: function () {
            return this._data.minimum_allowed_role;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatRoom.prototype, "ircName", {
        /**
         * The name of the IRC channel that corresponds to this chat room.
         */
        get: function () {
            return "#chatrooms:" + this._data.owner_id + ":" + this._data._id;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], ChatRoom.prototype, "_client", void 0);
    return ChatRoom;
}());
exports.default = ChatRoom;
//# sourceMappingURL=ChatRoom.js.map