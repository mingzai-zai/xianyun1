<template>
  <div class="index">
    <!-- 此时需要用背景图片，因为设置时候是center但是用img的话缩放时候会改变 -->
    <!-- el-carousel 有arrow箭头的切换时机  interval自动切换的时间 -->
    <el-carousel height="700px" arrow="always">
      <el-carousel-item v-for="(e, i) in pics" :key="i">
        <div
          class="pic"
          :style="
            `background: url(${$axios.defaults.baseURL}${e.url}) center no-repeat`
          "
        ></div>
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <span v-for='(e,i) in selects' :key='i' @click='choose(i)' :class='{active:selected===i}'>
            <i>{{e.title}}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input" >
          <input :placeholder='selects[selected].placeholder' v-model='search_value'/>
          <i class="el-icon-search" @click='search(selected)'></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pics: [],
      // 因为title和placeholder有关联所以放在一起比较好，不然你写两个数组？还要自己一一对应？这就很麻烦啦
      selects:[
        {
          title:'攻略',
          placeholder:'搜索城市',
          next:'post?city='
        },
        {
          title:'酒店',
          placeholder:'请输入城市搜索酒店',
          next:'hotel?city='
        },
        {
          title:'机票',
          placeholder:'请输入出发地',
          next:'/air'
        }
      ],
      // 为了可以接收到点击的索引是那个，方便placeholder因为placeholder不在title的v-for里面
      selected:0,
      search_value:'',
    };
  },
  async mounted() {
    let res = await this.$axios({
      url: "/scenics/banners"
    });
    // console.log(res);
    this.pics = res.data.data;
  },
  methods: {
    choose(index) {
      this.selected=index;
      this.search_value='';
      if(index==2) {
        this.$router.push('/air')
      }
    },
    search(index) {
      // console.log(index);
      // console.log(this.search_value)
      this.$router.push(this.selects[selected].next+this.search_value)
      this.$router.push(this.selects[index].next+this.search_value)
    }
  }
};
</script>

<style lang="less" scoped>
.index {
  // 没有加min-width会留白
  height: 700px;
  min-width: 1000px;
  position: relative;
}
.pic {
  // width: 100%;
  // 当然这里可以设置 background-size:contain contain为了充分的填满
  height: 700px;
}
// 搜索框
.banner-content {
  z-index: 9;
  width: 1000px;
  position: absolute;
  left: 50%;
  top: 45%;
  margin-left: -500px;
  border-top: 1px transparent solid;

  .search-bar {
    width: 552px;
    margin: 0 auto;
  }

  .search-tab {
    .active {
      i {
        color: #333;
      }
      &::after {
        background: #eee;
      }
    }

    span {
      width: 82px;
      height: 36px;
      display: block;
      position: relative;
      margin-right: 8px;
      cursor: pointer;

      i {
        position: absolute;
        z-index: 2;
        display: block;
        width: 100%;
        height: 100%;
        line-height: 30px;
        text-align: center;
        color: #fff;
      }

      &:after {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        content: "";
        width: 100%;
        height: 100%;
        border: 1px rgba(255, 255, 255, 0.2) solid;
        border-bottom: none;
        transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
        transform-origin: bottom left;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 1px 2px 0 0;
        box-sizing: border-box;
      }
    }
  }

  .search-input {
    width: 550px;
    height: 46px;
    background: #fff;
    border-radius: 0 4px 4px 4px;
    border: 1px rgba(255, 255, 255, 0.2) solid;
    border-top: none;
    box-sizing: unset;

    input {
      flex: 1;
      height: 20px;
      padding: 13px 15px;
      outline: none;
      border: 0;
      font-size: 16px;
    }

    .el-icon-search {
      cursor: pointer;
      font-size: 22px;
      padding: 0 10px;
      font-weight: bold;
    }
  }
}
</style>
