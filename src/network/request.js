import axios from 'axios'

export function request(config) {  //function 可以导出多个实例export default instancel()导出一个
  const instance = axios.create({
    baseURL: ' https://api.zhetaoke.com:10001/api',
    // https://api.zhetaoke.com:10001/api/api_dongdong.ashx?appkey=aa0db33e44344dc3ae250fea8eebbc6f&page=1&page_size=20&sort=new&t=0-23
    // timeout: 50
  })
  //2. sxios 拦截器
  //2.1请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config);
    //1.比如config中的信息不符合服务器要求
    //2.比如每次发送网络请求是都希望在页面显示一个请求图标
    //3.某些网络请求比如登录token必须携带一些特殊信息
    return config
  }, err => {
    // console.log(err);
  })
  //2.2响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })
  // 发送真正的网络请求
  return instance(config)
}

