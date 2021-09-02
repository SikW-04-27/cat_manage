<template>
  
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  background-color="rgba(0, 0, 0, 0)" text-color="#fff" active-text-color="#fff">
    <img class="nav_logo" src="../assets/img/catlogo.png" alt="">
    
      <el-menu-item index="1">
        <router-link to="/manage/checkcenter">个人中心</router-link>
      </el-menu-item>

      <el-menu-item index="3">
        <router-link to="/manage/checkregistered">已报名</router-link>
      </el-menu-item>
    

  <el-submenu index="2">
    <template #title>管理进程</template>
    <el-menu-item index="2-1">
      <router-link to="/manage/modifyprocess">管理预约</router-link>
    </el-menu-item>
    <el-menu-item index="2-2">
      <router-link to="/manage/modifystatus">管理阶段</router-link>
    </el-menu-item>
    <el-menu-item index="2-3">
      <router-link to="/manage/modifyqueue">管理叫号</router-link>
    </el-menu-item>
  </el-submenu>

    <el-menu-item index="4">
      <router-link to="/manage/modifyratinglist">操作管理</router-link>
    </el-menu-item>  
</el-menu>
<div class="line"></div>

</template>

<script>
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    setup() {
      const activeIndex = ref('1');
      const activeIndex2 = ref('1');
      const handleSelect = (key, keyPath) => {
        console.log(key, keyPath);
      };
      return {
        activeIndex,
        activeIndex2,
        handleSelect,
      };
    },
  });
</script>




<style lang="scss">
    @import "../assets/scss/table.scss";
    .nav_logo{
      margin-top: 10px;
      margin-left: 20px;
      width: 70px;
      float: left;
    }
    .el-menu{
        .el-menu-item,.el-submenu{
          padding: 0;
          float: right;
          a{
            padding: 0 20px;
            display: inline-block;
            height: 60px;
            line-height: 60px;
            color: #fff;
          }
        }
        
    }
    .el-popper{
        .el-menu--horizontal{
          background-color: rgb(14, 70, 97);
          a{
            height: 36px;
            line-height: 36px;
            padding-left: 0;
          }
        }
        
            
    }

</style>