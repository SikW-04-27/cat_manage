<template>
  <div class="appointment_block">
      <transition-group
      name="animate__animated animate__bounce"
      enter-active-class="animate__zoomIn"
    >
      <el-table
        :data="tableData"
        height="527"
        style="width: 80%"
        key="1"
        v-show="hide"
      >
        <el-table-column type="index" label=""> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="direction" label="方向"> </el-table-column>
        <el-table-column prop="studentId" label="学号"></el-table-column>
        <el-table-column prop="college" label="学院"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <button>111</button>
      </el-table>

      <div class="button_block" v-show="hide">
          <ManageButton @click="back">返回</ManageButton>
          <ManageButton @click="deletetime">删除该预约时间段</ManageButton>
      </div>
    </transition-group>
  </div>
</template>

<script>
    import {appointment_listUser,deleteAppointmentInfo} from '../../../request/api'
    import { useRouter } from "vue-router";
    import {onMounted, reactive, ref} from 'vue'
    import ManageButton from '../../../components/ManageButton.vue'
    import { ElLoading, ElMessageBox, ElMessage } from "element-plus";
    export default {
        components:{ManageButton},
        setup(){
            let tableData = reactive([])
            let hide = ref(false)
            const router = useRouter();
            let id = window.sessionStorage.getItem('appointment_people')

            // 返回按钮
            let back = function(){
                router.back();
            }

            // 删除该时间段
            let deletetime = function(){
                ElMessageBox.confirm("是否删除该时间段?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(()=>{
                    let loadingInstance = ElLoading.service({fullscreen: true,background: "rgba(55, 55, 55, 0.699)",});
                    deleteAppointmentInfo({
                        id:parseInt(id)
                    }).then(res=>{
                        loadingInstance.close();
                        if(res.code === 1202){
                            ElMessage.success(res.message)
                            router.replace({
                                path:'/manage/modifyprocess'
                            })
                        }else if(res.code === 1516){
                            ElMessage.error(res.message)
                        }
                    })
                })
                
            }

            onMounted(()=>{
                let loadingInstance = ElLoading.service({fullscreen: true,background: "rgba(55, 55, 55, 0.699)",});
                appointment_listUser({
                    id: parseInt(id)
                }).then(res => {
                    loadingInstance.close();
                    hide.value = true
                    tableData.push(...res.data)
                }).catch(err =>{
                    loadingInstance.close();
                    hide.value = true
                    if(err.data.code === 1515){
                        ElMessage.error(err.data.message)
                    }
                })
            })

            return {
                tableData,
                hide,
                back,
                deletetime
            }
        }
    }
</script>

<style lang='scss' scoped>
    .appointment_block{
        width: 1200px;
        height: 600px;
        text-align: center;

        .button_block{
            margin: 0 auto;
            width: 960px;
            display: flex;
            justify-content: space-between;
        }
    }
    .el-table{
        margin: 20px auto;
    }
</style>