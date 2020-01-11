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
})(["require", "exports", "./Point3D"], function (require, exports) {
    var Point3D_1 = require("./Point3D");
    var Vector3D = (function (_super) {
        __extends(Vector3D, _super);
        function Vector3D(x, y, z) {
            _super.call(this, x, y, z);
        }
        Vector3D.from = function (vector) {
            return new Vector3D(vector.x, vector.y, vector.z);
        };
        Object.defineProperty(Vector3D.prototype, "size", {
            get: function () {
                return _super.prototype.distanceTo.call(this, Point3D_1.default.ZERO);
            },
            enumerable: true,
            configurable: true
        });
        Vector3D.prototype.scale = function (x, y, z) {
            this.x *= x;
            this.y *= y;
            this.z *= z;
        };
        Vector3D.prototype.scaleBy = function (factor) {
            this.scale(factor, factor, factor);
        };
        Vector3D.prototype.normalize = function () {
            this.scaleBy(1 / this.size);
        };
        return Vector3D;
    })(Point3D_1.default);
    exports.default = Vector3D;
});
