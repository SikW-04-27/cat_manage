<template>
  <div>登录</div>

  <div id="student-login" class="">
    <input type="text" v-model="mail" placeholder="账户" />
    <input type="text" v-model="password" placeholder="密码" />
    <div>{{ tips }}</div>
    <button @click="login">登录</button>
  </div>
  <div class="skip-register">
        <router-link to='/register'>账号注册</router-link>
    </div>
</template>


<script>
import { ref } from "vue";
import {useRouter} from 'vue-router'

import AccountOperate from "../../components/AccountOperate.vue";
import {userLogin} from '../../request/api'

export default {
  name: "Login",
  components: {
    AccountOperate,
  },
  setup() {
    let mail = ref("");
    let password = ref("");
    let tips = ref("");

 const router = useRouter();


    function login() {
      if (!mail.value.trim() || !password.value.trim()) {
        tips.value = "邮箱或密码不能为空";
      } else {
        userLogin({
          keyWord: mail.value,
          password: password.value,
        })
          .then((result) => {
            console.log(result);
            const code = result.code;
            if (code === 2100) {
              localStorage.setItem("token", result.data.token);

              // router.push({
              //   path: '/introduction'
              // })
            } else {
              tips.value = result.message;
            } 
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }

    return {
      mail,
      password,
      tips,
      login,
    };
  },
};
</script>

<style lang="scss">
/* @import "tailwindcss/tailwind.css"; */
/* @import '../../assets/scss/normalize.css'; */
.skip-register {
  position: absolute;
  top: 16%;
  left: 30%;
  color: #fff;
  font-size: 14px;
}

#student-login {
  //   margin: 65px auto;
  width: 400px;
  height: 220px;
  color: #fff;
  text-align: center;
  /* background-color: blue; */

  input {
    padding-left: 10px;
    border-bottom: 2px solid #ffffff;
    background-color: rgba(0, 0, 0, 0) !important;
    margin-top: 28px;
    width: 210px;
    height: 30px;
    color: red;
    font-size: 13px;
  }

  button {
    margin-top: 15px;
    width: 120px;
    height: 36px;
  }
}

$color: #0bc7f4;

.myButton {
  color: $color;
  // padding: 10px 30px;
  width: 100px;
  height: 40px;
  line-height: 40px;
}

.myButton:hover {
  background: $color;
  box-shadow: 0 0 50px $color;
}

.myButton::before {
  border-top: 2px solid $color;
  border-left: 2px solid $color;
}

.myButton::after {
  border-bottom: 2px solid $color;
  border-right: 2px solid $color;
}
</style>