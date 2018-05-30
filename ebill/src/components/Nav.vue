<template>
  <div id="test">
    <ul>
      <li><router-link to="/assignCard">指定开票卡</router-link></li>
      <br/>
      <br/>
      <li><router-link to="/bindCard">绑定e通卡</router-link></li>
      <br/>
      <br/>
      <li><router-link to="/billDetail">开票详情</router-link></li>
      <br/>
      <br/>
      <li><router-link to="/billHistory">开票历史</router-link></li>
      <br/>
      <br/>
      <li><router-link to="/assignCardIllustate">指定绑卡说明</router-link></li>
      <br/><br/>
      <li><router-link to="/billSuccess">开票成功</router-link></li>
      <br/><br/>
      <li><router-link to="/sendEmail">发送电子邮箱</router-link></li>
      <br/><br/>
      <li><router-link to="/flash">登录</router-link></li>
      <br/><br/>
      <li><router-link to="/allowOrders">可开票订单</router-link></li>
      <br/><br/>
       <li><router-link to="/login">登录</router-link></li>
      <br/><br/>
      <li><router-link to="/ticket_desc">测试</router-link></li>
      <br/><br/>
    
       
    </ul>
  </div>
</template>

<script>
import VueRouter from 'vue-router'

export default {
  name: 'test',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>