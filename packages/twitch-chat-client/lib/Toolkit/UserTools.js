"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @private */
function toUserName(channel) {
    // it's okay if this is already a user name, we only remove the first character if it's a pound
    return channel.replace(/^#/, '').toLowerCase();
}
exports.toUserName = toUserName;
/** @private */
function toChannelName(user) {
    // remove leading pound first - in case it already is a channel name
    return "#" + toUserName(user);
}
exports.toChannelName = toChannelName;
//# sourceMappingURL=UserTools.js.map