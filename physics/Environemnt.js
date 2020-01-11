(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", "./Velocity"], function (require, exports) {
    var Velocity_1 = require("./Velocity");
    var Environemnt = (function () {
        function Environemnt(width, height) {
            this.width = width;
            this.height = height;
            this.shapes = [];
            this.gravity = new Velocity_1.default(0, 0.35, 0);
        }
        Environemnt.prototype.add = function (obj) {
            this.shapes.push(obj);
        };
        Environemnt.prototype.update = function () {
            var _this = this;
            this.shapes.forEach(function (sh) { return sh.updatePositions(_this); });
            for (var index = 0; index < 30; index++) {
                this.shapes.forEach(function (sh) { return sh.updateSticks(_this); });
                this.shapes.forEach(function (sh) { return sh.updateCollisions(_this); });
            }
        };
        return Environemnt;
    })();
    exports.default = Environemnt;
});
