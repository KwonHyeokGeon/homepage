<template>
  <div class="py-24 pt-48 text-center basis-full">
  </div>
</template>

<script>
import { db } from '@/firebase';
export default {
  name: 'ProductView1', 
  props: {
    title: Array,
    desc: Array,
  },
  data() {
    return {
      dataList: []
    }
  },
  mounted() {
    //db.콜렉션("db이름"),get().then((데이터)=>{반복문실행})
    db.collection("product").get().then((data)=>{
      data.forEach((e)=>{
        console.log(e.data());
        this.dataList.push(e.data())
      })
    })
  },
}
</script>

<style></style>