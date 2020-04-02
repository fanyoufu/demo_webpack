<template>
  <div>
    vue组件 {{title}} - {{Date.now()}}
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        title:'webpack-vue'
      }
    }
  }
</script>