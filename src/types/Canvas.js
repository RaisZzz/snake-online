import Config from "@/types/Config"
import {getGradient} from "@/helpers";

export default class Canvas {
    constructor(wrapper) {
        this.config = new Config()
        this.width = this.config.canvasWidth;
        this.height = this.config.canvasHeight;
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.canvas.style.width = `${this.width}px`
        this.canvas.style.height = `${this.height}px`
        this.ctx = this.canvas.getContext('2d')
        this.wrapper = wrapper
        this.wrapper.appendChild(this.canvas)
    }

    draw({snake, apple, score, otherSnakes}) {
        this.ctx.clearRect(0, 0, this.width, this.height)

        if (snake) {
            this.drawSnake(snake)
            score.innerText = snake.score
        }

        if (otherSnakes.length) {
            for (let i = 0; i < otherSnakes.length; i++) {
                this.drawSnake(otherSnakes[i])
            }
        }
        this.ctx.fillStyle = apple.color
        this.ctx.fillRect(apple.x, apple.y, this.config.sizeCell, this.config.sizeCell)
    }

    drawSnake(snake) {
        let gradient
        if (snake.dy < 0) {
            gradient = this.ctx.createLinearGradient(0, snake.y, 0, snake.y + this.config.sizeCell)
        } else if (snake.dy > 0) {
            gradient = this.ctx.createLinearGradient(0, snake.y + this.config.sizeCell, 0, snake.y)
        } else if (snake.dx < 0) {
            gradient = this.ctx.createLinearGradient(snake.x, 0, snake.x + this.config.sizeCell, 0)
        } else {
            gradient = this.ctx.createLinearGradient(snake.x + this.config.sizeCell, 0, snake.x, 0)
        }
        const colors = getGradient('rgb(204, 43, 94)', 'rgb(117, 58, 136)', snake.tail.length - 1)
        gradient.addColorStop(0, colors[0])
        gradient.addColorStop(1, colors[1])

        this.ctx.fillStyle = gradient
        this.ctx.fillRect(snake.x, snake.y, this.config.sizeCell, this.config.sizeCell)
        for (let i = 0; i < snake.tail.length; i++) {
            let tailDX
            let tailDY
            if (i > 0) {
                tailDX = snake.tail[i - 1].x - snake.tail[i].x
                tailDY = snake.tail[i - 1].y - snake.tail[i].y
                let tailGradient
                if (tailDY < 0) {
                    tailGradient = this.ctx.createLinearGradient(0, snake.tail[i].y, 0, snake.tail[i].y + this.config.sizeCell)
                } else if (tailDY > 0) {
                    tailGradient = this.ctx.createLinearGradient(0, snake.tail[i].y + this.config.sizeCell, 0, snake.tail[i].y)
                } else if (tailDX < 0) {
                    tailGradient = this.ctx.createLinearGradient(snake.tail[i].x, 0, snake.tail[i].x + this.config.sizeCell, 0)
                } else {
                    tailGradient = this.ctx.createLinearGradient(snake.tail[i].x + this.config.sizeCell, 0, snake.tail[i].x, 0)
                }
                tailGradient.addColorStop(0, colors[i])
                tailGradient.addColorStop(1, colors[i + 1])
                this.ctx.fillStyle = tailGradient
            }
            this.ctx.fillRect(snake.tail[i].x, snake.tail[i].y, this.config.sizeCell, this.config.sizeCell)
        }

        this.ctx.fillStyle = '#000'
        this.ctx.font = 'bold 14px Arial'
        this.ctx.textAlign = 'end'
        this.ctx.fillText(snake.name, snake.x + this.config.sizeCell - 5, snake.y + this.config.sizeCell - 3)
    }

}
