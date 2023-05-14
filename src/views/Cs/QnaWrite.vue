<template>
  <div class="basis-full">
    <div class="max-w-7xl mx-auto bg-white shadow-2xl rounded-lg flex flex-col gap-4 overflow-x-auto mb-40 p-5">
      이름 <input v-model="name" type="text" class="border rounded" placeholder="이름">
      제목 <input v-model="title" type="text" class="border rounded" placeholder="제목">
      내용 <textarea v-model="content" class="border rounded p-2" rows="20"></textarea>
      <button @click="write"
        class="bg-gray-400 hover:bg-gray-600 focus:ring-gray-400 py-2 px-4 text-white font-semibold rounded-md shadow-md text-xs sm:text-sm">문의하기</button>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
export default {
  name: 'QnaWrite',
  data() {
    return {
      title: "",
      content: "",
      name: this.$store.state.displayName,
      file: "",
      date: new Date(),
      fileRandom: null
    }
  },
  methods: {
    write() {
      db.collection('qna').add({
        "name": this.name,
        "title": this.title,
        "content": this.content,
        "date": this.date,
        "uid": this.$store.state.uid
      })
      this.$router.replace("/cs/qna/list")
    }
  },
}
</script>

<style lang="scss" scoped></style>