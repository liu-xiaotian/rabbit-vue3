import { getCategoryAPI } from '@/apis/category';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router';

export function useCategory(){
  // 获取数据
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async (id = route.params.id)=>{
    const {result} = await getCategoryAPI(id)
    categoryData.value = result
  }

  onMounted(()=> getCategory())

  // 路由参数发生变化时，分类接口重新请求数据
  onBeforeRouteUpdate((to)=>{
    getCategory(to.params.id)
  })

  return {
    categoryData
  }
}