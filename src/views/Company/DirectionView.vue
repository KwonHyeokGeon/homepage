<template>
  <div class="py-24 pt-48 text-center basis-full">
    <h3
      class="text-3xl font-bold mb-5 relative after:absolute after:w-8 after:h-0.5 after:bg-slate-800 after:-bottom-2 after:left-2/4 after:-translate-x-2/4">
      {{ title[3] }}</h3>
    <p class="text-gray-400">{{ desc[3] }}</p>
  </div>
  <div class="basis-full pb-24">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18614.478159092472!2d-4.4108249054520945!3d54.324994323530255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48639f0df0ad1add%3A0x7524498a07c6e385!2z66eo7ISsIOueqOyngA!5e0!3m2!1sko!2skr!4v1682581656492!5m2!1sko!2skr"
      width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
  <div class="basis-full pb-24">
    <div class="mt-5">
      <p><span class="text-lg font-bold">A.</span>Isle of Man,맨섬</p>
      <p><span class="text-lg font-bold">T.</span>44-0631-5647</p>
    </div>
    <div class="mt-5 border-t">
      <h3 class="py-4 font-bold text-xl">버스 이용시</h3>
      <p>Northern Delivery Office에서 하차</p>
    </div>
    <div class="mt-5 border-t">
      <h3 class="py-4 font-bold text-xl">지하철 이용 시</h3>
      <p>9 3/4역에서 하차</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DirectionView.vue",
  props: {
    title: Array,
    desc: Array,
  }
}
</script>

<style></style>