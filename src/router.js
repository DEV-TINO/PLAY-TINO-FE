import { createWebHistory, createRouter } from "vue-router";

const routes = [
    { path: "/",
    component: () => import("./components/MainPage.vue")},
    { path: "/timer",
    component: () => import("./components/TimerPage.vue")},
    { path: "/quiz",
    component: () => import("./components/QuizPage.vue")},
    { path: "/favorite",
    component: () => import("./components/FavoritePage.vue")},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;