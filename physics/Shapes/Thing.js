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
})(["require", "exports", "../Mesh", "../Stick"], function (require, exports) {
    var Mesh_1 = require("../Mesh");
    var Stick_1 = require("../Stick");
    var Thing = (function (_super) {
        __extends(Thing, _super);
        function Thing() {
            _super.apply(this, arguments);
        }
        Thing.prototype.draw = function (g) {
            var _this = this;
            this.particles.forEach(function (p) { return _this.drawParticle(g, p); });
            this.sticks.forEach(function (s) { return _this.drawStick(g, s); });
        };
        Thing.prototype.drawParticle = function (g, p) {
            var _a = g.transform3D(p.x, p.y, p.z), x = _a.x, y = _a.y;
            g.fill(p.color);
            g.fillCircle(x, y, 3);
        };
        Thing.prototype.drawStick = function (g, stick) {
            if (!stick.visible)
                return;
            g.stroke(stick.color);
            var s = g.transform3D(stick.start.x, stick.start.y, stick.start.z);
            var e = g.transform3D(stick.end.x, stick.end.y, stick.end.z);
            g.drawLine(s.x, s.y, e.x, e.y);
        };
        Thing.prototype.getCollisionPoint = function (p) {
            return null;
        };
        Thing.prototype.accelerate = function (force) {
            this.particles.forEach(function (p) { return p.acelerate(force); });
        };
        Thing.prototype.getBaseParticle = function () {
            return this.particles[0];
        };
        Thing.prototype.link = function (anotherThing) {
            this.sticks.push(new Stick_1.default(this.getBaseParticle(), anotherThing.getBaseParticle()));
        };
        return Thing;
    })(Mesh_1.default);
    exports.Thing = Thing;
});
