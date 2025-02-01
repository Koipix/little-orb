import { CanvasContext } from "./canvasContext";

const friction = 0.99;

export class Particle {
    private ctx: CanvasRenderingContext2D;
    public alpha: number;

    constructor(
        public x: number,
        public y: number,
        public radius: number,
        public color: string,
        public vel: Velocity,
    ) {
        this.ctx = CanvasContext.getInstance().ctx;
        this.alpha = 1
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vel = vel;
    }

    spawn(): void {
        this.ctx.save()
        this.ctx.globalAlpha = this.alpha;
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.restore();
    }

    update(): void {
        this.spawn();
        this.vel.x *= friction;
        this.vel.y *= friction;
        this.x += this.vel.x;
        this.y += this.vel.y;
        this.alpha -= 0.01;
    }
}

interface Velocity {
    x: number;
    y: number;
}
