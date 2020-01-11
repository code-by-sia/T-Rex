import Mesh from "../Mesh";
import Particle from "../Particle";
import Stick from "../Stick";
import Point3D from "../../mathematics/Point3D";
import { Thing } from "./Thing";
export class Fabric extends Thing {
    public grid;
    public columns: number = 1;
    public rows: number = 1;

    constructor(
        public dx,
        public dy,
        public dz,
        public width,
        public height,
        public size = 20
    ) {
        super([], []);
        this.columns = Math.ceil(this.width / size);
        this.rows = Math.ceil(this.height / size);
        const fabricMesh = this.fabric();
        this.particles.push(...fabricMesh.particles);
        this.sticks.push(...fabricMesh.sticks);
    }
    private createGrid() {
        let grid = [];
        for (let i = 0; i < this.columns; i++) {
            let row = [];
            for (let j = 0; j < this.rows; j++) {
                row.push(0);
            }
            grid.push(row);
        }
        return grid;
    }
    private fabric() {
        let mesh = new Mesh([], []);
        let grid = this.grid = this.createGrid();
        let size = this.size;
        for (let z = 0; z < grid.length; z++) {
            for (let x = 0; x < grid[0].length; x++) {
                let pt = new Point3D(this.dx + size * x, this.dy, this.dz + size * z);
                let p = new Particle(pt);
                p.color = 'black';
                grid[z][x] = p;
                mesh.particles.push(p);
            }
        }
        for (let z = 0; z < grid.length; z++) {
            for (let x = 0; x < grid[0].length - 1; x++) {
                let stick = new Stick(grid[z][x], grid[z][x + 1]);
                mesh.sticks.push(stick);
            }
        }
        for (let z = 0; z < grid.length - 1; z++) {
            for (let x = 0; x < grid[0].length; x++) {
                let stick = new Stick(grid[z][x], grid[z + 1][x]);
                mesh.sticks.push(stick);
            }
        }
        return mesh;
    }
}
