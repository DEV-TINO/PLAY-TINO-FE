<template>
  <div class="flex flex-col h-auto w-full bg-primary">
    <div class="w-full h-14 min-h-8 flex items-center">
      <div class="text-white text-xl pl-4 min-w-36">문제를 맞춰라</div>
    </div>
    <div class="w-full h-auto bg-white pt-10 pb-3">
      <div class="flex pb-2 sm:pb-4 md:pb-6 lg:pb-8 xl:pb-10">
        <div class="w-2/12 min-w-10 px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20"></div>
        <div class="text-light-purple text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold w-3/12 items-center min-w-40">닉네임</div>
        <div class="text-light-purple text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold w-4/12 flex justify-center items-center min-w-48">맞춘 문제</div>
        <div class="text-light-purple text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold w-2/12 flex justify-center items-center min-w-16">총점</div>
      </div>
      <div v-for="(user, index) in currentPageData" :key="user.quizRankId">
        <div class="flex pb-4 md:pb-7">
          <div class="w-2/12 min-w-10 flex justify-end px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 text-light-purple text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold items-center">{{ index + 1 }}</div>
          <div class="w-3/12 min-w-40 items-center pl-1 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">alswlfjddl</div>
          <div class="w-4/12 min-w-48 flex gap-2 justify-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl items-center">
            <div class="flex gap-2">
              <div>넌센스</div>
              <div class="flex">
                <div>{{ user.nonsenseCorrect }}</div>
                <div>개</div>
              </div>
            </div>
            <div>/</div>
            <div class="flex gap-2">
              <div>상식</div>
              <div class="flex">
                <div>{{ user.commonsenseCorrect }}</div>
                <div>개</div>
              </div>
            </div>
          </div>
          <div class="w-2/12 flex justify-center items-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl min-w-16 gap-1">
            <div>{{ user.allCorrect }}</div>
            <div>/</div>
            <div>10</div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center gap-2 md:gap-3 lg:gap-4 text-sm md:text-lg lg:text-xl">
        <font-awesome-icon class="text-primary text-base" :icon="['fas', 'angle-left']" />
        <div v-for="(page, pageNumber) in pageCount" :key="pageNumber" :class="{ 'font-bold text-primary': currentPage == pageNumber + 1, 'font-bold text-gray-200': currentPage != pageNumber + 1 }" @click="changePage(pageNumber + 1)">
          <u>{{ pageNumber + 1 }}</u>
        </div>
        <font-awesome-icon class="text-primary text-base":icon="['fas', 'angle-right']" />
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
        }
      },
      computed: {
        pageCount() {
          return Math.ceil(this.rankData.length / this.itemsPerPage)
        },
        currentPageData() {
          const startIndex = (this.currentPage - 1) * this.itemsPerPage
          const endIndex = startIndex + this.itemsPerPage
          return this.rankData.slice(startIndex, endIndex)
        }
      },
      methods: {
        async getRankData() {
          const response = await axios.get(`${this.$store.state.quizPort}/quiz/rank/all?page=`)
          const obj = response.data
          this.rankData = obj
        },
        changePage(pageNumber) {
          this.currentPage = pageNumber
        },
      },
      mounted() {
        this.getRankData()
      },
    }
  </script>
  
  <style>
  </style>