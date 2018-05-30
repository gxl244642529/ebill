<template>
    <div class="bill-list">
        <x-cell class="bill-list-xcell" v-for="option in options" >
            <!--<div class="bill-list-box" @click="gotodetali(option)">
                <div class="bill-list-left">
                    <span>发票单号：</span>
                    <span>{{option.type==1?"红冲时间:":"开票时间:"}}</span>
                    <span>发票金额：</span>
                    <span>发票抬头：</span>
                    <span>发票类型：</span>
                    <span>状　　态：</span>
                </div>
                <div class="bill-list-right">
                    <span>发票单号：</span>
                    <span  v-text="option.date"></span>
                    <span  v-text="option.amt/100"></span>
                    <span v-text="option.head"></span>
                    <span>电子增值税普通发票</span>
                    <span>{{option.status==0||option.status==11||option.status==12||option.status==13||option.status==19||option.status==139?"开票中":
                        option.status==132||option.status==133?"开票错误":option.status==2?"开票成功":
                        option.status==31||option.status==32||option.status==329?"红冲中":option.status==323?"红冲错误":
                        option.status==22?"红冲成功":option.status==222?"红冲已经重新开票":""
                        }}</span>
                </div>
                

            </div>-->
            <div class="linelayout" @click="gotodetali(option)">
                <div class="taitou">
                    <span class="labsize">发票单号：</span>
                    <span v-text="option.id" class="labsize"></span>
                </div>
                <div>
                    <span class="labsize">{{option.type==1?"红冲时间：":"开票时间："}}</span>
                    <span  v-text="option.date?option.date:option.createDate" class="labsize"></span>
                </div>
                <div>
                    <span class="labsize">发票金额：</span>
                    <span  v-text="option.amt/100" class="labsize"></span>
                </div>
                <div>
                    <span class="labsize" >发票抬头：</span>
                    <span v-text="option.head" class="labsize"></span>
                </div>
                <div>
                    <span class="labsize">发票类型：</span>
                    <span class="labsize">增值税电子普通发票</span>
                </div>
                <div>
                    <span class="labsize">状　　态：</span>
                    <span class="labsize">{{returnType(option.status)}}</span>
                </div>
            </div>
            <div class="btn-group">
                
                <mt-button v-if="option.status==2" v-show="!isIOS" type="default" size="small" class="download" @click="download(option)">{{butString}}</mt-button>
                 <mt-button v-if="option.status==22" type="danger" size="small" class="download" @click="reticket(option)">重新开票</mt-button>
                <mt-button v-if="option.status==2" type="danger" size="small" class="download" @click="sendemail(option)">发送邮箱</mt-button>

            </div>
            
        </x-cell>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueRouter from 'vue-router'
    import XCell from './cell/index.js';
    import { 
        Header,
        Button,
    } from 'mint-ui';
    export default {
        name: 'bill_list',
        props: {
            title: String,
            align: String,
            options: {
                type: Array,
                required: true
            },
            value: Array,
        },
        data(){
            return {
                 currentValue: this.value,
                 butString:"下载",
                 isIOS:false,
            }
        },
        components:{XCell},
        mounted(){
            //判断是否ios是则显示“预览”按钮
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            //如果是ios则不显示下载按钮
            if(isiOS){
                // this.butString = "预览";
                
                this.isIOS = true;
                console.log(this.isIOS);
            }
        },
        methods:{
            download(option){
                // console.log(option);
                this.$emit('download',option); //主动触发upup方法，'hehe'为向父组件传递的数据
            },
            sendemail(option){
                //  console.log(option);
                this.$emit('sendemail',option);

            },
            gotodetali(option){
                // console.log(option);
                this.$emit('gotodetali',option);
            },
            reticket(option){
                this.$emit('reticket',option);
            },
            returnType(status){
                switch(status){
                    case 0:
                    case 11:
                    case 12:
                    case 13:
                    case 19:
                    case 139:
                        return "开票中";
                    case 132:
                    case 133:
                        return "开票错误";
                    case 2:
                        return "开票成功";
                    case 31:
                    case 32:
                    case 329:
                        return "红冲中";
                    case 323:
                        return "红冲错误";
                    case 22:
                        return "红冲成功";
                    case 222:
                        return "红冲已经重新开票";
                }
                return "未知状态";
            }
         
    }
        
    }
</script>

<style>
    .bill-list{
        margin-top: 60px;
      
    }
    .bill-list-xcell{
        /*height:240px;*/
        flex-direction: column;
        padding-top: 10px;
        padding-bottom: 10px;
        /*margin-top: 10px;*/
      
    }
    
    .bill-list .mint-cell-wrapper{
        /*height:240px;*/
        height: auto;
        /*padding: 10px;*/
        margin:0;   
    }
    .bill-list .mint-cell-title{
        width:0;
        margin:0;   
        display: none;
    }
    .bill-list .mint-cell-right{
        display: none;
    }
    .bill-list .mint-cell-value{
        flex:1;
        flex-direction: column;
        padding: 0;

        align-items: flex-start;/*条布局*/
    }
    /*修正属性结束*/
    .bill-list-box{
        width:100%;
        display: flex;
        flex:1;
        flex-direction:row;
        padding-top:10px;
    }
    
    .bill-list span{
        line-height:25px;
    }
    .bill-list-left{
        display: flex;
        flex:0.3;
        flex-direction: column;
        align-items:flex-start
    }   
    .bill-list-right{
        display: flex;
        flex:0.7;
        flex-direction:column;
    }
    .bill-list .btn-group{
       
        display: flex;
        flex: 1;
        width: 100%;
        margin-bottom: 5px;
        /*flex-direction: row;
        margin-top:20px;
        margin-bottom:20px;
        text-align: center;*/
    }
    .bill-list .btn-group button{
        /*display: flex;
        flex:1;
        justify-content: center*/
    }
    .download{
       /*display: -webkit-box;
        display: inline-block;
       display: flex;
       -webkit-box-flex: 1;*/
       flex: 1;
       /*justify-content: center;
       align-items: center;*/
       margin-right: 10px;
       
    }
    /*.bill-list .reticket{
       display: flex;
       flex: 0.5;
       justify-content: center;
       align-items: center;
       margin-right: 30px;
       margin-left: 50px;
    }*/
    linelayout{
        text-align: left;
        width:100%;
    }
    .bill-list .labsize{
        font-size: 15px;
    }
    .bill-list .taitou{
        margin-top: 10px;
    }
</style>