<template>
	<div class="w-full h-full bg-modal-background bg-opacity-50 fixed flex justify-center items-center z-50">
		<div class="bg-white rounded-3xl">
			<div class="flex flex-col items-center pt-10 pb-10 pr-32 pl-32 m-4 border-2 border-favorite-theme rounded-3xl">
				<div class="text-5xl font-extrabold text-favorite-theme mb-5">고냥이 월드컵!</div>
				<div class="text-2xl font-bold text-favorite-theme mb-2">당신의 1등 고양이는</div>
				<div class="flex flex-col items-center mb-5">
					<div class="w-72 h-72 overflow-hidden border-4 border-favorite-theme mb-2">
						<img class="w-full h-full aspect-w-1 aspect-h-1 object-cover" :src="`${this.$store.state.favoriteFinalImage}`" />
					</div>
					<div class="text-xl font-semibold text-primary">{{ this.$store.state.favoriteFinalTitle }}</div>
				</div>
				<div class="flex items-center justify-between">
					<div @click="handleRouterRank()" class="bg-favorite-theme text-white border-favorite-theme border-2 pr-5 pl-5 pt-1 pb-1 rounded-lg flex justify-center font-bold text-lg cursor-pointer">확인</div>
					<div @click="reloadPage()" class="bg-white border-favorite-theme border-2 pr-4 pl-4 pt-1 pb-1 mr-2 ml-2 rounded-lg text-favorite-theme font-bold text-xl cursor-pointer">다시하기</div>
					<div @click="handleRouterMain()" class="bg-white border-favorite-theme border-2 pr-4 pl-4 pt-1 pb-1 rounded-lg text-favorite-theme font-bold text-xl cursor-pointer">메인으로</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		handleRouterMain() {
			this.$router.push(`/`)
		},
		handleRouterRank() {
			this.$router.push(`/favorite-statistic`)
		},
		reloadPage() {
			this.$store.state.roundFinish = false
			this.$router.go(0)
			this.$store.commit('resetFavoriteRoundFinish')
    	this.$store.dispatch('getFavoriteData')
		}
	}
}
</script>

<style>
</style>
