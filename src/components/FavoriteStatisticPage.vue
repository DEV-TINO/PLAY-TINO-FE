<template>
  <div class="flex w-full h-24 bg-white justify-between items-center">
    <div class="w-30 h-20 ml-10"></div>
    <div class="flex justify-center">
      <img @click="handleRouterMain()" src="/image/logo.png" class="w-30 h-20 cursor-pointer" />
    </div>
    <div class="text-light-purple order-last flex justify-center mr-10 font-medium cursor-pointer">Login</div>
  </div>
  <div class="w-full bg-primary flex flex-col">
    <div class="w-full h-14 min-h-8 flex items-center">
      <div class="text-white text-xl pl-4">고냥이 월드컵</div>
    </div>
    <div class="w-full h-auto flex flex-col justify-center pt-8 pb-8 bg-white">
      <div v-for="rank, i in 3" :key="i"  class="flex justify-center pb-8">
        <div class="w-3/4 flex justify-around items-center">
          <div :class="this.getRankColor(this.getRank(i))" class="w-16 h-16 flex justify-center items-center p-4 text-light-purple text-4xl font-bold">{{ this.getRank(i) }}</div>
          <img @error="handleImageError($event)" class="w-48 h-48 border-5 border-light-purple bg-light-purple" :src="this.$store.state.favoriteRankData[i]?.favoriteImage ?? ''" />
          <div class="w-80 flex justify-center text-primary text-2xl">{{ this.$store.state.favoriteRankData[i]?.favoriteTitle ?? 'Now Loading...' }}</div>
          <div class="w-1/3 flex justify-center">
            <div class="w-72 bg-gray-300 rounded-xl">
              <div class="p-3 bg-light-purple text-xl font-medium text-primary text-center leading-none rounded-xl flex" :style="{ width: $store.state.favoriteRankData[i]?.favoriteRankPercentage < 2 ? '1.5rem' : $store.state.favoriteRankData[i]?.favoriteRankPercentage * 6 + '%' }">{{ this.$store.state.favoriteRankData[i]?.favoriteRankPercentage.toFixed(2) }}%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center gap-2 md:gap-3 lg:gap-4 text-sm md:text-lg lg:text-xl">
        <font-awesome-icon @click="this.$store.dispatch('getFavoriteRank', 'first')" class="text-primary text-base cursor-pointer active:text-gray-200 hover:text-primary text-lg" :icon="['fas', 'angle-double-left']" />
        <font-awesome-icon @click="this.$store.dispatch('getFavoriteRank', 'prev')" class="text-primary cursor-pointer active:text-gray-200 hover:text-primary text-lg" :icon="['fas', 'angle-left']" />
        <div v-for="i in this.$store.state.favoriteRankMaxPage" :key="i" @click="this.$store.dispatch('getFavoriteRank', i)" :class="this.$store.state.favoriteRankPage == i ? 'selected-rank-page' : 'unselected-rank-page'" class="font-bold cursor-pointer active:text-primary hover:text-primary">{{ i }}</div>
        <font-awesome-icon @click="this.$store.dispatch('getFavoriteRank', 'next')" class="text-primary text-base cursor-pointer active:text-gray-200 hover:text-primary text-lg" :icon="['fas', 'angle-right']"/>
        <font-awesome-icon @click="this.$store.dispatch('getFavoriteRank', 'last')" class="text-primary text-base cursor-pointer active:text-gray-200 hover:text-primary text-lg" :icon="['fas', 'angle-double-right']" />
      </div>
    </div>
  </div>
  <CommentPage />
</template>

<script>
import CommentPage from './CommentPage.vue';
import errorImage from '../assets/css/errorImage.png'

export default {
  components: {
    CommentPage,
  },
  mounted() {
    this.$store.dispatch('setFavoriteRankMax')
    this.$store.dispatch('getFavoriteRank', 1)
  },
  methods: {
    handleImageError(event) {
      event.target.src = errorImage
    },
    handleRouterMain() {
			this.$router.push(`/`)
		},
    getRankColor(rank) {
      if (rank == 1) {
        return "text-quiz-theme"
      } else if (rank == 2) {
        return "text-second-prize"
      } else if (rank == 3) {
        return "text-quiz-box"
      } else {
        return "text-light-purple"
      }
    },
    getRank(index) {
      return (this.$store.state.favoriteRankPage - 1) * this.$store.state.favoriteRanksPerPage + index + 1
    },
  }
}
</script>

<style>
.selected-rank-page {
  color: '#1C0F38';
  border-bottom: 2px solid #1C0F38;
}
.unselected-rank-page {
  color: lightgray;
}
</style>