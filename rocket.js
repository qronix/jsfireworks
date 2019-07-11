const canvas = document.getElementById('americaSwag');
const ctx = canvas.getContext('2d');
import Trail from './trail.js';

class Rocket{
    constructor(x, y, vx, vy, trail, color, timeToLive, ctx){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.trail = trail;
        this.color = color;
        this.active = false;
        this.startTime = null;
        this.timeToLive = timeToLive;
    }

    fire(){
        this.startTime = Date.now();
        this.active = true;
        console.log('firing!');
        let trail = new Trail();
    }

    draw(){
        if((Date.now()-this.startTime)<this.timeToLive){
            this.x += this.vx;
            this.y -= this.vy;
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x,this.y,2,2);
        }
    }
}


let rocket = new Rocket(100, canvas.height, 1, 1, null, "red", 10000);

const render = function(){
    requestAnimationFrame(render);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    if(!rocket.active){
        rocket.fire();
    }else{
        rocket.draw();
    }
}

render();


