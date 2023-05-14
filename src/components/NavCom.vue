<template>
  <div class="sticky bg-white z-50 top-0 w-full border-b border-b-[rgba(255,255,255,0.3)]">
    <div class="max-w-7xl mx-auto flex justify-between items-center py-2.5 px-[2%]">
      <div>
        <router-link to="/">
          <img src="https://via.placeholder.com/120x60" alt="로고">
        </router-link>
      </div>
      <div class="hidden lg:flex justify-between basis-2/3">
        <ul class="flex basis-2/3 justify-between">
          <li @mouseover="NavSelectIndex = index; SubMenu(index)" @mouseout=" NavSelectIndex = null "
            v-for="(e, index) in   NavList[0]  " :key="e" class="relative basis-1/4 text-center"
            :class="NavSelectIndex === index && 'font-bold'">
            <router-link :to=" NavList[1][index] " class="text-base hover:font-bold">{{ e }}
              <font-awesome-icon class="transition-all duration-500 text-xs align-baseline"
                :class=" NavSelectIndex === index && 'rotate-180' " icon="chevron-down"></font-awesome-icon></router-link>
            <ul class="absolute w-36 nav_sub bg-slate-800 h-0 overflow-hidden transition-all duration-500"
              :style=" NavSelectIndex === index && isSubMenu ">
              <li v-for="( el, i ) in  SubList[index] " :key=" el " class="py-2.5 font-normal"><router-link
                  :to=" SubMenuLink[index][i] " class="text-sm text-white hover:font-bold">{{ el }}</router-link>
                </li>
              </ul>
            </li>
          </ul>
        <ul class="flex gap-x-5">
          <li v-if=" !$store.state.loginChk "><router-link to="/login" class="text-sm">
              <font-awesome-icon icon="lock" /><span class="pl-0.5">로그인</span></router-link></li>
          <li v-else @click="logOut"><router-link to="/" class="text-sm">
              <font-awesome-icon icon="arrow-right-from-bracket" /><span class="pl-0.5">로그아웃</span></router-link></li>
          <li><router-link to="/member" class="text-sm">
              <font-awesome-icon icon="user" /><span class="pl-0.5">회원가입</span></router-link></li>
        </ul>
      </div>
    </div>
    <div class="absolute right-4 md:right-8 top-6 duration-1000 transition-all z-50 cursor-pointer lg:hidden"
      @click=" isOpen === true ? (isOpen = false) : (isOpen = true) " :class=" isOpen && 'on' ">
      <div v-for=" e  in  3 " :key=" e " class="w-[30px] h-0.5 bg-black rounded m-1.5 transition-all duration-100">
      </div>
    </div>
    <div
      class="w-80 h-full fixed bg-gray-50 z-40 -right-80 p-12 box-border transition-all duration-500 top-0 lg:hidden overflow-y-scroll"
      :class=" isOpen && '!right-0' ">
      <ul class="mt-12">
        <li class="py-5 border-b cursor-pointer relative font-bold" v-for="( e, index ) in  NavList[0] " :key=" e "
          @click=" NavSelectIndex = index; SubMenu(index) ">
          {{ e }}<font-awesome-icon icon="chevron-down"
            class="transition-all duration-500 text-xs align-baseline absolute right-5 top-6"
            :class=" NavSelectIndex === index && RotateClass " />
          <template v-for="(  e, i  ) in SubList" :key="e">
            <ul v-if=" index === i "
              class="flex flex-wrap justify-between sub_list overflow-hidden transition-all duration-300"
              style="height: 0px;" :style=" NavSelectIndex === index && `height:${SubHeight}` ">
              <li v-for=" ( el, i )  in   e  " :key=" el " class="basis-full text-xs ">
                <router-link @click=" isOpen = false " :to=" SubMenuLink[index][i] "
                  class="first-of-type:pt-5 pt-2 pl-5 inline-block w-full hover:text-[#37a2d7]">{{ el }}</router-link>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavData from '../assets/Data.json'
import { auth } from '@/firebase';
export default {
  data() {
    return {
      NavList: NavData.Nav,
      SubList: NavData.SubMenu,
      SubMenuLink: NavData.SubMenuLink,
      NavSelectIndex: null,
      isOpen: false,
      SubHeight: '0px',
      RotateClass: "",
      windowWidth: 0,
    }
  },
  methods: {
    logOut(){
      auth.signOut()
      this.$store.commit('logOutToken')
    },
    windowUpdateWidth() {
      this.windowWidth = window.innerWidth;
    },
    SubMenu(e) {
      const list = document.querySelectorAll(".sub_list")[e];
      const length = list.querySelectorAll("li").length;
      this.isSubMenu = `height:${length * 44}px`;

      if (list.style.height === "0px") {
        list.style.height = `${length * 40}px`;
        this.RotateClass = 'rotate-180'
      } else {
        list.style.height = "0px";
        this.RotateClass = ''
      }
      this.SubHeight = list.style.height
    },
  },
  watch: {
    windowWidth(el) {
      if (el < 1024) {
        this.NavSelectIndex = null
        this.isOpen = false
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.windowUpdateWidth)
  },

}
</script>

<style>
.on div:nth-child(1) {
  transform: rotate(45deg) translateY(12px);
}

.on div:nth-child(2) {
  opacity: 0;
}

.on div:nth-child(3) {
  transform: rotate(-45deg) translateY(-12px);
}</style>