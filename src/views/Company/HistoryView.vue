<template>
  <div class="py-24 pt-48 text-center basis-full">
    <h3
      class="text-3xl font-bold mb-5 relative after:absolute after:w-8 after:h-0.5 after:bg-slate-800 after:-bottom-2 after:left-2/4 after:-translate-x-2/4">
      {{ title[1] }}</h3>
    <p class="text-gray-400">{{ desc[1] }}</p>
  </div>
  <div
    class="pb-24 basis-full relative after:absolute after:h-full sm:after:w-0.5 after:bg-gray-300 after:left-2/4 after:top-0 after:-translate-x-2/4">
    <div
      class="group flex justify-start odd:justify-end sm:text-right odd:text-left after:absolute sm:after:w-4 after:h-4 sm:after:border-2 after:bg-white after:rounded-full after:left-1/2 after:-translate-x-1/2 after:border-red-500 after:top-3 relative hover:after:bg-gray-300 after:z-50 after:transition-all after:duration-300"
      v-for="e in dataList.slice().reverse()" :key="e">
      <div class="basis-full sm:basis-[47%]">
        <h3 class="text-gray-400 transition-all duration-700 text-4xl mb-4 font-bold group-hover:text-black">
          {{ e.year }}
        </h3>
        <p class="font-normal">{{ e.title }}</p>
        <p class="font-normal">{{ e.desc }}</p>
        <img class="inline-block mt-5" :src="e.img" alt="e.title">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InteriorView.vue",
  props: {
    title: Array,
    desc: Array,
  },
  data() {
    return {
      dataList: [
        {
          year: "2017",
          title: "설립10주년",
          desc: "설립10주년을 맞이했습니다",
          img: "https://via.placeholder.com/500x120"
        },
        {
          year: "2018",
          title: "설립11주년",
          desc: "설립11주년을 맞이했습니다",
          img: "https://via.placeholder.com/500x120"
        },
        {
          year: "2019",
          title: "설립12주년",
          desc: "설립12주년을 맞이했습니다",
          img: "https://via.placeholder.com/500x120"
        },
        {
          year: "2020",
          title: "설립13주년",
          desc: "설립13주년을 맞이했습니다",
          img: "https://via.placeholder.com/500x120"
        },
        {
          year: "2021",
          title: "설립14주년",
          desc: "설립14주년을 맞이했습니다",
          img: "https://via.placeholder.com/500x120"
        },
        {
          year: "2022",
          title: "설립15주년",
          desc: "설립15주년을 맞이했습니다",
          img: "https://via.placeholder.com/500x120"
        },
        {
          year: "2023",
          title: "설립16주년",
          desc: "설립16주년을 맞이했습니다",
          img: "https://via.placeholder.com/500x120"
        }
      ]
    }
  },
}
</script>

<style></style>
