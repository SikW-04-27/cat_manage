<template>
    <div class="message_block">
        <el-input placeholder="推送消息给全部用户" v-model="message"></el-input>
        <ManageButton @click="send_message">发送</ManageButton>
        <el-divider></el-divider>
        <el-input placeholder="推送通过消息" v-model="win_message"></el-input>
        <ManageButton @click="push_message">发送</ManageButton><br><br>
        <el-input placeholder="推送淘汰消息" v-model="lose_message"></el-input><br><br>
    </div>
    
</template>

<script>
import ManageButton from '../../../components/ManageButton.vue'
import {pushToAll,message_push,pass,listAllUser} from '../../../request/api'
import { ElLoading, ElMessageBox, ElMessage } from "element-plus";
import {reactive, ref} from 'vue'
    export default {
        components: { ManageButton },
        setup(){
            let message = ref('')
            let win_message = ref('')
            let lose_message = ref('')
            let pass_people = reactive([])

            // 发送信息给全部用户
            let send_message = function(){
                ElMessageBox.confirm('是否发送信息给全体成员','提示',{
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    let loadingInstance = ElLoading.service({fullscreen: true,background: "rgba(55, 55, 55, 0.699)",});
                    pushToAll({
                        content: message.value
                    }).then(res => {
                        loadingInstance.close()
                        ElMessage.success('推送成功')
                    }).catch(err=>{
                        ElMessage.error('推送失败')
                    })
                })
                
            }

            // 推送通过或者淘汰的信息给用户
            let push_message = function(){
                if(win_message.value && lose_message.value){
                    ElMessageBox.confirm('是否发送通过淘汰信息','提示',{
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        let loadingInstance = ElLoading.service({fullscreen: true,background: "rgba(55, 55, 55, 0.699)",});
                        listAllUser().then(res => {
                            pass_people.splice(0,pass_people.length)
                            for(let x of res.data){
                                pass_people.push(x.uuid)
                            }
                            pass({
                                ids: pass_people,
                            }).then(res => {
                                message_push({
                                    passContent: win_message.value,
                                    eliminateContent: lose_message.value,
                                }).then(res=>{
                                    loadingInstance.close()
                                    if(res.code == 1800){
                                        ElMessage.success(res.message)
                                    }else if(res.code == 1902){
                                        ElMessage.warning(res.message)
                                    }
                                    console.log(res);
                                })
                            })
                        })
                    })
                }else{
                    ElMessage.warning('请完善通过信息或者淘汰信息')
                }
            }

            return {
                message,
                win_message,
                lose_message,
                send_message,
                push_message,
            }
        }
        
    }
</script>

<style lang='scss' scoped>
    .message_block{
        width: 1200px;
        // text-align: center;
        padding-top: 30px;
    }
    .el-input{
        width: 500px;
        margin-right: 20px;
    }
</style>