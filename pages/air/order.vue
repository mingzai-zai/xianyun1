<template>
    <div class="container">
        <el-row type="flex" justify="space-between" class="son">
            <!-- 订单表单 -->
            <OrderForm @myclick="num"/>

            <!-- 右侧计算总价 -->
            <OrderAside :data='$store.state.air.oneInfo' :usersnum='usersnum'/>
        </el-row>
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
import OrderAside from "@/components/air/orderAside";

export default {
    data () {
        return {
            usersnum:1,
        }
    },
    components: {
        OrderForm,OrderAside
    },
    methods:{
        num(shuzi) {
            // console.log(shuzi);
            this.usersnum=shuzi;
        }
    }
}
</script>

<style scoped lang='less'>
.son{
    margin: 20px auto;
    min-width: 1000px;
    width: 1000px;
}
</style>