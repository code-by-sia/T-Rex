import Particle from "../Particle";
import Stick from "../Stick";
import { Thing } from "./Thing";
export class Box extends Thing {

    constructor(public x, public y, public z, public w, public h, public a, public color = 'gray', public locked = false) {
        super([], [])
        this.cube()
    }


    cube() {
        const { x, y, z, w, h, a, locked } = this;
        this.particles = [
            Particle.create(x, y, z, locked),
            Particle.create(x + w, y, z, locked, 'red'),
            Particle.create(x + w, y + h, z, locked, 'blue'),
            Particle.create(x, y + h, z, locked, 'green'),
            Particle.create(x, y, z + a, locked),
            Particle.create(x + w, y, z + a, locked, 'red'),
            Particle.create(x + w, y + h, z + a, locked, 'blue'),
            Particle.create(x, y + h, z + a, locked, 'green'),
        ]


        let link = (i, j, visible = true) => this.sticks.push(new Stick(this.particles[i], this.particles[j], this.color, visible))

        for (let i = 0; i < 4; i++) {
            link(i, (i + 1) % 4);
            link(4 + i, 4 + (i + 1) % 4);
            link(0, 4)
            link(i, i + 4);
        }

        link(0, 6, false)
        link(1, 7, false)
        link(2, 4, false)
        link(3, 5, false)


    }

}
