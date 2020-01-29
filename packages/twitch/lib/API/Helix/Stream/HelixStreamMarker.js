"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
var HelixStreamMarker = /** @class */ (function () {
    /** @private */
    function HelixStreamMarker(/** @private */ _data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(HelixStreamMarker.prototype, "id", {
        /**
         * The ID of the marker.
         */
        get: function () {
            return this._data.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixStreamMarker.prototype, "creationDate", {
        /**
         * The date and time when the marker was created.
         */
        get: function () {
            return new Date(this._data.created_at);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixStreamMarker.prototype, "description", {
        /**
         * The description of the marker.
         */
        get: function () {
            return this._data.description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixStreamMarker.prototype, "positionInSeconds", {
        /**
         * The position in the stream when the marker was created, in seconds.
         */
        get: function () {
            return this._data.position_seconds;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], HelixStreamMarker.prototype, "_client", void 0);
    return HelixStreamMarker;
}());
exports.default = HelixStreamMarker;
//# sourceMappingURL=HelixStreamMarker.js.map