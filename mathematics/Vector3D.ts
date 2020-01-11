import Point3D from "./Point3D";

export default class Vector3D extends Point3D {

    public constructor(x: number, y: number, z: number) {
        super(x, y, z);
    }

    public static from(vector: Point3D) {
        return new Vector3D(vector.x, vector.y, vector.z);
    }

    public get size() {
        return super.distanceTo(Point3D.ZERO)
    }

    public scale(x: number, y: number, z: number) {
        this.x *= x;
        this.y *= y;
        this.z *= z;
    }

    public scaleBy(factor: number) {
        this.scale(factor, factor, factor);
    }

    public normalize() {
        this.scaleBy(1 / this.size);
    }


}