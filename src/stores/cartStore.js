  // 封装购物车模块

  import { defineStore } from 'pinia';
  import { computed, ref } from 'vue';
  import { useUserStore } from './userStore';
  import { insertCartAPI,findNewCartListAPI,delCartAPI } from '@/apis/cart';

export const useCartStore = defineStore('cart', ()=>{
  const userStore = useUserStore()
  const isLogin = computed(()=> userStore.userInfo.token)
    //1. 定义state - cartList
    const cartList = ref([])

    // 获取最新购物车列表
    const updateNewList = async ()=>{
      const res = await findNewCartListAPI()
      cartList.value = res.result
    }

    //2. 定义action - addCart
    const addCart = async (goods)=>{
      const {skuId, count} = goods
      if(isLogin.value){
        await insertCartAPI({skuId, count})
        updateNewList()
      }else{
          //添加购物车操作
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if(item){
          //找到了
          item.count++
        }else{
          cartList.value.push(goods)
        }
      }
      
    }
    const delCart = async (skuId)=>{
      if(isLogin.value){
        await delCartAPI([skuId])
        updateNewList()
      }else{
        //1. 找到要删除的下标值 -splice
        //2. 使用数组的过滤方法 - filter
        const idx = cartList.value.findIndex((item)=> skuId === item.skuId)
        cartList.value.splice(idx, 1)
      }
      
    }
    // 单选功能
    const singleCheck = (skuId, selected)=>{
      const item = cartList.value.find((item) => item.skuId === skuId)
      item.selected = selected
    }
    // 全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    const allCheck = (selected) =>{
      cartList.value.forEach(item => item.selected = selected)
    }
    // 计算属性
    const allCount = computed(()=> cartList.value.reduce((a,c) => a+c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a,c) => a+c.count*c.price,0))
    //已选择数量
    const selectCount = computed(() => cartList.value.filter(item => item.selected).reduce((a,c)=> a+ c.count, 0))
    // 已选择商品价钱合计
    const selectedPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((a,c)=>a+c.count*c.price,0))
    return{
      cartList,
      allCount,
      allPrice,
      isAll,
      selectCount,
      selectedPrice,
      addCart,
      delCart,
      singleCheck,
      allCheck
    }
  })