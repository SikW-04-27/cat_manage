<template>
  <div class="student_register">
    <div>注册</div>
    <input type="text" v-model="name" placeholder="用户名" />
    <input type="text" v-model="mail" placeholder="邮箱" />
    <input type="password" v-model="password" placeholder="密码" />
    <input type="text" v-model="managerKey" placeholder="管理员秘钥" />
    <div class="student-register-tips">{{ tips }}</div>
    <div class="register_button">
      <ManageButton @click="login">返回登录</ManageButton>
      <ManageButton @click="register">注册</ManageButton>
    </div>
    
  </div>
</template>


<script>
import { ref, onUpdated, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import ManageButton from "../../components/ManageButton.vue"
import { userRegister } from "../../request/api";
import checkAccountFormate from "../../utils/checkAccountFormat.js";
import {ElLoading, ElMessageBox, ElMessage  } from 'element-plus'

export default {
  components:{
    ManageButton,
  },
  setup(props, context) {
    let name = ref("");
    let mail = ref("");
    let password = ref("");
    let managerKey = ref("");
    let tips = ref("");
    // 点击发送验证码后不能重复点击
    let flag = ref(true);

    const router = useRouter();

    function login(){
      router.push({
        path: '/login'
      })
    }

    function register() {
      if (
        !name.value.trim() ||
        !mail.value.trim() ||
        !password.value.trim() ||
        !managerKey.value.trim()
      ) {
        tips.value = "请先完善所有信息";
        return;
      }

      let checkInfo = checkAccountFormate(
        name.value,
        mail.value,
        password.value
      );

      if (!checkInfo[0]) {
        console.log(checkInfo);
        tips.value = checkInfo[1];
      } else {
        tips.value = "";
        let loading = ElLoading.service({fullscreen:true,background:'rgba(49, 49, 49, 0.856)'})
        userRegister({
          userName: name.value,
          email: mail.value,
          password: password.value,
          identity: 0,
          verificationCode: managerKey.value,
        }).then((result) => {
            console.log(result);
            if (result.code === 3100) {
              loading.close();
              router.push({
                path: "/login",
              });
            } else {
              loading.close();
              ElMessage.error(result.message);
            }
          }).catch((error) => {
            loading.close();
            ElMessage.error(error);
          });
      }
    }

    return {
      name,
      mail,
      password,
      managerKey,
      tips,
      flag,
      login,
      register,
    };
  },
};
</script>

<style lang="scss" scoped>
.student_register {
  margin: 150px auto;
  width: 400px;
  height: 330px;
  text-align: center;
  color: #fff;

  input {
    // display: block;
    padding: 10px;
    margin-top: 28px;
    width: 210px;
    height: 30px;
    color: rgb(95, 94, 94);
    font-size: 13px;
  }

  .click-checkNumber {
    position: absolute;
    bottom: 100px;
    right: 50px;
    font-size: 12px;
  }

  .student-register-tips {
    font-size: 12px;
    height: 30px;
    line-height: 30px;
  }

  .register_button{
    margin: 0 auto;
    width: 210px;
    display: flex;
    justify-content: space-between;
  }
}

</style>