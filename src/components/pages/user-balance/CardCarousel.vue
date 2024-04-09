<template>
  <div class="modal">
    <div class="carousel">
      <div
        class="cards-container"
        :style="{ transform: `translateX(calc(-${currentIndex} * (100% - ${slideOffset}px)))` }"
      >
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="card"
          :style="{ width: cardWidth(index) }"
        >
          <img :src="card.image" alt="Bank Card" />
          <p>{{ card.name }}</p>
        </div>
      </div>
      <div class="dots">
        <span
          v-for="(card, index) in cards"
          :key="index"
          class="dot"
          :class="{ active: index === currentIndex }"
          @click="goToCard(index)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  cards: {
    type: Array,
    required: true
  }
})

const currentIndex = ref(0)
const slideOffset = 30 // Adjust this value to set the portion of previous and next cards shown

const goToCard = (index) => {
  currentIndex.value = index
}

const cardWidth = (index) => {
  const leftBoundary = Math.max(0, index - 1)
  const rightBoundary = Math.min(cards.length - 1, index + 1)

  if (index === currentIndex.value) {
    return `calc(100% - ${slideOffset}px)`
  } else if (index === leftBoundary || index === rightBoundary) {
    return `calc(50% - ${slideOffset / 2}px)`
  } else {
    return '0%'
  }
}
</script>

<style>
.modal {
  /* Center the modal */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  /* Add your modal styles */
}

.carousel {
  position: relative;
  overflow: hidden;
  width: 300px; /* Set your carousel width */
  height: 200px; /* Set your carousel height */
}

.cards-container {
  display: flex;
  transition: transform 0.5s ease;
}

.card {
  flex-shrink: 0;
}

.card img {
  width: 100%;
  height: auto;
}

.dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 5px;
  cursor: pointer;
}

.dot.active {
  background-color: #333;
}
</style>
