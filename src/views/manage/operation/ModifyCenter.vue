<template>
  <div class="center_block">
      <div class="avatar">
      <img :src="avatarimg" alt="" />
      <label for="changefile">更改头像</label>
      <input type="file" @change="changeImg" id="changefile" />
    </div>

    <!-- 修改主体 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input
          v-model="formInline.name"
          placeholder="姓名"
        ></el-input> </el-form-item
      ><br />

      <el-form-item label="方向">
        <el-select v-model="formInline.direction" placeholder="方向">
          <el-option label="前端" value="前端"></el-option>
          <el-option label="后台" value="后台"></el-option>
        </el-select> </el-form-item
      ><br />

      <el-form-item label="学号">
        <el-input
          v-model="formInline.studentid"
          placeholder="学号"
        ></el-input> </el-form-item
      ><br />

      <el-form-item label="电话">
        <el-input
          v-model="formInline.phone"
          placeholder="电话"
        ></el-input> </el-form-item
      ><br />
    </el-form>
    <div class="button">
      <ManageButton @click="back">返回</ManageButton>
      <ManageButton @click="save">保存修改</ManageButton>
    </div>
  </div>
  
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { avatar, getavatar, complete } from "../../../request/api";
import { ElLoading, ElMessageBox, ElMessage } from "element-plus";
import ManageButton from "../../../components/ManageButton.vue";
import axios from "axios";
export default {
  components: { ManageButton },
  setup(props) {
    const router = useRouter();
    let manage_info = JSON.parse(window.localStorage.getItem('manageinfo'))
    let avatarimg = ref("https://img1.baidu.com/it/u=982817805,3596061521&fm=26&fmt=auto&gp=0.jpg");
    let formInline = reactive({});

    // 返回上一级
    let back = function(){
      router.back()
    }

    // 保存修改
    let save = function () {
      if(formInline.name !== ''&& formInline.phone!=='' && formInline.studentid !== '' && formInline.direction !== ''){
        let loadingInstance = ElLoading.service({fullscreen: true,background: "rgba(55, 55, 55, 0.699)",});
        complete({
          name:formInline.name,
          phoneNumber:formInline.phone,
          studentId:formInline.studentid,
          direction:formInline.direction
        }).then(res=>{
          loadingInstance.close()
          router.back()
        }).catch(err => {
          loadingInstance.close()
          ElMessage.error(err.data.message)
        })
      }else{
        ElMessage.error('请先完善相关信息')
      }
      
    };

    // 更改头像
    let changeImg = function (e) {
      ElMessageBox.confirm("确定更改头像?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let file = new FormData();
        file.append("file", e.target.files[0]);
        let token = window.localStorage.getItem("token");
        let loadingInstance = ElLoading.service({
          fullscreen: false,
          target: ".avatar",
          background: "rgba(55, 55, 55, 0.699)",
        });
        axios.interceptors.request.use(
          (config) => {
            config.headers.accessToken = token;
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
        axios
          .post("http://47.107.49.231/upload/avatar", file, {
            headers: {
              "Content-Type": "multipart/form-data; boundary=ABCD",
            },
          })
          .then((res) => {
            if(res.data.code === 4009){
              loadingInstance.close();
              ElMessage.warning(res.data.message)
            }else{
              loadingInstance.close();
              console.log(res);
              avatarimg.value = res.data.data;
            }
            
          })
          .catch((err) => {
            console.log(err);
            loadingInstance.close();
          });
      });
    };

    onMounted(() => {
      let loadingInstance = ElLoading.service({
        fullscreen: false,
        target: ".avatar",
        background: "rgba(55, 55, 55, 0.699)",
      });
      getavatar().then((res) => {
        loadingInstance.close();
        avatarimg.value = res.data;
      });
      if(!manage_info){
        formInline.name = null;
        formInline.direction = null;
        formInline.phone = null;
        formInline.studentid = null;
        console.log(formInline);
      }else{
        formInline.name = manage_info.name;
        formInline.direction = manage_info.direction;
        formInline.phone = manage_info.phoneNumber;
        formInline.studentid = manage_info.studentId;
      }
    });

    return {
      avatarimg,
      formInline,
      back,
      save,
      changeImg,
    };
  },
};
</script>

<style lang="scss" scoped>
  .middle {
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    margin: 20px auto;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
    label {
      display: block;
      width: 150px;
      height: 35px;
      background-color: rgba(32, 33, 34, 0.671);
      position: relative;
      top: -35px;
      text-align: center;
      line-height: 35px;
      color: rgb(218, 216, 216);
      font-size: 14px;
      cursor: pointer;
    }
    input {
      display: none;
    }
  }
  .updatainfo {
    width: 100px;
    height: 30px;
    border-radius: 10px;
  }
  .el-form {
    // width: 300px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    .el-input {
      width: 200px;
    }
  }

  .button {
    width: 230px;
    margin: 0 auto;
    padding-left: 10px;
    text-align: center;
    display: flex;
    justify-content: space-between;
  }
</style>