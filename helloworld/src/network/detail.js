import { request4 } from "./request"
export function getDetail(iid) {
  return request4({
    url: '/detail',
    params: {
      iid,
    }
  })
}

export class GoodsInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.lowNowPrice
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}