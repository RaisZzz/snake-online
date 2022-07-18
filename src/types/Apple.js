import Config from "@/types/Config";
import getRandomInt from "@/helpers";

export default class Apple {
    constructor() {
        this.config = new Config()
        this.x = getRandomInt(0, this.config.canvasWidth / this.config.sizeCell - 1) * this.config.sizeCell
        this.y = getRandomInt(0, this.config.canvasHeight / this.config.sizeCell - 1) * this.config.sizeCell
        this.color = '#d63031'
    }

    refresh() {
        this.x = getRandomInt(0, this.config.canvasWidth / this.config.sizeCell - 1) * this.config.sizeCell
        this.y = getRandomInt(0, this.config.canvasHeight / this.config.sizeCell - 1) * this.config.sizeCell
    }

}
