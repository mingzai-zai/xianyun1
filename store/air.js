export const state =()=>{
    return {
        flightsInfo:[]
    }
}

export const mutations= {
    setFlightsInfo(state,data){
        state.flightsInfo.unshift(data)
        state.flightsInfo.length=5;
        //就会自动截取或者大于5时候吧最后一个截掉
    }
}
export const acitons={}