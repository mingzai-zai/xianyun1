<template>
  <div>
    <!-- 顶部 -->
    <Header></Header>
    <!-- nuxt相当于是router-view -->
    <nuxt />
    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
a{
  color: inherit;
  text-decoration: none;
}
a:hover{
  color: #409eff;
}
ul,ol,li{
  list-style: none;
}
em,i{
  font-style: normal;
}
</style>
