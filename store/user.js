// export const state = {
//     userInfo:{}
// }
// state的优化   1.用对象的话控制台会有警告，建议用function   2.不写user{}在平常用的标签里面会undefined因为userInfo.a.b相当于null.b但是在组件里面使用的话就可以像上面一样不用写user{}

export const state=()=>{
    return {
        userInfo:{
            user:{}
        }
    }
}

export const mutations= {
    // 第一个参数一定是state
    setUserInfo(state,data) {
        state.userInfo=data;
    }
}