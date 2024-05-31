<template>
  <div class="w-full h-full bg-modal-background bg-opacity-50 fixed flex justify-center items-center z-50">
    <div class="bg-white rounded-3xl">
      <div class="flex flex-col items-center py-4 sm:py-8 md:py-10 px-9 sm:px-20 md:px-24 sm:m-2 sm:border-3 md:border-4 border-favorite-theme rounded-3xl select-none">
        <div class="text-lg sm:text-xl md:text-2xl font-extrabold text-primary py-1 sm:py-2 md:py-3">고냥이 월드컵</div>
        <div class="text-2xl md:text-3xl font-bold text-favorite-theme mb-2">당신의 1등 고양이는</div>
        <div class="w-full flex flex-col items-center mb-2 sm:mb-5">
          <div class="w-48 h-48 sm:w-80 sm:h-80 md:w-96 md:h-96 overflow-hidden border-4 border-favorite-theme mb-2">
            <img class="w-full h-full object-cover" :src="`${this.$store.state.favoriteFinalImage}`" />
          </div>
          <div class="text-xl font-semibold text-primary">{{ this.$store.state.favoriteFinalTitle }}</div>
        </div>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-4 select-none w-full pb-2 sm:pb-0">
          <div @click="handleRouterRank()" class="w-11/12 sm:w-auto bg-favorite-theme text-white border-favorite-theme border-2 py-0.5 sm:px-5 sm:py-1 rounded-lg flex justify-center font-bold text-base sm:text-xl cursor-pointer">확인</div>
          <div @click="reloadPage()" class="w-11/12 sm:w-auto bg-white border-favorite-theme border-2 sm:px-4 py-0.5 sm:py-1 rounded-lg text-favorite-theme font-bold text-base sm:text-xl flex justify-center cursor-pointer">다시하기</div>
          <div @click="handleRouterMain()" class="w-11/12 sm:w-auto bg-white border-favorite-theme border-2 sm:px-4 py-0.5 sm:py-1 rounded-lg text-favorite-theme font-bold text-base sm:text-xl flex justify-center cursor-pointer">메인으로</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleRouterMain() {
      this.$router.push(`/`)
    },
    handleRouterRank() {
      this.$router.push(`/favorite-statistic`)
    },
    reloadPage() {
      this.$store.commit('resetFavoriteRoundFinish')
      this.$router.go(0)
      this.$store.commit('resetFavoriteRoundFinish')
      this.$store.dispatch('getFavoriteData')
    }
  }
}
</script>

<style>
</style>
