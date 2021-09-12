<template>
  <div class="queue_block">
    <el-table
      class="el-table-scolled"
      :data="tableData"
      height="400"
      style="width: 45%"
    >
      <el-table-column prop="num" label="序号"> </el-table-column>
      <el-table-column prop="userName" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="studentId" label="学号" width="180">
      </el-table-column>
    </el-table>

    <div class="modify_status">
      <!-- <div class="border_block"> -->
      {{ signin_status }}<br /><br />
      <ManageButton @click="start_signin" style="margin-right: 20px">开始签到</ManageButton>
      <ManageButton @click="end_signin">结束签到</ManageButton><br />
      <!-- </div> -->
      <el-divider></el-divider>
      <!-- <div class="border_block"> -->
      当前面试：{{ usering }} <br /><br />
      <ManageButton @click="confirm_join" style="margin-right: 40px">确认参加</ManageButton>
      <ManageButton @click="not_join" style="margin-right: 40px">未参加</ManageButton>
      <ManageButton @click="next_user">通知下一个人来面试</ManageButton><br />
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import {
  startQueue,
  closeQueue,
  checkStatus,
  listWaitingUser,
  getUser,
  participate,
  notParticipate,
  pushToUser,
  pushToAll,
  appointmentclose,
  batcheliminate
} from "../../../request/api";
import ManageButton from "../../../components/ManageButton.vue";
import { ElLoading, ElMessageBox, ElMessage } from "element-plus";
import { onMounted, reactive, ref,  } from "vue";
export default {
  components: { ManageButton },
  setup(props) {
    let signin_status = ref("...");
    let tableData = reactive([]);
    let interviewing = ref("");
    let usering = ref("无");

    // 管理员开启开始签到
    let start_signin = function () {
      ElMessageBox.confirm("确定开始签到", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        signin_status.value = '...'
        startQueue()
          .then((res) => {
            if (res.code === 1100) {
              pushToAll({
                content:'签到已经开放，可以签到啦'
              }).then(res=>{
                signin_status.value = "当前处于签到状态";
                ElMessage.success({
                  message: `${res.message}`,
                  type: "success",
                });
              })
              appointmentclose()
              
            } else if (res.code === 1300) {
              ElMessage.warning({
                message: `${res.message}`,
                type: "warning",
              });
            }
          })
          .catch((err) => {
            ElMessage.error("请求失败");
          });
      });
    };

    // 管理员关闭签到状态
    let end_signin = function () {
      ElMessageBox.confirm("确定开始签到", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        signin_status.value = '...'
        closeQueue()
          .then((res) => {
            if (res.code === 1104) {
              signin_status.value = "暂未处于签到状态";
              ElMessage.success({
                message: `${res.message}`,
                type: "success",
              });
            } else {
              ElMessage.warning({
                message: `${res.message}`,
                type: "warning",
              });
            }
          })
          .catch((err) => {
            ElMessage.error("请求失败");
          });
      });
    };

    // 确认参加来面试
    let confirm_join = function () {
      ElMessageBox.confirm("是否确认该学生参加面试", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        participate({
          id: interviewing.value,
        }).then((res) => {
          console.log(res);
          if(res.code === 1310){
            ElMessage.error(res.message)
          }else{
            pushToUser({
              content: `面试已经结束，请你耐心等候结果`,
              id: interviewing.value,
            }).then(res=>{
              ElMessage.success('确认参加成功，请通知下个人面试')
            })
          }
          
        });
      });
    };

    // 确认没来参加面试
    let not_join = function () {
      ElMessageBox.confirm("是否确认该学生未参加面试", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        notParticipate({
          id: interviewing.value,
        }).then((res) => {
          console.log(res);
          if(res.code === 1310){
            ElMessage.error(res.message)
          }else{
            let deleteselect = [interviewing.value]
            console.log(deleteselect);
            batcheliminate({
              ids: deleteselect
            }).then(res=>{
              ElMessage.success('确认该用户没来')
            })
            
          }
        }).catch(err => {

        })
      });
    };

    // 通知下一个来面试
    let next_user = function () {
      getUser()
        .then((res) => {
          interviewing.value = res.data.id;
          usering.value = res.data.userName;
          console.log(res);
          pushToUser({
            content: `请${res.data.userName}前往面试`,
            id: res.data.id
          }).then(res=>{
            ElMessage.success('通知成功')
          })
        })
        .catch((err) => {
          console.log(err);
          ElMessage.error(err.data.message);
        });
    };

    //实时更新数据
    let openSocket = function () {
      var socket;
      let token = window.localStorage.getItem("token");
      var socketUrl = `http://112.74.33.254:2358/ws/queue/${token}`;
      socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");
      if (socket != null) {
        socket.close();
        socket = null;
      }
      socket = new WebSocket(socketUrl);
      socket.onopen = function () {
        console.log("websocket已打开");
      };
      socket.onmessage = function (msg) {
        let mesData = JSON.parse(msg.data);
        tableData.splice(0, tableData.length);
        tableData.push(...mesData);
      };
      socket.onclose = function (e) {
        console.log(
          "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
        );
        openSocket();
      };
    };

    onMounted(() => {
      openSocket();
      listWaitingUser().then((res) => {
        if(res.code === 1309){
          console.log(tableData);
        }else{
          console.log(res);
          tableData.push(...res.data);
          console.log(tableData);
        }
       
      });
      checkStatus().then((res) => {
        signin_status.value = res.message;
      });
    });

    return {
      tableData,
      signin_status,
      usering,
      start_signin,
      end_signin,
      next_user,
      confirm_join,
      not_join,
    };
  },
};
</script>

<style lang="scss">
.queue_block {
  width: 1200px;
  display: flex;
  justify-content: space-between;
  .modify_status {
    width: 500px;
    margin: 40px;
    color: #fff;
    font-size: 20px;
    .border_block {
      border: 2px solid skyblue;
      padding: 20px;
      margin-bottom: 15px;
    }
  }
}
</style>