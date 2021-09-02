<template>
  <div id="student-register">
    <div>注册</div>
    <input type="text" v-model="name" placeholder="用户名" />
    <input type="text" v-model="mail" placeholder="邮箱" />
    <input type="password" v-model="password" placeholder="密码" />
    <input type="text" v-model="managerKey" placeholder="管理员秘钥" />
    <div class="student-register-tips">{{ tips }}</div>
    <button @click="register" class="myButton">注册</button>
  </div>
</template>


<script>
import { ref, onUpdated, onMounted, watch } from "vue";
import { useRouter } from "vue-router";


import { userRegister } from "../../request/api";
import checkAccountFormate from "../../utils/checkAccountFormat.js";

export default {
  name: "StudentRegister",
  setup(props, context) {
    let name = ref("");
    let mail = ref("");
    let password = ref("");
    let managerKey = ref("");
    let tips = ref("");
    // 点击发送验证码后不能重复点击
    let flag = ref(true);

    const router = useRouter();

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
        userRegister({
          userName: name.value,
          email: mail.value,
          password: password.value,
          identity: 0,
          verificationCode: managerKey.value,
        })
          .then((result) => {
            console.log(result);
            if (result.code === 3100) {
              router.push({
                path: "/login",
              });
            } else {
              tips.value = result.message;
            }
          })
          .catch((error) => {
            console.log(error);
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
      register,
    };
  },
};
</script>

<style lang="scss">
#student-register {
  position: relative;
  width: 400px;
  height: 330px;
  text-align: center;
  color: #fff;

  input {
    // display: block;
    margin-top: 28px;
    width: 210px;
    height: 30px;
    color: red;
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
}
</style>