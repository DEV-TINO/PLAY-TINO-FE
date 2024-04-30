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
  { path: "/comment",
  component: () => import("./components/CommentPage.vue")},
  { path: "/favorite-statistic",
  component: () => import('./components/FavoriteStatisticPage.vue')},
  { path: "/timer-statistic",
  component: () => import("./components/TimerStatisticPage.vue")},
  { path: "/quiz-statistic",
  component: () => import("./components/QuizStatisticPage.vue")},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;