<template>
  <div class="basis-full">
    <div class="max-w-7xl mx-auto my-10">
      <ul class="flex justify-between border-t-indigo-500 text-center border-t-2 px-4 py-2 bg-indigo-50">
        <li class="basis-1/12">번호</li>
        <li class="basis-4/12">제목</li>
        <li class="basis-2/12">글쓴이</li>
        <li class="basis-2/12">날짜</li>
        <li class="basis-1/12">조회수</li>
        <li class="basis-1/12">추천</li>
        <li class="basis-1/12">비추천</li>
      </ul>
      <template v-for="(e, index) in dataList" :key="index">
        <ul v-if="calculateNumber(totalLength, perPage, page, index) > 0"
          class="flex justify-between border-b text-center px-4 py-2 even:bg-gray-50">
          <li class="basis-1/12">{{ calculateNumber(totalLength, perPage, page, index) }}</li>
          <li class="basis-4/12"><router-link :to="{ name: 'NoticeRead', query: { docId: dataId[index] } }"
              @click="$store.commit('NoticeRead', dataId[index])">{{ e.title }}</router-link></li>
          <li class="basis-2/12">{{ e.name }}</li>
          <li class="basis-2/12">{{ BoardDate(index) }}</li>
          <li class="basis-1/12">{{ e.hit }}</li>
          <li class="basis-1/12">{{ e.good }}</li>
          <li class="basis-1/12">{{ e.bad }}</li>
        </ul>
      </template>
    </div>
    <div v-if="$store.state.loginToken != null" class="flex justify-end pb-24">
      <router-link to="/cs/notice/write"
        class="bg-indigo-400 hover:bg-indigo-600 focus:ring-indigo-400 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:right-2 focus:ring-opacity-75 text-xs sm:text-sm">글쓰기</router-link>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
export default {
  computed: {
    pageCount() {
      const totalPage = Math.ceil(this.totalLength / this.perPage);
      // 전체 페이지 수 계산 => 전체게시물 / 페이지당 개수 나눈 뒤 올림
      const start = (this.currentPage - 1) * this.perPage;
      // 현재 페이지에 보여질 게시물의 시작 인덱스를 계산
      const end = start + this.perPage;
      // 현재 페이지에 보여질 게시물의 끝 인덱스를 계산
      const pagination = [];
      // 페이지 번호를 저장할 배열을 선언
      for (let i = start + 1; i <= end && i <= totalPage; i++) {
        // 시작 인덱스에서 끝 인덱스 까지 반복문을 사용하며, 페이지 번호를 배열에 추가한다,
        // 이때 추가 되는 페이지 번호는 전체 페이지 수를 넘지 않도록 설정
        pagination.push(i)
      }
      if (pagination.length === 0 && totalPage > 0) {
        pagination.push(totalPage);
      }
      // 만약 페이지 번호 배열이 비어있고 전체 페이지 수가 0보다 크다면 마지막 페이지 번호만 배열에 추가한다.
      return { totalPage, start, end, pagination }
    }
  },
  created(){
    this.pageCount
  },
  name: 'NoticeList',
  data() {
    return {
      dataList: [],
      dataId: [],
      posts: [],
      page: 1,
      perPage: 10,
      lastVisible: null,
      totalLength: 0,
      block: 5,
      currentPage: 1
    }
  },
  methods: {
    goToPage(e) {
      this.page = e;
      this.fetchPost()
    },
    prevPage() {
      this.currentPage = this.currentPage - 1;
      this.page = this.pageCount.pagination[0]
      this.fetchPost()
    },
    nextPage() {
      this.currentPage = this.currentPage + 1;
      // 현재 블록 페이지 번호를 1 증감시킨다.
      this.page = this.pageCount.pagination[0];
      this.fetchPost()
    },
    BoardDate(index) {
      const date = this.dataList[index].date.seconds * 1000 + this.dataList[index].date.nanoseconds / 1000000
      const new_date = new Date(date)
      const formattedDate = ('' + new_date.getFullYear()).slice(-2) + '-'
        + ('0' + (new_date.getMonth() + 1) + '-')
        + ('0' + new_date.getDate()).slice(-2) + ''
      return formattedDate
    },

    fetchTotalLength() {
      db.collection("notice").get().then((data) => {
        // 모든 notice의 문서를 가지고 와서 개수를 지정한다.
        // size === 개수
        this.totalLength = data.size
      })
    },
    fetchPost() {
      let query = db.collection("notice").orderBy("date", "desc").limit(this.perPage)
      if (this.page > 1 && this.lastVisible) {
        query = query.startAfter(this.lastVisible);
      }
      query.get().then((data) => {
        const items = [];
        const ids = [];

        data.forEach((e) => {
          ids.push(e.id);
          items.push(e.data())
        })
        this.dataId = ids;
        this.dataList = items;
        this.lastVisible = data.docs[data.docs.length - 1]
        //  0부터 시작하기때문
      })
    },
    calculateNumber(totalLength, perPage, page, index) {
      const totalPages = perPage * (page - 1);
      // 현재 페이지 이전에 있는 게시물 수 계산
      const postIndex = totalLength - (totalPages + index);
      // 게시물 인덱스 계산 - 전체 게시물에서 이전 게시물수와 현재 게시물의 인덱스를 뺀다.
      if (postIndex <= 0) { return }
      // 계산된 게시물 인덱스가 0보다 작거나 같으면 함수를 종료 결국은 마지막 페이지에서 음수 값 혹은 0 값을 반환 하지 않는다.

      return postIndex
    }
  },
  mounted() {
    this.fetchTotalLength()
    this.fetchPost()
  },
}
</script>

<style lang="scss" scoped></style>