<template>
  <div
    class="w-full py-24 text-center text-white bg-[url('https://via.placeholder.com/1920x960/007')] bg-fixed bg-cneter">
    <div class="mb-6" ref="content">
      <h3 class="text-2xl uppercase">different</h3>
      <p class="opacity-90">제목에 관한 부가설명</p>
    </div>
    <div class="max-w-7xl mx-auto pt-12 px-[2%]">
      <ul class="flex justify-between flex-wrap">
        <li class="basis-full sm:basis-2/4 lg:basis-1/4 text-center" v-for="(e, index) in Different" :key="e">
          <p class="text-xl">{{ e.title }}</p>
          <number :to="e.number" tag="p" :ref="`number${index + 1}`" animationPaused :format="theFormat" :duration="3"
            easing="Power1.easeOut" class="text-6xl pt-5 block" />
          <p class="text-lg pb-8">{{ e.en }}></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import data from '@/assets/Data.json'

export default {
  name: "HomeDifferent",
  data() {
    return {
      Different: data.Different,
      windowScroll: window.scrollY
    }
  },
  methods: {
    theFormat(number) {
      return Math.round(number).toLocaleString()
    },
    updatescroll() {
      if (this.$refs.content) {
        this.windowScroll = window.scrollY
        const ContentOffset = this.$refs.content.offsetTop - 600
        if (ContentOffset <= this.windowScroll) {
          this.$refs.number1[0].play()
          this.$refs.number2[0].play()
          this.$refs.number3[0].play()
          this.$refs.number4[0].play()
        }
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updatescroll)
  },
}
</script>

<style></style>