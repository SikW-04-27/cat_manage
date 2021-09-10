<template>
  <div class="personal">
      <!-- 个人详细信息 -->
      <div class="introduce">
        <span>姓名: {{user_name}}</span><br><br>
        <span>学院：{{user_major}}</span><br><br>
        <span>专业班级：{{user_college}}{{user_class}}</span><br><br>
        <span>方向：{{user_direction}}</span><br><br>
        <span>学号：{{user_studentId}}</span><br><br>
        <span>手机号：{{user_phoneNumber}}</span><br><br>
        <span>自我介绍：</span>
        <div class="person_introduce">{{user_selfIntroduction}}</div>
      </div>
      <div class="avatar" >
          <img :src="avatar_photo" alt="">
      </div>
      <div style="width:1px;height:500px;background-color:#fff; margin-left:30px"></div>

      <!-- 右侧快捷列表 -->
      <el-scrollbar height="470px">
        <p class="item" v-for="(p,index) in items" :key='p.id' @click="updateitem(p)">{{index+1}}&nbsp;&nbsp; {{p.direction}}--{{p.name}}</p>
      </el-scrollbar>
  </div>

</template>

<script>
import { ref, onMounted, reactive } from 'vue'
import {ElLoading, ElMessage  } from 'element-plus'
import {enrolllist} from '../../../request/api'
export default {
    setup(){
        let user_name = ref('')
        let user_major = ref('')
        let user_college = ref('')
        let user_class = ref('')
        let user_direction = ref('')
        let user_studentId = ref('')
        let user_phoneNumber = ref('')
        let user_selfIntroduction = ref('')
        let items = reactive([])
        let avatar_photo = ref('');

        // 更新页面数据
        let update = function(){
            let user_register = JSON.parse(window.sessionStorage.getItem('user_register'));
            user_name.value = user_register.name;
            user_major.value = user_register.major;
            user_college.value = user_register.college;
            user_class.value = user_register.clazz;
            user_direction.value = user_register.direction;
            user_studentId.value = user_register.studentId;
            user_phoneNumber.value = user_register.phoneNumber;
            user_selfIntroduction.value = user_register.selfIntroduction;
            if(user_register.photo === '/img/'){
                avatar_photo.value = 'https://img2.baidu.com/it/u=1494430848,632163233&fm=26&fmt=auto&gp=0.jpg'
            }else{
                avatar_photo.value = user_register.photo
            }
        }

        // 点击右侧列表查看详情
        let updateitem = function(itemdata){
            window.sessionStorage.setItem('user_register', JSON.stringify(itemdata));
            update();
        }

        onMounted(()=>{
            update();
            // 加载右侧快捷列表
            let loadingInstance = ElLoading.service({fullscreen:false,target:'.el-scrollbar',background:'transparent',text:'拼命加载中'});
            enrolllist().then(res => {
                // hide.value = true;
                console.log(res);
                items.push(...res.data);
                loadingInstance.close()
            }).catch(err => {
                    console.log(err);
                    loadingInstance.close()
                    ElMessage.error('加载错误，请刷新')
                })
            })

        return {
            user_name,
            user_major,
            user_college,
            user_class,
            user_direction,
            user_studentId,
            user_phoneNumber,
            user_selfIntroduction,
            items,
            avatar_photo,
            updateitem
        }
    }    
}
</script>

<style lang='scss' scoped>
    .personal{
        display: flex;
        width: 1180px;
        padding: 20px;
        color: #fff;
        .introduce{
            width: 500px;
            span{
                position: relative;
                top: 10px;
            }
        }
        
        .person_introduce{
            position: relative;
            top: -15px;
            left: 90px;
            width: 550px;
            height: 250px;
            line-height: 30px;
            // white-space: wrap;
        }
        .avatar{
            margin-right: 50px;
            img{
                width: 150px;
                height: 150px;
            }
        }
        .el-scrollbar{
            width: 350px;
            margin-left: 60px;
            .item{
                // width: 200px;
                height: 50px;
                line-height: 50px;
                margin: 0;
                margin-right: 30px;
                padding-left: 10px;
                border-bottom: #fff solid 1px;
                &:hover{
                    cursor: pointer;
                    background-color: rgb(160, 160, 160);
                }
            }
        }
        
        
    }
</style>