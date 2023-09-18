<template>
  <header class="container-fluid my-4">
    <div class="row align-items-center">
      <div class="col-12 col-md-4 mb-2">
        <div class="btn-group" role="group" aria-label="Default button group">
          <button
            v-for="specie in species"
            :key="specie"
            type="button"
            class="btn btn-outline-primary"
            :class="{ active: specie === selectedSpecies }"
            @click="selectSpecies(specie)"
          >
            {{ specie }}
          </button>
        </div>
      </div>

      <div class="col-12 col-md-8 mb-2">
        <nav class="navbar navbar-expand-lg p-0">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Search by name..."
              aria-label="Name"
              aria-describedby="button-addon2"
              v-model="nameFilter"
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              @click="performSearch"
            >
              Search
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>

  <div class="container-fluid">
    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
      <BaseCard
        v-for="character in characters"
        :key="character.id"
        :character="character"
        :on-press="navigateToCharacter"
      />
    </div>
  </div>
  <div class="container-fluid my-4">
    <nav aria-label="...">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: pageNumber === 1 }">
          <a class="page-link" @click="previousPage" :disabled="pageNumber === 1">Previous</a>
        </li>
        <li class="page-item">
          <a class="page-link">{{ pageNumber }} / {{ totalPages }}</a>
        </li>
        <li class="page-item" :class="{ disabled: pageNumber === totalPages }">
          <a class="page-link" @click="nextPage" :disabled="pageNumber === totalPages">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import axios from 'axios'
import BaseCard from '../ui/BaseCard.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const characters = ref([])
const pageNumber = ref(1)
const totalPages = ref(0)
const nameFilter = ref('')
const species = ref(['all', 'human', 'animal', 'alien'])
const selectedSpecies = ref('')

const fetchCharacters = async () => {
  try {
    const list = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${pageNumber.value}&name=${nameFilter.value}&species=${selectedSpecies.value}`
    )
    totalPages.value = list.data.info.pages
    characters.value = list.data.results
  } catch (error) {
    console.error(error)
  }
}

const nextPage = () => {
  if (pageNumber.value < totalPages.value) {
    pageNumber.value++
    fetchCharacters()
  }
}

const previousPage = () => {
  if (pageNumber.value > 1) {
    pageNumber.value--
    fetchCharacters()
  }
}

const navigateToCharacter = (characterId) => {
  // Assuming this is within a Vue Router setup
  router.push(`/character/${characterId}`)
}

const performSearch = () => {
  fetchCharacters()
}

const selectSpecies = (specie) => {
  selectedSpecies.value = specie === 'all' ? '' : specie
  fetchCharacters()
}

onMounted(async () => {
  await fetchCharacters()
})
</script>
