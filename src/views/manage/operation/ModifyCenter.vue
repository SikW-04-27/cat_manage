<template>
  <div class="avatar">
      <img src="https://img2.baidu.com/it/u=1305759230,3688102309&fm=26&fmt=auto&gp=0.jpg" alt="">
  </div>

  <!-- 修改主体 -->
  <el-form :inline="true" :model="formInline" class="demo-form-inline">

  <el-form-item label="姓名">
    <el-input v-model="formInline.name" placeholder="姓名"></el-input>
  </el-form-item><br>

  <el-form-item label="方向">
    <el-select v-model="formInline.direction" placeholder="方向">
      <el-option label="前端" value="qianduan"></el-option>
      <el-option label="后台" value="houtai"></el-option>
    </el-select>
  </el-form-item><br>

  <el-form-item label="学号">
    <el-input v-model="formInline.studentid" placeholder="学号"></el-input>
  </el-form-item><br>

  <el-form-item label="电话">
    <el-input v-model="formInline.phone" placeholder="电话"></el-input>
  </el-form-item><br>

  <el-form-item>
      <router-link to="/manage/checkcenter">
        <ManageButton @click="onSubmit">保存修改</ManageButton>
      </router-link>
    
  </el-form-item>
</el-form>
</template>

<script>
  import {reactive} from 'vue'
  import ManageButton from '../../../components/ManageButton.vue'
  export default {
    components:{ManageButton},
    setup(props) {
        let formInline = reactive({
          name: '',
          direction: '',
          phone: 13131313131,
          studentid: 31210004444,
        })

        function onSubmit() {
          console.log('submit!');
        }

        return {
            formInline,
            onSubmit,
        }
    }
  }
</script>

<style lang="scss" scoped>
    .avatar{
        width: 150px;
        margin: 20px auto;
        img{
            width: 150px;
            height: 150px;
            border-radius: 50%;
        }
    }
    .updatainfo{
        width: 100px;
        height: 30px;
        border-radius: 10px;
    }
    .el-form{
        // width: 300px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        .el-input{
            width: 200px;
            
        }
    }
</style>