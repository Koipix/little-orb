import { Player } from './player';
import { CanvasContext } from './canvasContext';

const canvasContext = CanvasContext.getInstance();

interface Velocity {
    x: number;
    y: number;
}

//projectiles - will work on this tommy - eeppy mewo
// class Projectile {

//     constructor(
//         public x: number,
//         public y: number,
//         public radius: number,
//         public color: string,
//         public vel: Velocity
//     ) {
//         this.x = x;
//         this.y = y;
//         this.radius = radius;
//         this.color = color;
//         this.vel = vel;
//     }

//     spawn(): void {
//         ctx.beginPath()
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//         ctx.fillStyle = this.color;
//         ctx.fill();
//     }

//     update(): void {
//         this.spawn();
//         this.x += this.vel.x;
//         this.y += this.vel.y;
//     }
// }

//player instance
const player = new Player(30, 'black')

player.spawn();

const projectiles: any[] = [];

//animate everything
function animate(): void {
    requestAnimationFrame(animate);
    canvasContext.ctx.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
    player.spawn();

    projectiles.forEach(projectile => {
        projectile.update();
    });
}

//mouse click event - will fix tommy - eeeppy!
// window.addEventListener('click', (event) => {

//     const angle = Math.atan2(
//         event.clientY - canvas.height / 2,
//         event.clientX - canvas.width / 2
//     )

//     const velocity = {
//         x: Math.cos(angle),
//         y: Math.sin(angle)
//     }

//     console.log(angle);
//     projectiles.push(new Projectile(
//         canvas.width / 2, canvas.height / 2,
//         7,
//         'red', velocity
//     ));
//     console.log("Projectile created!");
// });

animate();
