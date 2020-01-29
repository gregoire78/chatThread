"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
var HellFreezesOverError_1 = require("../../../Errors/HellFreezesOverError");
var ObjectTools_1 = require("../../../Toolkit/ObjectTools");
/**
 * The type of background a cheermote is supposed to appear on.
 *
 * We will supply a fitting graphic that does not show any artifacts
 * on the given type of background.
 */
var CheermoteBackground;
(function (CheermoteBackground) {
    /**
     * A dark background.
     *
     * Cheermotes might show artifacts on bright backgrounds.
     */
    CheermoteBackground["dark"] = "dark";
    /**
     * A bright background.
     *
     * Cheermotes might show artifacts on dark backgrounds.
     */
    CheermoteBackground["light"] = "light";
})(CheermoteBackground = exports.CheermoteBackground || (exports.CheermoteBackground = {}));
/**
 * The state of a cheermote, i.e. whether it's animated or not.
 */
var CheermoteState;
(function (CheermoteState) {
    /**
     * The cheermote should be animated.
     */
    CheermoteState["animated"] = "animated";
    /**
     * The cheermote should not be animated.
     */
    CheermoteState["static"] = "static";
})(CheermoteState = exports.CheermoteState || (exports.CheermoteState = {}));
/**
 * The scale of the cheermote, which usually relates to the pixel density of the device in use.
 */
var CheermoteScale;
(function (CheermoteScale) {
    /**
     * The cheermote should not be scaled.
     */
    CheermoteScale["x1"] = "1";
    /**
     * The cheermote should be scaled 1.5x.
     */
    CheermoteScale["x1_5"] = "1.5";
    /**
     * The cheermote should be scaled 2x.
     */
    CheermoteScale["x2"] = "2";
    /**
     * The cheermote should be scaled 3x.
     */
    CheermoteScale["x3"] = "3";
    /**
     * The cheermote should be scaled 4x.
     */
    CheermoteScale["x4"] = "4";
})(CheermoteScale = exports.CheermoteScale || (exports.CheermoteScale = {}));
/**
 * A list of cheermotes you can use globally or in a specific channel, depending on how you fetched the list.
 */
var CheermoteList = /** @class */ (function () {
    /** @private */
    function CheermoteList(data, client) {
        this._client = client;
        this._data = ObjectTools_1.indexBy(data, function (action) { return action.prefix.toLowerCase(); });
    }
    /**
     * Gets the URL and color needed to properly represent a cheer of the given amount of bits with the given prefix.
     *
     * @param name The name/prefix of the cheermote.
     * @param bits The amount of bits cheered.
     * @param format The format of the cheermote you want to request.
     */
    CheermoteList.prototype.getCheermoteDisplayInfo = function (name, bits, format) {
        if (format === void 0) { format = {}; }
        name = name.toLowerCase();
        var cheermoteDefaults = this._client._config.cheermotes;
        var fullOptions = tslib_1.__assign({ background: cheermoteDefaults.defaultBackground, state: cheermoteDefaults.defaultState, scale: cheermoteDefaults.defaultScale }, format);
        var tiers = this._data[name].tiers;
        var correctTier = tiers.sort(function (a, b) { return b.min_bits - a.min_bits; }).find(function (tier) { return tier.min_bits <= bits; });
        if (!correctTier) {
            throw new HellFreezesOverError_1.default("Cheermote \"" + name + "\" does not have an applicable tier for " + bits + " bits");
        }
        return {
            url: correctTier.images[fullOptions.background][fullOptions.state][fullOptions.scale],
            color: correctTier.color
        };
    };
    /**
     * Gets all possible cheermote names.
     */
    CheermoteList.prototype.getPossibleNames = function () {
        return Object.keys(this._data);
    };
    /**
     * Parses all the cheermotes out of a message.
     *
     * @param message The message.
     */
    CheermoteList.prototype.parseMessage = function (message) {
        var result = [];
        var names = this.getPossibleNames();
        // TODO fix this regex so it works in firefox, which does not support lookbehind
        var re = new RegExp('(?<=^|\\s)([a-z]+)(\\d+)(?=\\s|$)', 'gi');
        var match;
        // eslint-disable-next-line no-cond-assign
        while ((match = re.exec(message))) {
            var name_1 = match[1].toLowerCase();
            if (names.includes(name_1)) {
                var amount = Number(match[2]);
                result.push({
                    name: name_1,
                    amount: amount,
                    position: match.index,
                    length: match[0].length,
                    displayInfo: this.getCheermoteDisplayInfo(name_1, amount)
                });
            }
        }
        return result;
    };
    /**
     * Transforms all the cheermotes in a message and returns an array of all the message parts.
     *
     * @param message The message.
     * @param transformer A function that transforms a message part into an arbitrary structure.
     */
    CheermoteList.prototype.transformCheerMessage = function (message, transformer) {
        var e_1, _a;
        var result = [];
        var currentPosition = 0;
        try {
            for (var _b = tslib_1.__values(this.parseMessage(message)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var foundCheermote = _c.value;
                if (currentPosition < foundCheermote.position) {
                    result.push(message.substring(currentPosition, foundCheermote.position));
                }
                result.push(transformer(foundCheermote));
                currentPosition = foundCheermote.position + foundCheermote.length;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (currentPosition < message.length) {
            result.push(message.substr(currentPosition));
        }
        return result;
    };
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], CheermoteList.prototype, "_client", void 0);
    return CheermoteList;
}());
exports.default = CheermoteList;
//# sourceMappingURL=CheermoteList.js.map