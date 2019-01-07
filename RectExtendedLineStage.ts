const w : number = window.innerWidth, h : number = window.innerHeight
const nodes : number = 5
const lines : number = 4
const scGap : number = 0.05
const scDiv : number = 0.51
const strokeFactor : number = 90
const sizeFactor : number = 3
const foreColor : string = "#1565C0"
const backColor : string = "#BDBDBD"
const delay = 40

class RectExtendedLineStage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D

    initCanvas() {
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        this.context.fillStyle = backColor
        this.context.strokeStyle = foreColor
        this.context.lineWidth = Math.min(w, h) / strokeFactor
        this.context.lineCap = 'round'
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : RectExtendedLineStage = new RectExtendedLineStage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}
