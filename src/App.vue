<template>
  <div class="middle">
    <router-view></router-view>
  </div>
</template>

<script>
import Manage from "./views/manage/manage.vue";
import Login from "./views/login/Login.vue"
import { useRouter } from 'vue-router'
import {onMounted} from 'vue'

export default {
  name: "App",
  components: {
    Manage,
    Login,
  },
  setup(){
    const router = useRouter();
    onMounted(() => {
      let logining = window.sessionStorage.getItem('token');
      if(!logining){
        router.push({
          path:'/login'
        })
      }
      
    })
  }
};
</script>

<style lang="scss">
@import "./assets/scss/base.scss";
@import "./assets/scss/base.css";
@import "./assets/scss/button.scss";
@import "./assets/scss/front.scss";



body {
  background-image: url('./assets/img/bg7.png');
  background-size: cover;
}
.middle {
  width: 1200px;
  margin: 0 auto;
}

 


</style>