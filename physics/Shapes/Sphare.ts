import { Graphics } from "../../Graphics";
import Particle from "../Particle";
import Vector3D from "../../mathematics/Vector3D";
import { Thing } from "./Thing";
import Point3D from "../../mathematics/Point3D";
export class Sphare extends Thing {

    public color = 'red';
    constructor(x, y, z, radius: number, public locked = true) {
        super([Particle.create(x, y, z, locked, 'transparent', radius)], []);
    }

    get radius() { return this.particles[0].radius; }

    get x() { return this.particles[0].x }

    get y() { return this.particles[0].y }

    get z() { return this.particles[0].z }


    draw(g: Graphics) {
        let { x, y, z } = this.particles[0];
        const px = g.transform3D(x, y, z)


        g.stroke(this.color, 2)

        g.drawCircle(
            px.x,
            px.y,
            g.scale3D(z) * this.radius
        );
    }


    getCollisionPoint(p: Particle) {
        // p.distanceTo(this);
        const v = Vector3D.from(p);
        v.subtract(new Point3D(this.x, this.y, this.z));
        const size = v.size;
        if (size - this.radius <= p.radius) {
            const dif = this.radius - size + p.radius;
            v.normalize();
            v.scaleBy(dif);
            return v;
        }
        return null;
    }
}