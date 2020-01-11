import Mesh from "../Mesh";
import { Graphics } from "../../Graphics";
import Particle from "../Particle";
import Stick from "../Stick";
import Vector3D from "../../mathematics/Vector3D";

export class Thing extends Mesh {
    public draw(g: Graphics) {
        this.particles.forEach(p => this.drawParticle(g, p))
        this.sticks.forEach(s => this.drawStick(g, s))
    }

    protected drawParticle(g: Graphics, p: Particle) {
        const { x, y } = g.transform3D(p.x, p.y, p.z)
        g.fill(p.color);
        g.fillCircle(x, y, 3);
    }

    protected drawStick(g: Graphics, stick: Stick) {
        if (!stick.visible) return;
        g.stroke(stick.color);
        const s = g.transform3D(stick.start.x, stick.start.y, stick.start.z)
        const e = g.transform3D(stick.end.x, stick.end.y, stick.end.z)
        g.drawLine(s.x, s.y, e.x, e.y)
    }

    public getCollisionPoint(p: Particle) {
        return null;
    }

    public accelerate(force: Vector3D) {
        this.particles.forEach(p => p.acelerate(force))
    }

    public getBaseParticle() {
        return this.particles[0];
    }

    public link(anotherThing: Thing) {
        this.sticks.push(new Stick(this.getBaseParticle(), anotherThing.getBaseParticle()));
    }
}
