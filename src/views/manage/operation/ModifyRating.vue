<template>
  <div class="rating_block">
      <div class="avatar">
      <img
        :src="avatarimg"
        alt=""
      />
    </div>
    <div class="modifyinfo">
      <p style="font-size: 20px">{{ user_process }}</p>
      <br />
      分数：<el-input
        type="number"
        v-model="score"
        placeholder="请输入分数"
        max="100"
        min="0"
      ></el-input
      ><br /><br />
      评价：<el-input
        type="textarea"
        placeholder="请输入评价"
        v-model="desc"
        resize="none"
        :rows="5"
      ></el-input
      ><br /><br /><br /><br /><br /><br /><br />

      <div class="button_block">
        <ManageButton @click="back">返回</ManageButton>
        <ManageButton @click="comfirm">确认修改</ManageButton>
      </div>
      
    </div>
  </div>

</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElLoading, ElMessageBox, ElMessage } from "element-plus";
import { addAppraise, getUserDetailInfo } from "../../../request/api";
import ManageButton from "../../../components/ManageButton.vue";
export default {
  components: { ManageButton },
  setup(props) {
    let user_process = ref("");
    let score = ref("");
    let desc = ref("");
    let avatarimg = ref("")
    const router = useRouter();
    let manageinfo = JSON.parse(window.localStorage.getItem("manageinfo"));
    let user_point = JSON.parse(window.sessionStorage.getItem("user_point"));
    let user_status = JSON.parse(window.sessionStorage.getItem("user_status"));

    onMounted(() => {
      user_process.value = user_status.label;
      avatarimg.value = `http://47.107.49.231${user_point.photo}`
      for(let i of user_point.userAppraiseExam){
        if(i.adminName === manageinfo.name){
          score.value = i.score;
          desc.value = i.comment;
          return
        }
      }
    });

    // 添加分数评论
    let comfirm = function () {
      ElMessageBox.confirm('是否添加分数和评论?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(()=>{
        let loadingInstance = ElLoading.service({fullscreen:true,background:'rgba(55, 55, 55, 0.699)'});
        addAppraise({
          adminId: manageinfo.uuid,
          comment: desc.value,
          recruitmentId: user_status.no,
          score: score.value,
          userId: user_point.id,
        }).then((res) => {
          getUserDetailInfo({
            id:user_point.id
          }).then(res=>{
            loadingInstance.close()
            window.sessionStorage.setItem("user_point",JSON.stringify(res.data));
            router.back()
          })
          
        }).catch(err => {
            loadingInstance.close()
            console.log(err);
            // if(err.data.code === 4000){
            //   ElMessage.error(err.data.message)
            // }
          })
      })
      
    };

    // 返回上一级
    let back = function(){
      router.back()
    }

    return {
      user_process,
      score,
      desc,
      avatarimg,
      comfirm,
      back,
    };
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  width: 150px;
  margin: 20px auto;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
}

.modifyinfo {
  text-align: center;
  color: #fff;
  .el-input {
    width: 200px;
  }
  .el-textarea {
    width: 300px;
    height: 20px;
  }
  .button_block{
    position: relative;
    margin: 0 auto;
    left: 25px;
    width: 300px;
    display: flex;
    justify-content: space-between;
  }
}
</style>