<template>
  <div class="flex w-full h-24 bg-white justify-between items-center">
    <div class="w-30 h-20"></div>
    <div class="flex justify-center">
      <img src="/image/logo.png" class="w-30 h-20" @click="handleRouterMain()"/>
    </div>
    <div class="text-light-purple order-last flex justify-center mr-10 font-medium cursor-pointer">Login</div>
  </div>
  <div class="flex flex-col h-auto w-full bg-primary">
    <div class="w-full h-14 min-h-8 flex items-center">
      <div class="text-white text-xl pl-4 min-w-36">정각을 맞춰라</div>
    </div>
      <div class="w-full h-auto bg-white pt-10 pb-3">
        <div class="flex pb-2 sm:pb-4 md:pb-6 lg:pb-8 xl:pb-10">
          <div class="w-3/12 min-w-10 px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20"></div>
          <div class="text-light-purple text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold w-3/12 items-center min-w-40">닉네임</div>
          <div class="text-light-purple text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold w-3/12 flex justify-center items-center min-w-40">기록 / 목표 시간</div>
          <div class="text-light-purple text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold w-1/12 flex justify-center items-center min-w-14">오차</div>
        </div>
        <div v-for="(user, index) in this.rankData" key="user.quizRankId">
          <div class="flex pb-4 md:pb-7">
            <div class="w-3/12 min-w-10 flex justify-end px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 text-light-purple text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold items-center">{{ this.getRank(index) }}</div>
            <div class="w-3/12 min-w-40 items-center pl-1 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">alswlfjddl</div>
            <div class="w-3/12 min-w-40 flex gap-3 justify-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl items-center">
              <div>{{ user.stopTime }}</div>
              <div>/</div>
              <div>{{ user.targetTime }}</div>
            </div>
            <div class="w-1/12 flex justify-center items-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl min-w-14">{{ user.errorRange }}</div>
          </div>
        </div>
        <div class="flex items-center justify-center gap-2 md:gap-3 lg:gap-4 text-sm md:text-lg lg:text-xl">
          <font-awesome-icon class="text-primary text-base" :icon="['fas', 'angle-left']" @click="decressePageNumber()"/>
          <div v-for="(page, pageNumber) in pageCount" :key="pageNumber" :class="{ 'font-bold text-primary': currentPage == pageNumber + 1, 'font-bold text-gray-200': currentPage != pageNumber + 1 }" @click="changePage(pageNumber + 1)">
            <div v-if="currentPage != pageNumber + 1">{{ pageNumber + 1 }}</div>
            <u v-if="currentPage == pageNumber + 1">{{ pageNumber + 1 }}</u>
          </div>
          <font-awesome-icon class="text-primary text-base":icon="['fas', 'angle-right']" @click="increasePageNumber()"/>
        </div>
      </div>
    </div>
  <CommentPage></CommentPage>
</template>
  
<script>
  import CommentPage from '../components/CommentPage.vue'
  import axios from 'axios'
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
        const response = await axios.get(`${this.$store.state.timerPort}/timer/rank/all?page=${pageNumber ?? 0}`)
        this.rankData = response.data.timerList
        this.totalRank = response.data.timerTotal - 1
      },
      getRank(index){
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
      }
    },
    mounted() {
      this.getRankData()
    },
  }
</script>

<style>
</style>