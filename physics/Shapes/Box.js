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
})(["require", "exports", "../Particle", "../Stick", "./Thing"], function (require, exports) {
    var Particle_1 = require("../Particle");
    var Stick_1 = require("../Stick");
    var Thing_1 = require("./Thing");
    var Box = (function (_super) {
        __extends(Box, _super);
        function Box(x, y, z, w, h, a, color, locked) {
            if (color === void 0) { color = 'gray'; }
            if (locked === void 0) { locked = false; }
            _super.call(this, [], []);
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
            this.h = h;
            this.a = a;
            this.color = color;
            this.locked = locked;
            this.cube();
        }
        Box.prototype.cube = function () {
            var _this = this;
            var _a = this, x = _a.x, y = _a.y, z = _a.z, w = _a.w, h = _a.h, a = _a.a, locked = _a.locked;
            this.particles = [
                Particle_1.default.create(x, y, z, locked),
                Particle_1.default.create(x + w, y, z, locked, 'red'),
                Particle_1.default.create(x + w, y + h, z, locked, 'blue'),
                Particle_1.default.create(x, y + h, z, locked, 'green'),
                Particle_1.default.create(x, y, z + a, locked),
                Particle_1.default.create(x + w, y, z + a, locked, 'red'),
                Particle_1.default.create(x + w, y + h, z + a, locked, 'blue'),
                Particle_1.default.create(x, y + h, z + a, locked, 'green'),
            ];
            var link = function (i, j, visible) {
                if (visible === void 0) { visible = true; }
                return _this.sticks.push(new Stick_1.default(_this.particles[i], _this.particles[j], _this.color, visible));
            };
            for (var i = 0; i < 4; i++) {
                link(i, (i + 1) % 4);
                link(4 + i, 4 + (i + 1) % 4);
                link(0, 4);
                link(i, i + 4);
            }
            link(0, 6, false);
            link(1, 7, false);
            link(2, 4, false);
            link(3, 5, false);
        };
        return Box;
    })(Thing_1.Thing);
    exports.Box = Box;
});
