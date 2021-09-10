<template>
  <div class="ratinglist_block">
    <el-input
      v-model="search"
      size="medium"
      prefix-icon="el-icon-search"
      placeholder="输入关键字搜索"
    />
    <ManageButton
      class="eliminate myButton"
      @click="eliminate"
      v-show="dangerbutton_1"
      >批量淘汰</ManageButton
    >
    <ManageButton
      class="canceleliminate myButton"
      @click="canceleliminate"
      v-show="dangerbutton_2"
      >取消</ManageButton
    >
    <ManageButton
      class="confirmeliminate myButton"
      @click="confirmeliminate"
      v-show="dangerbutton_2"
      >确认淘汰</ManageButton
    >
    <transition-group
      name="animate__animated animate__bounce"
      enter-active-class="animate__zoomIn"
    >
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        @cell-click="handle"
        @select="xxx"
        @cell-mouse-enter="hovercell"
        @cell-mouse-leave="leavecell"
        height="480"
        style="width: 100%"
        key="1"
        v-show="hide"
      >
        <el-table-column type="selection" class-name="play"></el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="examAvg" sortable label="笔试">
        </el-table-column>
        <el-table-column prop="firstInterviewAvg" sortable label="一轮面试">
        </el-table-column>
        <el-table-column prop="secondInterviewAvg" sortable label="二轮面试">
        </el-table-column>
        <el-table-column prop="firstReviewAvg" sortable label="一轮考核">
        </el-table-column>
        <el-table-column prop="secondReviewAvg" sortable label="二轮考核">
        </el-table-column>
        <el-table-column prop="totalAvg" sortable label="平均分">
        </el-table-column>
        <el-table-column prop="userStatus" label="状态"> </el-table-column>
      </el-table>
    </transition-group>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { listAllUser, batcheliminate } from "../../../request/api";
import { ElLoading, ElMessageBox, ElMessage } from "element-plus";
import ManageButton from "../../../components/ManageButton.vue";
export default {
  components: { ManageButton },
  setup(props) {
    let tableData = reactive([]);
    let search = ref("");
    let dangerbutton_1 = ref(true);
    let dangerbutton_2 = ref(false);
    const router = useRouter();
    let hide = ref(false);
    let deleteselect = reactive([]);

    // 点击每一个单元格
    let handle = function (row, column, event, cell) {
      if (column.no !== 0 && column.no !== 1 && column.no !== 7 && column.no !==8) {
        let row_value = JSON.stringify(row);
        window.sessionStorage.setItem("user_point", JSON.stringify(row));
        window.sessionStorage.setItem("user_status", JSON.stringify(column));
        router.push({
          name: "checkdetialpoint",
          path: "/manage/checkdetialpoint",
        });
      }
    };

    // 鼠标移入每一个单元格
    let hovercell = function (row, column, event, cell) {
      if (column.no !== 0 && column.no !== 1 && column.no !== 7 && column.no !==8) {
        cell.path[0].firstChild.style.color = "#fff";
      }
    };

    // 鼠标移出每一个单元格
    let leavecell = function (row, column, event, cell) {
      if (column.no !== 0 && column.no !== 1 && column.no !== 7 && column.no !==8) {
        cell.path[0].firstChild.style.color = "rgb(173, 173, 173)";
      }
    };

    // 点击批量淘汰按钮
    let eliminate = function () {
      dangerbutton_1.value = false;
      dangerbutton_2.value = true;
      let cell = document.getElementsByClassName("el-checkbox__inner");
      for (let i = 0; i < cell.length; i++) {
        cell[i].style.visibility = "visible";
      }
    };

    //取消选择淘汰
    let canceleliminate = function () {
      dangerbutton_1.value = true;
      dangerbutton_2.value = false;
      let cell = document.getElementsByClassName("el-checkbox__inner");
      for (let i = 0; i < cell.length; i++) {
        cell[i].style.visibility = "hidden";
      }
    };

    // 点击确认删除按钮
    let confirmeliminate = function () {
      if (deleteselect.length===0) {
        ElMessage.warning("没有选择淘汰的同学");
      } else {
        ElMessageBox.confirm("是否淘汰该同学?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let loadingInstance = ElLoading.service({
              fullscreen: false,
              target: ".ratinglist_block",
              background: "transparent",
              text: "拼命加载中",
            });
            batcheliminate({
              ids: deleteselect,
            }).then((res) => {
              loadingInstance.close();
              loadlist(deleteselect.length);
            });
          })
          .catch(() => {
            ElMessage.success("取消成功");
          });
      }
    };

    // 添加待淘汰的人
    let xxx = function (selection, row) {
      console.log(selection);
      deleteselect = [];
      for (let item of selection) {
        deleteselect.push(item.uuid);
      }
      console.log(deleteselect);
    };

    // 重新加载数据
    let loadlist = function(deletenum){
      let loadingInstance = ElLoading.service({
        fullscreen: false,
        target: ".ratinglist_block",
        background: "transparent",
        text: "拼命加载中",
      });
      listAllUser()
        .then((res) => {
          if(deletenum){
            tableData.splice(0,res.data.length+deletenum)
          }
          tableData.push(...res.data);
          loadingInstance.close();
          canceleliminate();
          hide.value = true;
        })
        .catch((err) => {
          loadingInstance.close();
          ElMessage.error("加载错误，请刷新");
        });
    }

    onMounted(() => {
      loadlist();
    });

    return {
      tableData,
      search,
      dangerbutton_1,
      dangerbutton_2,
      hide,
      handle,
      hovercell,
      leavecell,
      eliminate,
      canceleliminate,
      confirmeliminate,
      xxx,
    };
  },
};
</script>

<style lang="scss">
.ratinglist_block {
  height: 556px;
  position: relative;
  padding-top: 20px;
  text-align: center;
  background-color: transparent;

  // 设置搜索框长度
  .el-input {
    width: 300px;
  }

  // 设置按钮位置
  .eliminate,
  .confirmeliminate {
    position: absolute;
    right: 0;
  }

  .canceleliminate {
    position: absolute;
    right: 120px;
  }
}

.el-table {
  margin-top: 20px;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  cursor: pointer;
  background-color: rgba(128, 128, 128, 0.548);
}

// 多选框隐藏
.el-checkbox__inner {
  visibility: hidden;
}

.play {
  position: relative;
  // right: 100px;
  padding-right: 100px;
}
</style>