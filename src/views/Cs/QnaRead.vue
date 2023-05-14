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
              <p>게시일: {{ utcTime[0] }}
              </p>
            </span>
          </div>
          <div class="pt-6 pb-60 pl-2 text-gray-700 border-b-2 border-dotted">
            {{ BoardContent.content }}
          </div>
          <ul v-for="(e, idx) in comment" :key="e" class="flex items-center py-1 border-b-2 border-dotted">
            <li class="basis-2/12 pl-2">{{ visitor[idx] }}</li>
            <span class="bg-gray-300 h-6 w-[.5px] mx-3 inline-block "></span>
            <li class="basis-8/12">{{ comment[idx] }}</li>
            <button title="댓글삭제" @click="DeleteComment(idx)"
              class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                </path>
              </svg>
            </button>
          </ul>
          <div class="mt-4">
            <div class="border-2 gap-2 rounded-md w-full h-10 flex items-center p-4">
              <h4 class="text-sm">댓글달기</h4>
              <input type="text" placeholder="이름" class="basis-2/12 border rounded-md px-4" v-model="typedVisitor">
              <span class="bg-gray-300 h-6 w-[.5px] mx-3"></span>
              <input @keydown.enter="inputComment" type="text" placeholder="내용" class="basis-8/12 border rounded-md px-4"
                v-model="typedComment">
              <button><img @click="inputComment" src="@/assets/ico/send.png" alt="전송" class="w-6"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, fb } from '@/firebase';
export default {
  name: 'QnaRead',
  data() {
    return {
      BoardContent: [],
      utcTime: [],
      comment: [],
      visitor: [],
      typedComment: "",
      typedVisitor: ""
    }
  },
  methods: {
    goToBack() {
      window.history.back()
    },
    Delete() {
      let msg = confirm("삭제된 데이터는 복구할 수 없습니다.\n\n삭제하시겠습니까?")
      if (msg) {
        db.collection("qna").doc(this.$route.query.docId).delete().then(() => {
          alert('삭제 완료')
          this.$router.replace('/cs/qna')
        })
      } else {
        alert('삭제취소')
      }
    },
    DeleteComment(idx) {
      let msg = confirm("삭제된 댓글은 복구할 수 없습니다.\n\n삭제하시겠습니까?")
      if (msg) {
        db.collection("qna").doc(this.$route.query.docId).update({
          "comment": fb.FieldValue.arrayRemove(this.comment[idx]),
          "visitor": fb.FieldValue.arrayRemove(this.visitor[idx])
        })
        alert('삭제완료')
        location.reload()
      } else {
        alert('삭제취소')
      }
    },
    inputComment() {
      if (this.typedComment && this.typedVisitor) {
        this.comment.push(this.typedComment)
        this.visitor.push(this.typedVisitor)
        this.typedComment = ""
        this.typedVisitor = ""
      }
      db.collection('qna').doc(this.$route.query.docId).update({
        "comment": this.comment,
        "visitor": this.visitor
      })
    }
  },
  mounted() {
    db.collection('qna').doc(this.$route.query.docId).get().then((data) => {
      this.BoardContent = data.data()
      const timestamp = this.BoardContent.date.seconds + (this.BoardContent.date.nanoseconds / 1000000000);
      const date = new Date(timestamp * 1000)
      this.utcTime.push(date.toUTCString())
      for (let i = 0; i < data.data().comment.length; i++) {
        this.comment.push(data.data().comment[i])
        this.visitor.push(data.data().visitor[i])
      }
    })
  },
}
</script>

<style></style>