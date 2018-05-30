<template>
    <div id="login">
        
            <title-bar title="登录"></title-bar>
      
       
            <div class="loginhead">
                <img  :src="headerImg" height="100" width="100">
            </div>    
            <div>     
                <mt-field label="账　　号：" placeholder="请输入手机号码" v-model="phone" value={phone}></mt-field>
                <mt-field label="密　　码：" placeholder="请输入密码" type="password" v-model="pwd" value={pwd} ></mt-field>
            </div>
            <div class="requ">
           
                   <p class="resp" @click="goregister">免费注册</p>
               
            </div>
            <div class="bottom-btn-box"><mt-button type="danger" @click='login'>登录</mt-button></div>
       
        
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    import axios from 'axios'
    let router = new VueRouter();   
    
   import{
        MessageBox,
        Toast 
    }from 'mint-ui';
    import md5 from 'js-md5';
    import Api from '../lib/Api'
    import A from '../lib/A'
    import TitleBar from '../lib/TitleBar'
    Vue.component("title-bar",TitleBar);
  
    let header = {
        'content-type': 'multipart/form-data'
    }
    export default {
        name: 'Login',
   
        data(){
            return {
               isLogin :false,
               phone:"",
               pwd:"",
               headerImg:Api.getImgUrl()+"/static/img/loginhead.png"
            }
        },

        methods:{
            beforeCreate:function(data){
              
                Api.api({
                url:"tc_gate/wxBind",
                data:data,
                success:(result)=>{
                    console.log(result);
                    if(window.localStorage){
                       localStorage.setItem("token",result);
                    }
                    console.log(window.localStorage.getItem("token"));
                     Api.api({
                        url:'tc_ecard/isBindCount',
                        data:{token:window.localStorage.getItem("token")},
                        success:(result)=>{
                            console.log("shdgjf"+result);
                            //如果大于0跳转订单页面，等于零跳转指定卡页面
                            if(result>0){
                                // Api.push({str:'/allowOrders',query:{id:result}})
                                Api.replace({str:'/allowOrders',query:{id:result}});
                            }else{
                                Api.replace({str:'/assignCard'}) 
                            }
                        
                        }
                    });
                        //第一次登录
                        // Api.replace({str:'/assignCard'})
                        //过期登录的话回答原页面
                        
                    }
                });
            },
            login(){
                //   console.log() ;
                this.phone.trim();
                if(this.phone==""){
                   A.alert("请输入手机号码")
                   return;
                }
                if(this.pwd==""){
                   A.alert("请输入密码") 
                   return;
                }
                let pwd = md5(this.pwd);
                let openId = window.openid;
                let data ={phone:this.phone,pwd:pwd,openId:openId};
                this.beforeCreate(data);
            },
            goregister(){
                // console.log("注册")
                Api.push({str:'register'});
            }
        }
    }
</script>

<style>
#login .mint-field .mint-cell-title{
    width:85px;
}
     .login{
         display: flex;
         flex: 1;
         flex-direction: column;
         /*justify-content: center*/
     };
    .requ{
         display: flex;
         justify-content: flex-end;
         margin-top: 10px,

    };
    .loginhead{
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 80px;
          margin-bottom: 20px
    };
    .loading{

          display: fixed;
          margin-left:45%;
          margin-top: 200px;
         
    };
    loadingrout{
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
    };
    .resp{
        display: flex;
        margin-right: 10px
    }

    
</style>