<template>
  <div class="contant-wrapper">
    <div class="contant-head">
      <div class="head-item" v-for="(item, index) in headList" :key="index">
        {{ item.name }}
      </div>
    </div>
    <div class="contant-body">
      <div
        class="body-item"
        v-for="(item, index) in bodyItems[page]"
        :key="index"
        @click="open"
      >
        <div class="body-item-item">{{ item.mstorageDetail.productCode }}</div>
        <div class="body-item-item">{{ item.mstorageDetail.productName }}</div>
        <div class="body-item-item">{{ item.machineNo }}</div>
        <div class="body-item-item"></div>
        <div class="body-item-item"></div>
        <div class="body-item-item">
          {{ item.mstorageDetail.lastMaintainTimeStr }}
        </div>
        <div class="body-item-item"></div>
        <div class="body-item-item">{{ item.status }}</div>
        <div class="body-item-item">{{ item.mstorageDetail.borrowTime }}</div>
      </div>
    </div>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="totalPage"
        @current-change="changePage"
      >
      </el-pagination>
    </div>
    <div class="mask" v-show="isShowChild" @click="closeMask"></div>
    <div class="childDetail-wrapper" v-show="isShowChild">
      <div class="search-bar">
        <div class="search-number search">
          订单编号：
          <el-input placeholder="请输入订单编号" clearable> </el-input>
        </div>
        <div class="search-coding search">
          物料编码：
          <el-input placeholder="请输入物料编码" clearable> </el-input>
        </div>
        <div class="search-name search">
          物料名称：
          <el-input placeholder="请输入物料名称" clearable> </el-input>
        </div>
        <div class="search-unit search">
          借用单位：
          <el-input placeholder="请输入借用单位" clearable> </el-input>
        </div>
        <div class="button-box search">
          <el-button type="success" round>搜索</el-button>
          <el-button type="warning" round>重置</el-button>
        </div>
      </div>
      <div class="detail-head">
        <div class="head-item" v-for="(item, index) in headList" :key="index">
          {{ item.name }}
        </div>
      </div>
      <div class="detail-body">
        <div
          class="body-item"
          v-for="(item, index) in bodyItems[page]"
          :key="index"
        >
          <div class="body-item-item">
            {{ item.mstorageDetail.productCode }}
          </div>
          <div class="body-item-item">
            {{ item.mstorageDetail.productName }}
          </div>
          <div class="body-item-item">{{ item.machineNo }}</div>
          <div class="body-item-item"></div>
          <div class="body-item-item"></div>
          <div class="body-item-item">
            {{ item.mstorageDetail.lastMaintainTimeStr }}
          </div>
          <div class="body-item-item"></div>
          <div class="body-item-item">{{ item.status }}</div>
          <div class="body-item-item">{{ item.mstorageDetail.borrowTime }}</div>
        </div>
      </div>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="totalPage"
          @current-change="changePage"
        >
        </el-pagination>
      </div>
      <i class="el-icon-close" @click="closeMask"></i>
      <!-- <div class="close-icon" @click="closeMask">X</div> -->
    </div>
    <!-- <el-button type="text" @click="open" >点击打开 Message Box</el-button> -->
  </div>
</template>

<script>
import axios from "axios";
import bus from "../assets/bus.js";
export default {
  data() {
    return {
      headList: [
        {
          name: "物料编码",
        },
        {
          name: "物料名称",
        },
        {
          name: "机具号",
        },
        {
          name: "保养周期（天）",
        },
        {
          name: "提前推送时间（天）",
        },
        {
          name: "上次维保日期",
        },
        {
          name: "下次维保日期",
        },
        {
          name: "库存明细状态",
        },
        {
          name: "借用日期",
        },
      ],
      bodyItems: [],
      queryParams: {},
      totalPage: 0,
      page: 0,
      initialTaskId: "",
      isShowChild: false,
    };
  },
  methods: {
    group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
      }
      return newArray;
    },
    changePage(e) {
      this.page = e - 1;
    },
    open() {
      this.isShowChild = true;
    },
    closeMask() {
      this.isShowChild = false;
    },
  },
  created() {},
  mounted() {
    bus.$on("initialTaskId", (taskId) => {
      //   this.initialTaskId = taskId
      this.queryParams.outTaskId = taskId;
      const params = new URLSearchParams();
      params.append(
        "outTaskId",
        this.queryParams.outTaskId ? this.queryParams.outTaskId : ""
      );
      axios
        .post("/api/outstock/mOutTask/getTaskDeatilByoutTaskId", params)
        .then((res) => {
          console.log(res.data.rows);
          // res.data.rows.forEach(item => {
          //    item.mstorageDetail.borrowTime = item.mstorageDetail.borrowTime ? item.mstorageDetail.borrowTime.slice(0,10) : ''
          // });
          this.bodyItems = this.group(res.data.rows, 10);
          console.log(this.bodyItems);
          this.totalPage = parseInt(Math.ceil(res.data.total / 10) * 10);
          console.log(this.totalPage);
        });
    });
    bus.$on("passTid", (id) => {
      this.queryParams.outTaskId = id;
      const params = new URLSearchParams();
      params.append(
        "outTaskId",
        this.queryParams.outTaskId ? this.queryParams.outTaskId : ""
      );
      axios
        .post("/api/outstock/mOutTask/getTaskDeatilByoutTaskId", params)
        .then((res) => {
          console.log(res.data.rows);
          // res.data.rows.forEach(item => {
          //    item.mstorageDetail.borrowTime = item.mstorageDetail.borrowTime ? item.mstorageDetail.borrowTime.slice(0,10) : ''
          // });
          this.bodyItems = this.group(res.data.rows, 10);
          console.log(this.bodyItems);
          this.totalPage = parseInt(Math.ceil(res.data.total / 10) * 10);
          console.log(this.totalPage);
        });
    });
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/styles/global";
.contant-wrapper {
  width: 100%;
  height: px2rem(400);
  background-color: #fff;
  border-radius: px2rem(10);
  padding: px2rem(10);
  .contant-head {
    width: 100%;
    height: px2rem(40);
    display: flex;
    align-items: center;
    background-color: rgb(239, 243, 248);
    border-bottom: px2rem(1) solid #ccc;
    padding-left: px2rem(20);
    .head-item {
      @include center;
      font-size: px2rem(12);
      flex: 1;
    }
  }
  .contant-body {
    width: 100%;
    height: px2rem(300);
    .body-item {
      width: 100%;
      height: px2rem(30);
      border-bottom: px2rem(1) solid #ccc;
      display: flex;
      align-items: center;
      padding-left: px2rem(20);
      position: relative;
      .body-item-item {
        @include center;
        flex: 1;
        font-size: px2rem(10);
      }
    }
  }
  .block {
    display: flex;
    justify-content: flex-end;
    font-size: px2rem(12);
    margin-top: px2rem(14);
  }
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .childDetail-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    border-radius: px2rem(10);
    background-color: #fff;
    padding: px2rem(10);
    z-index: 101;
    .search-bar {
      display: flex;
      align-items: center;
      width: 100%;
      height: px2rem(70);
      margin-bottom: px2rem(8);
      .search {
        @include center;
        flex: 2;
        height: px2rem(50);
        // background-color: pink;
        margin: 0 px2rem(10);
        font-size: px2rem(12);
        &:last-child {
          flex: 1;
        }
        .el-input {
          width: 70%;
        }
      }
    }
    .detail-head {
      width: 100%;
      height: px2rem(40);
      display: flex;
      align-items: center;
      background-color: rgb(239, 243, 248);
      border-bottom: px2rem(1) solid #ccc;
      padding-left: px2rem(20);
      .head-item {
        @include center;
        font-size: px2rem(10);
        flex: 1;
      }
    }
    .detail-body {
      width: 100%;
      height: px2rem(380);
      .body-item {
        width: 100%;
        height: px2rem(38);
        border-bottom: px2rem(1) solid #ccc;
        display: flex;
        align-items: center;
        padding-left: px2rem(20);
        position: relative;
        .body-item-item {
          @include center;
          flex: 1;
          font-size: px2rem(10);
        }
      }
    }
    .block {
      display: flex;
      justify-content: flex-end;
      font-size: px2rem(12);
      margin-top: px2rem(14);
    }
    .el-icon-close {
      position: absolute;
      right: px2rem(4);
      top: px2rem(4);
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      width: px2rem(20);
      height: px2rem(20);
      font-size: px2rem(15);
      opacity: 0.7;
      @include center;
      z-index: 102;
    }
  }
}
</style>