<template>
    <div class="bill-success">
        <title-bar title="开票结果" :isgobackFunction=true @goback="goback"></title-bar>
        <div class="img-box">
            <img :src="sucimg" width="120" height="120"/>
            <p>电子发票申请已提交到系统中，</p>
            <p>请3-5分钟后到开票历史中查看！</p>
          
        </div>
        <div class="bottom-btn-box"><mt-button type="danger" size="small" @click="success">完成</mt-button></div>
    </div>
</template>

<script>
//   <p class="err_tip">如开票信息有误请到下个月底前到客服网点红冲！</p>
    import Vue from 'vue';
    import VueRouter from 'vue-router'
    import Api from '../lib/Api'
    import TitleBar from '../lib/TitleBar'
    Vue.component('title-bar',TitleBar)
    export default {
        name: 'bill-success',
        data(){
            return {
                sucimg:Api.getImgUrl()+"/static/img/card_success.png"
            }
        },
        methods:{
            success(){
                console.log(Api.getRouter())
                // Api.push({
                //     str:'/'
                // })
                    Api.replace({str:'/billHistory'});
            },
            goback(){
                console.log("返回")
                Api.replace({str:'/billHistory'});
            }
        }
    }
</script>

<style>
    .bill-success .img-box{
        margin-top:100px;
        margin-bottom:40px;
        width:100%;
        text-align: center
        
    }
    .bill-success .err_tip{
        color: red;
    }
</style>