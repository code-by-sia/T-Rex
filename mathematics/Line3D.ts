import Point3D from "./Point3D";

export default class Line3D {
    public constructor(public start: Point3D, public end: Point3D) {

    }

    public get size() {
        return this.start.distanceTo(this.end);
    }
}