import Point3D from "./mathematics/Point3D";

export class Graphics {
    constructor(
        private context: CanvasRenderingContext2D,
        public width: number,
        public height: number,
        public options3D = { distance: 800 }) {
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    drawLine(x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.closePath();
        this.context.stroke();
    }

    stroke(color: string, width = 1) {
        this.context.strokeStyle = color;
        this.context.lineWidth = width;
    }

    fillCircle3D(x, y, z, r = 5) {
        const p = this.transform3D(x, y, z);
        this.fillCircle(p.x, p.y, r)
    }

    drawCircle(x, y, r) {
        this.context.save();
        this.context.beginPath();
        this.context.arc(x, y, r, 0, Math.PI * 2);
        this.context.closePath();
        this.context.stroke();
        this.context.restore();
    }

    fill(color: string) {
        this.context.fillStyle = color;
    }
    fillCircle(x, y, r) {
        this.context.beginPath();
        this.context.arc(x, y, r, -2 * Math.PI, 2 * Math.PI);
        this.context.closePath();
        this.context.fill();
    }

    fillText(x: number, y: number, text) {
        this.context.font = '12px tahoma';
        this.context.fillText(text, x, y)
    }

    scale3D(z: number) {
        return (z + 1000) / 800
    }

    transform3D(x: number, y: number, z: number) {
        const a = Math.atan2(y, x)
        const f = Math.sqrt(x * x + y * y) * this.scale3D(z);

        return {
            x: (this.width / 2) + Math.cos(a) * f,
            y: (this.height / 2) + Math.sin(a) * f
        }
    }

    beginPath() {
        this.context.beginPath()
    }
    moveTo3D(x: number, y: number, z: number) {
        const point = this.transform3D(x, y, z);
        this.context.moveTo(point.x, point.y);
    }

    lineTo3D(x: number, y: number, z: number) {
        const point = this.transform3D(x, y, z);
        this.context.lineTo(point.x, point.y);
    }

    path() {
        this.context.stroke();
    }

    drawPoint3D(x: number, y: number, z: number) {
        this.context.save();
        this.moveTo3D(x, y, z);
        this.context.beginPath();
        this.context.arc(0, 0, 6, 0, Math.PI * 2);
        this.context.fill();
        this.context.restore();
    }

    line3D(p1: Point3D, p2: Point3D) {
        this.context.save();
        this.context.beginPath();
        this.moveTo3D(p1.x, p1.y, p1.z);
        this.lineTo3D(p2.x, p2.y, p2.z);
        this.context.restore();
    }
}
