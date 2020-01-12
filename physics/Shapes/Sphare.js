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
})(["require", "exports", "../Particle", "../../mathematics/Vector3D", "./Thing", "../../mathematics/Point3D"], function (require, exports) {
    var Particle_1 = require("../Particle");
    var Vector3D_1 = require("../../mathematics/Vector3D");
    var Thing_1 = require("./Thing");
    var Point3D_1 = require("../../mathematics/Point3D");
    var Sphare = (function (_super) {
        __extends(Sphare, _super);
        function Sphare(x, y, z, radius, locked) {
            if (locked === void 0) { locked = true; }
            _super.call(this, [Particle_1.default.create(x, y, z, locked, 'transparent', radius)], []);
            this.locked = locked;
            this.color = 'red';
        }
        Object.defineProperty(Sphare.prototype, "radius", {
            get: function () { return this.particles[0].radius; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sphare.prototype, "x", {
            get: function () { return this.particles[0].x; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sphare.prototype, "y", {
            get: function () { return this.particles[0].y; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sphare.prototype, "z", {
            get: function () { return this.particles[0].z; },
            enumerable: true,
            configurable: true
        });
        Sphare.prototype.draw = function (g) {
            var _a = this.particles[0], x = _a.x, y = _a.y, z = _a.z;
            var px = g.transform3D(x, y, z);
            g.stroke(this.color, 2);
            g.drawCircle(px.x, px.y, g.scale3D(z) * this.radius);
            _super.prototype.draw.call(this, g);
        };
        Sphare.prototype.getCollisionPoint = function (p) {
            // p.distanceTo(this);
            var v = Vector3D_1.default.from(p);
            v.subtract(new Point3D_1.default(this.x, this.y, this.z));
            var size = v.size;
            if (size - this.radius <= p.radius) {
                var dif = this.radius - size + p.radius;
                v.normalize();
                v.scaleBy(dif);
                return v;
            }
            return null;
        };
        return Sphare;
    })(Thing_1.Thing);
    exports.Sphare = Sphare;
});
