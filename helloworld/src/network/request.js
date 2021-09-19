import axios from 'axios'


//封装写法1
export function request1(config, success, failure) {
    const instance1 = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    //发送真正的网络请求
    instance1(config)
    .then(result => {
        success(result)
    })
    .catch(reslove => {
        failure(reslove)
    })
}

//封装方法2
export function request2(config) {
    const instance1 = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    //发送真正的网络请求
    instance1(config.baseconfig)
    .then(result => {
        config.success(result)
    })
    .catch(reslove => {
        config.failure(reslove)
    })
}


//封装方法3
export function request3(config) {
    return new Promise((result, reslove) => {
        const instance1 = axios.create({
            baseURL: 'http://152.136.185.210:7878/api/m5',
            timeout: 5000
        })
    
        //发送真正的网络请求
        instance1(config)
        .then(res => {
            result(res)
        })
        .catch(err => {
            reslove(err)
        })
    })
}


//封装方法4
export function request4(config) {
    const instance1 = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    //axios拦截器
    //请求拦截
    instance1.interceptors.request.use(config => {
        // console.log(config)
        return config
    }, error => {
        // console.log(error)
    })

    //响应拦截
    instance1.interceptors.response.use(res => {
        // console.log(res)
        return res.data
    }, err => {
        // console.log(err)
    })

    //发送真正的网络请求
    return instance1(config)
}