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
})(["require", "exports", "../mathematics/Line3D", "../mathematics/Point3D", "../mathematics/Vector3D"], function (require, exports) {
    var Line3D_1 = require("../mathematics/Line3D");
    var Point3D_1 = require("../mathematics/Point3D");
    var Vector3D_1 = require("../mathematics/Vector3D");
    // import PhysicalElement from "./PhysicalElement";
    var Stick = (function (_super) {
        __extends(Stick, _super);
        function Stick(start, end, color, visible) {
            if (color === void 0) { color = '#ccc'; }
            if (visible === void 0) { visible = true; }
            _super.call(this, start, end);
            this.start = start;
            this.end = end;
            this.color = color;
            this.visible = visible;
            this.fixedSize = this.size;
        }
        Stick.prototype.update = function (env) {
            var tmp = Vector3D_1.default.from(this.end);
            tmp.subtract(this.start);
            var currentSize = tmp.distanceTo(Point3D_1.default.ZERO);
            var dif = (currentSize - this.fixedSize) * 0.5;
            tmp.normalize();
            tmp.scaleBy(dif * 1);
            if (!this.start.locked) {
                this.start.add(tmp);
            }
            if (!this.end.locked) {
                this.end.subtract(tmp);
            }
        };
        return Stick;
    })(Line3D_1.default);
    exports.default = Stick;
});
