<template>
  <div class="bind-card">
    <title-bar
            title="绑定e通卡"
            :isgobackFunction=true 
            @goback="goback"
        >
        </title-bar>
    <div class="cardmsg">
        <mt-field label="卡　　号" placeholder="请输入e通卡卡号" v-model="cardId"></mt-field>
        <mt-field label="备　　注" placeholder="请输入本卡备注" v-model="name"></mt-field>
    </div>
    <div class="bottom-btn-box"><mt-button type="danger" size="small" @click="bind" >确认绑定</mt-button></div>
    
  </div>
</template>

<script>
import VueRouter from 'vue-router'
import Vue from 'vue'
import {MessageBox} from 'mint-ui'
import Api from '../lib/Api'
import A from '../lib/A'
import TitleBar from '../lib/TitleBar'
Vue.component("title-bar",TitleBar);
// let token = window.localStorage.getItem("token");


export default {
  name: 'BindCard',
  data () {
    return {
      name:"",
      cardId:"",
    }
  },
  methods:{
      bind(){
          if(this.cardId==""){
            A.alert("请输入e通卡卡号");
            return;
          }
          let data = {token:window.localStorage.getItem("token"),cardId:this.cardId,name:this.name}
          Api.api({
              url:'tc_ecard/bind',
              data:data,
              success:(result)=>{
                console.log(result);
                console.log(this.cardId);
                // Api.push({ str:'/assignCard', query:{cardId:this.cardId } })//临时解决
                Api.push({ str:'/assignCard', query:{cardId:result } })
              }

          });

      },
        goback(){
          Api.replace({str:"/assignCard" })
        }
  }
}
</script>
<style>
    /*功能样式补充*/
    .bind-card .is-left button{
        text-align: left
    }
    .bind-card .mint-cell-title{
        width:25% !important;
    }
    .cardmsg{
        margin-top: 60px
    }
</style>