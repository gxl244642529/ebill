<template>
    <div id="res">
         <title-bar title="注册"></title-bar>
          
          <div class="resmsg">
            <mt-field label="手机号码" placeholder="请输入手机号码" type="tel" v-model="phone"  :disabled="stop" >
            </mt-field>
            <mt-field label="验 证 码" placeholder="请输入验证码"  v-model="code">
                <p disabled="true" @click='startTimer' >{{buttex}}</p>
            </mt-field>
            
            
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="pwd" ></mt-field>
            <mt-field label="确认密码" placeholder="请输入确认密码" type="password" v-model="repwd" ></mt-field>
          </div>
        
        <div class="bottom-btn-box"><mt-button type="danger" @click='register'>注册</mt-button></div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueRouter from 'vue-router'
    import Validator from 'vue-validator'
    Vue.use(Validator)
    import Api from '../lib/Api'
    import A from '../lib/A'
    import TitleBar from '../lib/TitleBar'
    import CryptoJS from 'crypto-js/core';
    import MD5 from 'crypto-js/md5';
    Vue.component("title-bar",TitleBar);
    const TIMER = 60;
    export default {
        name: 'regesiter',
        data(){
            return {
                timer: TIMER,       //默认倒数60秒
                stop : false,   //默认是停止的，但界面加载之后会变成false
                Interval:null,  //setInterval的对象
                buttex:"获取验证码",
                phone:"",
                code:"",
                pwd:"",
                repwd:"",
                disabled:true
            }
        },
           methods : {
            update () {
                this.stop = true;
                this.timer--;
                this.buttex ="再次发送("+ this.timer+")"
                if(this.timer == 0) 
                {
                    clearInterval(this.Interval);
                    this.timer= TIMER;
                    this.buttex="重新发送"
                    this.stop = false;
                }
            },
            startTimer () {
               this.disabled = true
                if(!this.checkPhone(this.phone)){
                    A.alert("请输入正确的手机号码");
                    return;
                }else{
                    if(!this.stop ){
                      this.getVerifyid();
                    }
                }
            },
         getVerifyid(){
              this.stop = true;
            Api.api({
                url:'tc_gate/verify',
                data:{phone:this.phone},
                success:(result)=>{
                    this.verifyId = result;
                    this.Interval = setInterval(this.update,1000);    
                    console.log(result);
                },error:(error)=>{
                    console.log("服务器出错了")
                    this.stop = false;
                }
            });
          },
     
          postRes(){
              let openId = window.openid;
            // let openId ='window.openid';
              console.log(MD5(this.pwd).toString())
              let data = {
                  phone:this.phone,
                  pwd:MD5(this.pwd).toString(),
                  openId:openId,
                  code:this.code,
                  verifyId:this.verifyId}
              Api.api({
                  url:'tc_gate/wxRegister',
                  data:data,
                  success:(result)=>{
                      if(window.localStorage){
                          localStorage.setItem("token",result)
                      }
                      localStorage.getItem("token")
                      Api.replace({str:'/assignCard'});
                      console.log(result);
                  }
              })
          },
          checkPhone(text){
            var myreg = (/^0?[1][3|4|5|7|8][0-9]\d{8}$/);
	        	return myreg.test(text);
            },
          register(){
              console.log(this.checkPhone(this.phone));
              this.pwd = this.pwd.trim();
              this.repwd = this.repwd.trim();

              if(this.phone==""){
                  A.alert("请输入手机号码");
                  return;
              }
              if(!this.checkPhone(this.phone)){
                  A.alert("请输入正确的手机号码");
                  return;
              }
              if(this.code==""){
                  A.alert("请输入验证码");
                  return;
              }
              if(this.pwd==""){
                  A.alert("请输入密码");
                  return;
              }
               if(this.repwd==""){
                  A.alert("请输入确认密码");
                  return;
              }
              if(this.pwd!=this.repwd){
                  A.alert("两次输入的密码不一致");
                  return;
              }
              
              this.postRes();

          },
        }
    }
</script>

<style>
    .requ{
         display: flex;
         justify-content: flex-end;
         margin-top: 10px,

    }
    .resmsg{
        margin-top: 60px;
    }
    
</style>