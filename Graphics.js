(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports"], function (require, exports) {
    var Graphics = (function () {
        function Graphics(context, width, height, options3D) {
            if (options3D === void 0) { options3D = { distance: 800 }; }
            this.context = context;
            this.width = width;
            this.height = height;
            this.options3D = options3D;
        }
        Graphics.prototype.clear = function () {
            this.context.clearRect(0, 0, this.width, this.height);
        };
        Graphics.prototype.drawLine = function (x1, y1, x2, y2) {
            this.context.beginPath();
            this.context.moveTo(x1, y1);
            this.context.lineTo(x2, y2);
            this.context.closePath();
            this.context.stroke();
        };
        Graphics.prototype.stroke = function (color, width) {
            if (width === void 0) { width = 1; }
            this.context.strokeStyle = color;
            this.context.lineWidth = width;
        };
        Graphics.prototype.fillCircle3D = function (x, y, z, r) {
            if (r === void 0) { r = 5; }
            var p = this.transform3D(x, y, z);
            this.fillCircle(p.x, p.y, r);
        };
        Graphics.prototype.drawCircle = function (x, y, r) {
            this.context.save();
            this.context.beginPath();
            this.context.ellipse(x, y, r, r, 0, 0, Math.PI * 2);
            this.context.closePath();
            this.context.stroke();
            this.context.restore();
        };
        Graphics.prototype.fill = function (color) {
            this.context.fillStyle = color;
        };
        Graphics.prototype.fillCircle = function (x, y, r) {
            this.context.beginPath();
            this.context.arc(x, y, r, -2 * Math.PI, 2 * Math.PI);
            this.context.closePath();
            this.context.fill();
        };
        Graphics.prototype.fillText = function (x, y, text) {
            this.context.font = '12px tahoma';
            this.context.fillText(text, x, y);
        };
        Graphics.prototype.scale3D = function (z) {
            return (z + 1000) / 800;
        };
        Graphics.prototype.transform3D = function (x, y, z) {
            var a = Math.atan2(y, x);
            var f = Math.sqrt(x * x + y * y) * this.scale3D(z);
            return {
                x: (this.width / 2) + Math.cos(a) * f,
                y: (this.height / 2) + Math.sin(a) * f
            };
        };
        Graphics.prototype.beginPath = function () {
            this.context.beginPath();
        };
        Graphics.prototype.moveTo3D = function (x, y, z) {
            var point = this.transform3D(x, y, z);
            this.context.moveTo(point.x, point.y);
        };
        Graphics.prototype.lineTo3D = function (x, y, z) {
            var point = this.transform3D(x, y, z);
            this.context.lineTo(point.x, point.y);
        };
        Graphics.prototype.path = function () {
            this.context.stroke();
        };
        Graphics.prototype.drawPoint3D = function (x, y, z) {
            this.context.save();
            this.moveTo3D(x, y, z);
            this.context.beginPath();
            this.context.arc(0, 0, 6, 0, Math.PI * 2);
            this.context.fill();
            this.context.restore();
        };
        Graphics.prototype.line3D = function (p1, p2) {
            this.context.save();
            this.context.beginPath();
            this.moveTo3D(p1.x, p1.y, p1.z);
            this.lineTo3D(p2.x, p2.y, p2.z);
            this.context.restore();
        };
        return Graphics;
    })();
    exports.Graphics = Graphics;
});
