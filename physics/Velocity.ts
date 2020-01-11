import Vector3D from "../mathematics/Vector3D";

export default class Velocity extends Vector3D {
    public static ZERO = new Velocity(0, 0, 0);

    constructor(x: number, y: number, z: number) {
        super(x, y, z);
    }
}