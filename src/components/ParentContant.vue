<template>
    <div class="contant-wrapper">
      <div class="contant-head">
        <div class="head-item" v-for="(item, index) in headList" :key="index">{{item.name}}</div>
      </div>
      <div class="contant-body">
        <div :class="[item.outTaskId == avtiveTaskId ? 'active' : '', 'body-item']" v-for="(item, index) in bodyItems[page]" :key="index" @click="passTaskId(item)">
          <input type="radio" />
          <div class="body-item-item">{{item.orderNo}}</div>
          <div class="body-item-item">{{item.orgName}}</div>
          <div class="body-item-item">{{item.lineNo}}</div>
          <div class="body-item-item">{{item.productCode}}</div>
          <div class="body-item-item">{{item.productName}}</div>
          <div class="body-item-item">{{item.returnBorrow}}</div>
          <div class="body-item-item">{{item.qtyBorrow}}</div>
          <div class="body-item-item">{{item.status}}</div>
          <div class="body-item-item">{{item.uomName}}</div>
          <div class="body-item-item">{{item.warehouseName}}</div>
          <div class="body-item-item">{{item.sectionName}}</div>
          <div class="body-item-item">{{item.locatorCode}}</div>
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
    </div>
</template>

<script>
import axios from 'axios';
import bus from "../assets/bus.js";
export default {
  data() {
    return {
      headList: [
        {
          name: '借出订单编号'
        },
        {
          name: '借用单位'
        },
        {
          name: '借出订单行编号'
        },
        {
          name: '物料编码'
        },
        {
          name: '物料名称'
        },
        {
          name: '已归还数量'
        },
        {
          name: '借出数量'
        },
        {
          name: '借出订单状态'
        },
        {
          name: '单位'
        },
        {
          name: '仓库'
        },
        {
          name: '库区'
        },
        {
          name: '货位'
        },
      ],
      bodyItem: [],
      bodyItems: [],
      page: 0,
      totalPage: 0,
      resultSearch: [],
      avtiveTaskId: 0
    };
  },
  methods: {
    //数组拆分
     group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while(index < array.length) {
          newArray.push(array.slice(index, index += subGroupLength));
          // console.log(index += subGroupLength)
          console.log(index)
          // index = index + subGroupLength
          
          //array.slice(index, index += subGroupLength) == array.slice(index, index + subGroupLength) + index = index + subGroupLength
      }
      return newArray;
    },
    changePage(e) {
      this.page = e - 1
    },
    passTaskId(e) {
      this.avtiveTaskId = e.outTaskId
      bus.$emit('passTid', e.outTaskId)
    }
  },
  created() {
    bus.$on('searchResult', param => {
      this.resultSearch = param
      this.bodyItems = this.group(this.resultSearch, 10)
      this.totalPage = parseInt( Math.ceil( this.bodyItems.length* 10))
      console.log(this.bodyItems.length)
    })
  },
  mounted() {
    axios.post('/api/giveback/mInTask/getListByNotReturn',{
      pageNum: 1,
      pageSize: 10,
    }).then(res => {
      res.data.rows.forEach(item => {
        this.bodyItem.push(item)
      });
      this.bodyItems = this.group(this.bodyItem, 10);
      console.log( this.bodyItems )
      this.totalPage = parseInt( Math.ceil( res.data.total / 10) * 10)
      console.log(this.totalPage)
      console.log(res.data.rows[0].outTaskId)
      bus.$emit('initialTaskId', res.data.rows[0].outTaskId)
     })
    
  }
};
</script>
<style lang="scss" scoped>
@import '../assets/styles/global';
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
    .active {
      background-color: rgb(232,247,253);
    }
  }
  .block {
    display: flex;
    justify-content: flex-end;
    font-size: px2rem(12);
    margin-top: px2rem(14);
  }
}
</style>