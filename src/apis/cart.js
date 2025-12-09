//封装购物车相关接口
import request from '@/utils/http';
import { couch } from 'globals';
export const insertCartAPI = ({skuId, count})=>{
  return request({
    url:'/member/cart',
    method:'post',
    data:{
      skuId,
      count
    }
  })
}

export const findNewCartListAPI = ()=>{
  return request({
    url:'/member/cart'
  })
}