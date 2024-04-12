<template>
  <div class="flex flex-col min-h-screen w-full bg-primary">
    <div class="w-full h-14 min-h-8 flex items-center">
      <div class="text-white text-xl pl-4">Comment</div>
    </div>
    <hr class="w-full h-px bg-white">
    <div class="w-full h-10 min-h-10 flex justify-end items-center gap-3 lg:gap-5 px-4 lg:px-6 pt-0 md:pt-2 lg:pt-4 min-w-36 text-base md:text-lg lg:text-xl">
      <div class="text-white font-semibold">추천순</div>
      <div class="text-quiz-box">최신순</div>
    </div>
    <div class="w-full h-30 flex justify-center items-start bg-primary py-2 md:py-5">
      <div class="w-10/12">
        <div class="bg-white w-full h-auto rounded-xl py-3 px-7 flex justify-center items-center min-w-72">
          <input type="text" v-model="currentComment" placeholder="댓글을 입력해주세요 (최대 300자)" class="w-full resize-none overflow-hidden text-lg md:text-2xl" @keyup.enter="handleClickCommentSubmit()" />
          <div class="text-gray-300 text-3xl" @click="handleClickCommentSubmit()">
            <font-awesome-icon :icon="['fas', 'circle-chevron-up']" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-full items-start bg-primary flex justify-center">
      <div class="w-10/12">
        <div v-for="(comment, index) in this.comments" :key="index" class="bg-white w-full h-auto rounded-xl py-3 my-3 items-center px-7 min-w-72">
          <div class="px-0.5 flex gap-3 items-end">
            <div class="text-primary font-extrabold text-lg md:text-2xl">alswlfjddl</div>
            <div class="text-quiz-box text-base md:text-lg">{{ comment.uploadTime }}</div>
          </div>
          <div class="text-lg text-primary md:text-2xl pt-0 md:pt-1">{{ comment.content }}</div>
          <div class="flex justify-end items-center gap-1 text-quiz-theme">
          <div class="text-sm md:text-lg">{{ comment.heartCount }}</div>
          <font-awesome-icon class="text-base md:text-xl" :icon="heartIcon" @click="addHeart(index)"/>
          <!-- <font-awesome-icon class="text-base md:text-xl" :icon="heartIcon" @mouseenter="heartIcon = ['fas', 'heart']" @mouseleave="heartIcon = (isHeart == false) ? ['far', 'heart'] : heartIcon" @click="addHeart(index)"/> -->
          </div>
        </div>
        <div class="flex items-center justify-center gap-2 md:gap-3 lg:gap-4 text-sm md:text-lg lg:text-xl">
          <font-awesome-icon class="text-white text-base" :icon="['fas', 'angle-left']" @click="decressePageNumber()"/>
          <div v-for="(page, pageNumber) in pageCount" :key="pageNumber" :class="{ 'font-bold text-white': currentPage == pageNumber + 1, 'font-bold text-gray-400': currentPage != pageNumber + 1 }" @click="changePage(pageNumber + 1)">
            <div v-if="currentPage != pageNumber + 1">{{ pageNumber + 1 }}</div>
            <u v-if="currentPage == pageNumber + 1">{{ pageNumber + 1 }}</u>
          </div>
          <font-awesome-icon class="text-white text-base":icon="['fas', 'angle-right']" @click="increasePageNumber()"/>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios'
export default {
  data() {
    return {
      host: '',
      gameType: '',
      heartIcon: ['far', 'heart'],
      isHeart: false,
      comments: [],
      currentComment: '',
      totalComment: 0,
      currentPage: 1,
      itemsPerPage: 10,

    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalComment / this.itemsPerPage)
    },
    currentPageData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      return this.rankData.slice(startIndex, endIndex)
    }
  },
  methods: {
    async getComment(pageNumber) {
      const commentResponse = await axios.get(`${this.host}/${this.gameType}/comment/all/user/3978099b-419d-46cb-a2ca-258b7f7ee535/heartCount?page=${pageNumber ?? 0}`)
      this.comments = commentResponse.data.commentList
      this.totalComment = commentResponse.data.commentTotal
      for (let i=0; i<this.comments.length; i++) {
        this.comments[i].uploadTime = new Date(this.comments[i].uploadTime)
        this.comments[i].uploadTime = `${this.comments[i].uploadTime.getFullYear()}.${(this.comments[i].uploadTime.getMonth() + 1).toString().padStart(2, '0')}.${this.comments[i].uploadTime.getDate().toString().padStart(2, '0')} ${this.comments[i].uploadTime.getHours().toString().padStart(2, '0')}:${this.comments[i].uploadTime.getMinutes().toString().padStart(2, '0')}`
      }
    },
    async addHeart(index) {
      console.log("[addHeart] comment :", this.comments)
      console.log(this.comment[index].content)
      const formData = {
        commentId: this.comments[index].commentId,
        userId: "3978099b-419d-46cb-a2ca-258b7f7ee535"
      }
      const response = await axios.post(`${this.host}/${this.gameType}/comment-heart`, formData)
      if(!response.data.success) {
        this.removeHeart(index)
      }
    },
    async removeHeart(index) {
      const formData = {
        commentId: this.comments[index].commentId,
        userId: "3978099b-419d-46cb-a2ca-258b7f7ee535"
      }
      const response = await axios.delete(`${this.host}/${this.gameType}/comment-heart`, formData)
      if(!response.data.success) {
        alert("하트를 취소하는 중 에러가 발생했습니다")
      }
    },
    async handleClickCommentSubmit() {
      const formData = {
        userId: "3978099b-419d-46cb-a2ca-258b7f7ee535",
        content: String(this.currentComment)
      }
      const submitCommentResponse = await axios.post(`${this.host}/${this.gameType}/comment`, formData)
      if (!submitCommentResponse.data) {
        throw "Save comment error"
      }
      console.log("[Save comment] success")
      this.currentComment = ''
      this.getComment()
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
    }
  },
  mounted() {
    if (this.$route.path.includes("quiz")) {
      this.host = this.$store.state.quizPort
      this.gameType = 'quiz'
    } else if (this.$route.path.includes("timer")) {
      this.host = this.$store.state.timerPort
      this.gameType = 'timer'
    }
    this.getComment()
  }
}
</script>

<style>
</style>