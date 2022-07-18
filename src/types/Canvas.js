import Config from "@/types/Config";

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
        this.ctx.fillStyle = snake.color
        this.ctx.fillRect(snake.x, snake.y, this.config.sizeCell, this.config.sizeCell)
        for (let i = 0; i < snake.tail.length; i++) {
            this.ctx.fillRect(snake.tail[i].x, snake.tail[i].y, this.config.sizeCell, this.config.sizeCell)
        }

        this.ctx.fillStyle = '#000'
        this.ctx.font = 'bold 14px Arial'
        this.ctx.textAlign = 'end'
        this.ctx.fillText(snake.name, snake.x + this.config.sizeCell - 5, snake.y + this.config.sizeCell - 3)
    }

}
