// const canvas = document.getElementById('americaSwag');
// const ctx = canvas.getContext('2d');


class Particle{
    constructor(x, y, radius, color, vx, vy, gravity, ctx){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.gravity = gravity;
        this.active = true;
        this.color = color;
        this.ctx = ctx;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius,0, 2*Math.PI, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
    randColor(){
        let r = this.randColorValue();
        let g = this.randColorValue();
        let b = this.randColorValue();
        return `rgb(${r},${g},${b})`;
    }
    randColorValue(){
        return Math.floor(Math.random()*255);
    }
    getStatus(){
        return this.active;
    }

    draw(){
        // this.active = true;
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        // this.hue -= 0.5;
        this.radius = Math.abs(this.radius - .05);
        if(this.radius>0){
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }else{
            this.active = false;
        }
    }
}

export default Particle;

// function makeCircle(numParticles){
//     // ctx.fillStyle = "red";
//     let particles = [];
//     for(let i=0; i<numParticles; i++){
//         let vx = Math.floor(Math.random()*100)*1.0;
//         let vy = Math.floor(Math.random()*100)*1.0;
//         let xDir = Math.floor(Math.random()*2) == 1 ? 1 : -1;
//         let yDir = Math.floor(Math.random()*2) == 1 ? 1 : -1;
//         let particle = new Particle(canvas.width/2,canvas.height/2,10,(vx*xDir)/40,(vy*yDir)/40,.04);
//         particles.push(particle);
//     }
//     setInterval(()=>{
//         ctx.clearRect(0,0,canvas.width, canvas.height);
//         let currentParticles = particles.filter(particle=>particle.getStatus()).forEach(particle=>particle.draw());
//     },1)
// }

// makeCircle(100);