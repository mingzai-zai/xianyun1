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
        <FlightsInfo v-for="(e, i) in flightslist" :key="i" :data="e" />

        <!-- 分页器 -->
        <!-- 想要显示中文首页在插件里面修改最后的语言en改为zh-CN -->
        <!-- size-change改变一页显示页数时候触发 -->
        <!-- current-change改变显示第几页时候触发 -->
        <!-- 分页器功能都有，但是展示页面还是靠自己怎么做，它只是提供了功能作用，至于页面。。 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentpage"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="flightsdata.total"
        >
        </el-pagination>
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
      flightsdata: {}, //总数据
      // flightslist: [], //航班列表
      pagesize:2,//一页显示多少
      currentpage:1,//显示第几页
    };
  },
  mounted() {
    // console.log(this.$route)去query的参数有相关URL都可以打印出来看看
    // 就是从路由里面那数据
    // query的数据刚好是要传的数据
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      // console.log(res);
      // data包含着flights，info，options，total四个数据
      let { data } = res;
      this.flightsdata = data;
      //先全部存起来后面就可以方便用，不然也可以设置四个数据一个一个接收
      // this.flightslist = this.flightsdata.flights;
    });
  },
  components: {
    FlightsListHeader,
    FlightsInfo
  },
  computed: {
    //因为这里航班的次数不多可以一次性加载，但是如果是文章很多那种就要点击哪页才加载哪页
    flightslist(){
      //刚开始加载时候是什么都没有的；
      //已经加载了的会缓存，触发的都是新的而已，已加载的不会显示(乱写的)
      //slice是切割
      //slice是切割splice是截取不能用截取的方法
      if(!this.flightsdata.flights) return [];
      let arr =this.flightsdata.flights.slice((this.currentpage-1)*this.pagesize,this.currentpage*this.pagesize)
      return arr;
    }
  },
  methods:{
    //一页显示多少触发
    handleSizeChange(index){
      // console.log(index)
      this.pagesize=index;
      this.currentpage=1;

    },
    //显示第几页触发
    handleCurrentChange(index){
      // console.log(index)
      this.currentpage=index;
    },
 
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
