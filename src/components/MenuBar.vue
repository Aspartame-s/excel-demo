<template>
    <div class="menu-wrapper">
        <div class="search-number search">
            订单编号：
            <el-input
                placeholder="请输入订单编号"
                v-model="lineNo"
                clearable
            >
            </el-input>
        </div>
        <div class="search-coding search">
            物料编码：
            <el-input
                placeholder="请输入物料编码"
                v-model="productCode"
                clearable
                >
            </el-input>
        </div>
        <div class="search-name search">
            物料名称：
            <el-input
                placeholder="请输入物料名称"
                v-model="productName"
                clearable
                >
            </el-input>
        </div>
        <div class="search-unit search">
            借用单位：
            <el-input
                placeholder=""
                v-model="orgName"
                :disabled="true"
                >
            </el-input>
        </div>
        <div class="button-box search">
            <el-button type="success" round @click="search">搜索</el-button>
            <el-button type="warning" round>重置</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import bus from "../assets/bus.js";
export default {
  data() {
    return {
        lineNo: '',
        productCode: '',
        productName: '',
        orgName: '',
        queryParams: {},
    };
  },
  methods: {
      search() {
        this.queryParams.lineNo = this.lineNo
        this.queryParams.productCode = this.productCode
        this.queryParams.productName = this.productName
        this.queryParams.orgName = this.orgName
        console.log(this.queryParams)
        const params = new URLSearchParams();
        params.append('lineNo', this.queryParams.lineNo?this.queryParams.lineNo:"");
        params.append('productCode', this.queryParams.productCode?this.queryParams.productCode:"");
        params.append('productName', this.queryParams.productName?this.queryParams.productName:"");
        params.append('orgName', this.queryParams.orgName?this.queryParams.orgName:"");
        axios.post('/api/giveback/mInTask/getListByNotReturn',params).then(res => {
            console.log(res.data.rows)
            bus.$emit('searchResult', res.data.rows)
        })
        
      }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
@import '../assets/styles/global';
    input {
        border: px2rem(1) solid #ccc;
        border-radius: px2rem(5);
        height: px2rem(20);
        padding: 0 px2rem(5);
    }
    .el-input {
        width: px2rem(200);
    }
    .menu-wrapper {
        width: 100%;
        height: px2rem(80);
        background-color: #fff;
        border-radius: px2rem(10);
        display: flex;
        align-items: center;
        margin-bottom: px2rem(10);
        .search {
            @include center;
            flex: 2;
            height: px2rem(50);
            // background-color: pink;
            margin: 0 px2rem(10);
            font-size: px2rem(12);
            &:last-child {
                flex: 1
            }
        }
    }
</style>