import Line3D from "../mathematics/Line3D";
import Point3D from "../mathematics/Point3D";
import Vector3D from "../mathematics/Vector3D";
import Particle from "./Particle";
import Environemnt from "./Environemnt";
// import PhysicalElement from "./PhysicalElement";

export default class Stick extends Line3D {
    private fixedSize;
    public constructor(public start: Particle, public end: Particle, public color = '#ccc', public visible = true) {
        super(start, end);
        this.fixedSize = this.size;
    }

    public update(env: Environemnt) {
        const tmp = Vector3D.from(this.end);
        tmp.subtract(this.start);
        const currentSize = tmp.distanceTo(Point3D.ZERO);
        const dif = (currentSize - this.fixedSize) * 0.5;
        tmp.normalize();
        tmp.scaleBy(dif * 1);
        if (!this.start.locked) {
            this.start.add(tmp);
        }
        if (!this.end.locked) {
            this.end.subtract(tmp);
        }
    }
}