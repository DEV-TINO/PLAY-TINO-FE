<template>
  <div class="flex w-full h-16 sm:h-24 bg-white justify-between items-center pr-0 md:pr-4">
    <div class="w-30 h-10 ml-20"></div>
    <div class="flex justify-center select-none">
      <img src="/image/logo.png" class="w-30 h-14 min-h-14 min-w-16 sm:h-20 cursor-pointer" @click="handleRouterMain()" />
    </div>
    <div
      class="w-20 text-xs sm:text-md md:text-md lg:text-sm xl:text-lg text-light-purple order-last flex justify-center font-medium cursor-pointer select-none"
      @click="handleClickLogin()"
    >
      {{ this.$store.state.userId !== "" ? "Logout" : "Login" }}
    </div>
  </div>
  <div class="w-full bg-primary flex flex-col select-none">
    <div class="w-full h-10 md:h-14 min-h-8 flex items-center select-none">
      <div class="text-white text-sm pl-4 min-w-36 md:text-xl">고냥이 월드컵</div>
    </div>
    <div class="w-full h-auto flex flex-col justify-center pt-8 pb-8 bg-white">
      <div v-for="(rank, i) in 3" :key="i" class="flex justify-center pb-8">
        <div class="w-full flex justify-center items-center">
          <div :class="getRankColor(getRank(i))" class="w-1/12 min-w-4 flex justify-center px-0 sm:px-8 md:px-10 lg:px-14 xl:px-20 text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold items-center select-none">{{ getRank(i) }}</div>
          <div class="relative w-14 h-14 min-w-14 min-h-14 sm:w-24 sm:h-24 md:w-36 md:h-36 lg:w-40 lg:w-40 xl:w-48 xl:h-48 border-5 border-light-purple bg-light-purple">
            <div v-if="!loading[i]" class="skeleton-loader"></div>
            <img v-else @error="handleImageError($event)" :src="this.$store.state.favoriteRankData[i]?.favoriteImage ?? ''" @load="loading[i]" class="w-full h-full object-cover" />
          </div>
          <div class="w-1/4 min-w-32 flex justify-center text-primary text-xs sm:text-lg md:text-lg lg:text-xl xl:text-2xl">{{ this.$store.state.favoriteRankData[i]?.favoriteTitle ?? 'Now Loading...' }}</div>
          <div class="w-1/4 min-w-32 flex justify-center">
            <div class="w-28 h-5 sm:h-8 sm:w-36 md:h-10 md:w-48 lg:h-11 lg:w-64 xl:w-72 bg-gray-300 rounded-xl">
              <div class="flex items-center pl-2 bg-light-purple text-xs h-5 sm:h-8 sm:text-sm md:h-10 md:text-md lg:h-11 lg:text-lg xl:text-xl font-medium text-primary text-center leading-none rounded-xl flex" :style="{ width: $store.state.favoriteRankData[i]?.favoriteRankPercentage < 2 ? '1.5rem' : $store.state.favoriteRankData[i]?.favoriteRankPercentage + '%' }">{{ this.$store.state.favoriteRankData[i]?.favoriteRankPercentage.toFixed(2) }}%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="select-none flex items-center justify-center text-sm md:text-lg lg:text-xl">
        <font-awesome-icon class="text-primary text-base px-1 font-bold cursor-pointer" :icon="['fas', 'angle-double-left']" @click="changeFirstPage()"/>
        <font-awesome-icon class="text-primary text-base pr-2 pl-1 font-bold cursor-pointer" :icon="['fas', 'angle-left']" @click="decressePageNumber()"/>
        <div v-if="showStartEllipsis" class="text-primary px-2 font-bold text-base cursor-pointer" @click="changeFirstPage()">1</div>
        <div v-if="showStartEllipsis" class="text-primary px-1 font-bold text-base">...</div>
        <div v-for="page in pages" :key="page">
          <div class="text-white w-7 h-7 flex justify-center items-center font-bold bg-light-purple rounded-2xl text-base cursor-pointer" @click="changePage(page)">
            <div class="text-primary font-bold bg-white w-7 h-7 flex justify-center items-center" v-if="currentPage !== page">{{ page }}</div>
            <div v-else>{{ page }}</div>
          </div>
        </div>
        <div v-if="showEndEllipsis" class="text-primary font-bold px-1 text-base">...</div>
        <div v-if="showEndEllipsis" class="text-primary font-bold px-2 text-base cursor-pointer" @click="changeLastPage()">{{ pageCount }}</div>
        <font-awesome-icon class="text-primary font-bold text-base pr-1 pl-2 cursor-pointer" :icon="['fas', 'angle-right']" @click="increasePageNumber()"/>
        <font-awesome-icon class="text-primary font-bold text-base px-1 cursor-pointer" :icon="['fas', 'angle-double-right']" @click="changeLastPage()"/>
      </div>
    </div>
  </div>
  <CommentPage />
</template>

<script>
import CommentPage from './CommentPage.vue'

export default {
  components: {
    CommentPage,
  },
  data() {
    return {
      firtstPage: 1,
      ellipsisNeed: 6,
      currentPage: 1,
      itemsPerPage: 3,
      totalRank: 0,
      pages: [],
      showStartEllipsis: false,
      showEndEllipsis: false,
      loading: [false, false, false],
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalRank / this.itemsPerPage)
    },
  },
  mounted() {
    if (this.$store.state.userId === "") {
      alert("Please Login")
      this.$router.push("/")
      return
    }
    this.$store.dispatch('setFavoriteRankMax')
    this.getRankData(this.currentPage)
  },
  methods: {
    handleClickLogin() {
      if (this.$store.state.userId !== "") {
        this.$store.commit("logout")
        this.$router.push("/")
        alert("User Logout")
      }
    },
    handleImageError(event) {
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
      return (this.currentPage - 1) * this.itemsPerPage + index + 1
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber
      this.getRankData(this.currentPage)
    },
    decressePageNumber() {
      if (this.currentPage > 1) {
        this.currentPage -= 1
        this.getRankData(this.currentPage)
      }
    },
    increasePageNumber() {
      if (this.currentPage < this.pageCount) {
        this.currentPage += 1
        this.getRankData(this.currentPage)
      }
    },
    changeFirstPage() {
      this.currentPage = 1
      this.getRankData(this.currentPage)
    },
    changeLastPage() {
      this.currentPage = this.pageCount
      this.getRankData(this.currentPage)
    },
    getRankData(pageNumber) {
      this.$store.dispatch('getFavoriteRank', pageNumber).then((res) => {
        this.totalRank = this.$store.state.favoriteRankMaxPage * this.itemsPerPage
        this.updatePagination()
        this.loading = [true, true, true]
      })
    },
    updatePagination() {
      if (this.pageCount == this.firtstPage) {
        this.showPagination = false
      } else if (this.pageCount < this.ellipsisNeed) {
        this.pages = this.createArray(this.pageCount)
        this.showStartEllipsis = false
        this.showEndEllipsis = false
        return;
      } else if (this.currentPage == this.firtstPage) {
        this.pages = [this.firtstPage, this.firtstPage + 1, this.firtstPage + 2]
        this.showPagination = true
      } else if (this.currentPage == this.pageCount) {
        this.pages = [this.pageCount - 2, this.pageCount - 1, this.pageCount]
        this.showPagination = true
      } else if (this.currentPage > 3 || this.pageCount - 2) {
        this.pages = [this.currentPage - 1, this.currentPage, this.currentPage + 1]
        this.showPagination = true
      }
      this.showStartEllipsis = this.currentPage > 2
      this.showEndEllipsis = this.currentPage < (this.pageCount - 1)
    },
    createArray(n) {
      return Array.from({ length: n }, (v, i) => i + 1)
    },
  },
}
</script>

<style>
.selected-rank-page {
  color: '#1C0F38';
}
.unselected-rank-page {
  color: lightgray;
}
.skeleton-loader {
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #e0e0e0;
  }
}
</style>