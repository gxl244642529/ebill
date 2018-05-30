<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {
  Radio
} from 'mint-ui'
export default {
  name: 'app'
}

</script>

<style>
body{
  margin:0;
  padding:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -khtml-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}

/*标题样式*/
.mint-header{
    background-color:#ef4f4f !important;
}
/*按钮样式*/
.bottom-btn-box{
  margin-top:20px;
  margin-left:20px;
  margin-right:20px;
  margin-bottom: 20px;
}

/*多选框选项按钮样式*/
.mint-checkbox-input:checked + .mint-checkbox-core{
    background-color:#ef4f4f !important;
    border-color:#ef4f4f !important;
  }
/*选取个数达到极限样式*/
  .mint-checklist.is-limit .mint-checkbox-core:not(:checked){
    background-color:none !important;
    border-color: none !important;
  }
  .mint-checkbox-input[disabled]+.mint-checkbox-core {
    background-color: #d9d9d9 !important;
    border-color: #ccc !important;
  }
/*底部长条按钮样式*/
.bottom-btn-box button{
  width:100%;
}

.assign_card .mint-checklist-label{
  display: flex;
}

/*列表头*/

ul{
  -webkit-margin-before: 0;
}
</style>
