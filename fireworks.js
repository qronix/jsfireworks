
//CANVAS STUFF
const canvas = document.getElementById('americaSwag')
const ctx = canvas.getContext('2d')



class Firework{
    constructor(color, speed, travelTime, x, y){
        this.color = color;
        this.speed = speed;
        this.travelTime = travelTime;
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 5;
        this.startTime = null;
        this.state = {fired:false, reported:false, reporting:false};
        this.report = null;
    }

    update(){
        if(this.state.reported === false){
            if(Date.now() < this.startTime + this.travelTime){
                this.x += this.speed;
                this.y -= this.speed;
                console.log("Moving");
            }
            if(Date.now() >= this.startTime + this.travelTime){
                this.explode();
            }
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        else if(this.state.reporting){
            let reportState = this.report.getState();
            console.log('Reporting');
            if(reportState.alive === true) this.report.update();
            else this.state.reporting = false;
        }
    }

    explode(){
        this.state.reported = true;
        this.report = new Report('pink',1,2000,this.x, this.y, 20);
        this.state.reporting = true;
        console.log('Report created')
    }

    getState(){
        return this.state;
    }

    fire(){
        console.log('Firing!');
        this.startTime = Date.now();
        this.state.fired = true;
    }
}

// class Particle{
//     constructor(color, speed, travelTime, x, y, width, height, dx, dy, xDir, yDir){
//         this.color = color;
//         this.speed = speed*1.0;
//         this.travelTime = travelTime;
//         this.x = x*1.0;
//         this.y = y*1.0;
//         this.dx = dx*1.0;
//         this.dy = dy*1.0;
//         this.width = width;
//         this.height = height;
//         this.xDir = xDir*1.0;
//         this.yDir = yDir*1.0;
//         this.startTime = Date.now();
//         this.state = {alive:true};
//         this.gravity = -9.8;
//     }

//     update(){
//         if(this.isAlive()){
//             this.x += this.dx/10;
//             this.y -= this.dy/10;
//             ctx.fillStyle = this.color;
//             ctx.fillRect(this.x, this.y, this.width, this.height);
//         }
//     }

//     isAlive(){
//         if(Date.now() < this.startTime + this.travelTime) return true;
//         else{
//             this.state.alive = false;
//             return false;
//         };
//     }

//     getState(){
//         return this.state;
//     }
// }

class Report extends Firework{
    constructor(color, speed, travelTime, x, y, numParticles){
        super(color, speed, travelTime, x, y);
        this.numParticles = numParticles;
        this.particles = [];
        this.state = {alive:true};
        this.generateParticles();
    }

    update(){
        if(this.state.alive){
            this.refreshParticles();
            if(this.particles.length > 0){
                this.particles.forEach(particle=>{
                    particle.update();
                });
            }else{
                this.state.alive = false;
            }
        }
    }

    refreshParticles(){
        this.particles = this.particles.filter(particle=>{
            let particleState = particle.getState();
            return particleState.alive === true;
        });
    }

    generateParticles(){
        const angleStep = (360 / this.numParticles);
        for(let i=0; i<this.numParticles; i++){
            let delta = (i*angleStep);
            let xDir, yDir = null;

            if(delta<=360 && delta>=270){
                xDir = -1;
                yDir = 1;    
            }
            if(delta<=270 && delta >=180){
                xDir = -1;
                yDir = -1;
            }
            if(delta<=180 && delta>=90){
                xDir = 1;
                yDir = -1;
            }
            if(delta<=90 && delta>=0){
                xDir = 1;
                yDir = 1;
            }
            let particle = new Particle('red', 2, 2000, this.x, this.y, 4, 4, delta, delta*(Math.PI/i), xDir, yDir);
            this.particles.push(particle);
        }
    }

    explode(){
        console.log('Explode from Report');
    }
}

let boomBoom = new Firework('green', 3, 2000, 100, canvas.height);
boomBoom.fire();

setInterval(boomBoom.update(),10);

class FireworkManager{
    constructor(numFireworks){
        this.numFireworks = numFireworks;
        this.fireWorks = [];
        this.generateTestFireworks();
        this.startShow();
    }

    generateTestFireworks(){
        let fireworkOne = new Firework('green', 1, 2000, 100, canvas.height);
        let fireworkTwo = new Firework('purple',2, 1000, 20, canvas.height);
        this.fireWorks.push(fireworkOne);
        this.fireWorks.push(fireworkTwo);
    }

    startShow(){
        this.fireWorks.forEach(firework=>firework.fire());
        this.manageShow();
    }

    manageShow(){
        setInterval(()=>{
            ctx.clearRect(0,0,canvas.width, canvas.height);
            this.updateFireworks();
        },1);

    }
    updateFireworks(){
        this.fireWorks.forEach(firework=>{
            let fireworkState = firework.getState();
            const {fired, reported, reporting} = fireworkState;
            firework.update();
        });
    }
}

let fireworkShow = new FireworkManager(2);
