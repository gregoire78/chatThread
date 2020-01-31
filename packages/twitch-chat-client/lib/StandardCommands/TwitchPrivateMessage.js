"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Commands_1 = require("ircv3/lib/Message/MessageTypes/Commands/");
var ChatUser_1 = require("../ChatUser");
var ChatTools_1 = require("../Toolkit/ChatTools");
var StringTools_1 = require("../Toolkit/StringTools");
var TwitchPrivateMessage = /** @class */ (function (_super) {
    tslib_1.__extends(TwitchPrivateMessage, _super);
    function TwitchPrivateMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TwitchPrivateMessage.prototype, "userInfo", {
        get: function () {
            return new ChatUser_1.default(this._prefix.nick, this._tags);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TwitchPrivateMessage.prototype, "channelId", {
        get: function () {
            if (!this._tags) {
                return null;
            }
            return this._tags.get('room-id') || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TwitchPrivateMessage.prototype, "isCheer", {
        get: function () {
            if (!this._tags) {
                return false;
            }
            return this._tags.has('bits');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TwitchPrivateMessage.prototype, "totalBits", {
        get: function () {
            if (!this._tags) {
                return 0;
            }
            return Number(this._tags.get('bits'));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TwitchPrivateMessage.prototype, "emoteOffsets", {
        get: function () {
            if (!this._tags) {
                return new Map();
            }
            return ChatTools_1.parseEmotes(this._tags.get('emotes'));
        },
        enumerable: true,
        configurable: true
    });
    TwitchPrivateMessage.prototype.parseEmotes = function (overrideMessage) {
        var foundEmotes = this._parseEmotePositions(overrideMessage);
        return this._fillTextPositions(overrideMessage ? overrideMessage : this.params.message, foundEmotes);
    };
    TwitchPrivateMessage.prototype.parseEmotesAndBits = function (cheermotes, overrideMessage) {
        var messageText = overrideMessage ? overrideMessage : this.params.message;
        var foundCheermotes = cheermotes.parseMessage(messageText);
        var foundEmotesAndCheermotes = tslib_1.__spread(this._parseEmotePositions(overrideMessage), foundCheermotes.map(function (cheermote) { return ({
            type: 'cheer',
            position: cheermote.position,
            length: cheermote.length,
            name: cheermote.name,
            amount: cheermote.amount,
            displayInfo: cheermote.displayInfo
        }); }));
        foundEmotesAndCheermotes.sort(function (a, b) { return a.position - b.position; });
        return this._fillTextPositions(messageText, foundEmotesAndCheermotes);
    };
    TwitchPrivateMessage.prototype._parseEmotePositions = function (overrideMessage) {
        var messageText = overrideMessage ? overrideMessage : this.params.message;
        return tslib_1.__spread(this.emoteOffsets.entries()).flatMap(function (_a) {
            var _b = tslib_1.__read(_a, 2), emote = _b[0], placements = _b[1];
            return placements.map(function (placement) {
                var _a = tslib_1.__read(placement.split('-'), 2), startStr = _a[0], endStr = _a[1];
                var start = +startStr;
                var end = +endStr;
                return {
                    type: 'emote',
                    position: start,
                    length: end - start + 1,
                    id: emote,
                    name: StringTools_1.utf8Substring(messageText, start, end + 1)
                };
            });
        })
            .sort(function (a, b) { return a.position - b.position; });
    };
    TwitchPrivateMessage.prototype._fillTextPositions = function (message, otherPositions) {
        var e_1, _a;
        var messageLength = StringTools_1.utf8Length(message);
        if (!otherPositions.length) {
            return [
                {
                    type: 'text',
                    position: 0,
                    length: messageLength,
                    text: message
                }
            ];
        }
        var result = [];
        var currentPosition = 0;
        try {
            for (var otherPositions_1 = tslib_1.__values(otherPositions), otherPositions_1_1 = otherPositions_1.next(); !otherPositions_1_1.done; otherPositions_1_1 = otherPositions_1.next()) {
                var token = otherPositions_1_1.value;
                if (token.position > currentPosition) {
                    result.push({
                        type: 'text',
                        position: currentPosition,
                        length: token.position - currentPosition,
                        text: StringTools_1.utf8Substring(message, currentPosition, token.position)
                    });
                }
                result.push(token);
                currentPosition = token.position + token.length;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (otherPositions_1_1 && !otherPositions_1_1.done && (_a = otherPositions_1.return)) _a.call(otherPositions_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (currentPosition < messageLength) {
            result.push({
                type: 'text',
                position: currentPosition,
                length: messageLength - currentPosition,
                text: StringTools_1.utf8Substring(message, currentPosition)
            });
        }
        return result;
    };
    return TwitchPrivateMessage;
}(Commands_1.PrivateMessage));
exports.default = TwitchPrivateMessage;
//# sourceMappingURL=TwitchPrivateMessage.js.map