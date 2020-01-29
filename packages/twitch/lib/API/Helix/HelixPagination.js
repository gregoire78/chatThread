"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @private */
function makePaginationQuery(_a) {
    var _b = _a === void 0 ? {} : _a, after = _b.after, before = _b.before, limit = _b.limit;
    return {
        after: after,
        before: before,
        first: limit
    };
}
exports.makePaginationQuery = makePaginationQuery;
//# sourceMappingURL=HelixPagination.js.map