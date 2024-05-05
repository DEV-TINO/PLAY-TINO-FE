<template>
  <div class="w-full h-full bg-modal-background bg-opacity-50 fixed flex justify-center items-center z-50">
    <div class="bg-white rounded-3xl">
      <div class="flex flex-col items-center pt-10 pb-10 pr-24 pl-24 m-2 border-4 border-timer-stop rounded-3xl">
        <div class="text-2xl font-extrabold text-primary py-3">정각을 맞춰라</div>
        <div class="text-4xl font-bold text-timer-stop pt-2">축하드려요!</div>
        <div class="text-4xl font-bold text-timer-stop pb-2">랭킹에 오르셨어요</div>
        <div class="flex py-4">
          <hr class="w-8 h-1 bg-timer-stop">
        </div>
        <div class="flex flex-col items-center mb-5">
          <div class="flex gap-4 items-center py-2">
            <div class="text-2xl font-semibold text-primary">기록</div>
            <div class="text-timer-stop text-2xl font-semibold">{{ this.stopTime }}</div>
          </div>
          <div class="flex gap-4 pb-3 items-center">
            <div class="text-2xl font-semibold text-primary">오차</div>
            <div class="text-timer-stop text-2xl font-semibold">{{ calculateError() }}</div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div @click="handleRouterRank()" class="bg-timer-stop text-white border-timer-stop border-2 pr-5 pl-5 pt-1 pb-1 rounded-lg flex justify-center font-bold text-xl cursor-pointer">확인</div>
          <div @click="reload()" class="bg-white border-timer-stop border-2 pr-4 pl-4 pt-1 pb-1 rounded-lg text-timer-stop font-bold text-xl cursor-pointer">다시하기</div>
          <div @click="handleRouterMain()" class="bg-white border-timer-stop border-2 pr-4 pl-4 pt-1 pb-1 rounded-lg text-timer-stop font-bold text-xl cursor-pointer">메인으로</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    targetTime: String,
    stopTime: String,
  },
  methods: {
    handleRouterMain() {
      this.$router.push(`/`)
    },
    handleRouterRank() {
      this.$router.push(`/timer-statistic`)
    },
    reload() {
      window.location.reload()
    },
    calculateError() {
      const targetTimeNumber = Number(this.targetTime)
      const stopTimeNumber = Number(this.stopTime)

      let error = Math.abs(targetTimeNumber - stopTimeNumber).toFixed(2)

      if (error.split('.')[0].length == 1) {
        error = '0' + error
      }
      return error
    },
  },
}
</script>

<style>
</style>