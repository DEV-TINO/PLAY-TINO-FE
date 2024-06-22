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
  <div class="flex flex-col h-auto w-full bg-primary">
    <div class="w-full h-10 md:h-14 min-h-8 flex items-center select-none">
      <div class="text-white text-sm pl-4 min-w-36 md:text-xl">정각을 맞춰라</div>
    </div>
    <div class="w-full h-auto bg-white pt-10 pb-3 px-2">
      <div class="flex justify-center pb-2 sm:pb-4 md:pb-6 lg:pb-8 xl:pb-10">
        <div class="w-1/12 min-w-10 flex justify-start px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold items-center select-none text-white"></div>
        <div class="w-32 md:w-48 lg:w-64 xl:w-96 flex justify-center text-light-purple text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold items-center min-w-28 select-none pl-1">닉네임</div>
        <div class="w-1/6 text-light-purple text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold flex justify-center items-center min-w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 select-none">기록 / 목표</div>
        <div class="text-light-purple text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold w-2/12 flex justify-center items-center min-w-16 select-none">오차</div>
      </div>
      <div v-for="(user, index) in rankData" :key="user.quizRankId" class="w-full">
        <div class="flex justify-center pb-4 md:pb-7">
          <div class="w-1/12 min-w-10 flex justify-start px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold items-center select-none">
            <div :class=rankColor(getRank(index))>{{ getRank(index) }}</div>
          </div>
          <div class="w-32 md:w-48 lg:w-64 xl:w-96 flex justify-start min-w-28 items-center pl-1 text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-3xl select-none whitespace-nowrap text-ellipsis overflow-hidden">{{ userNames[index] }}</div>
          <div class="w-1/6 min-w-40 flex gap-2 sm:w-48 md:w-56 lg:w-64 xl:w-72 justify-center text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-3xl items-center">
            <div>{{ user.stopTime }}</div>
            <div>/</div>
            <div>{{ user.targetTime }}</div>
          </div>
          <div class="w-2/12 flex justify-center items-center text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-3xl min-w-16 gap-1 select-none">{{ user.errorRange }}</div>
        </div>
      </div>
      <div v-if="showPagination" class="select-none flex items-center justify-center text-sm md:text-lg lg:text-xl">
        <font-awesome-icon class="text-primary text-xs sm:text-base px-1 font-bold cursor-pointer" :icon="['fas', 'angle-double-left']" @click="changeFirstPage()"/>
        <font-awesome-icon class="text-primary text-xs sm:text-base pr-2 pl-1 font-bold cursor-pointer" :icon="['fas', 'angle-left']" @click="decressePageNumber()"/>
        <div v-if="showStartEllipsis" class="text-primary px-2 font-bold text-xs sm:text-base cursor-pointer" @click="changeFirstPage()">{{ FIRST_PAGE }}</div>
        <div v-if="showStartEllipsis" class="text-primary px-1 font-bold text-xs sm:text-base">...</div>
        <div v-for="(page, index) in pages" :key="index">
          <div class="text-white w-4 h-4 sm:w-7 sm:h-7 flex justify-center items-center font-bold bg-light-purple rounded-2xl text-xs sm:text-base cursor-pointer" @click="changePage(page)">
            <div class="text-primary font-bold bg-white w-7 h-7 flex justify-center items-center" v-if="currentPage != page">{{ page }}</div>
            <div v-else>{{ page }}</div>
          </div>
        </div>
        <div v-if="showEndEllipsis" class="text-primary font-bold px-1 text-xs sm:text-base">...</div>
        <div v-if="showEndEllipsis" class="text-primary font-bold px-2 text-xs sm:text-base cursor-pointer" @click="changeLastPage()">{{ pageCount }}</div>
        <font-awesome-icon class="text-primary font-bold text-xs sm:text-base pr-1 pl-2 cursor-pointer" :icon="['fas', 'angle-right']" @click="increasePageNumber()"/>
        <font-awesome-icon class="text-primary font-bold text-xs sm:text-base px-1 cursor-pointer" :icon="['fas', 'angle-double-right']" @click="changeLastPage()"/>
      </div>
    </div>
  </div>
  <CommentPage></CommentPage>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import CommentPage from '../components/CommentPage.vue'
import axios from 'axios'

const FIRST_PAGE = 1
const ELLIPSIS_NEED = 6
const ITEMS_PER_PAGE = 5

export default {
  components: {
    CommentPage,
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const rankData = ref([])
    const currentPage = ref(1)
    const totalRank = ref(0)
    const pages = ref([])
    const showStartEllipsis = ref(false)
    const showEndEllipsis = ref(false)
    const showPagination = ref(false)
    const userNames = ref([])

    const pageCount = computed(() => Math.ceil(totalRank.value / ITEMS_PER_PAGE))
    
    const handleClickLogin = () => {
      if (store.state.userId !== "") {
        store.commit("logout")
        router.push("/")
        alert("User Logout")
      }
    }

    const handleRouterMain = () => {
      router.push('/')
    }

    const getRankData = async (pageNumber) => {
      try {
        const response = await axios.get(`${store.state.host}/timer/rank/all?page=${pageNumber ?? 0}`)
        rankData.value = response.data.timerList
        totalRank.value = response.data.timerTotal
        rankData.value.forEach((data, index) => {
          userNames.value[index] = data.userName
        })
        userNames.value.forEach((userName, index) => {
          if (/[a-zA-Z]/.test(userName)) {
            if (userName.length > 20) userNames.value[index] = userName.slice(0, 19) + "..."
          } else if (userName.length > 10) {
            userNames.value[index] = userName.slice(0, 9) + "..."
          }
        })
        if (pageCount.value == FIRST_PAGE) {
          showPagination.value = false
        } else if (pageCount.value < ELLIPSIS_NEED) {
          pages.value = createArray(pageCount.value)
          showPagination.value = true
          showStartEllipsis.value = false
          showEndEllipsis.value = false
          return
        } else if (currentPage.value == FIRST_PAGE) {
          pages.value = [FIRST_PAGE, FIRST_PAGE + 1, FIRST_PAGE + 2]
          showStartEllipsis.value = true
          showEndEllipsis.value = true
        } else if (currentPage.value == pageCount.value) {
          pages.value = [pageCount.value - 2, pageCount.value - 1, pageCount.value]
        } else if (currentPage.value > 3 || pageCount.value - 2) {
          pages.value = [currentPage.value - 1, currentPage.value, currentPage.value + 1]
        }
        showStartEllipsis.value = currentPage.value > 2
        showEndEllipsis.value = currentPage.value < (pageCount.value - 1)
      } catch (error) {
        console.error("Error fetching rank data:", error)
      }
    }

    const createArray = (n) => {
      return Array.from({ length: n }, (v, i) => i + 1)
    }

    const getRank = (index) => {
      return (currentPage.value - 1) * ITEMS_PER_PAGE + index + 1
    }

    const changePage = (pageNumber) => {
      currentPage.value = pageNumber
      getRankData(currentPage.value - 1)
    }

    const decressePageNumber = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1
        getRankData(currentPage.value - 1)
      }
    }

    const increasePageNumber = () => {
      if (currentPage.value < pageCount.value) {
        currentPage.value += 1
        getRankData(currentPage.value - 1)
      }
    }

    const changeFirstPage = () => {
      currentPage.value = 1
      getRankData(currentPage.value - 1)
    }

    const changeLastPage = () => {
      currentPage.value = pageCount.value
      getRankData(currentPage.value - 1)
    }

    const rankColor = (rank) => {
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

    onMounted(() => {
      if (store.state.userId === "") {
        alert("Please Login")
        router.push("/")
        return
      }
      if (pageCount.value < ELLIPSIS_NEED)
        showPagination.value = true
      getRankData()
    })

    return {
      FIRST_PAGE,
      currentPage,
      rankData,
      pages,
      showStartEllipsis,
      showEndEllipsis,
      showPagination,
      userNames,
      pageCount,
      handleClickLogin,
      handleRouterMain,
      getRank,
      changePage,
      decressePageNumber,
      increasePageNumber,
      changeFirstPage,
      changeLastPage,
      rankColor,
    }
  },
}
</script>

<style>
</style>
