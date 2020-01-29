"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var HelixPaginatedRequest_1 = require("./HelixPaginatedRequest");
/**
 * A special case of {@HelixPaginatedRequest} with support for fetching the total number of entities, whenever an endpoint supports it.
 */
var HelixPaginatedRequestWithTotal = /** @class */ (function (_super) {
    tslib_1.__extends(HelixPaginatedRequestWithTotal, _super);
    function HelixPaginatedRequestWithTotal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves and returns the total number of entities existing in the queried result set.
     */
    HelixPaginatedRequestWithTotal.prototype.getTotalCount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._currentData;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._fetchData({ query: { after: undefined } })];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        data = _a;
                        return [2 /*return*/, data.total];
                }
            });
        });
    };
    return HelixPaginatedRequestWithTotal;
}(HelixPaginatedRequest_1.default));
exports.default = HelixPaginatedRequestWithTotal;
//# sourceMappingURL=HelixPaginatedRequestWithTotal.js.map