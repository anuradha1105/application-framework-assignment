<template>
  <div class="wrap">
    <h1>Mini Chat (Vue + Nest)</h1>

    <div class="row">
      <label>Nickname</label>
      <input v-model="user" />
    </div>

    <div class="chatbox">
      <div class="msg" v-for="(m, idx) in messages" :key="idx">
        <div class="meta"><b>{{m.user}}</b> <span>{{ formatTime(m.ts) }}</span></div>
        <div>{{m.text}}</div>
      </div>
    </div>

    <div class="row">
      <input v-model="text" placeholder="Type a message…" @keyup.enter="send" />
      <button @click="send">Send</button>
    </div>

    <small>Open two tabs to test real-time.</small>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { io } from 'socket.io-client'

export default {
  setup() {
    const user = ref('User' + Math.floor(Math.random() * 1000))
    const text = ref('')
    const messages = ref([])
    const socket = io('http://localhost:3000', {
      withCredentials: true,
      transports: ['websocket']
    })

    const formatTime = (ts) => {
      try {
        return new Date(ts).toLocaleTimeString()
      } catch (e) { return ts }
    }

    onMounted(() => {
      socket.on('connect', () => {
        // connected
      })
      socket.on('message', (m) => {
        messages.value.push(m)
      })
    })

    onBeforeUnmount(() => {
      socket.disconnect()
    })

    function send() {
      if (!text.value.trim()) return
      const payload = { user: user.value, text: text.value }
      socket.emit('message', payload)
      text.value = ''
    }

    return { user, text, messages, send, formatTime }
  }
}
</script>
