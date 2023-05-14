import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRightFromBracket, faBuilding, faChevronDown, faCircleArrowUp, faHistory, faLock, faMedal, faUser, faPlus, faPaperPlane, faDesktop, faComment, faTaxi, faMobile } from '@fortawesome/free-solid-svg-icons'
import VueNumber from 'vue-number-animation'


library.add(faChevronDown, faBuilding, faHistory, faPaperPlane, faMedal, faLock, faUser, faArrowRightFromBracket, faCircleArrowUp, faPlus, faDesktop, faComment, faTaxi, faMobile)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(store).use(router).use(VueNumber).mount('#app')

