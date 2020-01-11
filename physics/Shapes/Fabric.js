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
})(["require", "exports", "../Mesh", "../Particle", "../Stick", "../../mathematics/Point3D", "./Thing"], function (require, exports) {
    var Mesh_1 = require("../Mesh");
    var Particle_1 = require("../Particle");
    var Stick_1 = require("../Stick");
    var Point3D_1 = require("../../mathematics/Point3D");
    var Thing_1 = require("./Thing");
    var Fabric = (function (_super) {
        __extends(Fabric, _super);
        function Fabric(dx, dy, dz, width, height, size) {
            if (size === void 0) { size = 20; }
            _super.call(this, [], []);
            this.dx = dx;
            this.dy = dy;
            this.dz = dz;
            this.width = width;
            this.height = height;
            this.size = size;
            this.columns = 1;
            this.rows = 1;
            this.columns = Math.ceil(this.width / size);
            this.rows = Math.ceil(this.height / size);
            var fabricMesh = this.fabric();
            (_a = this.particles).push.apply(_a, fabricMesh.particles);
            (_b = this.sticks).push.apply(_b, fabricMesh.sticks);
            var _a, _b;
        }
        Fabric.prototype.createGrid = function () {
            var grid = [];
            for (var i = 0; i < this.columns; i++) {
                var row = [];
                for (var j = 0; j < this.rows; j++) {
                    row.push(0);
                }
                grid.push(row);
            }
            return grid;
        };
        Fabric.prototype.fabric = function () {
            var mesh = new Mesh_1.default([], []);
            var grid = this.grid = this.createGrid();
            var size = this.size;
            for (var z = 0; z < grid.length; z++) {
                for (var x = 0; x < grid[0].length; x++) {
                    var pt = new Point3D_1.default(this.dx + size * x, this.dy, this.dz + size * z);
                    var p = new Particle_1.default(pt);
                    p.color = 'black';
                    grid[z][x] = p;
                    mesh.particles.push(p);
                }
            }
            for (var z = 0; z < grid.length; z++) {
                for (var x = 0; x < grid[0].length - 1; x++) {
                    var stick = new Stick_1.default(grid[z][x], grid[z][x + 1]);
                    mesh.sticks.push(stick);
                }
            }
            for (var z = 0; z < grid.length - 1; z++) {
                for (var x = 0; x < grid[0].length; x++) {
                    var stick = new Stick_1.default(grid[z][x], grid[z + 1][x]);
                    mesh.sticks.push(stick);
                }
            }
            return mesh;
        };
        return Fabric;
    })(Thing_1.Thing);
    exports.Fabric = Fabric;
});
