(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports"], function (require, exports) {
    var Line3D = (function () {
        function Line3D(start, end) {
            this.start = start;
            this.end = end;
        }
        Object.defineProperty(Line3D.prototype, "size", {
            get: function () {
                return this.start.distanceTo(this.end);
            },
            enumerable: true,
            configurable: true
        });
        return Line3D;
    })();
    exports.default = Line3D;
});
