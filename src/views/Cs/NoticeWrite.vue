<template>
  <div class="basis-full">
    <div class="max-w-7xl mx-auto bg-white shadow-2xl rounded-lg flex flex-col gap-4 overflow-x-auto mb-40 p-5">
      이름  <input v-model="name" type="text" class="border rounded" placeholder="이름">
      제목  <input v-model="title" type="text" class="border rounded" placeholder="제목">
      내용  <textarea v-model="content" class="border rounded p-2" rows="20"></textarea>
      <input type="file" id="image" class="shadow appearance-none border rounded w-full pb-3 pt-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      <button @click="write"
        class="bg-gray-400 hover:bg-gray-600 focus:ring-gray-400 py-2 px-4 text-white font-semibold rounded-md shadow-md text-xs sm:text-sm">완료</button>
    </div>
  </div>
</template>

<script>
import { db, storage } from '@/firebase';
export default {
  name: "NoticeWrite",
  data() {
    return {
      title: "",
      content: "",
      name: this.$store.state.displayName,
      file:"",
      date: new Date(),
      fileRandom : null
    }
  },
  mounted(){
    const formattedDate = this.getDate();
    this.fileRandom = formattedDate
  },
  methods: {
    getDate(){
      const date = new Date()
      const RandNum = Math.floor(Math.random() * 999) +100;
        const formattedDate = ('' + date.getFullYear())
        + ('0' + (date.getMonth() + 1)).slice(-2) 
        + ('0' + date.getDate()).slice(-2) + '_'
        + ('0' + date.getHours()).slice(-2)
        + ('0' + date.getMinutes()).slice(-2)
        + ('0' + date.getSeconds()).slice(-2)
        + RandNum
      return formattedDate
    },
    write(){
      this.file = document.querySelector('#image').files[0]
      if(this.file){
        storage.ref().child("images/"+this.fileRandom).put(this.file).then(()=>{
              // 파일 경로 가지고 오기
          storage.ref().child("images/"+this.fileRandom).getDownloadURL().then((url)=>{
              db.collection('notice').add({
              "name": this.name,
              "title": this.title,
              "content": this.content,
              "date": this.date,
              "hit": 1,
              "good": 0,
              "bad": 0,
              "uid": this.$store.state.uid,
              "file": url
            })
            this.$router.replace("/cs/notice/list")
          })
        })
      }else{
        db.collection('notice').add({
          "name":this.name,
          "title":this.title,
          "content":this.content,
          "date":this.date,
          "hit":1,
          "good":0,
          "bad":0,
          "uid": this.$store.state.uid
        })
        this.$router.replace("/cs/notice/list")
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>