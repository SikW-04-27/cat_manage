<template>
  <div class="loginbox">
    <div class="login_title">登录</div>

    <div class="manage_login">
      <input type="text" v-model="mail" placeholder="账户" />
      <input type="password" v-model="password" placeholder="密码" />
      <div>{{ tips }}</div>
      <div class="login_button">
        <ManageButton @click="login">登录</ManageButton>
        <ManageButton @click="register">账号注册</ManageButton>
      </div>
      
    </div>
  </div>
  
</template>


<script>
import { ref, onMounted } from "vue";
import {useRouter} from 'vue-router'
import ManageButton from '../../components/ManageButton.vue'
import {ElLoading, ElMessageBox, ElMessage  } from 'element-plus'

// import AccountOperate from "../../components/AccountOperate.vue";
import {userLogin,complete,attain} from '../../request/api'

export default {
  name: "Login",
  components: {
    ManageButton,
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
        let loading = ElLoading.service({fullscreen:true,background:'rgba(49, 49, 49, 0.856)'})
        userLogin({
          keyWord: mail.value,
          password: password.value,
        }).then((result) => {
            console.log(result);
            const code = result.code;
            if (code === 2100) {
              localStorage.setItem("token", result.data.token);
              loading.close();
              router.push({
                path: '/manage/checkcenter'
              })
              location.reload()
              
            } else {
              loading.close();
              ElMessage.error(result.message);
            } 
            
          }).catch((e) => {
            loading.close(e);
            ElMessage.error('请求失败，请重新登录');
          });
      }
    }

    function register(){
      router.push({
        path: '/register'
      })
    }

    onMounted(() => {
      let token = window.localStorage.getItem('token');
      if(token){
        router.push({
          path: '/manage/checkcenter'
        })
      }
    })

    return {
      mail,
      password,
      tips,
      login,
      register,
    };
  },
};
</script>

<style lang="scss" scoped>
/* @import "tailwindcss/tailwind.css"; */
/* @import '../../assets/scss/normalize.css'; */
.loginbox{
  text-align: center;
  width: 500px;
  margin: 100px auto;

  .login_title{
    text-align: center;
    margin: 0 auto;
    font-size: 20px;
  }

  .manage_login {
  margin: 0 auto;
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
    width: 300px;
    height: 30px;
    color: rgb(182, 179, 179);
    font-size: 13px;
  }

  .login_button{
    margin: 20px auto;
    width: 300px;
    display: flex;
    justify-content: space-between;
  }
}
}




</style>