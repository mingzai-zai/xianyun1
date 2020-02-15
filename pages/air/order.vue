<template>
    <div class="container">
        <el-row type="flex" justify="space-between" class="son">
            <!-- 订单表单 -->
            <OrderForm/>

            <!-- 其他代码... -->
        </el-row>
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";

export default {
    components: {
        OrderForm
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