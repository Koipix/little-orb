import { CanvasContext } from "./canvasContext";

export class Player {
    private ctx: CanvasRenderingContext2D;
    public x: number;
    public y: number;

    constructor(
        public radius: number,
        public color: string,
    ) {
        this.ctx = CanvasContext.getInstance().ctx;

        this.y = this.ctx.canvas.width / 2;
        this.x = this.ctx.canvas.height / 2;
        this.radius = radius;
        this.color = color;
    }

    spawn(): void {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
