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
    이름 <input v-model="name" type="text" class="border rounded" placeholder="이름">
    제목 <input v-model="title" type="text" class="border rounded" placeholder="제목">
    내용 <textarea v-model="content" class="border rounded p-2" rows="20"></textarea>
    <input type="file" id="image" @change="fileSrc" v-bind="file"
      class="shadow appearance-none border rounded w-full pb-3 pt-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    <button @click="Modify"
      class="bg-gray-400 hover:bg-gray-600 focus:ring-gray-400 py-2 px-4 text-white font-semibold rounded-md shadow-md text-xs sm:text-sm">수정완료</button>
  </div>
</template>

<script>
import { db } from '@/firebase';
export default {
  name: 'NoticeModify',
  data() {
    return {
      BoardContent: [],
      name: "",
      title: "",
      content: "",
      file: "",
      date: new Date()
    }
  },
  methods: {
    Modify() {
      db.collection("notice").doc(this.$store.state.noticeId).update({
        "name": this.name,
        "title": this.title,
        "content": this.content,
        "date": this.date,
        "file": this.file
      }).then(() => {
        alert("수정이 완료되었습니다")
        this.$router.replace({ name: 'NoticeRead', query: { docId: this.$store.state.noticeId } });
      })
    },
    fileSrc(event) {
      let file = event.target.files[0];
      console.log(event.target.files[0]);
      this.file = window.URL.createObjectURL(file);
    },
    goToBack() {
      window.history.back()
    }
  },
  mounted() {
    if (this.$store.state.noticeId === 0) {
      this.$router.replace("/cs/notice/modify")
    }
    db.collection('notice').doc(this.$store.state.noticeId).get().then((data) => {
      this.BoardContent = data.data()
      this.name = this.BoardContent.name
      this.title = this.BoardContent.title
      this.content = this.BoardContent.content
    })
  },
}
</script>

<style lang="scss" scoped></style>