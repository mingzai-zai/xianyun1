<template>
  <div class="login">
      <!-- form表单的输入框 -->
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      class="demo-ruleForm">
      <el-form-item  prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 忘记密码 -->
    <el-row type='flex' justify='end'>
        <nuxt-link to='#' class="forget">忘记密码</nuxt-link>
    </el-row>
    <!-- 登录按钮 -->
    <el-row type='flex'>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      // console.log(rule)
      // console.log(value)
      // console.log(callback)
      if (value.trim().length === 0) {
        callback(new Error("请输入密码"));
      } else {
        if (/\S{3,16}/.test(value)) {
          callback();
        } else {
          callback(new Error("输入3-16的有效密码"));
        }
      }
    };
    return {
      loginForm: {
        password: "123456",
        username: "13800138000"
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {pattern:/\d/,message:'请输入正确手机号', trigger: 'blur'},
            { min: 11, max: 11, message: '长度在 11个字符', trigger: 'blur' },
            ]
      }
    };
  },
  methods: {
      submitForm() {
        this.$refs.loginForm.validate(async (valid) => {
          if (valid) {
            // console.log(this.loginForm)
            let res = await this.$axios.post('/accounts/login',{
                ...this.loginForm
            })
            console.log(res);
            if(res.status===200) {
                let {data} =res
                this.$store.commit('user/setUserInfo', data)
                this.$message.success('登录成功')
                this.$router.push('/')
            }else {
                this.$message.fail('用户认证失败')
            }
          } else {
            // console.log('error submit!!');
            this.$message.fail('信息有误')
            return false;
          }
        });
      },
  }
};
</script>

<style lang="less" scoped>
.login {
  padding: 25px;
}
.forget{
    font-size: 14px;
    color:tomato;
    margin-bottom: 10px;
}
/deep/.el-button--primary {
    width: 100%;
}
</style>
