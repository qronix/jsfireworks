import Particle from './particle.js';

class Trail{
    //repeat firework position with diminishing radius and fading color
    //affected by gravity?
    constructor(x, y, color, radius, ctx){
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.ctx = ctx;
        this.stream = [];
    }

    generateTrail(){
        //get initial position, create multiple particles with latent pos
        const MAX_TRAIL_PARTICLES = 20;
        let trailStream = [];
        for(let i = MAX_TRAIL_PARTICLES; i>0; i--){
            const {x, y, color, radius, ctx} = this;
            const trailParticle = new Particle(x, y, radius, color, 100, -10, .04, ctx);
            trailStream.push(trailParticle);
        }
        this.stream = trailStream;
    }

    updateStream(){
        this.stream = this.stream.filter(particle=>particle.getStatus());
    }

    draw(){
        this.updateStream();
        if(this.stream.length !== 0){
            this.stream.forEach(streamParticle=>{
                streamParticle.draw();
            });
        }
    }
}

export default Trail;