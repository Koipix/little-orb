import { CanvasContext } from "./canvasContext";

export class Player {
    private ctx: CanvasRenderingContext2D;
    public x: number;
    public y: number;
    public hp: number;
    public exp: number;
    public isAlive: boolean;

    constructor(
        public radius: number,
        public color: string,
        initialHp: number = 100,
        initialExp: number = 0
    ) {
        this.ctx = CanvasContext.getInstance().ctx;
        this.y = this.ctx.canvas.height / 2;
        this.x = this.ctx.canvas.width / 2;

        this.hp = initialHp;
        this.exp = initialExp;
        this.isAlive = this.hp > 0;

        //update player pos if window resizes.. zzzZ
        window.addEventListener('resize', () => {
            this.y = this.ctx.canvas.height / 2;
            this.x = this.ctx.canvas.width / 2;
        });

        this.radius = radius;
        this.color = color;
    }

    spawn(): void {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    takeDamage(damage: number): void {
        if (!this.isAlive) return;
        this.hp -= damage;
        if (this.hp <= 0) {
            this.hp = 0;
            this.isAlive = false;
            console.log("Player died!")
        }
    }
}
