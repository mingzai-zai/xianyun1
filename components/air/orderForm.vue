<template>
    <div class="main">
        <div class="air-column">
            <h2>剩机人</h2>
            <el-form class="member-info">
                <div class="member-info-item" v-for="(e,i) in form.users" :key="i">

                    <el-form-item label="乘机人类型">
                        <el-input placeholder="姓名" class="input-with-select" v-model="e.username">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                            <!-- 基本买的机票都是以成人来出售 -->
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型">
                        <el-input 
                        placeholder="证件号码"  class="input-with-select" v-model="e.id">
                            <el-select 
                            slot="prepend" 
                            value="1"           
                            placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser(i)">-</span>
                </div>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <div class="insurance-item" v-for="(e,i) in insuranceslist" :key="i">
                    <el-checkbox 
                    :label="`${e.type}：￥${e.price}/份×1  最高赔付${e.compensation}`"
                    border
                    @change="buy(e.id)">
                    </el-checkbox> 
                </div>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model="form.contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入内容" v-model="form.contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model="form.captcha"></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form:{
                //用户列表
                users:[
                    {
                      username:'',
                      id:'',
                    }
                ],
                insurances:[],//保险
                contactName:'',//名字
                contactPhone:'',
                captcha:'',//验证码
                //这里没有发票的，所以直接false
                invoice:false,
                seat_xid:this.$route.query.seat_xid,//座位id
                air:this.$route.query.id,//航班id
            },
            insuranceslist:[]      
        }
    },
    mounted(){
        //  const {id,seat_xid} = this.$route.query
        // this.$axios({
        //     url:'/airs/'+id,
        //     params:{
        //         seat_xid,
        //     }
        this.$axios({
            url:'/airs/'+this.form.air,
            params:{
                seat_xid:this.form.seat_xid,
            }
        }).then(res=>{
            // console.log(res);
            let {insurances} = res.data;
             this.insuranceslist= insurances;
        })
    },
    methods: {
        // 添加乘机人
        handleAddUsers(){
            this.form.users.push({
                username:'',
                id:'',
            })
        },
        
        // 移除乘机人
        handleDeleteUser(index){
            // console.log(index);
            this.form.users.splice(index,1)
        },
        //买保险
        buy(id){
            //只能用change事件，文档里面有说
            //some，find，filter都是以自己有的条件来改造的，如果是空，用空来对比，结果还是空
            // this.form.insurances.filter(e=>{
            //     return e!==id;
            // })

            //indexOf用法
            let suoyin = this.form.insurances.indexOf(id);
            if(suoyin<0) {
                this.form.insurances.push(id);
            }else {
                this.form.insurances.forEach(e => {
                    this.form.insurances.splice(suoyin,1)
                });
            }
            // console.log(this.form.insurances)
        },
        // 发送手机验证码
        handleSendCaptcha(){
            if(!this.form.contactPhone) {
                this.$message.error('请输入手机号码')
                return;
            }
            //注册界面的获取验证码一样的
            this.$store.dispatch('user/sendCaptchas',this.form.contactPhone).then(res=>{
                // console.log(res);
                this.$message.success('你的验证码是：' + res.data.code)
            })
        },

        // 提交订单
        handleSubmit(){
            let rules= {
                user:{
                    message:'类型或则是身份证类型不能为空',
                    // check(){}这样写函数指向的是自己注意的是users是数组有很多，不只是一个，所以要遍历
                    check:()=>{
                        let flag = true;
                        this.form.users.forEach(e=>{
                            if(!e.username || !e.id) {
                                flag=false;
                            }
                        })
                        return flag;
                    }
                },
                contactname:{
                    message:'请输入尊敬大名',
                    check:()=>{
                        // !取反 再来一个就是！！反反得正就是原来的       
                            return !!this.form.contactName
                    }
                },
                contactphone:{
                    message:'请输入棒棒的密码',
                    check:()=>{
                            return !!this.form.contactPhone
                    }
                },
                captcha:{
                    message:'请输入验证码',
                    check:()=>{
                        //return 在根return才是返回给函数在if里面return只是终止代码运行
                            return !!this.form.captcha
                    }
                }
            }
            // Object.keys(obj)打印出来的是数组每一个值都是对象的属性
            let flag =true;
            //里面只是一个错的条件
            Object.keys(rules).forEach(e=>{
                if(!flag) return;
                //rules[e].check()这里的check一定要有执行
                if(!rules[e].check()) {
                    this.$message.error(rules[e].message)
                    flag=false;
                }
            })
            // console.log(flag);
            // 如果有错就要终止代码运行（里面终止，到了外面还是要的）
            if(!flag) return;
            // console.log(this.form)
            // if(!this.$store.state.user.userInfo.token) {
            //     this.$message.warning('请先登录')
            //     return;
            // }
            this.$axios({
                method:'POST',
                url:'/airorders',
                // 原本不用写Bearer 是因为后台写了，看要求来，注意Bearer 有一个空格
                headers:{'Authorization':'Bearer '+this.$store.state.user.userInfo.token},
                data:this.form
            }).then(res=>{
                // console.log(res);
                this.$message.success(res.data.message);
            })
        }
    }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>