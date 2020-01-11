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
})(["require", "exports", "../mathematics/Point3D", "./Velocity"], function (require, exports) {
    var Point3D_1 = require("../mathematics/Point3D");
    var Velocity_1 = require("./Velocity");
    // import PhysicalElement from "./PhysicalElement";
    var Particle = (function (_super) {
        __extends(Particle, _super);
        function Particle(position, color, velocity) {
            if (color === void 0) { color = ''; }
            if (velocity === void 0) { velocity = Velocity_1.default.ZERO; }
            _super.call(this, position.x, position.y, position.z);
            this.color = color;
            this.velocity = velocity;
            this.visible = false;
            this.locked = false;
            this.restitution = 0.01;
            this.friction = 0.01;
            this.radius = 1;
            if (this.color === '') {
                this.color = this.randomColor();
            }
            this.oldPosition = new Point3D_1.default(position.x, position.y, position.z);
        }
        Particle.prototype.acelerate = function (force) {
            this.oldPosition.add(force);
        };
        Particle.prototype.randomColor = function () {
            var r = function () { return Math.floor(Math.random() * 25) * 10; };
            return "rgb(" + r() + "," + r() + "," + r() + ")";
        };
        Particle.prototype.update = function (env) {
            if (this.locked == true)
                return;
            this.velocity.moveBy(this);
            this.velocity.subtract(this.oldPosition);
            this.oldPosition.moveBy(this);
            this.add(this.velocity);
            this.add(env.gravity);
        };
        Particle.prototype.updateCollision = function (env) {
            if (this.locked == true)
                return;
            this.velocity.moveBy(this);
            this.velocity.subtract(this.oldPosition);
            this.velocity.scaleBy(this.friction);
            for (var _i = 0, _a = env.shapes; _i < _a.length; _i++) {
                var neighbor = _a[_i];
                if (neighbor.particles.indexOf(this) >= 0)
                    continue;
                var penetration = neighbor.getCollisionPoint(this);
                if (penetration != null) {
                    this.add(penetration);
                }
            }
            var K = 150;
            var groundCollision = this.y > (env.height / 2 - K);
            if (groundCollision) {
                this.y = (env.height / 2) - K;
                this.oldPosition.y = this.y + Math.floor(this.velocity.y * this.restitution);
                this.oldPosition.x += (this.x - this.oldPosition.x) * this.friction;
                this.oldPosition.z += (this.z - this.oldPosition.z) * this.friction;
            }
        };
        Particle.create = function (x, y, z, locked, color, radius) {
            if (locked === void 0) { locked = true; }
            if (color === void 0) { color = ''; }
            if (radius === void 0) { radius = 1; }
            var p = new Particle(new Point3D_1.default(x, y, z));
            p.locked = locked;
            p.color = color;
            p.radius = radius;
            return p;
        };
        return Particle;
    })(Point3D_1.default);
    exports.default = Particle;
});
