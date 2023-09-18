import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavouritesStore = defineStore(
  'favourites',
  () => {
    const favourites = ref([])
    function addItem(item) {
      favourites.value.push(item)
    }
    function deleteItem(id) {
      favourites.value = favourites.value.filter((el) => el.id !== id)
    }

    return {
      favourites,
      addItem,
      deleteItem
    }
  },
  {
    persist: true
  }
)
