export const state =()=>{
    return {
        flightsInfo:[]
    }
}

export const mutations= {
    setFlightsInfo(state,data){
        state.flightsInfo.unshift(data)
    }
}
export const acitons={}