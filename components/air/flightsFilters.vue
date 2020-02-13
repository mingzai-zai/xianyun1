<template>
  <div class="filters">
    <el-row
      type="flex"
      class="filters-top"
      justify="space-between"
      align="middle"
    >
      <el-col :span="8">
        单程： {{data.info.departCity}} - {{data.info.destCity}} / {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="airport"
          placeholder="起飞机场"
          @change="handleAirport"
        >
        <!-- 下拉菜单value先选择的值（内部），label是展示的值（外部）同时点击后触发的值是value，所以基本一致，好像时间那样就要处理 -->
          <el-option :label="e" :value="e" v-for="(e,i) in data.options.airport" :key="i"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="flightTimes"
          placeholder="起飞时间"
          @change="handleFlightTimes"
        >
        <!-- value是一个字符串为了变成数组，那就可以与起飞时间的小时作比较才能筛选 -->
          <el-option :label="`${e.from}:00 - ${e.to}:00`" :value="`${e.from},${e.to}`" v-for="(e,i) in data.options.flightTimes" :key="i"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="company"
          placeholder="航空公司"
          @change="handleCompany"
        >
          <el-option :label="e" :value="e" v-for="(e,i) in data.options.company" :key="i"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="airSize"
          placeholder="机型"
          @change="handleAirSize"
        >
        <!-- 这里机型没有数据，但正常来说都是大中小，但是flights里面飞机的类型是L  M  S 所以这里就做一些相应的处理 -->
          <el-option :label="e.name" :value="e.size" v-for="(e,i) in size" :key="i"> </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button
        type="primary"
        round
        plain
        size="mini"
        @click="handleFiltersCancel"
      >
        撤销
      </el-button>
      {{changearr}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
      data:{
          type:Object,
          default:{},
      }
  },
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "" ,// 机型大小
      size:[
          {name:'大',size:'L'},
          {name:'中',size:'M'},
          {name:'小',size:'S'}
      ]
    };
  },
  computed: {
      //computed一开始加载就会执行一次
      //在这里changearr只是为了传数据，不是为了在页面上显示什么
      //因为这里是监听多个属性的变化
      changearr(){
        //   console.log(456)
        let newdata =this.data.flights.filter(e=>{
            // 假设都成立的时候
            let flag =true;
            //这里一定要有this.airport，如果没有的话一开始是空的，就代表空也是false，那一开始就没有数据了，但是这里一开始都应该把所有都要展示
            //如果只是单个筛选可以选择else if来做(好像不行)
            if(this.airport && e.org_airport_name!==this.airport) {
                flag=false;
            }
            else if(this.company && e.airline_name !== this.company) {
                flag= false;
            }
            if(this.airSize && e.plane_size !== this.airSize) {
                flag=false;
            }
            let arr = this.flightTimes.split(',')
            let hour = +e.dep_time.split(':')[0]
            if(this.flightTimes && (hour < +arr[0] || hour>= +arr[1])) {
                flag=false;
            }
            //此时只会把true的才会返回给数组
            return flag;
        })
          this.$emit('getdata',newdata)
          return '';
      }
      
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
        // let newData=this.data.flights.filter(e=>{
        //     return e.org_airport_name==value;
        // })
        // this.$emit('getdata',newData)
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
        // console.log(value);
        // let arr = value.split(',');
        // let newData=this.data.flights.filter(e=>{
        //     //只需要比较小时就好了，注意切割完是字符串来的
        //     let hour= e.dep_time.split(':')
        //     return +arr[0]<= +hour[0] && +hour[0] < +arr[1];
        // })
        // this.$emit('getdata',newData)
    },

    // 选择航空公司时候触发
    handleCompany(value) {
        // console.log(value);
        // let newData=this.data.flights.filter(e=>{
        //     return e.airline_name==value;
        // })
        // this.$emit('getdata',newData)
    },

    // 选择机型时候触发
    handleAirSize(value) {
        // let newData=this.data.flights.filter(e=>{
        //     return e.plane_size==value;
        // })
        // this.$emit('getdata',newData)
    },

    // 撤销条件时候触发
    handleFiltersCancel() {}
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>
