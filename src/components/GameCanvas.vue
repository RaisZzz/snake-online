<template>
  <div class="game-wrapper">
    <ChooseName @startGame="startGame" />
    <p class="game-score">Score: <span ref="scoreWrapper"></span></p>
    <div class="canvas-wrapper" ref="wrapper">
      <div class="canvas-wrapper__bg" ref="background"></div>
    </div>
  </div>
</template>

<script>
import GameLoop from "@/types/GameLoop";
import Canvas from "@/types/Canvas";
import Config from "@/types/Config";
import ChooseName from "@/components/ChooseName";

export default {
  components: {ChooseName},
  data: () => {
    return {
      wrapper: null,
      canvas: null,
      scoreWrapper: null,
      gameLoop: null
    }
  },
  mounted: function () {
    const config = new Config()
    const bg = this.$refs.background
    bg.style.gridTemplateColumns = `repeat(${config.canvasWidth / config.sizeCell}, 1fr)`
    bg.style.gridTemplateRows = `repeat(${config.canvasWidth / config.sizeCell}, 1fr)`
    for (let i = 0; i < config.canvasWidth / config.sizeCell; i++) {
      const yLine = document.createElement('div')
      yLine.className = 'canvas-wrapper__bg-vertical'
      yLine.style.gridColumnStart = `${i + 1}`
      yLine.style.gridColumnEnd = `${i + 2}`
      yLine.style.gridRowStart = '1'
      yLine.style.gridRowEnd = `${config.canvasHeight / config.sizeCell + 1}`
      bg.append(yLine)
    }

    for (let i = 0; i < config.canvasHeight / config.sizeCell; i++) {
      const xLine = document.createElement('div')
      xLine.className = 'canvas-wrapper__bg-horizontal'
      xLine.style.gridRowStart = `${i + 1}`
      xLine.style.gridRowEnd = `${i + 2}`
      xLine.style.gridColumnStart = '1'
      xLine.style.gridColumnEnd = `${config.canvasWidth / config.sizeCell + 1}`
      bg.append(xLine)
    }

    this.wrapper = this.$refs.wrapper
    this.scoreWrapper = this.$refs.scoreWrapper
    this.canvas = new Canvas(this.wrapper)

    this.gameLoop = new GameLoop(this.canvas, this.scoreWrapper, this.$socket)
    const gameLoop = this.gameLoop
    gameLoop.loop()

    this.sockets.subscribe('otherSnakes', (data) => {
      gameLoop.addSnake(data)
    })
  },
  methods: {
    startGame(data) {
      this.gameLoop.startGame({name: data.name, color: data.color})
    }
  }
}
</script>

<style scoped>
.game-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.canvas-wrapper {
  position: relative;
  border: solid rgba(0,0,0,0.1);
  border-width: 1px 0 0 1px;
}
.canvas-wrapper__bg {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
}
</style>

<style>
.canvas-wrapper__bg-vertical {
  border-right: 1px solid rgba(0,0,0,0.1);
}
.canvas-wrapper__bg-horizontal {
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
</style>
