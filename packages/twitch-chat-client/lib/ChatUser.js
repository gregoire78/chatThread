"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A user in chat.
 */
var ChatUser = /** @class */ (function () {
    /** @private */
    function ChatUser(userName, userData) {
        this._userName = userName.toLowerCase();
        this._userData = userData ? new Map(userData) : new Map();
    }
    Object.defineProperty(ChatUser.prototype, "userName", {
        /**
         * The name of the user.
         */
        get: function () {
            return this._userName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatUser.prototype, "displayName", {
        /**
         * The display name of the user.
         */
        get: function () {
            return this._userData.get('display-name') || this._userName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatUser.prototype, "color", {
        /**
         * The color the user chose to display in chat.
         *
         * Returns null if the user didn't choose a color. In this case, you should generate your own color.
         */
        get: function () {
            return this._userData.get('color');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatUser.prototype, "badges", {
        /**
         * The badges of the user. Returned as a map that maps the badge category to the detail.
         */
        get: function () {
            var badgesStr = this._userData.get('badges');
            if (!badgesStr) {
                return new Map();
            }
            return new Map(badgesStr.split(',').map(function (badge) { return badge.split('/', 2); }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatUser.prototype, "userId", {
        /**
         * The ID of the user.
         */
        get: function () {
            return this._userData.get('user-id') || undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatUser.prototype, "userType", {
        /**
         * The type of the user.
         * Possible values are undefined, 'mod', 'global_mod', 'admin' and 'staff'.
         */
        get: function () {
            return this._userData.get('user-type') || undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatUser.prototype, "isSubscriber", {
        /**
         * Whether the user is subscribed to the channel.
         */
        get: function () {
            return this.badges.has('subscriber') || this.isFounder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatUser.prototype, "isFounder", {
        /**
         * Whether the user is a Founder of the channel.
         */
        get: function () {
            return this.badges.has('founder');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatUser.prototype, "isMod", {
        /**
         * Whether the user is a moderator of the channel.
         */
        get: function () {
            return this.badges.has('moderator');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatUser.prototype, "isVip", {
        /**
         * Whether the user is a VIP in the channel.
         */
        get: function () {
            return this.badges.has('vip');
        },
        enumerable: true,
        configurable: true
    });
    return ChatUser;
}());
exports.default = ChatUser;
//# sourceMappingURL=ChatUser.js.map