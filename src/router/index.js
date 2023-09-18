import { createRouter, createWebHistory } from 'vue-router'
import CharacterList from '../components/CharacterList.vue'
import CharacterDetail from '../components/CharacterDetail.vue'
import FavoriteCharacters from '../components/FavoriteCharacters.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        return {
          path: '/character'
        }
      }
    },
    { path: '/character', component: CharacterList },
    { path: '/character/:id', component: CharacterDetail },
    { path: '/favourites', component: FavoriteCharacters }
  ]
})

export default router
