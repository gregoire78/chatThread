"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
/**
 * A bits transaction made inside an extension.
 */
var HelixExtensionTransaction = /** @class */ (function () {
    /** @private */
    function HelixExtensionTransaction(_data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(HelixExtensionTransaction.prototype, "id", {
        /**
         * The ID of the transaction.
         */
        get: function () {
            return this._data.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixExtensionTransaction.prototype, "transactionDate", {
        /**
         * The time when the transaction was made.
         */
        get: function () {
            return new Date(this._data.timestamp);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixExtensionTransaction.prototype, "broadcasterId", {
        /**
         * The ID of the broadcaster that runs the extension on their channel.
         */
        get: function () {
            return this._data.broadcaster_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixExtensionTransaction.prototype, "broadcasterDisplayName", {
        /**
         * The display name of the broadcaster that runs the extension on their channel.
         */
        get: function () {
            return this._data.broadcaster_name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves information about the broadcaster that runs the extension on their channel.
     */
    HelixExtensionTransaction.prototype.getBroadcaster = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.users.getUserById(this._data.broadcaster_id)];
            });
        });
    };
    Object.defineProperty(HelixExtensionTransaction.prototype, "userId", {
        /**
         * The ID of the user that made the transaction.
         */
        get: function () {
            return this._data.user_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixExtensionTransaction.prototype, "userDisplayName", {
        /**
         * The display name of the user that made the transaction.
         */
        get: function () {
            return this._data.user_name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves information about the user that made the transaction.
     */
    HelixExtensionTransaction.prototype.getUser = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._client.helix.users.getUserById(this._data.user_id)];
            });
        });
    };
    Object.defineProperty(HelixExtensionTransaction.prototype, "productType", {
        /**
         * The product type.
         */
        get: function () {
            return this._data.product_type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixExtensionTransaction.prototype, "productSKU", {
        /**
         * The product SKU.
         */
        get: function () {
            return this._data.product_data.sku;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixExtensionTransaction.prototype, "productCost", {
        /**
         * The cost of the product, in bits.
         */
        get: function () {
            return this._data.product_data.cost.amount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixExtensionTransaction.prototype, "productDisplayName", {
        /**
         * The display name of the product.
         */
        get: function () {
            return this._data.product_data.displayName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelixExtensionTransaction.prototype, "productInDevelopment", {
        /**
         * Whether the product is in development.
         */
        get: function () {
            return this._data.product_data.inDevelopment;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], HelixExtensionTransaction.prototype, "_client", void 0);
    return HelixExtensionTransaction;
}());
exports.default = HelixExtensionTransaction;
//# sourceMappingURL=HelixExtensionTransaction.js.map