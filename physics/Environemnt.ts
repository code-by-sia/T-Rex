import Velocity from "./Velocity";
import Mesh from "./Mesh";
import { Thing } from "./Shapes/Thing";
import Point3D from "../mathematics/Point3D";

export default class Environemnt {


    public shapes: Thing[] = [];

    public constructor(public width: number, public height: number) {

    }
    public gravity = new Velocity(0, 0.35, 0);

    public add(obj: Thing) {
        this.shapes.push(obj);
    }

    public update() {
        this.shapes.forEach(sh => sh.updatePositions(this));
        for (let index = 0; index < 30; index++) {
            this.shapes.forEach(sh => sh.updateSticks(this));
            this.shapes.forEach(sh => sh.updateCollisions(this));

        }
    }

}