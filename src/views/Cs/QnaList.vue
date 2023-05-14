<template>
  <div class="basis-full">
    <div class="max-w-7xl mx-auto my-10">
      <ul class="flex justify-between border-t-indigo-500 text-center border-t-2 px-4 py-2 bg-indigo-50">
        <li class="basis-2/12">번호</li>
        <li class="basis-4/12">제목</li>
        <li class="basis-2/12">글쓴이</li>
        <li class="basis-2/12">날짜</li>
      </ul>
      <template v-if="indexNum">
        <ul v-for="(e, index) in dataList" :key="index" class="flex flex-col">
          <div class="flex justify-between text-center px-4 py-2 even:bg-gray-50 border-b border-dashed">
            <li class="basis-2/12">{{ this.indexNum[index] }}
            </li>
            <li class="basis-4/12"><router-link :to="{ name: 'QnaRead', query: { docId: dataId[index] } }"
                @click="$store.commit('QnaRead', dataId[index])">{{ e.title }}</router-link></li>
            <li class="basis-2/12">{{ e.name }}</li>
            <li class="basis-2/12">{{ utcTime[index].replace("GMT", "") }}</li>
          </div>
          <p class="border-b px-4 text-sm flex text-gray-400"><span class="basis-1/6 line-clamp-1">제목:{{ e.title
          }}</span> <span class="basis-4/6">내용:{{ e.content }}</span></p>
        </ul>
      </template>
    </div>
    <div v-if="$store.state.loginToken != null" class="flex justify-end pb-24">
      <router-link to="/cs/qna/write"
        class="bg-indigo-400 hover:bg-indigo-600 focus:ring-indigo-400 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:right-2 focus:ring-opacity-75 text-xs sm:text-sm">질문하기</router-link>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
export default {
  name: "QnaList",
  data() {
    return {
      dataId: [],
      dataList: [],
      perPage: 5,
      totalLength: 0,
      indexNum: [],
      utcTime: []
    }
  },
  methods: {
    fetchPost() {
      let query = db.collection("qna").orderBy("date", "desc").limit(this.perPage)
      query.get().then((data) => {
        const items = [];
        const ids = [];
        data.forEach((e) => {
          ids.push(e.id);
          items.push(e.data())
        })
        this.dataId = ids;
        this.dataList = items;
        for (let i = 0; i < this.dataList.length; i++) {
          const timestamp = this.dataList[i].date.seconds + (this.dataList[i].date.nanoseconds / 1000000000);
          const date = new Date(timestamp * 1000)
          this.utcTime.push(date.toUTCString())
        }
      })
    },
    fetchTotalLength() {
      db.collection("qna").get().then((data) => {
        // 모든 notice의 문서를 가지고 와서 개수를 지정한다.
        // size === 개수
        this.totalLength = data.size
        for (let i = 0; i < this.totalLength; i++) {
          this.indexNum.push(this.totalLength - i)
        }
      })
    },
  },
  created() {
    this.fetchPost()
    this.fetchTotalLength()
  },
}
</script>

<style></style>