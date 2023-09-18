<template>
  <div class="col">
    <a @click="handleCardClick">
      <div class="card">
        <img :src="character.image" class="card-img-top" alt="character image" />
        <div class="card-body">
          <h5 class="card-title">{{ character.name }}</h5>
          <p class="card-text">{{ character.species }} - {{ character.status }}</p>
          <a class="btn btn-primary" @click.stop="toggleFavorite(character)">{{
            favoriteButtonText(character)
          }}</a>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup>
import { useFavouritesStore } from '../stores/counter'
import { computed } from 'vue'

const { addItem, deleteItem } = useFavouritesStore()
const { character, onPress } = defineProps(['character', 'onPress'])

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

const favoriteButtonText = computed(() => (character) => {
  return isFavorite(character) ? 'Remove from Favourites' : 'Add to Favourites'
})

const handleCardClick = () => {
  onPress(character.id)
}
</script>
