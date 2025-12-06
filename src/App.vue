<script setup>
</script>

<template>
  <!-- 一级路由出口 -->
  <RouterView />
  <div class="test">123 sass</div>
</template>

<style scoped lang="scss">
.test{
  color:$priceColor
}
</style>
