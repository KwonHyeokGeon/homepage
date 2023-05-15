<template>
  <div class="max-w-6xl mx-auto border rounded-md sm:mt-20 mt-10">
    <h3 class="text-center text-4xl sm:my-20 my-10">로그인</h3>
    <div class="sm:p-20 p-10 flex flex-col sm:gap-y-20 gap-y-12">
      <div>
        <h4>email</h4>
        <input v-model="email" type="email" placeholder="이메일을 입력해주세요"
          class="px-4 py-1 bg-[#f9fafb] border-[#d1d5db] rounded-lg w-full">
      </div>
      <div>
        <h4>password</h4>
        <input v-model="password" type="password" placeholder="비밀번호를 입력해주주세요"
          class="px-4 py-1 bg-[#f9fafb] border-[#d1d5db] rounded-lg w-full">
      </div>
      <button @click="signIn"
        class="border border-blue-700 hover:bg-blue-300 hover:border-blue-400 w-24 rounded-md bg-[#3266f6] text-white">sign
        in</button>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase'

// import { auth } from '@/firebase';
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      errorCode: ""
    }
  },
  methods: {
    signIn() {
      if (!this.email) {
        alert('이메일을 입력해주세요')
        return false
      }
      if (!this.password) {
        alert('비밀번호를 입력해주세요')
        return false
      }
      auth.signInWithEmailAndPassword(this.email, this.password).then(((user => {
        sessionStorage.setItem('Token', user.user.refreshToken)
        sessionStorage.setItem('displayName', user.user.displayName)
        sessionStorage.setItem

        this.$store.commit("loginToken", { refreshToken: user.user.refreshToken, id: user.user.uid })
        this.$router.replace('/')
      })),
        ((error) => {
          this.errorCode = error.code
          alert(this.errorCode)
        }))
    }
  },
}
</script>

<style></style>
