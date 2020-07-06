<template>
  <div>
    {{pagename}}
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        pagename: 'index pages'
      }
    }
  }
</script>

<style lang="scss" scoped>
body{
  background: teal;
  height: 100vh;
}
</style>