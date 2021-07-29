<template>
  <div class="demo">
    <div class="parent-form">
      <menu-bar class="menu-bar"></menu-bar>
      <parent-contant class="parent-contant"></parent-contant>
    </div>
    <div class="child-form">
      <child-contant class="child-contant"></child-contant>
    </div>
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="未归还单据任务" name="first">
                <menu-bar class="menu-bar"></menu-bar>
                <parent-contant class="parent-contant"></parent-contant>
            </el-tab-pane>
            <el-tab-pane label="未归还单据任务明细" name="second">
                配置管理
            </el-tab-pane>
        </el-tabs> -->
  </div>
</template>

<script>
import MenuBar from "@/components/MenuBar";
import ParentContant from "@/components/ParentContant";
import ChildContant from "@/components/ChildContant";
import axios from "axios";
// import func from 'vue-editor-bridge';
export default {
  data() {
    return {
      activeName: "first",
      queryParams: {},
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  components: {
    MenuBar,
    ParentContant,
    ChildContant,
  },
  created() {},
  mounted() {
    const params = new URLSearchParams();
    params.append(
      "lineNo",
      this.queryParams.lineNo ? this.queryParams.lineNo : ""
    );
    params.append(
      "productCode",
      this.queryParams.productCode ? this.queryParams.productCode : ""
    );
    params.append(
      "productName",
      this.queryParams.productName ? this.queryParams.productName : ""
    );
    params.append(
      "storageId",
      this.queryParams.storageId ? this.queryParams.storageId : ""
    );
    axios
      .post("/api/giveback/mInTask/getListByNotReturn", params)
      .then((res) => {
        console.log(res.data.rows);
      });
  },
};
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
.demo {
  background-color: rgb(243, 243, 244);
  overflow: scroll;
  width: 100%;
  height: 100vh;
  padding: px2rem(20);
  // background-color: pink;
  .parent-form {
    margin-bottom: px2rem(30);
    .parent-contant {
      box-shadow: px2rem(2) px2rem(3) px2rem(4) rgba(0, 0, 0, 0.15);
    }
  }
  .child-form {
    .child-contant {
      box-shadow: px2rem(2) px2rem(3) px2rem(4) rgba(0, 0, 0, 0.15);
    }
  }
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
.menu-bar {
  box-shadow: px2rem(2) px2rem(3) px2rem(4) rgba(0, 0, 0, 0.15);
}
</style>