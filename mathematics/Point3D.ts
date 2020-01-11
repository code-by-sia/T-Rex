export default class Point3D {
    static ZERO = new Point3D(0, 0, 0);

    public constructor(
        public x: number,
        public y: number,
        public z: number
    ) { }

    public add(point: Point3D) {
        this.x += point.x;
        this.y += point.y;
        this.z += point.z;
    }

    public subtract(point: Point3D) {
        this.x -= point.x;
        this.y -= point.y;
        this.z -= point.z;
    }

    public move(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public moveBy(point: Point3D) {
        this.move(point.x, point.y, point.z);
    }

    public clone() {
        return new Point3D(this.x, this.y, this.z);
    }

    distanceTo(point: Point3D) {
        const x2 = Math.pow(this.x - point.x, 2);
        const y2 = Math.pow(this.y - point.y, 2);
        const z2 = Math.pow(this.z - point.z, 2);

        return Math.sqrt(x2 + y2 + z2);
    }
}