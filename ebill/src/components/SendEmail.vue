<template>
    <div class="send-email">
        <title-bar title="发送电子邮箱" :isgobackFunction=true 
             @goback="goback"></title-bar>
        <div>
            <mt-field label="电子邮箱" placeholder="请输入您的电子邮箱账号" v-model="to"></mt-field>
        </div>
        <div class="bottom-btn-box"><mt-button type="danger" size="small" @click="submit">提交</mt-button></div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueRouter from 'vue-router'
    import Api from '../lib/Api'
    import A from '../lib/A'
    import TitleBar from '../lib/TitleBar'
    Vue.component("title-bar",TitleBar);
    export default {
        name: 'send-email',
        data(){
            return {
                to:window.localStorage.getItem("email")
            }
        },
        methods:{
            // this.$route.query.id
            submit(){
                if(!this.to){
                    A.alert("请输入正确格式的邮箱");
                    return;
                }
                let data = {id:this.$route.query.id,to:this.to}
               Api.api({
                   url:'tc_ticket/sendEmail',
                   data:data,
                   success:(result)=>{
                     window.localStorage.setItem("email",this.to);
                      if(result==true){
                         A.alert("发送成功！");
                        
                      }else{
                          A.alert("邮件发送失败，请稍后重试！");
                      }
                       window.history.go(-1);
                   }
               }) 
            },
            goback(){
                Api.replace({str:"/billHistory" });
            }
        }
    }
</script>

<style>
    /*功能样式补充*/
    .send-email{
       margin-top:80px;
    }
    .send-email .is-left button{
        text-align: left
    }
    .send-email .mint-cell-title{
        width:25% !important;
    }
</style>