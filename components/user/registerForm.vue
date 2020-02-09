<template>
  <div class="register">
    <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
      <!-- 手机号码 -->
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入手机号码"
        ></el-input>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="captcha">
        <el-input v-model="form.captcha" placeholder="请输入验证码" ref="number"
          ><el-button slot="append" @click="getnumber">获取验证码</el-button>
        </el-input>
      </el-form-item>
      <!-- 昵称 -->
      <el-form-item prop="nickname">
        <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码"></el-input>
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item prop="checkpass">
        <el-input
          placeholder="确认密码"
          type="password"
          v-model="form.checkpass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkpass !== '') {
            this.$refs.form.validateField('checkpass');
          }
          callback();
        }
      };
    var validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        checkpass: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "输入11位", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入你的名字", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        //不要只想着写确认密码才验证，有可能又去改第一次设置密码
        checkpass: [{ validator: validateCheckPass, trigger: "blur" }]
      }
    };
  },
  methods: {
    //获取验证码
    //做判断为了乱点击获取验证码，而又发一次请求
    getnumber() {
      if (this.form.username.trim().length === 0) {
        this.$alert("手机号码不能为空", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (this.form.username.trim().length !== 11) {
        this.$alert("手机号码需要11位", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      this.$axios
        .post("/captchas", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          tel: this.form.username
        })
        .then(result => {
          // console.log(result)
          // this.form.captcha=result.data.code;
          this.$alert(`您的验证码为：${result.data.code}`, "提示", {
            confirmButtonText: "确定",
            type: "warning",
            callback: () => {
              // console.log(this)
              this.$refs.number.focus();
            }
          });
        });
    },
    //注册
    register() {
      //每次提交文件都要考虑用户会不会乱来，可能错了ta还继续按，如果没判断就继续请求，服务器压力会很大
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form);
          let { checkpass, ...props } = this.form;
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            // headers: { "Content-Type": "application/x-www-form-urlencoded" },
            // 流浪器会默认转换自动设置的Content-Type
            // 500可能是data传多崩掉了。400传入的东西有问题 或则是多了设置的headers ，404可能是method，url那些有问题，405貌似好像和400一样都是看别人怎么设置的
            data: props
          }).then(res => {
            console.log(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  padding: 25px;
}
.el-button {
  width: 100%;
}
</style>
