//拦截器
//插件基本的固定格式
//一定要大写
//引入就是为了在方法里面可以用。在config.js里面就是为了调用插件，而方法就相当于在main.js里面的一个全局（网页启动时候就会触发---代表能用），一旦有东西碰到它就触发
// 在plugins里面都是全局执行的
// 这时候的onError方法只拦截错误400,401,403等等流浪器报错（红色），以前的拦截器拦截所有各种情况
import {Message} from 'element-ui'
export default (data)=>{
    console.log(data);
    // console.log('啦啦啦啦啦');
    //axios里面有onError这个方法
    // 记住err有reponse这个属性
    data.$axios.onError(err=>{
        // console.log(err.response);
        // console.log(err);输入Error         就是原生的new Error对象
        const {statusCode,message}=err.response.data;
        if(statusCode===400) {
            Message.error(message)
        }
        // 401token错了或者过期，403是headers的token没有设置，当然不同后台有不同的表示，但是一般都是这样的
        //输出data打印出来看数据来设置
        if(statusCode===401||statusCode===403) {
            data.redirect('/user/login',{returnUrl:data.route.fullPath})
        }
    })

}