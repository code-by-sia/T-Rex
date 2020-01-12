import { Graphics } from "./Graphics";
import Environemnt from "./physics/Environemnt";
import { Fabric } from "./physics/Shapes/Fabric";
import { Sphare } from "./physics/Shapes/Sphare";
import Vector3D from "./mathematics/Vector3D";


let blueSpare: Sphare = new Sphare(-200, 50, 190, 70, false);

class Game {

    private canvas;
    private width;
    private height;
    public playing;
    private env: Environemnt;

    constructor(private container) {
        this.init();
        this.render();
    }

    private init() {
        this.canvas = document.getElementById('canvas');
        this.width = this.canvas.width = window.innerWidth - 15;
        this.height = this.canvas.height = window.innerHeight - 50;
        this.env = new Environemnt(this.width, this.height)


        // const f = new Fabric(-100, -150, 200, 20, c, r)
        const f = new Fabric(-250, -150, -250, 600, 600, 20);
        f.particles[0].locked = true;
        f.particles[29].locked = true;

        // f.particles[f.particles.length - 1].locked = true;
        // f.particles[f.particles.length - 30].locked = true;
        // f.particles[r - 1].locked = true;
        // f.particles[r * c - 1].add(new Point3D(0, 100, 50));
        // f.particles[r * c - 1].locked = true;
        // f.particles[r * c - c].locked = true
        // f.particles[r * c - c].add(new Point3D(0, 100, 50))


        let c1, c2, c3, c4;
        this.env.add(c1 = new Sphare(0, -100, 0, 5));
        this.env.add(c2 = blueSpare);
        this.env.add(c3 = new Sphare(200, 170, -50, 50, false));
        this.env.add(c4 = new Sphare(50, 100, 80, 50, false));
        // this.env.add(c5 = new Sphare(200, -20, 10, 50, false));
        // this.env.add(c6 = new Sphare(200, -100, -200, 50, false));
        // this.env.shapes.push(new Sphare(0, 200, 0, 10, false));

        c1.color = 'black'
        c2.color = 'blue'

        c1.link(c2);
        c1.link(c3);
        c1.link(c4);

        blueSpare = c2;
        // c1.link(c5);

        // this.env.add(new Box(-300, 160, 50, 60, 10, 60));
        // this.env.add(new Box(-300, 280, 50, 60, 10, 60));
        // this.env.add(new Box(-300, 250, 50, 60, 10, 60));
        this.env.add(f);


    }

    private render() {
        this.clearCanvas();
        const ctx = this.canvas.getContext('2d');
        const graphics = new Graphics(ctx, this.width, this.height, { distance: 800 });


        for (let sh of this.env.shapes) {
            sh.draw(graphics);
        }

        this.env.update();

        if (this.playing) {
            setTimeout(() => {
                requestAnimationFrame(() => this.render())
            }, 5);
        }

    }


    play() {
        this.playing = true
        this.render()
    }

    stop() {
        this.playing = false;
    }


    private clearCanvas() {
        this.canvas.width = this.canvas.width;

    }

}


var el = document.getElementById('screen');
var game = new Game(el);
game.play();
window.addEventListener('keypress', event => {
    if (event.key === " ") {
        game.playing = !game.playing;
        if (game.playing) game.play();
        return false;
    }
});


document.getElementById("randomAction").addEventListener('click', () => {
    let randomForce = new Vector3D(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5)
    blueSpare.accelerate(randomForce);
})