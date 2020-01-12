(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", "./Graphics", "./physics/Environemnt", "./physics/Shapes/Fabric", "./physics/Shapes/Sphare", "./mathematics/Vector3D"], function (require, exports) {
    var Graphics_1 = require("./Graphics");
    var Environemnt_1 = require("./physics/Environemnt");
    var Fabric_1 = require("./physics/Shapes/Fabric");
    var Sphare_1 = require("./physics/Shapes/Sphare");
    var Vector3D_1 = require("./mathematics/Vector3D");
    var blueSpare = new Sphare_1.Sphare(-200, 50, 190, 70, false);
    var Game = (function () {
        function Game(container) {
            this.container = container;
            this.init();
            this.render();
        }
        Game.prototype.init = function () {
            this.canvas = document.getElementById('canvas');
            this.width = this.canvas.width = window.innerWidth - 15;
            this.height = this.canvas.height = window.innerHeight - 50;
            this.env = new Environemnt_1.default(this.width, this.height);
            // const f = new Fabric(-100, -150, 200, 20, c, r)
            var f = new Fabric_1.Fabric(-250, -150, -250, 600, 600, 20);
            f.particles[0].locked = true;
            f.particles[29].locked = true;
            // f.particles[f.particles.length - 1].locked = true;
            // f.particles[f.particles.length - 30].locked = true;
            // f.particles[r - 1].locked = true;
            // f.particles[r * c - 1].add(new Point3D(0, 100, 50));
            // f.particles[r * c - 1].locked = true;
            // f.particles[r * c - c].locked = true
            // f.particles[r * c - c].add(new Point3D(0, 100, 50))
            var c1, c2, c3, c4;
            this.env.add(c1 = new Sphare_1.Sphare(0, -100, 0, 5));
            this.env.add(c2 = blueSpare);
            this.env.add(c3 = new Sphare_1.Sphare(200, 170, -50, 50, false));
            this.env.add(c4 = new Sphare_1.Sphare(50, 100, 80, 50, false));
            // this.env.add(c5 = new Sphare(200, -20, 10, 50, false));
            // this.env.add(c6 = new Sphare(200, -100, -200, 50, false));
            // this.env.shapes.push(new Sphare(0, 200, 0, 10, false));
            c1.color = 'black';
            c2.color = 'blue';
            c1.link(c2);
            c1.link(c3);
            c1.link(c4);
            blueSpare = c2;
            // c1.link(c5);
            // this.env.add(new Box(-300, 160, 50, 60, 10, 60));
            // this.env.add(new Box(-300, 280, 50, 60, 10, 60));
            // this.env.add(new Box(-300, 250, 50, 60, 10, 60));
            this.env.add(f);
        };
        Game.prototype.render = function () {
            var _this = this;
            this.clearCanvas();
            var ctx = this.canvas.getContext('2d');
            var graphics = new Graphics_1.Graphics(ctx, this.width, this.height, { distance: 800 });
            for (var _i = 0, _a = this.env.shapes; _i < _a.length; _i++) {
                var sh = _a[_i];
                sh.draw(graphics);
            }
            this.env.update();
            if (this.playing) {
                setTimeout(function () {
                    requestAnimationFrame(function () { return _this.render(); });
                }, 5);
            }
        };
        Game.prototype.play = function () {
            this.playing = true;
            this.render();
        };
        Game.prototype.stop = function () {
            this.playing = false;
        };
        Game.prototype.clearCanvas = function () {
            this.canvas.width = this.canvas.width;
        };
        return Game;
    })();
    var el = document.getElementById('screen');
    var game = new Game(el);
    game.play();
    window.addEventListener('keypress', function (event) {
        if (event.key === " ") {
            game.playing = !game.playing;
            if (game.playing)
                game.play();
            return false;
        }
    });
    document.getElementById("randomAction").addEventListener('click', function () {
        var randomForce = new Vector3D_1.default(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
        blueSpare.accelerate(randomForce);
    });
});
