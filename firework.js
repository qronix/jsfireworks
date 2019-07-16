// const canvas = document.getElementById('americaSwag');
// const ctx = canvas.getContext('2d');
import Trail from './trail.js';
import {randomRange, randomNumber} from './utils.js';

class Firework{
    constructor(x, y, vx, vy, color, timeToLive, ctx){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.trail = null;
        this.color = color;
        this.active = false;
        this.startTime = null;
        this.timeToLive = timeToLive;
    }

    fire(){
        this.startTime = Date.now();
        this.trail = new Trail(this.x, this.y, this.color, 10, this.ctx);
        this.active = true;
        console.log('firing!');
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

export function generateFirework(canWidth, canHeight){
    const MIN_X = canWidth - (canWidth * 0.98);
    const MAX_X = canWidth * 0.98;
    const Y = (canHeight + 10) * 1.0;
    const MIN_VX = 0.1;
    const MAX_VX = 1.0;
    const MIN_VY = 0.1;
    const MAX_VY = 1.0;
    const COLOR = generateColor();
    const TIME_TO_LIVE = randomNumber(10);

    const x = randomRange(MIN_X, MAX_X);

    const fireworkProps = {

    }

}

function generateColor(){
    const _R = randomNumber(255); 
    const _G = randomNumber(255);
    const _B = randomNumber(255);
    return `rgb(${_R}, ${_G}, ${_B})`;
}


// let rocket = new Firework(100, canvas.height, 1, 1, null, "red", 10000);

// const render = function(){
//     requestAnimationFrame(render);
//     ctx.clearRect(0,0,canvas.width, canvas.height);
//     if(!rocket.active){
//         rocket.fire();
//     }else{
//         rocket.draw();
//     }
// }

// render();

export default Firework;