"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TwitchClient_1 = require("../../TwitchClient");
var NonEnumerable_1 = require("../../Toolkit/Decorators/NonEnumerable");
if (!Object.prototype.hasOwnProperty.call(Symbol, 'asyncIterator')) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Symbol.asyncIterator = Symbol.asyncIterator || Symbol.for('Symbol.asyncIterator');
}
/**
 * Represents a request to the new Twitch API (Helix) that utilizes a cursor to paginate through its results.
 *
 * Aside from the methods described below, you can also utilize the async iterator using `for await .. of`:
 *
 * ```ts
 * const result = client.helix.videos.getVideosByUser('125328655');
 * for await (const video of result) {
 *     console.log(video.title);
 * }
 * ```
 */
var HelixPaginatedRequest = /** @class */ (function () {
    /** @private */
    function HelixPaginatedRequest(_callOptions, client, _mapper) {
        this._callOptions = _callOptions;
        this._mapper = _mapper;
        /** @private */
        this._isFinished = false;
        this._client = client;
    }
    Object.defineProperty(HelixPaginatedRequest.prototype, "current", {
        /**
         * The last retrieved page of data associated to the requested resource.
         *
         * Only works with {@HelixPaginatedRequest#getNext} and not with any other methods of data retrieval.
         */
        get: function () {
            return this._currentData ? this._currentData.data : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves and returns the next available page of data associated to the requested resource, or an empty array if there are no more available pages.
     */
    HelixPaginatedRequest.prototype.getNext = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._isFinished) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this._fetchData()];
                    case 1:
                        result = _a.sent();
                        if (!result.data.length) {
                            this._isFinished = true;
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, this._processResult(result)];
                }
            });
        });
    };
    /**
     * Retrieves and returns all data associated to the requested resource.
     *
     * Be aware that this makes multiple calls to the Twitch API. Due to this, you might be more suspectible to rate limits.
     *
     * Also be aware that this resets the internal cursor, so avoid using this and {@HelixPaginatedRequest#getNext} together.
     */
    HelixPaginatedRequest.prototype.getAll = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.reset();
                        result = [];
                        _a.label = 1;
                    case 1: return [4 /*yield*/, this.getNext()];
                    case 2:
                        data = _a.sent();
                        if (!data.length) {
                            return [3 /*break*/, 4];
                        }
                        result.push.apply(result, tslib_1.__spread(data));
                        _a.label = 3;
                    case 3:
                        if (this._currentCursor) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        this.reset();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Object.defineProperty(HelixPaginatedRequest.prototype, "currentCursor", {
        /**
         * Retrieves the current cursor.
         *
         * Only useful if you want to make manual requests to the API.
         */
        get: function () {
            return this._currentCursor;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets the internal cursor.
     *
     * This will make {@HelixPaginatedRequest#getNext} start from the first page again.
     */
    HelixPaginatedRequest.prototype.reset = function () {
        this._currentCursor = undefined;
        this._isFinished = false;
        this._currentData = undefined;
    };
    HelixPaginatedRequest.prototype[Symbol.asyncIterator] = function () {
        return tslib_1.__asyncGenerator(this, arguments, function _a() {
            var data;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.reset();
                        _b.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 5];
                        return [4 /*yield*/, tslib_1.__await(this.getNext())];
                    case 2:
                        data = _b.sent();
                        if (!data.length) {
                            return [3 /*break*/, 5];
                        }
                        return [5 /*yield**/, tslib_1.__values(tslib_1.__asyncDelegator(tslib_1.__asyncValues(data[Symbol.iterator]())))];
                    case 3: return [4 /*yield*/, tslib_1.__await.apply(void 0, [_b.sent()])];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /** @private */
    HelixPaginatedRequest.prototype._fetchData = function (additionalOptions) {
        if (additionalOptions === void 0) { additionalOptions = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.callAPI(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({ type: TwitchClient_1.TwitchAPICallType.Helix }, this._callOptions), additionalOptions), { query: tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, this._callOptions.query), { after: this._currentCursor, first: '100' }), additionalOptions.query) }))];
            });
        });
    };
    /** @private */
    HelixPaginatedRequest.prototype._processResult = function (result) {
        var _this = this;
        this._currentCursor = result.pagination ? result.pagination.cursor : undefined;
        if (this._currentCursor === undefined) {
            this._isFinished = true;
        }
        this._currentData = result;
        return result.data.reduce(function (acc, elem) {
            var mapped = _this._mapper(elem);
            return Array.isArray(mapped) ? tslib_1.__spread(acc, mapped) : tslib_1.__spread(acc, [mapped]);
        }, []);
    };
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], HelixPaginatedRequest.prototype, "_client", void 0);
    return HelixPaginatedRequest;
}());
exports.default = HelixPaginatedRequest;
//# sourceMappingURL=HelixPaginatedRequest.js.map