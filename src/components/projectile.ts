import { CanvasContext } from "./canvasContext";

export class Projectile {
    private ctx: CanvasRenderingContext2D;

    constructor(
        public x: number,
        public y: number,
        public radius: number,
        public color: string,
        public vel: Velocity
    ) {
        this.ctx = CanvasContext.getInstance().ctx;

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vel = vel;
    }

    spawn(): void {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    update(): void {
        this.spawn();
        this.x += this.vel.x;
        this.y += this.vel.y;
    }
}

interface Velocity {
    x: number;
    y: number;
}
