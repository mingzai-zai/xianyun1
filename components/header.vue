<template>
  <div class="headers">
    <el-row type="flex" justify="space-between" class="row">
      <!-- logo -->
      <div class="logo">
        <!-- <img src="/static/logo.jpg" alt=""> -->
        <!-- 上面的看不到效果  -->
        <!-- 自己认为可能是个虚拟或者已经定义好了到了static -->
        <img src="/logo.jpg" alt="" />
      </div>
      <!-- nav -->
      <el-row class="nav" type='flex'>
        <nuxt-link to="/" >首页</nuxt-link>
        <nuxt-link to="/post" >旅游攻略</nuxt-link>
        <nuxt-link to="/hotel" >酒店</nuxt-link>
        <nuxt-link to="/air" >国内机票</nuxt-link>
      </el-row >
      <!-- personal -->
      <div class="personal">
        <el-dropdown>
          <el-button class="dropdown_btn">
            <span class="el-icon-bell"></span>
            消息<i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <nuxt-link to="user/login">登录/注册</nuxt-link>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.row {
  height: 60px;
  width: 1000px;
  margin: 0 auto;
  align-items: center;
  .logo {
    img {
      width: 156px;
    }
  }
  .nav {
    flex: 1;
    height: 60px;
    a{
        display: block;
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
        box-sizing: border-box;
        &:hover{
            border-bottom: 3px solid #409eff;
        }
    }
  }
  .personal {
    .dropdown_btn {
      border: 0;
      padding-right: 10px;
      font-size: 16px;
    }
  }
}
.nuxt-link-exact-active {
background-color: #409eff;
color: #fff;
}
</style>
