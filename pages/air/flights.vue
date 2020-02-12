<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHeader />

        <!-- 航班信息 -->
        <FlightsInfo v-for='(e,i) in flightslist' :key="i" :data='e'/>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHeader from "@/components/air/flightsListHeader";
import FlightsInfo from "@/components/air/flightsInfo";

export default {
  data() {
    return {
      flightsdata:{},//总数据
      flightslist:[],//航班列表
    };
  },
  mounted(){
    // console.log(this.$route)去query的参数有相关URL都可以打印出来看看
    //就是从路由里面那数据
    // query的数据刚好是要传的数据
    this.$axios({
      url:'/airs',
      params:this.$route.query
    }).then(res=>{
      // console.log(res);
      // data包含着flights，info，options，total四个数据
      let {data} =res;
      this.flightsdata=data;
      //先全部存起来后面就可以方便用，不然也可以设置四个数据一个一个接收
      this.flightslist=this.flightsdata.flights;
    })
  },
  components: {
    FlightsListHeader,FlightsInfo
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
