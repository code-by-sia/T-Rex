(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports"], function (require, exports) {
    var Point3D = (function () {
        function Point3D(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Point3D.prototype.add = function (point) {
            this.x += point.x;
            this.y += point.y;
            this.z += point.z;
        };
        Point3D.prototype.subtract = function (point) {
            this.x -= point.x;
            this.y -= point.y;
            this.z -= point.z;
        };
        Point3D.prototype.move = function (x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        };
        Point3D.prototype.moveBy = function (point) {
            this.move(point.x, point.y, point.z);
        };
        Point3D.prototype.clone = function () {
            return new Point3D(this.x, this.y, this.z);
        };
        Point3D.prototype.distanceTo = function (point) {
            var x2 = Math.pow(this.x - point.x, 2);
            var y2 = Math.pow(this.y - point.y, 2);
            var z2 = Math.pow(this.z - point.z, 2);
            return Math.sqrt(x2 + y2 + z2);
        };
        Point3D.ZERO = new Point3D(0, 0, 0);
        return Point3D;
    })();
    exports.default = Point3D;
});
