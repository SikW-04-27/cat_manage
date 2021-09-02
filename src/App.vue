<template>
  <div class="middle">
    <!-- <Manage></Manage> -->
    <!-- <Login></Login> -->
    <!-- <router-link to='/manage'>2222</router-link> -->
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
  // background-color: #292d3f;
  // background: url('./assets/img/bg.jpg') no-repeat 100% 100%;
  background-image: url('./assets/img/bg6.png');
  // background-image: url('./assets/img/bg1.jpg');
  // background-image: url('./assets/img/bg2.png');
  // background-size: contain;
  // background-image: url('./assets/img/bg5.jpg');

  background-size: cover;
}
.middle {
  width: 1200px;
  margin: 0 auto;
}

 


</style>