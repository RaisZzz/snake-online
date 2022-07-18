import Snake from "@/types/Snake";
import Config from "@/types/Config";
import Apple from "@/types/Apple";

export default class GameLoop {
    constructor(canvas, scoreWrapper, socket) {
        this.config = new Config()
        this.snake = null
        this.otherSnakes = []
        this.apple = new Apple()
        this.canvas = canvas
        this.scoreWrapper = scoreWrapper
        this.socket = socket
    }

    loop() {
        requestAnimationFrame(() => {
            this.loop()
        })
        if (++this.config.step < this.config.maxStep) return
        this.config.step = 0
        if (this.snake) {
            this.snake.update({apple: this.apple, otherSnakes: this.otherSnakes})
        }
        this.canvas.draw({snake: this.snake, apple: this.apple, score: this.scoreWrapper, otherSnakes: this.otherSnakes})
        this.socket.emit('snake', this.snake)
    }

    startGame({name, color}) {
        this.snake = new Snake({name, color})
    }

    addSnake(snakes) {
        const otherSnakes = []
        for (const snake of Object.values(snakes)) {
            if (snake) {
                otherSnakes.push(snake)
            }
        }
        this.otherSnakes = otherSnakes
    }
}
