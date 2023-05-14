<template>
  <div class="w-full bg-white shadow-2xl rounded-lg flex flex-col gap-4 overflow-x-auto mb-40 p-5">
    <a href="#" @click="goToBack()"
      class="flex w-[70px] items-center text-gray-700 px-2 py-1 space-x-0.5 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
      title="Back">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
          d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
          clip-rule="evenodd"></path>
      </svg>
      <span class="text-sm font-bold">Back</span>
    </a>
    <div class="border rounded-md p-5 flex flex-col gap-2">
      <p class="border rounded-md w-fit p-2 bg-stone-300">안녕하세요😀 무엇을 도와드릴까요?</p>
      <p class="border rounded-md w-fit p-2 bg-gray-300 self-end" v-for="e in question" :key="e">
        {{ e }}</p>
    </div>
    <div class="relative">
      <input type="text" v-model="typedQuestion" placeholder="send message" @keydown.enter="inputQuestion"
        class="bg-gray-300 w-full py-2 px-4 font-semibold rounded-md shadow-md text-xs sm:text-sm">
      <button @click="inputQuestion"><img src="@/assets/ico/send.png" alt="전송"
          class="absolute w-6 right-1 top-1/2 translate-y-[-50%]"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OnlineCounsel",
  data() {
    return {
      typedQuestion: "",
      question: []
    }
  },
  methods: {
    goToBack() {
      window.history.back()
    },
    inputQuestion() {
      this.question.push(this.typedQuestion)
      this.typedQuestion = ""
    }
  }
}
</script>

<style lang="scss" scoped></style>