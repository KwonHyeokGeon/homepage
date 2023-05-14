<template>
  <div class="w-full">
    <div class="max-w-7xl mx-auto bg-white shadow-2xl rounded-lg flex overflow-x-auto mb-40">
      <div class="flex-1 px-5">
        <div class="h-16 flex items-center justify-between">
          <div class="flex items-center">
            <a href="#" @click="goToBack()"
              class="flex items-center text-gray-700 px-2 py-1 space-x-0.5 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
              title="Back">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"></path>
              </svg>
              <span class="text-sm font-bold">Back</span>
            </a>
            <div class="flex items-center">
              <span class="bg-gray-300 h-6 w-[.5px] mx-3"></span>
              <div class="flex items-center space-x-2">
                <button title="Delete" @click="Delete()"
                  class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
            <span class="bg-gray-300 h-6 w-[.5px] mx-3"></span>
            <router-link to="/cs/notice/modify"
              class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100 text-sm cursor-pointer"><img
                src="@/assets/ico/modify.png" class="w-5 h-5 box-border p-[2px]" alt="수정"></router-link>
          </div>
          <div class="flex items-center">
            <p class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100 text-sm cursor-pointer"
              @click="goodChk">추천{{ BoardContent.good }}</p>
            <span class="bg-gray-300 h-6 w-[.5px] mx-3"></span>
            <p class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100 text-sm cursor-pointer"
              @click="dislikeChk">비추천{{ BoardContent.bad }}</p>
            <span class="bg-gray-300 h-6 w-[.5px] mx-3"></span>
            <p class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow text-sm">
              조회수{{ BoardContent.hit }}</p>
          </div>
        </div>
        <div class="mb-6">
          <h4 class="text-lg text-gray-800 font-bold pb-2 mb-4 border-b-2">{{ BoardContent.title }}</h4>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="flex flex-col ml-2">
                <span class="text-sm font-semibold"> 제목 : {{ BoardContent.title }}
                </span>
                <span class="text-xs text-gray-400"> 이름 : {{ BoardContent.name }}
                </span>
              </div>
            </div>
            <span class="text-sm text-gray-500">
              <p>게시일: {{ dateTime }}</p>
            </span>
          </div>
          <div class="pt-6 pb-60 pl-2 text-gray-700 border-b-2 border-dotted">
            {{ BoardContent.content }}
          </div>
          <img v-if="BoardContent.file" :src="BoardContent.file" alt="" class="w-20 h-20">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
export default {
  name: 'NoticeRead',
  data() {
    return {
      BoardContent: [],
      dateTime: ""
    }
  },
  methods: {
    Delete() {
      let msg = confirm("삭제된 데이터는 복구할 수 없습니다.\n\n삭제하시겠습니까?")
      if (msg) {
        db.collection("notice").doc(this.$route.query.docId).delete().then(() => {
          alert('삭제 완료')
          this.$router.replace('/cs/notice')
        })
      } else {
        console.log('!');
      }
    },
    goodChk() {
      if (this.BoardContent.goodConfirm) {
        alert("이미 추천 하셨습니다.")
        return
      }
      db.collection('notice').doc(this.$route.query.docId).update({
        good: this.BoardContent.good + 1,
        goodConfirm: true
      }).then(() => {
        db.collection('notice').doc(this.$route.query.docId).get().then((data) => {
          this.BoardContent = data.data()
        })
      })
    },
    dislikeChk() {
      if (this.BoardContent.badConfirm) {
        alert("이미 비추천 하셨습니다.")
        return
      }
      db.collection('notice').doc(this.$route.query.docId).update({
        bad: this.BoardContent.bad + 1,
        badConfirm: true
      }).then(() => {
        db.collection('notice').doc(this.$route.query.docId).get().then((data) => {
          this.BoardContent = data.data()
        })
      })
    },
    goToBack() {
      window.history.back()
    }
  },
  mounted() {
    if (this.$route.query.docId === null) {
      this.$router.replace("/cs/notice")
    }
    db.collection('notice').doc(this.$route.query.docId).get().then((data) => {
      this.BoardContent = data.data()
      if (data.data().isUpdate) {
        return
      }
      db.collection('notice').doc(this.$route.query.docId).update({
        hit: data.data().hit + 1,
        // isUpdate: true
      })
    }).then(() => {
      db.collection('notice').doc(this.$route.query.docId).get().then((update) => {
        this.BoardContent = update.data();
        const date = this.BoardContent.date.seconds * 1000 + this.BoardContent.date.nanoseconds / 1000000
        const new_date = new Date(date)
        const formattedDate = ('' + new_date.getFullYear()).slice(-2) + '-'
          + ('0' + (new_date.getMonth() + 1) + '-')
          + ('0' + new_date.getDate()).slice(-2) + ' '
          + ('0' + new_date.getHours()).slice(-2) + '시'
          + ('0' + new_date.getMinutes()).slice(-2) + '분'
          + ('0' + new_date.getSeconds()).slice(-2) + '초'
        return this.dateTime = formattedDate
      })
    })
  },
}
</script>

<style lang="scss" scoped></style>