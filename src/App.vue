<template>
  <NavCom></NavCom>
  <router-view />
  <FooterCom></FooterCom>

</template>

<script>
import { auth } from './firebase';
import NavCom from './components/NavCom.vue';
import FooterCom from './components/FooterCom.vue';

export default  {
  name:"App",
  components:{
    FooterCom,
    NavCom,
  },
  created() {
    auth.onAuthStateChanged((user)=>{
      if(user){
        this.$store.commit('loginState', {displayName: user.displayName, uid: user.uid });
      }
    })
  },
}
</script>

<style></style>
