var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", "../mathematics/Vector3D"], function (require, exports) {
    var Vector3D_1 = require("../mathematics/Vector3D");
    var Velocity = (function (_super) {
        __extends(Velocity, _super);
        function Velocity(x, y, z) {
            _super.call(this, x, y, z);
        }
        Velocity.ZERO = new Velocity(0, 0, 0);
        return Velocity;
    })(Vector3D_1.default);
    exports.default = Velocity;
});
