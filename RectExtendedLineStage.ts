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

const maxScale : Function = (scale : number, i : number, n : number) => Math.max(0, scale - i / n)
const divideScale : Function = (scale : number, i : number, n : number) => Math.min(1/n, maxScale(scale, i, n)) * n
const scaleFactor : Function = (scale : number) => Math.floor(scale / scDiv)
const mirrorValue : Function = (scale : number, a : number, b : number) => {
    const k : number = scaleFactor(scale)
    return (1 - k) / a + k / b
}
const updateScale : Function = (scale : number, dir : number, a : number, b : number) => {
    return mirrorValue(scale, a, b) * dir * scGap
}

const drawRELNode : Function = (context : CanvasRenderingContext2D, i : number, scale : number) => {
    const gap : number = w / (nodes + 1)
    const size : number = gap / sizeFactor
    const sc1 : number = divideScale(scale, 0, 2)
    const sc2 : number = divideScale(scale, 1, 2)
    context.save()
    context.translate(gap * (i + 1), h/2)
    context.rotate(Math.PI/2 * sc2)
    context.strokeRect(-size/2, -size/2, size, size)
    for (var j = 0; j < lines; j++) {
        const sc : number = divideScale(sc1, j, lines)
        context.save()
        context.rotate(Math.PI/2 * j)
        context.translate(-size * sc + size/2, size/2)
        context.beginPath()
        context.moveTo(0, 0)
        context.lineTo(-size, 0)
        context.stroke()
        context.restore()
    }
    context.restore()
}

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
