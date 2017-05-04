var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DrawAnchor;
(function (DrawAnchor) {
    DrawAnchor[DrawAnchor["TopLeft"] = 0] = "TopLeft";
    DrawAnchor[DrawAnchor["TopCenter"] = 1] = "TopCenter";
    DrawAnchor[DrawAnchor["TopRight"] = 2] = "TopRight";
    DrawAnchor[DrawAnchor["MiddleLeft"] = 3] = "MiddleLeft";
    DrawAnchor[DrawAnchor["MiddleCenter"] = 4] = "MiddleCenter";
    DrawAnchor[DrawAnchor["MiddleRight"] = 5] = "MiddleRight";
    DrawAnchor[DrawAnchor["BottomLeft"] = 6] = "BottomLeft";
    DrawAnchor[DrawAnchor["BottomCenter"] = 7] = "BottomCenter";
    DrawAnchor[DrawAnchor["BottomRight"] = 8] = "BottomRight";
})(DrawAnchor || (DrawAnchor = {}));
var ImageCollection = (function () {
    function ImageCollection() {
        var images = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            images[_i] = arguments[_i];
        }
        this.imgs = [];
        this.anchor = DrawAnchor.TopLeft;
        for (var i = 0; i < images.length; i++) {
            this.imgs[i] = new Image();
            this.imgs[i].src = images[i];
        }
    }
    ImageCollection.prototype.getCount = function () {
        return this.imgs.length;
    };
    ImageCollection.prototype.getHeight = function (index) {
        return this.imgs[index].height;
    };
    ImageCollection.prototype.getWidth = function (index) {
        return this.imgs[index].width;
    };
    ImageCollection.prototype.draw = function (ctx, index, x, y) {
        var img = this.imgs[index];
        if (img) {
            switch (this.anchor) {
                case DrawAnchor.MiddleLeft:
                case DrawAnchor.MiddleCenter:
                case DrawAnchor.MiddleRight:
                    y -= img.height / 2;
                    break;
                case DrawAnchor.BottomLeft:
                case DrawAnchor.BottomCenter:
                case DrawAnchor.BottomRight:
                    y -= img.height;
                    break;
            }
            switch (this.anchor) {
                case DrawAnchor.TopCenter:
                case DrawAnchor.MiddleCenter:
                case DrawAnchor.BottomCenter:
                    x -= img.width / 2;
                    break;
                case DrawAnchor.TopRight:
                case DrawAnchor.MiddleRight:
                case DrawAnchor.BottomRight:
                    x -= img.width;
            }
            ctx.drawImage(img, x, y);
        }
    };
    return ImageCollection;
}());
var AnimatedImage = (function (_super) {
    __extends(AnimatedImage, _super);
    function AnimatedImage() {
        var images = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            images[_i] = arguments[_i];
        }
        var _this = _super.apply(this, images) || this;
        _this.frame = 0;
        _this.current = 0;
        _this.framesToChange = 1;
        return _this;
    }
    AnimatedImage.prototype.reset = function () {
        this.frame = 0;
    };
    AnimatedImage.prototype.draw = function (ctx, x, y) {
        _super.prototype.draw.call(this, ctx, this.current, x, y);
        if (this.frame % this.framesToChange == 0) {
            this.current = (1 + this.current) % _super.prototype.getCount.call(this);
        }
        this.frame = this.frame + 1;
    };
    AnimatedImage.prototype.getCurrentHeight = function () {
        return _super.prototype.getHeight.call(this, this.current);
    };
    AnimatedImage.prototype.getCurrentWidth = function () {
        return _super.prototype.getWidth.call(this, this.current);
    };
    return AnimatedImage;
}(ImageCollection));
var Plant = (function () {
    function Plant(index) {
        this.index = index;
        this.position = 0;
        this.height = 0;
        this.width = 0;
    }
    return Plant;
}());
var Game = (function () {
    function Game(container) {
        this.container = container;
        this.frame = 0;
        this.width = 0;
        this.height = 0;
        this.mid = 0;
        this.jumping = false;
        this.jumpingState = 1;
        this.plants = [];
        this.tRexTop = 0;
        this.tRexLeft = 0;
        this.score = 0;
        this.gameOver = false;
        this.init();
    }
    Game.prototype.init = function () {
        this.canvas = document.createElement('canvas');
        this.container.appendChild(this.canvas);
        this.width = this.canvas.width = this.container.clientWidth;
        this.height = this.canvas.height = this.container.clientHeight;
        this.mid = this.height / 2;
        this.trexAnimation = new AnimatedImage('img/1.png', 'img/2.png', 'img/3.png', 'img/4.png', 'img/5.png');
        this.trexAnimation.anchor = DrawAnchor.BottomLeft;
        this.plantImages = new ImageCollection('img/plant-1.png', 'img/plant-2.png', 'img/plant-3.png', 'img/plant-4.png');
        this.plantImages.anchor = DrawAnchor.BottomLeft;
        this.trexAnimation.framesToChange = 3;
    };
    Game.prototype.addRandomPlant = function () {
        if (Math.random() > .3 && this.plants.length < 3) {
            var index = Math.floor(Math.random() * this.plantImages.getCount());
            var plant = new Plant(index);
            plant.position = this.width;
            plant.height = this.plantImages.getHeight(index);
            plant.width = this.plantImages.getWidth(index);
            this.plants.push(plant);
        }
    };
    Game.prototype.nextFrame = function () {
        this.frame = 1 + this.frame % 100;
        if (this.frame % 50 == 0) {
            this.addRandomPlant();
        }
        this.score += 1;
        this.render();
    };
    Game.prototype.clearCanvas = function () {
        this.canvas.width = this.canvas.width;
    };
    Game.prototype.render = function () {
        this.clearCanvas();
        var ctx = this.canvas.getContext('2d');
        ctx.fillStyle = '#555';
        this.drawPlants(ctx);
        this.drawTRex(ctx);
        this.drawScore(ctx);
        if (this.gameOver) {
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.font = '48px arial';
            ctx.fillText('GAME OVER!', this.width / 2, this.mid - 35);
        }
    };
    Game.prototype.drawScore = function (ctx) {
        ctx.font = '20px Arial';
        ctx.fillText("Score: " + this.score, 50, 50);
    };
    Game.prototype.isHitted = function (plant) {
        var delta = 20;
        var trexW = this.trexAnimation.getCurrentWidth() - 2 * delta;
        var trexH = this.trexAnimation.getCurrentHeight() - 2 * delta;
        var trexX = this.tRexLeft + delta;
        var trexY = this.tRexTop - trexH - delta;
        var trexX2 = trexX + trexW;
        var trexY2 = trexY + trexH;
        var plantW = plant.width - 2 * delta;
        var plantH = plant.height - 2 * delta;
        var plantX = plant.position + delta;
        var plantY = this.mid - plantH - delta;
        var plantX2 = plantX + plantW;
        var plantY2 = plantY + plantH;
        var between = function (n, min, max) { return (n >= min) && (n <= max); };
        return (between(plantX, trexX, trexX2) && between(plantY, trexY, trexY2)) ||
            (between(plantX2, trexX, trexX2) && between(plantY2, trexY, trexY2));
    };
    Game.prototype.drawPlants = function (ctx) {
        var y = this.mid;
        for (var i = 0; i < this.plants.length; i++) {
            var plant = this.plants[i];
            plant.position -= 10 + (this.score / 100);
            this.plantImages.draw(ctx, plant.index, plant.position, y);
            if (this.isHitted(plant)) {
                this.gameOver = true;
                this.stop();
            }
            if (plant.position < 0) {
                this.plants.splice(i, 1);
            }
        }
    };
    Game.prototype.drawTRex = function (ctx) {
        var trexY = this.mid;
        if (this.jumping) {
            trexY = trexY - Math.sin(Math.PI * this.jumpingState / 30) * 200;
            this.jumpingState = this.jumpingState + 1;
            if (this.jumpingState > 30) {
                this.jumping = false;
            }
        }
        this.tRexTop = trexY;
        this.tRexLeft = 100;
        ctx.strokeRect(0, this.mid, this.width, 1);
        this.trexAnimation.draw(ctx, this.tRexLeft, this.tRexTop);
    };
    Game.prototype.play = function () {
        var _this = this;
        this.timerId = setInterval(function (_) { return _this.nextFrame(); }, 50);
    };
    Game.prototype.stop = function () {
        clearInterval(this.timerId);
    };
    Game.prototype.jump = function () {
        if (this.jumping) {
            return;
        }
        this.jumping = true;
        this.jumpingState = 0;
    };
    return Game;
}());
var el = document.getElementById('screen');
var game = new Game(el);
game.play();
window.addEventListener('click', function (event) {
    game.jump();
    return false;
});
window.addEventListener('keypress', function (event) {
    if (event.key === " ") {
        game.jump();
        return false;
    }
});
