<template>
  <div class="center_block">
      <ManageButton @click="logout_click" class="logout_position">退出登录</ManageButton>
    <div class="avatar">
      <img :src="avatarimg" alt="" />
    </div>
    <div class="info">
      <p>姓名：{{ userName }}</p>
      <p>方向：{{ direction }}</p>
      <p>学号：{{ studentId }}</p>
      <p>手机号：{{ phoneNumber }}</p>
      <router-link to="/manage/modifycenter">
        <ManageButton>修改信息</ManageButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getavatar,attain } from "../../../request/api";
import ManageButton from "../../../components/ManageButton.vue";
import { ElLoading, ElMessageBox, ElMessage } from "element-plus";
export default {
  components: { ManageButton },
  setup() {
    let avatarimg = ref("https://img1.baidu.com/it/u=982817805,3596061521&fm=26&fmt=auto&gp=0.jpg");
    let userName = ref("");
    let studentId = ref("");
    let direction = ref("");
    let phoneNumber = ref("");
    const router = useRouter();

    // 退出登录
    let logout_click = function(){
      ElMessageBox.confirm('确定要退出登录','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        window.localStorage.clear();
        let backlen=history.length-1;
        history.go(-backlen);
        router.replace({
            path:'/login'
        })
      }).catch(()=>{
        ElMessage.success('取消成功')
      })
        
    }

    // 挂载页面信息
    onMounted(() => {
      // 加载完成前的阴影
      let loadingInstance_1 = ElLoading.service({fullscreen: true,background: "rgba(55, 55, 55, 0.699)",});
      
      // 加载个人信息
      attain().then(res=>{
        loadingInstance_1.close()
          localStorage.setItem("manageinfo", JSON.stringify(res.data));
          let user_info = JSON.parse(window.localStorage.getItem("manageinfo"));
          if(user_info){
            userName.value = user_info.name;
            studentId.value = user_info.studentId;
            direction.value = user_info.direction;
            phoneNumber.value = user_info.phoneNumber;
          }
          
          let loadingInstance = ElLoading.service({fullscreen: false,target: ".avatar",background: "rgba(55, 55, 55, 0.699)",});
          getavatar().then((res) => {
              loadingInstance.close();
              avatarimg.value = res.data;
          });
      })
    });

    return {
      avatarimg,
      userName,
      direction,
      studentId,
      phoneNumber,
      logout_click,
    };
  },
};
</script>

<style lang="scss" scoped>
.center_block{
    width: 1200px;
    position: relative;
    .logout_position{
        position: absolute;
        right: 0;
    }
    .avatar {
      width: 150px;
      margin: 20px auto;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
      }
    }
    .updatainfo {
      width: 100px;
      height: 30px;
      border-radius: 10px;
    }
    .info {
      text-align: center;
      font-size: 20px;
      color: #fff;
      p {
        margin-bottom: 10px;
      }
    }
}

</style>