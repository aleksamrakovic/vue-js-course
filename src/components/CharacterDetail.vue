<template>
  <div v-if="character" class="card border-0 text-center my-4">
    <img :src="character.image" class="card-img-top rounded-circle w-25 mx-auto" alt="character" />
    <div class="card-body mt-4">
      <h5 class="card-title">{{ character.name }}</h5>
      <p class="card-text">{{ character.species }} - {{ character.status }}</p>
      <p class="card-text">Last known location - {{ character.location.name }}</p>
      <p class="card-text">First seen in episode - {{ character.episode[0] }}</p>

      <a class="btn btn-primary" @click.stop="toggleFavorite(character)">{{
        favoriteButtonText(character)
      }}</a>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { useFavouritesStore } from '../stores/counter'
import { useRoute } from 'vue-router'

const route = useRoute()
const character = ref(null)
const store = useFavouritesStore()
const { addItem, deleteItem } = store

const fetchCharacter = async () => {
  try {
    const { id } = route.params
    const char = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
    character.value = char.data
  } catch (error) {
    // log error
  }
}

const toggleFavorite = (character) => {
  if (isFavorite(character)) {
    deleteItem(character.id)
  } else {
    addItem(character)
  }
}

const isFavorite = (character) => {
  const store = useFavouritesStore()
  const { favourites } = store
  return favourites.some((favCharacter) => favCharacter.id === character.id)
}

onMounted(async () => {
  await fetchCharacter()
})

const favoriteButtonText = computed(() => (character) => {
  return isFavorite(character) ? 'Remove from Favourites' : 'Add to Favourites'
})
</script>
