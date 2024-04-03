import { createStore } from "vuex";
import game from './data/gameData.js';

const FOOTERMENU = ['Contact', 'Our Team', 'Social']

export default createStore({
  state: {
    gameData: game,
    footerMenu: FOOTERMENU,
    active: 0
  },
  mutations: {
    handleActive(state, i) {
      state.active = i
    }
  },
  actions: {

  }
})