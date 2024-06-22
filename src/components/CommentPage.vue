<template>
  <div class="flex flex-col min-h-screen w-full bg-primary">
    <div class="w-full h-10 sm:h-14 sm:min-h-8 flex items-center">
      <div class="text-white text-lg sm:text-xl pl-4 select-none">Comment</div>
    </div>
    <hr class="w-full h-px bg-white">
    <div class="w-full h-10 min-h-10 flex justify-end items-center gap-3 lg:gap-5 px-4 lg:px-6 pt-0 md:pt-2 lg:pt-4 min-w-36 text-base md:text-lg lg:text-xl select-none">
      <div :class="sortTypeHeart()" @click="sortByHeart()">추천순</div>
      <div :class="sortTypeTime()" @click="sortByLatest()">최신순</div>
    </div>
    <div class="w-full h-30 flex justify-center items-start bg-primary py-2 md:py-5">
      <div class="w-11/12 sm:w-10/12">
        <div class="bg-white w-full h-auto rounded-xl py-2 sm:py-3 px-4 sm:px-7 flex justify-center items-center min-w-72 gap-4">
          <input type="text" v-model="currentComment" placeholder="댓글을 입력해주세요 (최대 200자)" class="w-full resize-none overflow-hidden border-white text-lg md:text-2xl" @keypress.enter="handleClickCommentSubmit()" />
          <div class="text-gray-300 text-xl sm:text-3xl cursor-pointer select-none" @click="handleClickCommentSubmit()">
            <font-awesome-icon :icon="['fas', 'circle-chevron-up']" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-full items-start bg-primary flex justify-center">
      <div class="w-11/12 sm:w-10/12">
        <div v-for="(comment, index) in comments" :key="index" class="bg-white w-full h-auto rounded-xl py-2 sm:py-3 my-3 items-center px-4 sm:px-7 min-w-72">
          <div class="flex justify-between pb-0.5">
            <div class="sm:px-0.5 flex flex-col sm:flex-row sm:gap-2 items-start sm:items-end select-none">
              <div class="text-primary font-extrabold text-lg md:text-2xl">{{ userNames[index] }}</div>
              <div class="text-quiz-box text-sm sm:text-base md:text-lg">{{ comment.uploadTime }}</div>
            </div>
            <div v-if="findEditComment(index)" class="text-primary text-sm sm:text-base md:text-lg select-none cursor-pointer" @click="submitComment(index)">완료</div>
            <div v-else>
              <div v-if="isMyComment[index]" class="flex gap-1 sm:gap-2 select-none">
                <div class="text-primary text-sm sm:text-base md:text-lg cursor-pointer" @click="updateComment(index)">수정</div>
                <div class="text-quiz-box text-sm sm:text-base md:text-lg cursor-pointer" @click="confirmDelete(index)">삭제</div>
              </div>
            </div>
          </div>
          <div class="flex place-content-between pb-0.5 sm:pb-1 items-end">
            <textarea v-if="editTextIndex == index" type="text" v-model="editComment" class="bg-gray-100 mt-1 rounded-lg w-full resize-none text-base sm:text-lg md:text-2xl" @keypress.enter="handleClickCommentSubmit(index)"></textarea>
            <div v-else class="text-base text-primary sm:text-lg md:text-2xl md:pt-1 select-none">{{ comment.content }}</div>
            <div class="flex justify-end items-center pl-2 sm:pl-4 gap-1 text-quiz-theme select-none">
              <div class="text-sm md:text-lg">{{ comment.heartCount }}</div>
              <font-awesome-icon class="text-base md:text-xl cursor-pointer" :icon="comment.userHeart ? checkedheartIcon : uncheckedHeartIcon" @click="toggleHeart(comment)" />
            </div>
          </div>
        </div>
        <div v-if="showPagination" class="select-none flex items-center pb-4 justify-center gap-1 text-sm md:text-lg lg:text-xl">
          <font-awesome-icon class="text-white text-base px-1 font-bold cursor-pointer" :icon="['fas', 'angle-double-left']" @click="changeFirstPage()"/>
          <font-awesome-icon class="text-white text-base px-1 font-bold cursor-pointer" :icon="['fas', 'angle-left']" @click="decressePageNumber()"/>
          <div v-if="showStartEllipsis" class="text-white px-1 font-bold text-base cursor-pointer" @click="changeFirstPage()">1</div>
          <div v-if="showStartEllipsis" class="text-white px-1 font-bold text-base">...</div>
          <div v-for="(page, index) in pages" :key="index">
            <div class="text-primary w-7 h-7 flex justify-center items-center font-bold bg-white rounded-2xl text-base cursor-pointer" @click="changePage(page)">
              <div class="text-white font-bold bg-primary w-7 h-7 flex justify-center items-center" v-if="currentPage != page">{{ page }}</div>
              <div v-else>{{ page }}</div>
            </div>
          </div>
          <div v-if="showEndEllipsis" class="text-white font-bold px-1 text-base">...</div>
          <div v-if="showEndEllipsis" class="text-white font-bold px-1 text-base cursor-pointer" @click="changeLastPage()">{{ pageCount }}</div>
          <font-awesome-icon class="text-white font-bold text-base px-1 cursor-pointer" :icon="['fas', 'angle-right']" @click="increasePageNumber()"/>
          <font-awesome-icon class="text-white font-bold text-base px-1 cursor-pointer" :icon="['fas', 'angle-double-right']" @click="changeLastPage()"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import axios from 'axios'

const FIRST_PAGE = 1
const EDIT_FINISHED = -1
const ELLIPSIS_NEED = 6

export default {
  setup() {
    const route = useRoute()
    const store = useStore()
    const gameType = ref('')
    const checkedheartIcon = ref(['fas', 'heart'])
    const uncheckedHeartIcon = ref(['far', 'heart'])
    const comments = ref([])
    const currentComment = ref('')
    const totalComment = ref(0)
    const currentPage = ref(FIRST_PAGE)
    const itemsPerPage = ref(10)
    const sortType = ref('heart')
    const isMyComment = ref([])
    const pages = ref([])
    const showStartEllipsis = ref(false)
    const showEndEllipsis = ref(false)
    const showPagination = ref(true)
    const editTextIndex = ref(EDIT_FINISHED)
    const editComment = ref('')
    const userNames = ref([])

    const pageCount = computed(() => Math.ceil(totalComment.value / itemsPerPage.value))

    const getComment = async (pageNumber = 0) => {
      editTextIndex.value = EDIT_FINISHED
      const commentResponse = await axios.get(`${store.state.host}/${gameType.value}/comment/all/user/${store.state.userId}/${sortType.value}?page=${pageNumber}`)
      comments.value = commentResponse.data.commentList
      totalComment.value = commentResponse.data.commentTotal

      const newComments = comments.value.map((comment) => {
        const uploadTime = new Date(comment.uploadTime)
        comment.uploadTime = `${uploadTime.getFullYear()}.${(uploadTime.getMonth() + 1).toString().padStart(2, '0')}.${uploadTime.getDate().toString().padStart(2, '0')} ${uploadTime.getHours().toString().padStart(2, '0')}:${uploadTime.getMinutes().toString().padStart(2, '0')}`
        return comment
      }).filter((comment) => comment)

      comments.value = newComments

      isMyComment.value = []
      comments.value.forEach((comment, i) => {
        if (store.state.userId == comment.userId) {
          isMyComment.value[i] = true
        } else {
          isMyComment.value[i] = false
        }
      })

      comments.value.forEach((data, index) => {
        userNames.value[index] = data.userName
      })

      userNames.value.forEach((userName, index) => {
        if (/[a-zA-Z]/.test(userName)) {
          if (userName.length > 30) userNames.value[index] = userName.slice(0, 29) + "..."
        } else if (userName.length > 15) {
          userNames.value[index] = userName.slice(0, 14) + "..."
        }
      })

      if (pageCount.value == FIRST_PAGE) {
        showPagination.value = false
      } else if (pageCount.value < ELLIPSIS_NEED) {
        showPagination.value = true
        pages.value = createArray(pageCount.value)
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
    }

    const createArray = (n) => Array.from({ length: n }, (v, i) => i + 1)

    const sortTypeHeart = () => sortType.value == 'heart' ? 'text-sort-type font-semibold cursor-pointer' : 'text-gray-400 cursor-pointer'
    const sortTypeTime = () => sortType.value == 'time' ? 'text-sort-type font-semibold cursor-pointer' : 'text-gray-400 cursor-pointer'

    const toggleHeart = async (comment) => {
      if (!comment) throw 'Comment is null or undefined'
      if (store.state.userId == comment.userId) {
        alert("자신의 댓글에 좋아요를 누를 수 없습니다")
        return
      }
      const formData = {
        commentId: comment.commentId,
        userId: store.state.userId
      }
      if (comment.userHeart) {
        await axios.delete(`${store.state.host}/${gameType.value}/comment-heart`, { data: formData })
      } else {
        await axios.post(`${store.state.host}/${gameType.value}/comment-heart`, formData)
      }
      comment.userHeart = !comment.userHeart
      comment.heartCount += comment.userHeart ? 1 : -1
    }

    const handleClickCommentSubmit = async (index) => {
      if (editTextIndex.value == EDIT_FINISHED) {
        if (currentComment.value == '') {
          alert("댓글을 입력해주세요.")
          return
        }
        const formData = {
          userId: store.state.userId,
          content: String(currentComment.value)
        }
        const submitCommentResponse = await axios.post(`${store.state.host}/${gameType.value}/comment`, formData)
        if (!submitCommentResponse.data) {
          throw "Save comment error"
        }
        currentComment.value = ''
        currentPage.value = FIRST_PAGE
        getComment(FIRST_PAGE - 1)
      } else {
        submitComment(index)
      }
    }

    const sortByLatest = () => {
      sortType.value = 'time'
      getComment(currentPage.value - 1)
    }

    const sortByHeart = () => {
      sortType.value = 'heart'
      getComment(currentPage.value - 1)
    }

    const findEditComment = (index) => isMyComment.value[index] && (editTextIndex.value == index)

    const changePage = (pageNumber) => {
      currentPage.value = pageNumber
      getComment(currentPage.value - 1)
    }

    const decressePageNumber = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1
        getComment(currentPage.value - 1)
      }
    }

    const increasePageNumber = () => {
      if (currentPage.value < pageCount.value) {
        currentPage.value += 1
        getComment(currentPage.value - 1)
      }
    }

    const changeFirstPage = () => {
      currentPage.value = 1
      getComment(currentPage.value - 1)
    }

    const changeLastPage = () => {
      currentPage.value = pageCount.value
      getComment(currentPage.value - 1)
    }

    const confirmDelete = (index) => {
      if (confirm("댓글을 삭제하시겠습니까?")) {
        deleteComment(index)
      }
    }

    const deleteComment = async (index) => {
      const formData = {
        commentId: comments.value[index].commentId,
        userId: store.state.userId
      }
      await axios.delete(`${store.state.host}/${gameType.value}/comment`, { data: formData })
      currentPage.value = FIRST_PAGE
      getComment(FIRST_PAGE - 1)
    }

    const updateComment = (index) => {
      editComment.value = comments.value[index].content
      editTextIndex.value = index
    }

    const submitComment = async (index) => {
      if (editComment.value == '') {
        alert("댓글을 입력해주세요.")
        return
      }
      const formData = {
        commentId: comments.value[index].commentId,
        userId: store.state.userId,
        content: editComment.value
      }
      await axios.put(`${store.state.host}/${gameType.value}/comment`, formData)
      getComment(currentPage.value - 1)
    }

    onMounted(() => {
      if (route.path.includes("quiz")) gameType.value = 'quiz'
      else if (route.path.includes("timer")) gameType.value = 'timer'
      else if (route.path.includes("favorite")) gameType.value = 'favorite'
      getComment(FIRST_PAGE - 1)
    })

    return {
      sortTypeHeart,
      sortTypeTime,
      updateComment,
      changeLastPage,
      changeFirstPage,
      changePage,
      sortByHeart,
      sortByLatest,
      findEditComment,
      toggleHeart,
      handleClickCommentSubmit,
      decressePageNumber,
      increasePageNumber,
      confirmDelete,
      editTextIndex,
      uncheckedHeartIcon,
      checkedheartIcon,
      isMyComment,
      currentComment,
      comments,
      showPagination,
      showStartEllipsis,
      showEndEllipsis,
      pages,
      userNames,
      editComment,
    }
  }
}
</script>

<style>
</style>