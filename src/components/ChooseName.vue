<template>
  <form @submit.prevent="startGame">
    <label for="name">Your name:</label>
    <input id="name" type="text" v-model="name" required>
    <label for="color">Snake color:</label>
    <input id="color" v-model="color" type="color" list="presets" required>
    <datalist id="presets">
      <option value="#00b894">Grey</option>
      <option value="#ff00ff">White</option>
      <option value="#6699cc">Blue</option>
    </datalist>
    <input type="submit" value="Start game"/>
  </form>
</template>

<script>
export default {
  data: () => {
    return {
      name: '',
      color: '#00b894'
    }
  },
  methods: {
    startGame() {
      this.$emit('startGame', {
        name: this.name,
        color: this.color
      })
    }
  }
}
</script>
