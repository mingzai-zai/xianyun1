<template>
    <div class="container">
        <el-row type="flex" justify="space-between" class="son">
            <!-- 订单表单 -->
            <OrderForm/>

            <!-- 右侧计算总价 -->
            <OrderAside :data='$store.state.air.oneInfo'/>
        </el-row>
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
import OrderAside from "@/components/air/orderAside";

export default {
    components: {
        OrderForm,OrderAside
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