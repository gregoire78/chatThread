"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClearMsg_1 = require("./MessageTypes/ClearMsg");
var GlobalUserState_1 = require("./MessageTypes/GlobalUserState");
/**
 * This capability mostly just adds tags to existing commands.
 *
 * @private
 */
var TwitchTagsCapability = {
    name: 'twitch.tv/tags',
    messageTypes: [GlobalUserState_1.default, ClearMsg_1.default]
};
exports.default = TwitchTagsCapability;
//# sourceMappingURL=index.js.map