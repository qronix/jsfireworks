import Particle from './particle.js';
const canvas = document.getElementById('americaSwag');
const ctx = canvas.getContext('2d');

class Trail{
    constructor(x, y, length, numParts, color, gravity, ctx){
        this.x = x;
        this.y = y;
        this.length = length;
        this.numParts = numParts;
        this.color = color;
        this.gravity = gravity;
        this.ctx = ctx;
        this.active = true;
        this.particles = [];
        this.maxXJitter = 5;
        this.maxYJitter = 5;
        this.maxVxJitter = 5;
        this.maxVyJitter = 5;
        this.minParticleRadius = 0.1;
        this.maxParticleRadius = 3.0;
        this.particles = [];
        this.generateParticles();
    }

    generateParticles(){
        console.log('creating particles');
        for(let i=0; i<this.numParts; i++){
            let randXJitter = Math.random()*this.maxXJitter * this.getDirection();
            let randYJitter = Math.random()*this.maxYJitter * this.getDirection();
            let randVxJitter = Math.random()*this.maxVxJitter * this.getDirection();
            let randVyitter = Math.random()*this.maxVyJitter * this.getDirection();
            let radius = Math.random()*(this.maxParticleRadius-this.minParticleRadius) + this.minParticleRadius;
            let x = this.x + randXJitter;
            let y = this.y + randYJitter;
            let vx = randVxJitter;
            let vy = randVyitter;
            let particle = new Particle(x, y, radius, this.color, vx, vy, 0.2, this.ctx);
            this.particles.push(particle);
        }
        // this.draw();
    }

    getDirection(){
        return (Math.floor(Math.random()*2)) === 1 ? 1 : -1;
    }

    draw(){
        let updatedParticles = this.particles.filter(particle=>particle.getStatus());
        this.particles = updatedParticles;
        this.particles.forEach(particle=>particle.draw());
    }

}


let trail = new Trail(200,200,5,40,"red",0.2,ctx);


function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trail.draw();
    requestAnimationFrame(draw);
}

draw();
// export default Trail;