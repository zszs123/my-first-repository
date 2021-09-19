import { request4 } from 'network/request'

export function getHomeMultidata() {
    return request4({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type, page) {
    return request4({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}