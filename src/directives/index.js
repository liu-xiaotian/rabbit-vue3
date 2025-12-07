// 懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app){
    app.directive('img-lazy',{
    mounted(el, binding){
      const {stop} = useIntersectionObserver(
        el,
        ([{isIntersecting}]) => {
          if(isIntersecting){
            console.log(isIntersecting);
            
            el.src = binding.value
            stop()
          }
          
        },
      )
    }
  })
  }
  // 懒加载指令逻辑
  
  

}