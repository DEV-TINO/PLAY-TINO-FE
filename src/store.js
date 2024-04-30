import { createStore } from 'vuex';
import game from './data/gameData.js';

const TIMER  = 'http://13.124.245.152:8080'
const QUIZ = 'http://54.180.115.118:8080'
const FOOTERMENU = ['Contact', 'Our Team', 'Social']
const USERID = '3978099b-419d-46cb-a2ca-258b7f7ee535'

const store = createStore({
    state() {
        return {
            timerHost: TIMER,
            quizHost: QUIZ,
            MainGameData: game,
            footerMenu: FOOTERMENU,
            userId: USERID,
            MainActive: 0,
        }
    },
    mutations: {
      handleMainActive(state, i) {
        state.MainActive = i
      },
    },
    actions: {

    }
})
export default store
