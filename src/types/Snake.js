import Config from "@/types/Config";

export default class Snake {
    constructor({name, color}) {
        this.name = name;
        this.color = color;
        this.config = new Config()
        this.x = 0;
        this.y = 0;
        this.dx = this.config.sizeCell;
        this.dy = 0;
        this.tail = [];
        this.maxTail = 0;
        this.score = 0;

        document.addEventListener('keydown', (e) => {
            const code = e.code
            if ((code === 'KeyD' || code === 'ArrowRight') && this.dx >= 0) {
                this.dx = this.config.sizeCell
                this.dy = 0
            } else if ((code === 'KeyA' || code === 'ArrowLeft') && -this.dx >= 0) {
                this.dx = -this.config.sizeCell
                this.dy = 0
            } else if ((code === 'KeyW' || code === 'ArrowUp') && -this.dy >= 0) {
                this.dx = 0
                this.dy = -this.config.sizeCell
            } else if ((code === 'KeyS' || code === 'ArrowDown') && this.dy >= 0) {
                this.dx = 0
                this.dy = this.config.sizeCell
            }
        })
    }

    update({apple, otherSnakes}) {
        if (this.x + this.dx >= this.config.canvasWidth) {
            this.x = 0
        } else if (this.x + this.dx < 0) {
            this.x = this.config.canvasWidth - this.config.sizeCell
        } else {
            this.x += this.dx
        }
        if (this.y + this.dy >= this.config.canvasHeight) {
            this.y = 0
        } else if (this.y + this.dy < 0) {
            this.y = this.config.canvasHeight - this.config.sizeCell
        } else {
            this.y += this.dy
        }

        for (let i = 0; i < this.tail.length; i++) {
            if (this.tail[i].x === this.x && this.tail[i].y === this.y) {
                this.loose()
            }
        }

        this.tail.unshift({x: this.x, y: this.y})
        if (this.tail.length > this.maxTail + 1) {
            this.tail.pop()
        }

        if (this.x === apple.x && this.y === apple.y) {
            ++this.score
            ++this.maxTail
            apple.refresh()
        }

        for (let i = 0; i < otherSnakes.length; i++) {
            for (let j = 0; j < otherSnakes[i].tail.length; j++) {
                const tail = otherSnakes[i].tail[j]
                if (this.x === tail.x && this.y === tail.y) this.loose()
            }
        }
    }

    loose() {
        this.score = 0
        this.tail = []
        this.maxTail = 0
        this.x = 0
        this.y = 0
    }
}
