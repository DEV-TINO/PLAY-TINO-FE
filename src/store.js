import { createStore } from 'vuex';
import game from './data/gameData.js';
import axios from 'axios'

const TIMER_PORT  = 'http://13.124.245.152:8080'
const QUIZ_PORT = 'http://54.180.115.118:8080'
const FOOTERMENU = ['Contact', 'Our Team', 'Social']
const USER_ID = '3978099b-419d-46cb-a2ca-258b7f7ee535'

const store = createStore({
    state() {
        return {
            timerPort: TIMER_PORT,
            quizPort: QUIZ_PORT,
            gameData: game,
            footerMenu: FOOTERMENU,
            userId: USER_ID,
            active: 0
        }
    },
    mutations: {
      handleActive(state, i) {
        state.active = i
      }
    },
    actions: {

    }
})
export default store
