import Particle from "./Particle";
import Stick from "./Stick";
import Environemnt from "./Environemnt";


export default class Mesh {
    public constructor(public particles: Particle[], public sticks: Stick[]) {

    }


    public updatePositions(env: Environemnt) {
        this.particles.forEach(p => p.update(env));
    }

    public updateSticks(env: Environemnt) {
        this.sticks.forEach(st => st.update(env));
    }

    public updateCollisions(env: Environemnt) {
        this.particles.forEach(st => st.updateCollision(env));
    }
}