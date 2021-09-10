<template>
    <div class="process">
        <!-- 查看全部预约时间 -->
        <el-table
            class="el-table-scolled"
            @row-click='clickrow'
            :data="tableData"
            height="400"
            style="width: 45%">
            <el-table-column
            prop="beginTime"
            label="开始时间"
            width="180">
            </el-table-column>
            <el-table-column
            prop="endTime"
            label="结束时间"
            width="180">
            </el-table-column>
            <el-table-column
            prop="count"
            label="人数">
            </el-table-column>
        </el-table>

        <!-- 添加预约时间 -->
        <div class="block">
            <span class="demonstration">起始时间：</span>
            <el-date-picker
                v-model="beginTime"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker><br><br>
            <span class="demonstration">结束时间：</span>
            <el-date-picker
                v-model="endTime"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker><br><br>
            <span class="demonstration">预约人数：</span>
            <el-input-number v-model="count" :min="1" label="描述文字" style="margin-right:30px"></el-input-number>
            <ManageButton @click="addappointment">添加预约</ManageButton>

            <!-- 分割线 -->
            <el-divider ></el-divider>
            当前预约状态：{{appointment_status}} <br><br>
            <ManageButton @click="appointment_start" style="margin-right:30px">开启预约</ManageButton>
            <ManageButton @click="appointment_close">关闭预约</ManageButton><br>
        </div>


    </div>

</template>

<script>
import { onMounted, reactive,ref } from 'vue'
import {useRouter} from 'vue-router'
import ManageButton from '../../../components/ManageButton.vue'
import {ElLoading, ElMessageBox, ElMessage  } from 'element-plus'
import '../../../../node_modules/dayjs/dayjs.min.js'
import {listAppointment,saveNewAppointmentInfo,deleteAppointmentInfo,deleteAllAppointmentInfo,appointmentstart,appointmentcheck,appointmentclose} from '../../../request/api'
    export default {
        components:{ManageButton},
        setup(props) {
            let id= ref(0)
            let tableData = reactive([])
            let beginTime = ref('')
            let endTime = ref('')
            let count = ref(0)
            let deleteId = ref(0)
            let appointment_status = ref('...')
            const router = useRouter();

            

            //添加预约时间
            let addappointment = function(){
                ElMessageBox.confirm('是否添加此预约时间?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(()=>{
                    let beginTime_value = dayjs(beginTime.value).format('YYYY-MM-DD HH:mm:ss')
                    let endTime_value = dayjs(endTime.value).format('YYYY-MM-DD HH:mm:ss')
                    let count_value = count.value
                    let loadingInstance = ElLoading.service({fullscreen: false,target: ".el-table__body-wrapper",background: "rgba(55, 55, 55, 0.699)",});
                    saveNewAppointmentInfo({
                        "beginTime":beginTime_value,
                        "endTime":endTime_value,
                        "count":count_value
                    }).then(res => {
                        // 判断是否设置成功
                        if(res.code === 1200){
                            // 设置成功则重新加载列表
                            listAppointment({}).then(res => {
                                tableData.splice(0,tableData.length);
                                tableData.push( ...res.data);
                                loadingInstance.close()
                            }).catch(err => {
                                loadingInstance.close()
                                ElMessage.error(err.data.message)
                            })
                        }else if(res.code === 40300){
                            loadingInstance.close()
                            ElMessage({
                                type: 'info',
                                message: res.message,
                            });
                        }
                        
                    }).catch(err => {
                        loadingInstance.close()
                        ElMessage.error(err.data.message)
                    })
                })
                
            }

            // 开启预约
            let appointment_start = function(){
                ElMessageBox.confirm('是否开启预约', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(()=>{
                    appointment_status.value = '...'
                    appointmentstart().then(res=>{
                        if(res.code === 1512){
                            ElMessage.warning(res.message)
                        }else{
                            ElMessage.success(res.message)
                            appointment_status.value = '预约开启'
                        }
                    })
                })
                
            }

            // 关闭预约
            let appointment_close = function(){
                ElMessageBox.confirm('是否关闭预约', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(()=>{
                    appointment_status.value = '...'
                    appointmentclose().then(res => {
                        if(res.code === 1513){
                            ElMessage.warning(res.message)
                        }else{
                           ElMessage.success(res.message)
                            appointment_status.value = '预约未开放' 
                        }
                    })
                })
                
            }

            // 点击行
            let clickrow = function(row){
                window.sessionStorage.setItem('appointment_people',row.id)
                router.push({
                    path:'/manage/checkappointment'
                })
            }

            onMounted(()=>{
                let loadingInstance = ElLoading.service({fullscreen: false,target: ".el-table__body-wrapper",background: "rgba(55, 55, 55, 0.699)",});
                // 查看全部预约时间
                listAppointment({}).then(res => {
                    loadingInstance.close()
                    tableData.push( ...res.data)
                })
                // 检查当前预约状态
                appointmentcheck().then(res=>{
                    appointment_status.value = res.message
                })
            })
            

            return {
                id,
                deleteId,
                tableData,
                beginTime,
                endTime,
                count,
                appointment_status,
                addappointment,
                appointment_start,
                appointment_close,
                clickrow,
            }
        }
    }
</script>

<style lang="scss" scoped>
    .process{
        display: flex;
        justify-content: space-between;

        .block{
            width: 600px;
            height: 300px;
            margin-top: 40px;
            .demonstration{
                color: #fff;
            }
            // 分割线
            .el-divider {
                width: 70%;
            }

        }
    }

</style>