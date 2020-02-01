"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @private */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NonEnumerable(target, key) {
    // first property defined in prototype, that's why we use getters/setters
    // (otherwise assignment in object will override property in prototype)
    Object.defineProperty(target, key, {
        get: function () {
            return;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set: function (val) {
            // here we have reference to instance and can set property directly to it
            Object.defineProperty(this, key, {
                value: val,
                writable: true,
                enumerable: false
            });
        },
        enumerable: false
    });
}
exports.NonEnumerable = NonEnumerable;
//# sourceMappingURL=Decorators.js.map