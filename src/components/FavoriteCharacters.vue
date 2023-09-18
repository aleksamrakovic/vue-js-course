<template>
  <div class="container-fluid">
    <div v-if="favourites.length" class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
      <BaseCard
        v-for="character in favourites"
        :key="character.id"
        :character="character"
        :on-press="navigateToCharacter"
      />
    </div>
    <div v-else class="vw-100 vh-100 d-flex align-items-center justify-content-center">
      <div class="alert alert-danger" role="alert">No cards available...</div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useFavouritesStore } from '../stores/counter'
import BaseCard from '../ui/BaseCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useFavouritesStore()
const { favourites } = storeToRefs(store)

const navigateToCharacter = (characterId) => {
  router.push(`/character/${characterId}`)
}
</script>
