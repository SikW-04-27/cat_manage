<template>
  <slot></slot>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>

.myFront {
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  text-shadow: 0 0 20px #a55eea;
}

.myFront::after {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  content: attr(data-text);
  filter: blur(5px);
}
</style>


