<template>
  <div class="flex flex-col min-h-screen w-full bg-primary">
    <div class="w-full h-14 min-h-8 flex items-center">
      <div class="text-white text-xl pl-4 select-none">Comment</div>
    </div>
    <hr class="w-full h-px bg-white">
    <div class="w-full h-10 min-h-10 flex justify-end items-center gap-3 lg:gap-5 px-4 lg:px-6 pt-0 md:pt-2 lg:pt-4 min-w-36 text-base md:text-lg lg:text-xl select-none">
      <div :class="sortTypeHeart()" @click="sortByHeart()">추천순</div>
      <div :class="sortTypeTime()" @click="sortByLatest()">최신순</div>
    </div>
    <div class="w-full h-30 flex justify-center items-start bg-primary py-2 md:py-5">
      <div class="w-10/12">
        <div class="bg-white w-full h-auto rounded-xl py-3 px-7 flex justify-center items-center min-w-72 gap-4">
          <input type="text" v-model="currentComment" placeholder="댓글을 입력해주세요 (최대 200자)" class="w-full resize-none overflow-hidden text-lg md:text-2xl" @keyup.enter="handleClickCommentSubmit()" />
          <div class="text-gray-300 text-3xl cursor-pointer select-none" @click="handleClickCommentSubmit()">
            <font-awesome-icon :icon="['fas', 'circle-chevron-up']" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-full items-start bg-primary flex justify-center">
      <div class="w-10/12">
        <div v-for="(comment, index) in this.comments" :key="index" class="bg-white w-full h-auto rounded-xl py-3 my-3 items-center px-7 min-w-72">
          <div class="flex justify-between">
            <div class="px-0.5 flex gap-2 items-end select-none">
              <div class="text-primary font-extrabold text-lg md:text-2xl">alswlfjddl</div>
              <div class="text-quiz-box text-base md:text-lg">{{ comment.uploadTime }}</div>
            </div>
            <div v-if="findEditComment(index)" class="text-primary text-base md:text-lg select-none cursor-pointer" @click="submitComment(index)">완료</div>
            <div v-else>
              <div v-if="isMyComment[index]" class="flex gap-2 select-none">
                <div class="text-primary text-base md:text-lg cursor-pointer" @click="updateComment(index)">수정</div>
                <div class="text-quiz-box text-base md:text-lg cursor-pointer" @click="confirmDelete(index)">삭제</div>
              </div>
            </div>
          </div>
          <div class="flex place-content-between pb-2 items-end">
            <textarea v-if="editTextIndex == index" type="text" v-model="editComment" class="bg-gray-100 mt-1 rounded-lg w-full resize-none text-lg md:text-2xl" @keyup.enter="handleClickCommentSubmit(index)"></textarea>
            <div v-else class="text-lg text-primary md:text-2xl pt-0 md:pt-1 select-none">{{ comment.content }}</div>
            <div class="flex justify-end items-center pl-4 gap-1 text-quiz-theme select-none">
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
          <div v-if="showEndEllipsis" class="text-white font-bold px-1 text-base cursor-pointer" @click="changeLastPage()">{{ this.pageCount }}</div>
          <font-awesome-icon class="text-white font-bold text-base px-1 cursor-pointer" :icon="['fas', 'angle-right']" @click="increasePageNumber()"/>
          <font-awesome-icon class="text-white font-bold text-base px-1 cursor-pointer" :icon="['fas', 'angle-double-right']" @click="changeLastPage()"/>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
const FIRST_PAGE = 1
const EDIT_FINISHED = -1
const ELLIPSIS_NEED = 6
import axios from 'axios'
export default {
  data() {
    return {
      host: '',
      gameType: '',
      checkedheartIcon: ['fas', 'heart'],
      uncheckedHeartIcon: ['far', 'heart'],
      isHeart: false,
      comments: [],
      currentComment: '',
      totalComment: 0,
      currentPage: 1,
      itemsPerPage: 10,
      sortType: 'heart',
      isMyComment: [],
      pages: [],
      showStartEllipsis: false,
      showEndEllipsis: false,
      showPagination: true,
      editTextIndex: EDIT_FINISHED,
      editComment: '',
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalComment / this.itemsPerPage)
    },
  },
  methods: {
    async getComment(pageNumber) {
      this.editTextIndex = EDIT_FINISHED
      const commentResponse = await axios.get(`${this.host}/${this.gameType}/comment/all/user/${this.$store.state.userId}/${this.sortType}?page=${pageNumber ?? 0}`)
      this.comments = commentResponse.data.commentList
      this.totalComment = commentResponse.data.commentTotal
      const newComments = this.comments.map((comment) => {
        const uploadTime = new Date(comment.uploadTime)
        comment.uploadTime = `${uploadTime.getFullYear()}.${(uploadTime.getMonth() + 1).toString().padStart(2, '0')}.${uploadTime.getDate().toString().padStart(2, '0')} ${uploadTime.getHours().toString().padStart(2, '0')}:${uploadTime.getMinutes().toString().padStart(2, '0')}`
        return comment
      }).filter((comment) => comment)
      this.comments = newComments
      this.isMyComment = []
      this.comments.forEach((comment, i) => {
        if (this.$store.state.userId == comment.userId) {
          this.isMyComment[i] = true
        } else {
          this.isMyComment[i] = false
        }
      });
      if(this.pageCount == FIRST_PAGE) {
        this.showPagination = false
      } else if (this.pageCount < ELLIPSIS_NEED) {
        this.pages = this.createArray(this.pageCount)
        this.showStartEllipsis = false
        this.showEndEllipsis = false
        return
      } else if(this.currentPage == FIRST_PAGE) {
        this.pages = [FIRST_PAGE, FIRST_PAGE + 1, FIRST_PAGE + 2]
        this.showPagination = true
      } else if(this.currentPage == this.pageCount) {
        this.pages = [this.pageCount - 2, this.pageCount - 1, this.pageCount]
        this.showPagination = true
      } else if(this.currentPage > 3 || this.pageCount - 2) {
        this.pages = [this.currentPage - 1, this.currentPage, this.currentPage + 1]
        this.showPagination = true
      }
      this.showStartEllipsis = this.currentPage > 2
      this.showEndEllipsis = this.currentPage < (this.pageCount - 1)
    },
    createArray(n) {
      return Array.from({ length: n }, (v, i) => i + 1)
    },
    sortTypeHeart() {
      if (this.sortType == 'heart') {
        return 'text-sort-type font-semibold cursor-pointer'
      }
      else return 'text-gray-400 cursor-pointer'
    },
    sortTypeTime() {
      if (this.sortType == 'time') {
        return 'text-sort-type font-semibold cursor-pointer'
      }
      else return 'text-gray-400 cursor-pointer'
    },
    async toggleHeart(comment) {
      if (!comment) throw 'Comment is null or undefined'
      if (this.$store.state.userId == comment.userId) {
        alert("자신의 댓글에 좋아요를 누를 수 없습니다")
        return
      }
      const formData = {
        commentId: comment.commentId,
        userId: this.$store.state.userId
      }
      if (comment.userHeart) { 
        const response = await axios.delete(`${this.host}/${this.gameType}/comment-heart`, {data: formData})
      } else{
        const response = await axios.post(`${this.host}/${this.gameType}/comment-heart`, formData)
      }
      comment.userHeart = !comment.userHeart
      comment.heartCount += comment.userHeart ? 1 : -1
      this.getComment(this.currentPage - 1)
    },
    async handleClickCommentSubmit(index) {
      if (this.editTextIndex == EDIT_FINISHED) {
        if (this.currentComment == '') {
          alert("댓글을 입력해주세요.")
          return
        }
        const formData = {
          userId: this.$store.state.userId,
          content: String(this.currentComment)
        }
        const submitCommentResponse = await axios.post(`${this.host}/${this.gameType}/comment`, formData)
        if (!submitCommentResponse.data) {
          throw "Save comment error"
        }
        this.currentComment = ''
        this.currentPage = FIRST_PAGE
        this.getComment(FIRST_PAGE - 1)
      }
      else this.submitComment(index)
    },
    sortByLatest() {
      this.sortType = 'time'
      this.getComment(this.currentPage - 1)
    },
    sortByHeart() {
      this.sortType = 'heart'
      this.getComment(this.currentPage - 1)
    },
    findEditComment(index) {
      if (this.isMyComment[index] && (this.editTextIndex == index)) return true
      return false
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber
      this.getComment(this.currentPage - 1)
    },
    decressePageNumber() {
      if (this.currentPage > 1) {
        this.currentPage -= 1
        this.getComment(this.currentPage - 1)
      }
    },
    increasePageNumber() {
      if (this.currentPage < this.pageCount) {
        this.currentPage += 1
        this.getComment(this.currentPage - 1)
      }
    },
    changeFirstPage() {
      this.currentPage = 1
      this.getComment(this.currentPage - 1)
    },
    changeLastPage() {
      this.currentPage = this.pageCount
      this.getComment(this.currentPage - 1)
    },
    confirmDelete(index) {
      if (confirm("댓글을 삭제하시겠습니까?")) {
        this.deleteComment(index)
      }
    },
    async deleteComment(index) {
      const formData = {
        commentId: this.comments[index].commentId,
        userId: this.$store.state.userId
      }
      const response = await axios.delete(`${this.host}/${this.gameType}/comment`, {data: formData})
      this.currentPage = FIRST_PAGE
      this.getComment(FIRST_PAGE - 1)
    },
    async updateComment(index) {
      this.editComment = this.comments[index].content
      this.editTextIndex = index
    },
    async submitComment(index) {
      if (this.editComment == '') {
        alert("댓글을 입력해주세요.")
        return
      }
      const formData = {
        commentId: this.comments[index].commentId,
        userId: this.$store.state.userId,
        content: this.editComment
      }
      const response = await axios.put(`${this.host}/${this.gameType}/comment`, formData)
      this.getComment(this.currentPage - 1)
    }
  },
  mounted() {
    if (this.$route.path.includes("quiz")) {
      this.host = this.$store.state.quizHost
      this.gameType = 'quiz'
    } else if (this.$route.path.includes("timer")) {
      this.host = this.$store.state.timerHost
      this.gameType = 'timer'
    } else if (this.$route.path.includes("favorite")) {
      this.host = this.$store.state.favoriteHost
      this.gameType = 'favorite'
    }
    this.getComment(FIRST_PAGE - 1)
  }
}
</script>

<style>
</style>