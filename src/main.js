import { createApp } from 'vue'
import App from './App.vue'
import store from "@/store"
import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client'


createApp(App).use(store).use(new VueSocketIO({
        debug: false,
        connection: SocketIO('http://localhost:3000'), //options object is Optional
        vuex: {
            store,
            actionPrefix: "SOCKET_",
            mutationPrefix: "SOCKET_"
        }
    })
).mount('#app')
