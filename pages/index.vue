<template>
  <div class="index">
    <!-- 此时需要用背景图片，因为设置时候是center但是用img的话缩放时候会改变 -->
    <!-- el-carousel 有arrow箭头的切换时机  interval自动切换的时间 -->
    <el-carousel height="700px" arrow='always'>
      <el-carousel-item v-for="(e, i) in pics" :key="i">
        <div class="pic" :style='`background: url(${$axios.defaults.baseURL}${e.url}) center no-repeat`'></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pics: []
    };
  },
  async mounted() {
    let res = await this.$axios({
      url: "/scenics/banners"
    });
    // console.log(res);
    this.pics = res.data.data;
  }
};
</script>

<style lang="less" scoped>
.index{
  // 没有加min-width会留白
  height: 700px;
  min-width: 1000px;
}
.pic{
  // width: 100%;
  height: 700px;
}
</style>
