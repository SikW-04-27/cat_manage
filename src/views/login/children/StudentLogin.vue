<template>
   <div id="student-login" class="">
    <input type="text" v-model="studentMail" placeholder="账户" >
    <input type="text" v-model="studentPassword" placeholder="密码">
    <div></div>
    <button @click="register">登录</button> 
  </div>
</template>

<script>
import {ref} from 'vue'
import {useRouter} from 'vue-router'

export default {

    name: 'StudentLogin',
    setup() {
        let studentMail = ref('');
        let studentPassword = ref('');

        let router = useRouter()

        let register = function(){
          router.push({
            path: '/manage/checkcenter'
          })
        }

        return {
            studentMail,
            studentPassword,
            register
        }
    }

}
</script>

<style lang="scss">
#student-login {
//   margin: 65px auto;
  width: 400px;
  height: 220px;
  color: #fff;
  text-align: center;
  /* background-color: blue; */

  input {
    margin-top: 28px;
    width: 280px;
    height: 30px;
    color: red;
    padding-left: 8px;
    border: 1px solid red
  }

  button {
    margin-top: 15px;
    width: 120px;
    height: 36px;
  }

}

</style>