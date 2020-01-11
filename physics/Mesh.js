(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports"], function (require, exports) {
    var Mesh = (function () {
        function Mesh(particles, sticks) {
            this.particles = particles;
            this.sticks = sticks;
        }
        Mesh.prototype.updatePositions = function (env) {
            this.particles.forEach(function (p) { return p.update(env); });
        };
        Mesh.prototype.updateSticks = function (env) {
            this.sticks.forEach(function (st) { return st.update(env); });
        };
        Mesh.prototype.updateCollisions = function (env) {
            this.particles.forEach(function (st) { return st.updateCollision(env); });
        };
        return Mesh;
    })();
    exports.default = Mesh;
});
