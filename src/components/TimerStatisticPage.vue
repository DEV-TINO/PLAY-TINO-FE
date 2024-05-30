<template>
  <div class="flex w-full h-24 bg-white justify-between items-center">
    <div class="w-30 h-20 ml-10"></div>
    <div class="flex justify-center">
      <img src="/image/logo.png" class="w-30 h-20 cursor-pointer select-none" @click="handleRouterMain()"/>
    </div>
    <div class="text-light-purple order-last flex justify-center mr-10 font-medium cursor-pointer select-none">Login</div>
  </div>
  <div class="flex flex-col h-auto w-full bg-primary">
    <div class="w-full h-14 min-h-8 flex items-center select-none">
      <div class="text-white text-xl pl-4 min-w-36">정각을 맞춰라</div>
    </div>
      <div class="w-full h-auto bg-white pt-10 pb-3">
        <div class="flex pb-2 sm:pb-4 md:pb-6 lg:pb-8 xl:pb-10">
          <div class="w-3/12 min-w-10 px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20"></div>
          <div class="text-light-purple text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold w-3/12 items-center min-w-40 pl-2 select-none">닉네임</div>
          <div class="text-light-purple text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold w-3/12 flex justify-center items-center min-w-40 select-none">기록 / 목표 시간</div>
          <div class="text-light-purple text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold w-1/12 flex justify-center items-center min-w-14 select-none">오차</div>
        </div>
        <div v-for="(user, index) in this.rankData" key="user.quizRankId">
          <div class="flex pb-4 md:pb-7">
            <div class="w-3/12 min-w-10 flex justify-end px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 items-center text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold select-none">
              <div :class=this.rankColor(this.getRank(index))>{{ this.getRank(index) }}</div>
            </div>
            <div class="w-3/12 min-w-40 items-center pl-1 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl select-none">{{ user.userName }}</div>
            <div class="w-3/12 min-w-40 flex gap-3 justify-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl items-center select-none">
              <div>{{ user.stopTime }}</div>
              <div>/</div>
              <div>{{ user.targetTime }}</div>
            </div>
            <div class="w-1/12 flex justify-center items-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl min-w-14 select-none">{{ user.errorRange }}</div>
          </div>
        </div>
        <div v-if="showPagination" class="select-none flex items-center justify-center text-sm md:text-lg lg:text-xl">
          <font-awesome-icon class="text-primary text-base px-1 font-bold cursor-pointer" :icon="['fas', 'angle-double-left']" @click="changeFirstPage()"/>
          <font-awesome-icon class="text-primary text-base pr-2 pl-1 font-bold cursor-pointer" :icon="['fas', 'angle-left']" @click="decressePageNumber()"/>
          <div v-if="showStartEllipsis" class="text-primary px-2 font-bold text-base cursor-pointer" @click="changeFirstPage()">1</div>
          <div v-if="showStartEllipsis" class="text-primary px-1 font-bold text-base">...</div>
          <div v-for="(page, index) in pages" :key="index">
            <div class="text-white w-7 h-7 flex justify-center items-center font-bold bg-light-purple rounded-2xl text-base cursor-pointer" @click="changePage(page)">
              <div class="text-primary font-bold bg-white w-7 h-7 flex justify-center items-center" v-if="currentPage != page">{{ page }}</div>
              <div v-else>{{ page }}</div>
            </div>
          </div>
          <div v-if="showEndEllipsis" class="text-primary font-bold px-1 text-base">...</div>
          <div v-if="showEndEllipsis" class="text-primary font-bold px-2 text-base cursor-pointer" @click="changeLastPage()">{{ this.pageCount }}</div>
          <font-awesome-icon class="text-primary font-bold text-base pr-1 pl-2 cursor-pointer" :icon="['fas', 'angle-right']" @click="increasePageNumber()"/>
          <font-awesome-icon class="text-primary font-bold text-base px-1 cursor-pointer" :icon="['fas', 'angle-double-right']" @click="changeLastPage()"/>
        </div>
      </div>
    </div>
  <CommentPage></CommentPage>
</template>
  
<script>
import CommentPage from '../components/CommentPage.vue'
import axios from 'axios'
const FIRST_PAGE = 1
const ELLIPSIS_NEED = 6
export default {
  components:{
    CommentPage,
  },
  data() { 
    return {
      rankData: [],
      currentPage: 1,
      itemsPerPage: 5,
      totalRank: 0,
      pages: [],
      showStartEllipsis: false,
      showEndEllipsis: false,
      showPagination: true,
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalRank / this.itemsPerPage)
    },
  },
  methods: {
    handleRouterMain() {
      this.$router.push(`/`)
    },
    async getRankData(pageNumber) {
      const response = await axios.get(`${this.$store.state.timerHost}/timer/rank/all?page=${pageNumber ?? 0}`)
      this.rankData = response.data.timerList
      this.totalRank = response.data.timerTotal - 1
      if(this.pageCount == FIRST_PAGE) {
        this.showPagination = false
      } else if (this.pageCount < ELLIPSIS_NEED) {
        this.pages = this.createArray(this.pageCount)
        this.showStartEllipsis = false
        this.showEndEllipsis = false
        return
      }
      else if(this.currentPage == FIRST_PAGE) {
        this.pages = [FIRST_PAGE, FIRST_PAGE + 1, FIRST_PAGE + 2]
        this.showPagination = true
      }
      else if(this.currentPage == this.pageCount) {
        this.pages = [this.pageCount - 2, this.pageCount - 1, this.pageCount]
        this.showPagination = true
      }
      else if(this.currentPage > 3 || this.pageCount - 2) {
        this.pages = [this.currentPage - 1, this.currentPage, this.currentPage + 1]
        this.showPagination = true
      }
      this.showStartEllipsis = this.currentPage > 2
      this.showEndEllipsis = this.currentPage < (this.pageCount - 1)
    },
    createArray(n) {
      return Array.from({ length: n }, (v, i) => i + 1)
    },
    getRank(index) {
      return (this.currentPage - 1) * 5 + index + 1
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber
      this.getRankData(this.currentPage - 1)
    },
    decressePageNumber() {
      if (this.currentPage > 1) {
        this.currentPage -= 1
        this.getRankData(this.currentPage - 1)
      }
    },
    increasePageNumber() {
      if (this.currentPage < this.pageCount) {
        this.currentPage += 1
        this.getRankData(this.currentPage - 1)
      }
    },
    changeFirstPage() {
      this.currentPage = 1
      this.getRankData(this.currentPage - 1)
    },
    changeLastPage() {
      this.currentPage = this.pageCount
      this.getRankData(this.currentPage - 1)
    },
    rankColor(rank) {
      if (rank == 1) {
        return "text-quiz-theme"
      } else if (rank == 2) {
        return "text-second-prize"
      } else if (rank == 3) {
        return "text-quiz-box"
      } else {
        return "text-light-purple"
      }
    }
  },
  mounted() {
    this.getRankData()
  },
}
</script>

<style>
</style>