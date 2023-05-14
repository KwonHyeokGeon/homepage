<template>
  <div class="w-full">
    <div class="max-w-7xl mx-auto flex flex-wrap px-[2%]">
      <router-view :title="ArrayTitle" :desc="ArrayDesc"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductView",
  data() {
    return {
      ArrayTitle: ["상품소개1", "상품소개2", "상품소개3"],
      ArrayDesc: ["상품소개1 서브메시지", "상품소개2 서브메시지", "상품소개3 서브메시지"]
    }
  }
}
</script>

<style></style>