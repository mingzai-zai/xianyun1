export const state =()=>{
    return {
        flightsInfo:[],
        //单个航班的订单的详情数据
        oneInfo:{
            //避免报错
            seat_infos:{}
        },
        //总价
        total:0,
    }
}

export const mutations= {
    setFlightsInfo(state,data){
        state.flightsInfo.unshift(data)
        state.flightsInfo.length=5;
        //就会自动截取或者大于5时候吧最后一个截掉
    },
    //一个订单详情
    setOneInfo(state,data){
        state.oneInfo=data;
    },
    //总价
    setTotal(state,data){
        state.total=data;
    }

}
export const acitons={}