  // 封装购物车模块

  import { defineStore } from 'pinia';
  import { computed, ref } from 'vue';

export const useCartStore = defineStore('cart', ()=>{
    //1. 定义state - cartList
    const cartList = ref([])
    //2. 定义action - addCart
    const addCart = (goods)=>{
      //添加购物车操作
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if(item){
        //找到了
        item.count++
      }else{
        cartList.value.push(goods)
      }
    }
    const delCart = (skuId)=>{
      //1. 找到要删除的下标值 -splice
      //2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item)=> skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }
    // 计算属性
    const allCount = computed(()=> cartList.value.reduce((a,c) => a+c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a,c) => a+c.count*c.price,0))

    return{
      cartList,
      allCount,
      allPrice,
      addCart,
      delCart
    }
  })