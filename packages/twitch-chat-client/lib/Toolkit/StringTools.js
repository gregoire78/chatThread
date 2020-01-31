"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function utf8Substring(str, start, end) {
    return tslib_1.__spread(str).slice(start, end).join('');
}
exports.utf8Substring = utf8Substring;
function utf8Length(str) {
    return tslib_1.__spread(str).length;
}
exports.utf8Length = utf8Length;
//# sourceMappingURL=StringTools.js.map