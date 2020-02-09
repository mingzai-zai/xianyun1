// export const state = {
//     userInfo:{}
// }
// state的优化   1.用对象的话控制台会有警告，建议用function   2.不写user{}在平常用的标签里面会undefined因为userInfo.a.b相当于null.b但是在框架里面使用的话就可以像上面一样不用写user{}

export const state=()=>{
    return {
        userInfo:{
            user:{}
        }
    }
}
//固定属性，同步修改state中的值的方法
export const mutations= {
    //存数据
    // 第一个参数一定是state
    setUserInfo(state,data) {
        state.userInfo=data;
    },
    //删除数据
    clearUserMsg(state,data){
        console.log(process.browser)
        // 有用完这个方法process.browser（流浪器环境）为true
        // console.log(this)
        // 自己认为老师做法先删除再赋值可能是不想浪费内存，直接赋值可能还有原来的还是占用内存了，浪费空间
        state.userInfo=data;
    }
}
// 固定属性，异步修改state中的值的方法，一般用来存放接口滴
export const actions= {
    //登录功能
    // 第一个参数一定是store  就是里面所有东西啦
    // store也可以写成{commit}相当于解构
    async login(store,data){
        let res = await this.$axios.post('/accounts/login',data)
        // console.log(res);
        // console.log(store)
        // console.log(this);this是store
        if(res.status===200) {
            let {data} =res;
            // console.log(data);
            store.commit('setUserInfo', data)
            // commit('setUserInfo', data)
            // 返回数据token和user实际上是返回promise
            return data;
        }
    }
    //注册功能
}