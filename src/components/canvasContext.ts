export class CanvasContext {
    private static instance: CanvasContext;
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    private constructor() {
        this.canvas = document.querySelector('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.setCanvasDimensions();

        window.addEventListener('resize', () => {
            this.setCanvasDimensions();
        });
    }

    //set dimensions proportional to the screen
    private setCanvasDimensions(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    //single instance
    public static getInstance() : CanvasContext {
        if (!CanvasContext.instance) {
            CanvasContext.instance = new CanvasContext();
        }
        return CanvasContext.instance;
    }
}
