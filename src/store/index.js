import { createStore } from 'vuex'

export default createStore({
  state(){
    return{
      number: 0,
      number2: 10000,
      loginChk: false,
      displayName: "",
      loginToken: null,
      noticeId:0,
      uid:""
    }
  },
  mutations: {
    NoticeRead(state,payload){
      state.noticeId = payload
    },
    QnaRead(state,payload){
      state.noticeId = payload
    },
    NumberPlus(state){
      state.number++
    },
    NumberMinus(state){
      state.number2--
    },
    loginToken(state,payload){  
      state.loginToken = payload.refreshToken
      state.loginChk = true
      state.uid = payload.uid
    },
    logOutToken(state){
      state.loginChk = false
      state.loginToken = null
      state.displayName = ''
      state.uid = ''
      sessionStorage.removeItem('Token')
      sessionStorage.removeItem('displayName')
    },
    loginState(state,payload){
      state.loginToken = sessionStorage.getItem("Token")
      state.displayName = payload.displayName
      state.uid = payload.uid
      state.loginChk = true
    }
  },
  actions: {
  },

})
