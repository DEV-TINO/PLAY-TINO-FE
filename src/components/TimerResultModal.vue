<template>
  <div class="w-full h-full bg-modal-background bg-opacity-50 fixed flex justify-center items-center">
    <div class="bg-white rounded-3xl">
      <div class="flex flex-col items-center py-4 sm:py-8 md:py-10 px-12 sm:px-20 md:px-24 sm:m-2 sm:border-3 md:border-4 border-timer-stop rounded-3xl select-none">
        <div class="text-lg sm:text-xl md:text-2xl font-extrabold text-primary py-1 sm:py-2 md:py-3">정각을 맞춰라</div>
        <div v-if="rankIn" class="flex items-center flex-col">
          <div class="text-2xl sm:text-3xl md:text-4xl font-bold text-timer-stop pt-1 sm:pt-2">축하드려요!</div>
          <div class="text-2xl sm:text-3xl md:text-4xl font-bold text-timer-stop pb-1 sm:pb-2">랭킹에 오르셨어요</div>
        </div>
        <div v-else class="flex items-center flex-col">
          <div class="text-2xl sm:text-3xl md:text-4xl font-bold text-timer-stop pt-1 sm:pt-2">랭킹을 위해</div>
          <div class="text-2xl sm:text-3xl md:text-4xl font-bold text-timer-stop pb-1 sm:pb-2">한번 더 도전해볼까요?</div>
        </div>
        <div class="flex py-4">
          <hr class="w-8 h-0.5 sm:h-1 bg-timer-stop">
        </div>
        <div class="flex flex-col items-center mb-5">
          <div class="flex gap-4 items-center sm:py-1 md:py-2 select-none">
            <div class="text-lg sm:text-xl md:text-2xl font-semibold text-primary">기록</div>
            <div class="text-timer-stop text-lg sm:text-xl md:text-2xl font-semibold">{{ this.stopTime }}</div>
          </div>
          <div class="flex gap-4 pb-1 sm:pb-2 md:pb-3 items-center select-none">
            <div class="text-lg sm:text-xl md:text-2xl font-semibold text-primary">오차</div>
            <div class="text-timer-stop text-lg sm:text-xl md:text-2xl font-semibold">{{ calculateError() }}</div>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row items-center gap-2 md:gap-4 select-none w-full pb-2 sm:pb-0">
          <div @click="handleRouterRank" class="w-full sm:w-auto bg-timer-stop text-white border-timer-stop border-2 py-0.5 sm:px-5 sm:py-1 rounded-lg flex justify-center font-bold text-base sm:text-xl cursor-pointer">확인</div>
          <div @click="reload" class="w-full sm:w-auto bg-white border-timer-stop border-2 sm:px-4 py-0.5 sm:py-1 rounded-lg text-timer-stop font-bold text-base sm:text-xl flex justify-center cursor-pointer">다시하기</div>
          <div @click="handleRouterMain" class="w-full sm:w-auto bg-white border-timer-stop border-2 sm:px-4 py-0.5 sm:py-1 rounded-lg text-timer-stop font-bold text-base sm:text-xl flex justify-center cursor-pointer">메인으로</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { toRefs } from 'vue'
export default {
  props: {
    targetTime: String,
    stopTime: String,
    rankIn: Boolean,
  },
  setup(props, { emit }) {
    const router = useRouter()
    const { targetTime, stopTime } = toRefs(props)

    const handleRouterMain = () => {
      router.push(`/`)
    }

    const handleRouterRank = () => {
      router.push('/timer-statistic')
    }

    const reload = () => {
      emit('restart')
      emit('closeModal', false)
    }

    const calculateError = () => {
      let error = Math.abs(Number(targetTime.value) - Number(stopTime.value)).toFixed(2)
      if (error.split('.')[0].length == 1) {
        error = '0' + error
      } 
      return error
    }
    return {
      handleRouterMain,
      handleRouterRank,
      reload,
      calculateError,
    }
  }
}
</script>

<style>
</style>