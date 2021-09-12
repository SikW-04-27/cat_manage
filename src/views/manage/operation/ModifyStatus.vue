<template>
    <div class="status">
        <img src="../../../assets/img/round.png" alt="">
        <div class="nowstatus">{{status_value}}</div>
        <div class="modifystatus">
            <ManageButton @click="left" :disabled='leftable'>＜ 上一阶段</ManageButton>
            <ManageButton @click="right" :disabled='rightable'>下一阶段 ＞</ManageButton>
        </div>
        
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import ManageButton from '../../../components/ManageButton.vue'
import { ElLoading, ElMessageBox, ElMessage } from 'element-plus';
import {getCurrentStatus,updateStatus,updateStatusOnTest,toPreviousStatus,deleteAllAppointmentInfo,closeQueue} from '../../../request/api'
    export default {
        components:{ManageButton},
        setup(props) {
            let status_value = ref('...');
            let leftable = ref(false)
            let rightable = ref(false)
            

            // 获取状态并显示的函数封装
            let getStatus = function(able){
                let loadingInstance = ElLoading.service({background:'transparent',target:'.nowstatus'});
                getCurrentStatus().then(res => {
                    loadingInstance.close();
                    status_value.value = res.data.status;
                    if(status_value.value === '招新未开始'){
                        leftable.value = true;
                        return
                    }
                    if(able === 'right'){
                        leftable.value = false;
                        if( status_value.value === '最终考核'){
                            rightable.value = true;
                        }else{
                            rightable.value = false
                        }
                    }else{
                        rightable.value = false;
                        if( status_value.value ===  '招新未开始'){
                            leftable.value = true;
                        }else{
                            leftable.value = false;
                        }
                    }
                })
            }

            // 刷新页面之后显示状态
            onMounted(()=>{
                let loadingInstance = ElLoading.service({background:'transparent',target:'.nowstatus'});
                getStatus( 'right');
            })

            // 点击上一阶段
            let left =function(){
                ElMessageBox.confirm('该操作仅在测试阶段调用，请慎用','警告',{
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(res=>{
                    let loadingInstance = ElLoading.service({background:'transparent',target:'.nowstatus'});
                    toPreviousStatus().then(res => {
                        loadingInstance.close();
                        getStatus('left');
                    })
                })
                
            }

            // 点击下一阶段
            let right = function(){
                ElMessageBox.confirm('请确保当前状态的操作全部结束','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    let loadingInstance = ElLoading.service({background:'transparent',target:'.nowstatus'});
                    updateStatus().then(res => {
                        if(res.code === 1700){
                            loadingInstance.close();
                            getStatus('right');
                            // 删除全部预约时间段
                            deleteAllAppointmentInfo().then(res=>{
                                closeQueue().then(res=>{
                                    ElMessage.success('切换状态成功');
                                })
                            })
                            
                        }else if(res.code === 1403){
                            loadingInstance.close();
                            ElMessage.error(res.message)
                        }
                        
                    })
                })
                
            }

            return {
                status_value,
                leftable,
                rightable,
                left,
                right
            }
        }
    }
</script>

<style lang="scss" scoped>
    .status{
        width: 600px;
        height: 300px;
        margin: 20px auto;
        text-align: center;
        position: relative;
        img{
            width: 400px;
        }
        .nowstatus{
            position: absolute;
            top: 105px;
            left: 195px;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background-color: transparent;
            margin: 0 auto;
            padding-top: 75px;
            font-size: 24px;
            margin-bottom: 20px;
        }
        .modifystatus{
            width: 300px;
            display: flex;
            margin: 0 auto;
            justify-content: space-between;
        }
    }
</style>