<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <!-- 如果子组件中用了data.info.a  会报错本来data就是空了，再一null.a就会报错一开始什么都没有，所以要在flightsdata加入属性 -->
        <FlightsFilters  :data="flightsdata_again" @getdata='getdata'/>

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
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHeader from "@/components/air/flightsListHeader";
import FlightsInfo from "@/components/air/flightsInfo";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from '@/components/air/flightsAside'

export default {
  data() {
    return {
      //这里的第二次是单个筛选的第二次
      // 此时只是用了一个flightsdata存了这些数据，监听到了flights的改变传回来了，但是点击第二次筛选的时候没了，就是因为，筛选第一次时候只是这一个类型在这个数组了，第二次筛选肯定就没有了。
      //所以这里就需要一个新的数组来存着相当于一个是用来存数据的，一个是用来改数据的，而且该数据的同时一定要在原来存数据的基础上来改，这样第二次就不会没有数据了
      flightsdata: {  //总数据（存改的）
        flights:[],
        info:{},
        options:{},
      }, 
      flightsdata_again: {  //总数据（存的）
        flights:[],
        info:{},
        options:{},
      }, 
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
      // this.flightsdata_again=data不能这样存同一个data对象，因为会保存的是地址，如果一个改变其他都会改变（）浅拷贝，展开就是深拷贝，拷贝的是值，地址自己来，犹如鸡蛋挑骨头，挑出来就是nbsp（深）
      this.flightsdata_again={...data}
    });
  },
  components: {
    FlightsListHeader,
    FlightsInfo,
    FlightsFilters,
    FlightsAside,
  },
  computed: {
    //因为这里航班的次数不多可以一次性加载，但是如果是文章很多那种就要点击哪页才加载哪页
    flightslist(){
      //刚开始加载时候是什么都没有的；
      //已经加载了的会缓存，
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
      //为了方便选的时候就跳转到第一页
      this.currentpage=1;

    },
    //显示第几页触发
    handleCurrentChange(index){
      // console.log(index)
      this.currentpage=index;
    },
    getdata(arr){
      this.flightsdata.flights=arr;
      this.flightsdata.total=arr.length;
    }
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
