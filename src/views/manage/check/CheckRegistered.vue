<template>
  <div class="registeredlist_block">
    <el-input
      v-model="search"
      size="medium"
      prefix-icon="el-icon-search"
      placeholder="输入关键字搜索"/>
    <transition-group name="animate__animated animate__bounce" enter-active-class="animate__zoomIn">
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()) || data.direction.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%;"
        max-height="480"
        key="1"
        v-show="hide"
        @row-click='rowclick'
        >
        <el-table-column prop="registerTime" label="报名日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="direction" label="方向" width="120"></el-table-column>
        <el-table-column prop="studentId" label="学号" width="120"></el-table-column>
        <el-table-column prop="major" label="学院" width="200"></el-table-column>
        <el-table-column prop="college" label="专业" width="200"></el-table-column>
        <el-table-column prop="phoneNumber" label="联系方式" width="240"></el-table-column>
      </el-table>
    </transition-group>
  </div>
  
</template>

<script>
  import {onMounted, reactive, ref} from 'vue'
import { useRouter } from 'vue-router'
  import {enrolllist} from '../../../request/api'
import {ElLoading, ElMessageBox, ElMessage  } from 'element-plus'
  export default {
    setup(props) {
      let tableData = reactive([])
      let search = ref('')
      let hide = ref(false)
    const router = useRouter();

      let rowclick = function(row, column, event) {
        console.log(JSON.stringify(row));
        window.sessionStorage.setItem('user_register',JSON.stringify(row))
        router.push({
          path:'/checkpersonal'
        })
      }

      onMounted(()=>{
        let loadingInstance = ElLoading.service({fullscreen:false,target:'.ratinglist_block',background:'transparent',text:'拼命加载中'});
        enrolllist().then(res => {
          hide.value = true;
          console.log(res);
          tableData.push(...res.data)
          loadingInstance.close()
        }).catch(err => {
          console.log(err);
          loadingInstance.close()
          ElMessage.error('加载错误，请刷新')
        })
      })


      return{
        tableData,
        search,
        hide,
        rowclick
      }
    },
    
  }
</script>

<style lang="scss" scoped>

    .registeredlist_block{
      height: 500px;
      text-align: center;

      .el-input{
        margin-top: 20px;
        width: 300px;
      }

      .el-table {
        cursor: pointer;
        --el-table-row-hover-background-color: gray;
      }
    }

    

    
    
    

</style>