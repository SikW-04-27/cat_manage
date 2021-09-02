<template>
  <div class="avatar">
    <img src="https://img2.baidu.com/it/u=1305759230,3688102309&fm=26&fmt=auto&gp=0.jpg" alt=""/>
  </div>
  <div class="modifyinfo">
    <p style="font-size:20px">{{user_process}}</p><br>
    分数：<el-input type="number" v-model="score" placeholder="请输入分数" max="100" min="0"></el-input><br><br>
    评价：<el-input type="textarea" v-model="desc" resize="none" :rows="5" ></el-input><br><br><br><br><br><br><br>

  <ManageButton @click="comfirm">确认修改</ManageButton>
  </div>

</template>

<script>
import { ref,onMounted } from "vue";
import { useRouter } from "vue-router";
import {addAppraise} from '../../../request/api'
import ManageButton from '../../../components/ManageButton.vue'
export default {
  components:{ManageButton},
  setup(props) {
    let user_process = ref('')
    let score = ref('');
    let desc = ref('')
    const router = useRouter();

    onMounted(()=>{
      let user_status = JSON.parse(window.sessionStorage.getItem('user_status') );
      user_process.value = user_status.label;
    })
    
    let comfirm = function(){
      console.log(score.value);
      console.log(desc.value);
      addAppraise({
        "adminId":"FABynYGg",
        "comment":"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
        "recruitmentId":5,
        "score":55,
        "userId":2
      }).then(res => {
        console.log(res);
      })
      router.push({
        path:"/manage/checkdetialpoint"
      })
    }

    return {
      user_process,
      score,
      desc,
      comfirm
      }
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

    .modifyinfo{
        text-align: center;
        color: #fff;
        .el-input{
            width: 200px;
        };
        .el-textarea{
            width: 300px;
            height: 20px;
        }
    }

</style>