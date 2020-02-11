<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{ active: index === currentTab }"
      >
        <i :class="item.icon"></i>{{ item.name }}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法就类似于@input事件 -->
        <!-- select 点击选中建议项时触发 -->
        <!-- trigger-on-focus是否在输入框 focus 时显示建议列表默认是true，会把所有的显示 -->
        <el-autocomplete
          v-model="details_msg.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          :trigger-on-focus="false"
          @blur="handleBlur_from"
          ref="from"
        ></el-autocomplete>
      </el-form-item>
      <!-- 到达城市 -->
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          :trigger-on-focus="false"
          v-model="details_msg.destCity"
          @blur="handleBlur_to"
          ref="to"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="details_msg.departDate"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button
          style="width:100%;"
          type="primary"
          icon="el-icon-search"
          @click="handleSubmit"
        >
          搜索
        </el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      //departCity=广州&departCode=CAN&destCity=上海&destCode=SHA&departDate=2020-02-12
      details_msg: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      //接收then成功后的数据(出发地)
      ok_msg: [],
      //接收then成功后的数据(目的地)
      ok2_msg: []
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index == 1) {
        this.$alert("目前暂不支持往返，请使用单程选票！", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
    },

    //搜索地方封装
    searchPlace(value,cb) {
      if (value === "") return;
      //   if(!value) return;
     return this.$axios({
        url: "/airs/city",
        params: {
          name:value
        //   name: this.details_msg.departCity
        }
      }).then(res => {
        //   console.log(res);
        const { data } = res.data;
        data.map(e => {
            //   此时就不要用substring可能后面有四个字的呢
          e.value = e.name.replace("市", "");
          return e;
        });
        // console.log(this);
        //尽量不用用同一个数组存
        // 第一种拿到关键字相关数据做法
        // console.log(this.$refs.from.$refs.input.value)
        // if(this.$refs.from.$refs.input.value===value) {
        //     this.ok_msg = data;
        // }else if(this.$refs.to.$refs.input.value===value) {
        //     this.ok2_msg=data;
        // }
        cb(data);
        // 第二种同时整个promise都要return看111行
        //111行是return  promise对象但是下面一行return   promise里面的数据
        return data;
      });
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表(必须是value才能展示)
    queryDepartSearch(value, cb) {
        this.searchPlace(value,cb).then(res=>{
            this.ok_msg=res;
        })
      //   cb([{ value: 1 }, { value: 2 }, { value: 3 }]);
    },

    // 出发城市输入框失去焦点时候默认选择
    handleBlur_from() {
    //   console.log(this.ok_msg)
      //如果是没有的话就不应该选择了，不然会报错的
      if (this.ok_msg.length === 0) return;
      this.details_msg.departCode = this.ok_msg[0].sort;
      //不写下面一行的话当伱写一个字时候只显示一个字，但是真实的是两个字或者n个字的（例如广州）
      this.details_msg.departCity = this.ok_msg[0].value;
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
        this.searchPlace(value,cb).then(res=>{
            this.ok2_msg=res;
        })
    },

    //目标城市失焦的默认选择
    handleBlur_to() {
      if (this.ok2_msg.length === 0) return;
      this.details_msg.destCity = this.ok2_msg[0].value;
      this.details_msg.destCode = this.ok2_msg[0].sort;
    },
    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      //   console.log(item);
      this.details_msg.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.details_msg.destCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      //   console.log(value);
      // 过滤器是渲染页面时候该的格式，但是这里是传参
      this.details_msg.departDate = moment(value).format("YYYY-MM-DD");
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      let { departCity, departCode, destCity, destCode } = this.details_msg;
      //出发=》目的
      this.details_msg.departCity = destCity;
      this.details_msg.departCode = destCode;
      //目的=》出发
      this.details_msg.destCity = departCity;
      this.details_msg.destCode = departCode;
    },

    // 提交表单是触发
    handleSubmit() {
      //不能让用户乱来，先判断有没有写好
      if (!this.details_msg.departCity) {
        this.$message.error("请填写出发城市");
        return;
      }
      if (!this.details_msg.destCity) {
        this.$message.error("请填写到达城市");
        return;
      }
      if (!this.details_msg.departDate) {
        this.$message.error("请填写出发日期");
        return;
      }
      //   console.log(this.details_msg);
      this.$router.push({ path: "/air/flights", query: this.details_msg });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
