<template>
  <div class="flight-item">
    <!-- 有时候在组件中点击不行的话，如果可行就在外面给一个div包着让它来显示 -->
    <div @click="flag = !flag">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{ data.airline_name }} </span> {{ data.flight_no }}
        </el-col>
        <el-col :span="12">
          <el-row
            type="flex"
            justify="space-between"
            class="flight-info-center"
          >
            <el-col :span="8" class="flight-airport">
              <strong>{{ data.dep_time }}</strong>
              <span
                >{{ data.org_airport_name }}{{ data.org_airport_quay }}</span
              >
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{ needTime }}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{ data.arr_time }}</strong>
              <span
                >{{ data.dst_airport_name }}{{ data.dst_airport_quay }}</span
              >
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥<span class="sell-price">{{ data.base_price / 2 }}</span
          >起
        </el-col>
      </el-row>
    </div>
    <div class="flight-recommend" v-show="flag">
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
            v-for="(e, i) in data.seat_infos"
            :key="i"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{ e.name }}</span> | {{ e.supplierName }}
            </el-col>
            <el-col :span="5" class="price"> ￥{{ e.settle_price }} </el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini">
                选定
              </el-button>
              <p>剩余：{{ e.discount }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    };
  },
  props: {
    // 数据
    data: {
      type: Object, //说明data的类型
      // 默认值是空对象，不传data时候才用的默认值
      //此时流浪器不是报错是vue的warn
      default: {}
    }
  },
  computed: {
    //如果只是单个就选择watch，多个就用计算属性
    needTime() {
        // console.log(this.data)
      let start = this.data.dep_time.split(":");
      let end = this.data.arr_time.split(":");
      //split把它们分开且组了一个数组，同时每一项都是字符串
      //数据不对就看类型在加减时候有没有问题，很可能都是字符串相加，加法都是优先字符串的拼接*/就先转数字
    //   let all = end[0] * 60 + +end[1] - start[0] * 60 - +start[1];
    //   let all = end[0] * 60 + ~~end[1] - start[0] * 60 - ~~start[1];向下取整
      let all = end[0] * 60 + Number(end[1]) - start[0] * 60 - Number(start[1]);
      if(end[0] < start[0]) {
          all += 24*60;
      }
    //   let hour = Math.floor(all / 60);
      let hour = ~~(all / 60);
      let min = all % 60;
      return `${hour}小时${min}分`;
    }
  }
};
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
