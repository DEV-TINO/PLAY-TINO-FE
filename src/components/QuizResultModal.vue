<template>
	<div class="w-full h-full bg-modal-background bg-opacity-50 fixed flex justify-center items-center z-50">
		<div class="bg-white rounded-3xl">
			<div class="flex flex-col items-center pt-10 pb-10 pr-32 pl-32 m-4 border-5 border-quiz-theme rounded-3xl">
				<div class="text-5xl font-extrabold text-quiz-theme py-3">퀴즈를 맞춰라!</div>
				<div class="text-2xl font-bold text-quiz-theme pt-4">축하드려요!</div>
        <div class="text-2xl font-bold text-quiz-theme pb-2">랭킹에 오르셨어요</div>
        <div class="flex py-4">
          <div class="text-3xl font-bold mb-2 text-primary">기록은?</div>
        </div>
        <div class="flex flex-col items-center mb-5">
          <div class="flex gap-4 items-center">
            <div class="text-2xl font-bold text-quiz-theme">상식</div>
            <div class="text-primary text-xl font-semibold">{{ this.commonCorrect }} 문제</div>
          </div>
          <div class="flex gap-4 py-3 items-center">
            <div class="text-2xl font-bold text-quiz-theme">넌센스</div>
            <div class="text-primary text-xl font-semibold">{{ this.nonsenseCorrect }} 문제</div>
          </div>
        </div>
				<div class="flex items-center gap-4">
					<div @click="reload()" class="bg-white border-quiz-theme border-2 pr-4 pl-4 pt-1 pb-1 rounded-lg text-quiz-theme font-bold text-xl cursor-pointer">다시하기</div>
          <div @click="handleRouterRank()" class="bg-quiz-theme text-white border-quiz-theme border-2 pr-5 pl-5 pt-1 pb-1 rounded-lg flex justify-center font-bold text-xl cursor-pointer">확인</div>
					<div @click="handleRouterMain()" class="bg-white border-quiz-theme border-2 pr-4 pl-4 pt-1 pb-1 rounded-lg text-quiz-theme font-bold text-xl cursor-pointer">메인으로</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    commonCorrect: Number,
    nonsenseCorrect: Number,
  },
	methods: {
		handleRouterMain() {
			this.$router.push(`/`)
		},
		handleRouterRank() {
			this.$router.push(`/quiz-statistic`)
		},
    reload() {
      window.location.reload()
    }
  },
}
</script>

<style>
</style>