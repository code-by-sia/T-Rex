import Point3D from "../mathematics/Point3D";
import Velocity from "./Velocity";
import Environment from "./Environemnt";
import Vector3D from "../mathematics/Vector3D";
// import PhysicalElement from "./PhysicalElement";

export default class Particle extends Point3D {

    private oldPosition: Point3D;
    public visible: boolean = false;
    public locked: boolean = false;
    public restitution = 0.01;
    public friction = 0.01;

    public radius = 1;


    public constructor(
        position: Point3D,
        public color = '',
        public velocity: Velocity = Velocity.ZERO
    ) {
        super(position.x, position.y, position.z);
        if (this.color === '') {
            this.color = this.randomColor()
        }
        this.oldPosition = new Point3D(position.x, position.y, position.z);
    }


    acelerate(force: Vector3D) {
        this.oldPosition.add(force)
    }

    protected randomColor() {
        let r = () => Math.floor(Math.random() * 25) * 10;
        return `rgb(${r()},${r()},${r()})`;
    }

    public update(env: Environment) {
        if (this.locked == true) return;
        this.velocity.moveBy(this);
        this.velocity.subtract(this.oldPosition)
        this.oldPosition.moveBy(this)
        this.add(this.velocity);
        this.add(env.gravity)
    }

    public updateCollision(env: Environment) {
        if (this.locked == true) return;

        this.velocity.moveBy(this);
        this.velocity.subtract(this.oldPosition);
        this.velocity.scaleBy(this.friction);

        for (let neighbor of env.shapes) {
            if (neighbor.particles.indexOf(this) >= 0) continue;
            const penetration = neighbor.getCollisionPoint(this);
            if (penetration != null) {
                this.add(penetration);
            }
        }

        const K = 150
        const groundCollision = this.y > (env.height / 2 - K);
        if (groundCollision) {
            this.y = (env.height / 2) - K;
            this.oldPosition.y = this.y + Math.floor(this.velocity.y * this.restitution);
            this.oldPosition.x += (this.x - this.oldPosition.x) * this.friction;
            this.oldPosition.z += (this.z - this.oldPosition.z) * this.friction;
        }

    }

    public static create(x, y, z, locked = true, color = '', radius = 1) {
        let p = new Particle(new Point3D(x, y, z));
        p.locked = locked;
        p.color = color;
        p.radius = radius
        return p;
    }

}