import axios from 'axios';
import { createStore } from 'vuex';
import game from './data/gameData.js';

const TIMER  = 'http://13.124.245.152:8080'
const QUIZ = 'http://54.180.115.118:8080'
const FOOTERMENU = ['Contact', 'Our Team', 'Social']
const FAVORITE = 'http://43.201.78.161:8080'
const USERID = '3978099b-419d-46cb-a2ca-258b7f7ee535'

export default createStore({
  state: {
    timerHost: TIMER,
    quizHost: QUIZ,
    gameData: game,
    footerMenu: FOOTERMENU,
    userId: USERID,
    active: 0,
    MainGameData: game,
    footerMenu: FOOTERMENU,
    MainActive: 0,
    favoriteHost: FAVORITE,
    favoriteList: [],
    favoriteGameId: '',
    favoriteSelectedImg: '',
    favoriteGameRound: '16강',
    favoriteRoundFinish: false,
    favoriteRankData: [],
    favoriteRankPage: 1,
    favoriteRankMaxPage: 0,
    favoriteRankTotal: 0,
    favoriteCommentType: 'uploadTime',
    favoriteCommentPage: 1,
    favoriteFinalImage: '',
    favoriteFinalTitle: '',
    favoriteImagePairs: [],
    favoriteCurrentPairIndex: 0,
    favoriteSelectedPairs: [],
    favoriteRanksPerPage: 3,
    favoriteImagePair: 2,
  },
  mutations: {
    handleMainActive(state, i) {
      state.MainActive = i
    },
    selectFavoriteRankPage(state, i) {
      state.favoriteRankPage = i
    },
    setFavoriteRoundFinish(state) {
      state.favoriteRoundFinish = true
    },
    resetFavoriteRoundFinish(state) {
      state.favoriteRoundFinish = false
    },
    setSelectFavoriteImgIndex(state, index) {
      state.favoriteSelectedImg = index
    },
    resetFavoriteSelectedImg(state) {
      state.favoriteSelectedImg = ''
    },
    resetFavoriteCommentType(state) {
      state.favoriteCommentType = 'uploadTime'
    },
    loadNextPair(state) {
      state.favoriteCurrentPairIndex++;
      if (state.favoriteCurrentPairIndex >= state.favoriteImagePairs.length) {
        state.favoriteCurrentPairIndex = 0
      }
      state.favoriteSelectedImg = ''
    },
    calculateGameRound(state) {
      const totalPairs = state.favoriteImagePairs.length
      if (totalPairs === 8) {
        state.favoriteGameRound = '16강'
      } else if (totalPairs === 4) {
        state.favoriteGameRound = '8강'
      } else if (totalPairs === 2) {
        state.favoriteGameRound = '4강'
      } else if (totalPairs === 1) {
        state.favoriteGameRound = '결승'
      } else {
        state.favoriteGameRound = ''
      }
    },
    updateFavoriteImagePairs(state, imagePairs) {
      state.favoriteImagePairs = imagePairs
    },
    addToFavoriteSelectedPairs(state, selectedImageData) {
      state.favoriteSelectedPairs.push(selectedImageData)
    },
  },
  actions: {
    handleActive(state, i) {
      state.active = i
    },
    async getFavoriteData(context) {
      const res = await axios.get(`${context.state.favoriteHost}/favorite/start/user/${context.state.userId}`);
      context.state.favoriteList = res.data.favoriteList
      context.state.favoriteGameId = res.data.gameId
  
      context.dispatch('generateImagePairs')
    },
    async setFavoriteRankMax(context) {
      const res = await axios.get(`${context.state.favoriteHost}/favorite/rank/all?page=${context.state.favoriteRankPage}`)
      context.state.favoriteRankTotal = res.data.favoriteRankTotal

      const result = context.state.favoriteRankTotal % context.state.favoriteRanksPerPage

      if(result != 0) {
        context.state.favoriteRankMaxPage = parseInt(context.state.favoriteRankTotal / context.state.favoriteRanksPerPage)
      } else {
        context.state.favoriteRankMaxPage = parseInt(context.state.favoriteRankTotal / context.state.favoriteRanksPerPage) - 1
      }
    },
    async getFavoriteRank(context, pageNum) {
      if(pageNum == 'prev') {
        if(context.state.favoriteRankPage - 1 < 1) {
          alert('첫 번째 페이지입니다.')
        } else {
          context.commit('selectFavoriteRankPage', context.state.favoriteRankPage - 1)
          const res = await axios.get(`${context.state.favoriteHost}/favorite/rank/all?page=${context.state.favoriteRankPage}`)
          context.state.favoriteRankData = res.data.rankList
        }
      } else if(pageNum == 'next') {
        if(context.state.favoriteRankPage + 1 > context.state.favoriteRankMaxPage) {
          alert('마지막 페이지입니다.')
        } else {
          context.commit('selectFavoriteRankPage', context.state.favoriteRankPage + 1)
          const res = await axios.get(`${context.state.favoriteHost}/favorite/rank/all?page=${context.state.favoriteRankPage}`)
          context.state.favoriteRankData = res.data.rankList
        }
      } else if(pageNum == 'first') {
        if(context.state.favoriteRankPage - 1 < 1) {
          alert('첫 번째 페이지입니다.')
        } else {
          context.commit('selectFavoriteRankPage', 1)
          const res = await axios.get(`${context.state.favoriteHost}/favorite/rank/all?page=${context.state.favoriteRankPage}`)
          context.state.favoriteRankData = res.data.rankList
        }
      } else if(pageNum == 'last') {
        if(context.state.favoriteRankPage + 1 > context.state.favoriteRankMaxPage) {
          alert('마지막 페이지입니다.')
        } else {
          context.commit('selectFavoriteRankPage', context.state.favoriteRankMaxPage)
          const res = await axios.get(`${context.state.favoriteHost}/favorite/rank/all?page=${context.state.favoriteRankPage}`)
          context.state.favoriteRankData = res.data.rankList
        }
      } else {
        context.commit('selectFavoriteRankPage', pageNum)
        const res = await axios.get(`${context.state.favoriteHost}/favorite/rank/all?page=${context.state.favoriteRankPage}`)
        context.state.favoriteRankData = res.data.rankList
      }
    },
    selectFavoriteImgIndex(context, index) {
      context.commit('setSelectFavoriteImgIndex', index)
      context.dispatch('handleSelectedImage')
    },
    async handleSelectedImage(context) {
      const selectedImgIndex = context.state.favoriteSelectedImg
      const selectedPair = context.state.favoriteImagePairs[context.state.favoriteCurrentPairIndex]
      const selectedImageId = selectedImgIndex === 0 ? selectedPair.id1 : selectedPair.id2
      const selectedImage = selectedImgIndex === 0 ? selectedPair.image1 : selectedPair.image2
      const selectedImageTitle = selectedImgIndex === 0 ? selectedPair.title1 : selectedPair.title2
    
      const selectedImageData = {
        id: selectedImageId,
        image: selectedImage,
        title: selectedImageTitle
      }
    
      context.commit('addToFavoriteSelectedPairs', selectedImageData)
    
      const totalPairs = context.state.favoriteImagePairs.length
      const selectedPairsCount = context.state.favoriteSelectedPairs.length
  
      if (totalPairs === 8 && selectedPairsCount === 8) {
        context.dispatch('advanceToNextRound')
      } else if (totalPairs === 4 && selectedPairsCount === 4) {
        context.dispatch('advanceToNextRound')
      } else if (totalPairs === 2 && selectedPairsCount === 2) {
        context.dispatch('advanceToNextRound')
      } else if (totalPairs === 1 && selectedPairsCount === 1) {
        context.dispatch('advanceToNextRound')
      } else {
        context.dispatch('preloadNextImagePairs')
      }
    },      
    async advanceToNextRound(context) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const selectedPairs = context.state.favoriteSelectedPairs
      const newPairs = []
      let finalPair = ''
      
      if (context.state.favoriteGameRound !== '결승') {
        for (let i = 0; i < selectedPairs.length; i += 2) {
          const pair = {
            id1: selectedPairs[i].id,
            id2: selectedPairs[i + 1].id,
            image1: selectedPairs[i].image,
            image2: selectedPairs[i + 1].image,
            title1: selectedPairs[i].title,
            title2: selectedPairs[i + 1].title
          }
          newPairs.push(pair)
        }
      } else {
        finalPair = context.state.favoriteSelectedPairs
      }

      context.dispatch('selectFavoriteImgIndex', -1)
      context.commit('updateFavoriteImagePairs', newPairs)
      context.commit('calculateGameRound')

      const totalPairs = context.state.favoriteImagePairs.length
      context.state.favoriteSelectedPairs = []

      if (totalPairs === 0) {
        context.dispatch('saveFinalSelectedImage', finalPair)
      } else {
        context.dispatch('preloadNextImagePairs')
      }
    },
    async loadNextPairWithDelay(context) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      context.commit('loadNextPair')
    },
    async generateImagePairs(context) {
      const imagePairs = [];
      
      context.state.favoriteList.forEach((item, index) => {
        if (index % context.state.favoriteImagePair === 0) {
          const pair = {
            id1: item?.favoriteId,
            id2: context.state.favoriteList[index + 1]?.favoriteId,
            image1: item?.favoriteImage,
            image2: context.state.favoriteList[index + 1]?.favoriteImage,
            title1: item?.favoriteTitle,
            title2: context.state.favoriteList[index + 1]?.favoriteTitle,
          }
          imagePairs.push(pair)
        }
      })
    
      context.commit('updateFavoriteImagePairs', imagePairs)
      context.commit('calculateGameRound')
    },
    async saveFinalSelectedImage(context, finalPair) {
      const selected = finalPair[0]
      const finalId = selected.id
      const finalImage = selected.image
      const finalImageTitle = selected.title
    
      const finalData = {
        finalId,
        finalImage,
        finalImageTitle
      }

      context.state.favoriteFinalImage = finalData.finalImage
      context.state.favoriteFinalTitle = finalData.finalImageTitle
      
      context.dispatch('postFavoriteRank', finalData.finalId)
    },
    async postFavoriteRank(context, favoriteId) {
      const rank = {
        "gameId": context.state.favoriteGameId,
        "favoriteId": favoriteId
      }
      const res = await axios.post(`${context.state.favoriteHost}/favorite/rank`, rank)
      context.commit('setFavoriteRoundFinish')
    },
    async preloadNextImagePairs(context) {
      const nextImagePairs = context.state.favoriteImagePairs.slice(
        context.state.favoriteCurrentPairIndex + 1,
        context.state.favoriteCurrentPairIndex + 3
      )
    
      const imageUrlsToPreload = []
      nextImagePairs.forEach(pair => {
        imageUrlsToPreload.push(pair.image1)
        imageUrlsToPreload.push(pair.image2)
      })
    
      const preloadPromises = []
      imageUrlsToPreload.forEach(imageUrl => {
        preloadPromises.push(
          new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve
            img.onerror = reject
            img.src = imageUrl
          })
        )
      })
      
      context.dispatch('loadNextPairWithDelay')
    },
  }
})