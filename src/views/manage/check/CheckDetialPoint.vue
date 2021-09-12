<template>
<div class="point_block">
    <el-page-header @back="goBack" content="查看分数"> </el-page-header>
    <div class="personinfo">
        <p>姓名：{{user_name}}</p>
        <p>学号：{{user_id}}</p>
        <p>阶段：{{user_process}}</p>
        <router-link to="/manage/modifyrating">
            <ManageButton>修改分数</ManageButton>
        </router-link>
    </div>

    <div class="avatar">
      <img :src="avatarimg" alt="用户头像"/>
    </div>
    <div class="modifyinfo">
    <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
        prop="adminName"
        label="管理员"
        width="180">
        </el-table-column>
        <el-table-column
        prop="score"
        label="分数"
        width="180">
        </el-table-column>
        <el-table-column
        prop="comment"
        label="评价">
        </el-table-column>
    </el-table>
    </div>
</div>


</template>

<script>
import { ref,onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import ManageButton from "../../../components/ManageButton.vue";
import {getavatar} from '../../../request/api'
export default {
  components:{ManageButton},
  setup(props) {
    let user_name = ref('');
    let user_id = ref(0); 
    let user_process = ref(''); 
    let tableData = reactive([]);
    let avatarimg = ref('https://img1.baidu.com/it/u=982817805,3596061521&fm=26&fmt=auto&gp=0.jpg')
    const router = useRouter()

    let goBack = function(){
      router.back()
    }


    onMounted(()=>{
      let user_point = JSON.parse( window.sessionStorage.getItem('user_point'));
      let user_status = JSON.parse( window.sessionStorage.getItem('user_status'));
      console.log(user_point);
      user_name.value = user_point.name;
      user_id.value = user_point.studentId;
      user_process.value = user_status.label;
      avatarimg.value = `http://47.107.49.231${user_point.photo}`

      switch (user_status.label){
        case '笔试':
          tableData.push(...user_point.userAppraiseExam);
          break
        case '一轮面试':
          tableData.push(...user_point.userAppraiseFirstInterview);
          break
        case '二轮面试':
          tableData.push(...user_point.userAppraiseSecondInterview);
          break
        case '一轮考核':
          tableData.push(...user_point.userAppraiseFirstReview);
          break
        case '二轮考核':
          tableData.push(...user_point.userAppraiseSecondReview);
          break
      }
      
    })

    return {
      user_name,
      user_id,
      user_process,
      tableData,
      avatarimg,
      goBack
    }
  },
};
</script>

<style lang="scss" >
  .point_block{
    // 页眉
    .el-page-header{
      height: 30px;
      margin-top: 10px;
        .el-page-header__title,.el-icon-back{
          font-size: 20px;
      }
      .el-page-header__content{
        color: rgb(173, 173, 173);
      }
    }

    // 用户信息
    .personinfo{
        width: 300px;
        height: 200px;
        position: absolute;
        margin: 20px;
        color: #fff;
        font-size: 20px;
        p{
          margin-bottom: 10px;
        }
    }

    // 头像
    .avatar {
        width: 150px;
        height: 150px;
        margin: 20px auto;
        margin-bottom: 50px;
        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
        }
    }
  }

</style>