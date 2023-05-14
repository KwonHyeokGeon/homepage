<template>
  <HomeBanner></HomeBanner>
  <div class="w-full py-24">
    <div class="max-w-7xl mx-auto flex flex-wrap px-[2%]">
      <HomeCompany />
      <HomeContent />
      <HomeManagement />
    </div>
  </div>
  <HomeDifferent></HomeDifferent>
  <HomeOnline />
</template>

<script>
import HomeBanner from '@/components/Home/HomeBanner.vue';
import HomeCompany from '@/components/Home/HomeCompany.vue'
import HomeContent from '@/components/Home/HomeContent.vue'
import HomeDifferent from '@/components/Home/HomeDifferent.vue'
import HomeManagement from '@/components/Home/HomeManagement.vue';
import HomeOnline from '@/components/Home/HomeOnline.vue';


export default {
  name: 'HomeView',
  components: {
    HomeBanner,
    HomeCompany,
    HomeContent,
    HomeDifferent,
    HomeManagement,
    HomeOnline
  }
}
</script>
