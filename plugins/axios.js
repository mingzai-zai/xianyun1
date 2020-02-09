//拦截器
//一定要大写
//引入就是为了在方法里面可以用。在config.js里面就是为了调用插件，而方法就相当于在main.js里面的一个全局（网页启动时候就会触发---代表能用），一旦有东西碰到它就触发
// 在plugins里面都是全局执行的
import {Message} from 'element-ui'
export default (data)=>{
    console.log(data);
    console.log('啦啦啦啦啦');
    //axios里面有onerror这个方法
    
    data.$axios.onError(err=>{
        // console.log(err.response);
        const {statusCode,message}=err.response.data;
        if(statusCode===400) {
            Message.error(message)
        }
    })
}