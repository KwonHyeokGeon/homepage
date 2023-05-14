<template>
  <div class="py-24 pt-48 text-center basis-full">
    <h3
      class="text-3xl font-bold mb-5 relative after:absolute after:w-8 after:h-0.5 after:bg-slate-800 after:-bottom-2 after:left-2/4 after:-translate-x-2/4">
      {{ title[3] }}</h3>
    <p class="text-gray-400">{{ desc[3] }}</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div v-for="e in gallery" :key="e" class="p-2 border rounded-md ">
        <p class="text-2xl font-bold">{{ e.title }}</p> <img :src="e.address" alt="갤러리" class="rounded-md">
        <p>{{ e.date }}</p>
      </div>
    </div>


  </div>
</template>

<script>
import data from '@/assets/Data.json'
export default {
  name: "GalleryView",
  props: {
    title: Array,
    desc: Array,
  },
  data() {
    return {
      gallery: data.gallery
    }
  },
  components: {
  }
}
</script>

<style></style>