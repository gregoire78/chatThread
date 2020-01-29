"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NonEnumerable_1 = require("../../../Toolkit/Decorators/NonEnumerable");
/**
 * A Twitch team.
 */
var Team = /** @class */ (function () {
    /** @private */
    function Team(/** @private */ _data, client) {
        this._data = _data;
        this._client = client;
    }
    Object.defineProperty(Team.prototype, "id", {
        /**
         * The ID of the team.
         */
        get: function () {
            return this._data._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Team.prototype, "background", {
        /**
         * The background url of the team.
         */
        get: function () {
            return this._data.background;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Team.prototype, "banner", {
        /**
         * The banner url of the team.
         */
        get: function () {
            return this._data.banner;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Team.prototype, "creationDate", {
        /**
         * The date when the team was created.
         */
        get: function () {
            return new Date(this._data.created_at);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Team.prototype, "updateDate", {
        /**
         * The last date when the team changed anything.
         */
        get: function () {
            return new Date(this._data.updated_at);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Team.prototype, "name", {
        /**
         * The name of the team.
         */
        get: function () {
            return this._data.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Team.prototype, "info", {
        /**
         * The info of the team.
         */
        get: function () {
            return this._data.info;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Team.prototype, "displayName", {
        /**
         * The display name of the team.
         */
        get: function () {
            return this._data.display_name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Team.prototype, "logoUrl", {
        /**
         * The URL to the profile picture of the team.
         */
        get: function () {
            return this._data.logo;
        },
        enumerable: true,
        configurable: true
    });
    Team.prototype.getUsers = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var team;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._client.kraken.teams.getTeamByName(this.name)];
                    case 1:
                        team = _a.sent();
                        return [2 /*return*/, team.getUsers()];
                }
            });
        });
    };
    tslib_1.__decorate([
        NonEnumerable_1.NonEnumerable
    ], Team.prototype, "_client", void 0);
    return Team;
}());
exports.default = Team;
//# sourceMappingURL=Team.js.map