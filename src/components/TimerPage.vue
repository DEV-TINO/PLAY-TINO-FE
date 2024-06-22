<template>
  <Transition name="modalFadeEffect">
    <ModalCard v-if="openModal"
      :targetTime="targetTime"
      :stopTime="time"
      :rankIn="rankIn"
      @restart="getTargetTime"
      @closeModal="handleCloseModal">
    </ModalCard>
  </Transition>
  <div class="flex flex-col h-screen w-full bg-primary" tabindex="0" ref="focusDiv" @keydown.space="handleKeydown">
    <div class="w-full h-24 min-h-16 sm:min-h-20 flex items-center cursor-pointer select-none" @click="handleRouterMain">
      <div class="text-white text-sm sm:text-xl pl-4 font-semibold hover:cursor-pointer min-w-40 select-none">PLAY - TINO</div>
    </div>
    <div class="w-full min-h-16 sm:min-h-24 md:min-h-32 lg:min-h-40 pb-6 flex justify-center items-center bg-primary">
      <div class="flex items-baseline gap-2 min-w-52 select-none">
        <div class="text-4xl md:text-5xl lg:text-7xl text-timer-stop font-extrabold text-outline">정각을</div>
        <div class="text-xl md:text-2xl lg:text-4xl text-white font-bold">맞춰라!</div>
      </div>
    </div>
    <div class="w-full h-full flex items-start justify-center bg-primary">
      <div class="bg-white min-h-60 min-w-80 max-w-6xl py-5 md:py-6 lg:py-7 h-auto w-7/12 rounded-2xl flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 select-none">
        <div class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-timer-stop font-['Share-Tech-Mono']">{{ targetTime }}</div>
        <div class="w-10/12 sm:w-9/12 md:w-8/12 h-auto py-4 sm:py-5 md:py-6 lg:py-7 bg-timer-bg rounded-2xl border-primary border-4 md:border-5 flex items-center justify-center select-none">
          <span class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-primary font-['Share-Tech-Mono']">{{ time }}</span>
        </div>
        <div class="flex justify-center gap-4">
          <div v-if="timeBegan === null" @click="start" class="cursor-pointer w-40 md:w-52 lg:w-64 h-10 md:h-12 hover:bg-timer-start hover:text-white text-timer-start border-timer-start border-2 flex items-center justify-center rounded-md mx-4 select-none">
            <div class="text-l md:text-2xl font-semibold">START</div>
          </div>
          <div v-else @click="stop" class="cursor-pointer w-40 md:w-52 lg:w-64 h-10 md:h-12 hover:bg-timer-stop hover:text-white text-timer-stop border-timer-stop border-2 flex items-center justify-center rounded-md mx-4 select-none">
            <div class="text-l md:text-2xl font-semibold">STOP</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ModalCard from '../components/TimerResultModal.vue'
import axios from 'axios'

export default {
  components: {
    ModalCard,
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const openModal = ref(false)
    const time = ref('00.00')
    const timeBegan = ref(null)
    const timeStopped = ref(null)
    const stoppedDuration = ref(0)
    const started = ref(null)
    const running = ref(false)
    const targetTime = ref('')
    const gameId = ref('')
    const rankIn = ref(false)
    const focusDiv = ref(null)

    const getTargetTime = async () => {
      time.value = '00.00'
      timeBegan.value = null
      const response = await axios.get(`${store.state.host}/timer/start/user/${store.state.userId}`)
      gameId.value = response.data.gameId
      targetTime.value = response.data.targetTime
      focusDiv.value.focus()
    }

    const saveRank = async () => {
      const rankData = {
        gameId: gameId.value,
        userId: store.state.userId,
        stopTime: time.value,
        targetTime: targetTime.value
      }
      const response = await axios.post(`${store.state.host}/timer/rank`, rankData)
      rankIn.value = response.data.rankIn
      openModal.value = true
    }

    const start = () => {
      if (running.value) return
      if (timeBegan.value === null) {
        timeBegan.value = new Date()
      }
      started.value = setInterval(clockRunning, 10)
      running.value = true
    }

    const stop = () => {
      running.value = false
      timeStopped.value = new Date()
      clearInterval(started.value)
      saveRank()
    }

    const clockRunning = () => {
      let currentTime = new Date()
      let timeElapsed = new Date(currentTime - timeBegan.value - stoppedDuration.value)
      let sec = timeElapsed.getUTCSeconds()
      let ms = timeElapsed.getUTCMilliseconds()

      time.value =
        zeroPrefix(sec, 2) + '.' +
        zeroPrefix(ms, 2)

      if (parseFloat(time.value) >= 59.90) {
        stop()
      }
    }

    const zeroPrefix = (num, digit) => {
      let zero = ''
      for (let i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    }

    const handleRouterMain = () => {
      router.push(`/`)
    }

    const handleKeydown = (event) => {
      if (timeBegan.value === null) start()
      else stop()
    }

    const handleCloseModal = () => {
      openModal.value = false
    }

    onMounted(() => {
      if (store.state.userId === '') {
        alert("로그인 없이 이용할 수 없습니다")
        router.push(`/`)
        return
      }
      getTargetTime()
    })

    return {
      openModal,
      time,
      timeBegan,
      targetTime,
      rankIn,
      focusDiv,
      getTargetTime,
      start,
      stop,
      handleRouterMain,
      handleKeydown,
      handleCloseModal
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'Share-Tech-Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/sharetechmono/v15/J7aHnp1uDWRBEqV98dVQztYldFcLowEF.woff2) format('woff2');
}
.text-outline {
  text-shadow:
    -1px -1px 0 white, 1px -1px 0 white,
    -1px 1px 0 white, 1px 1px 0 white,
    0px -2px 0 white, 0px 2px 0 white,
    -2px 0px 0 white, 2px 0px 0 white,
    -2px -2px 0 white, 2px -2px 0 white,
    -2px 2px 0 white, 2px 2px 0 white,
    -1px -2px 0 white, 1px -2px 0 white,
    -1px 2px 0 white, 1px 2px 0 white,
    -2px -1px 0 white, 2px -1px 0 white,
    -2px 1px 0 white, 2px 1px 0 white;
}
.modalFadeEffect-enter-from {
  opacity: 0;
}
.modalFadeEffect-enter-active {
  transition: all 0.5s;
}
.modalFadeEffect-enter-to {
  opacity: 1;
}
.modalFadeEffect-leave-from {
  opacity: 1;
}
.modalFadeEffect-leave-active {
  transition: all 0.2s;
}
.modalFadeEffect-leave-to {
  opacity: 0;
}
</style>