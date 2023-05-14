<template>
  <div class="max-w-6xl mx-auto border rounded-md sm:mt-20 mt-10">
    <h3 class="text-center text-4xl sm:my-20 my-10">회원가입</h3>
    <div class="flex flex-col sm:p-20 p-10 sm:gap-y-20 gap-y-12">
      <div>
        <h4>email <span class="text-xs text-[#3266f6]">*필수사항</span></h4>
        <input v-model="email" type="email" placeholder="이메일을 입력해주세요" class="px-4 py-1 bg-[#f9fafb] border-[#d1d5db] rounded-lg w-full">
        <p class="text-sm text-[#6B7280]">We'll never share your details. Read our <span class="text-[#3266f6]">Privacy
            Policy</span></p>
      </div>
      <div>
        <h4>password <span class="text-xs text-[#3266f6]">*필수사항</span></h4>
        <input v-model="password" type="password" placeholder="비밀번호를 입력해주세요"
          class="px-4 py-1 bg-[#f9fafb] border-[#d1d5db] rounded-lg w-full">
        <p class="text-sm text-[#6B7280]">비밀번호는 <span class="text-[#3266f6]">영어, 특수문자, 숫자</span>를 사용하여 
          <span class="text-[#3266f6]">8자리</span> 이상입니다.</p>
      </div>
      <div>
        <h4>name <span class="text-xs text-[#3266f6]">*필수사항</span></h4>
        <input v-model="name" type="text" placeholder="이름을 입력해주세요" class="px-4 py-1 bg-[#f9fafb] border-[#d1d5db] rounded-lg w-full">
      </div>
      <div>
        <h4>phone <span class="text-xs text-[#6B7280]">*선택사항</span></h4>
        <input v-model="phoneNumber" type="tel" placeholder="전화번호를 입력해주세요" class="px-4 py-1 bg-[#f9fafb] border-[#d1d5db] rounded-lg w-full">
      </div>
      <button @click="signUp"
        class="border border-blue-700 hover:bg-blue-300 hover:border-blue-400 w-24 rounded-md bg-[#3266f6] text-white">sign up</button>
        {{ email }}
        {{ password }}
        {{ name }}
        
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase';
export default {
  name: 'MemberView',
  data() {
    return {
      email:"",
      password:"",
      name:"",
    }
  },  
  methods: {
    signUp(){
      auth.createUserWithEmailAndPassword(this.email, this.password).then((result)=>{
        result.user.updateProfile({displayName: this.name})
        console.log(result);
        console.log(result.user);
      })
    }
  },
}
</script>

<style></style>