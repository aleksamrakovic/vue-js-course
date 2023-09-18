<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">Characters</RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav w-100">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/favourites">Favourites</RouterLink>
            </li>
            <li class="nav-item ms-auto">
              <RouterLink class="nav-link" to="/favourites">
                <i class="fa-regular fa-heart"></i>
                {{ favourites.length }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useFavouritesStore } from '../stores/counter'
import { storeToRefs } from 'pinia'

const store = useFavouritesStore()

const { favourites } = storeToRefs(store)
</script>
