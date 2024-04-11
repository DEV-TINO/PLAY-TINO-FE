import { createStore } from 'vuex';
import axios from 'axios'

const TIMER_PORT  = 'http://13.124.245.152:8080'
const QUIZ_PORT = 'http://54.180.115.118:8080'

const store = createStore({
    state() {
        return {
            timerPort: TIMER_PORT,
            quizPort: QUIZ_PORT,
        }
    }
})

export default store