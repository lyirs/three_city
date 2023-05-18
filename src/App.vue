<!--
 * @Author: 
 * @Date: 2022-11-07 15:55:28
 * @LastEditTime: 2022-11-07 16:20:12
 * @Description: 
-->
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
</style>
