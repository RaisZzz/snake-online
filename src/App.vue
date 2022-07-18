<template>
  <GameCanvas/>
</template>

<script>
import GameCanvas from "@/components/GameCanvas";

export default {
  name: 'App',
  components: {
    GameCanvas
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
