<template>
    <div id="bill-history">
        <title-bar
            title="开票历史"
             :isgobackFunction=true 
             @goback="goback"
        >
        </title-bar>
        <div v-show="isspainner">
            <spinner></spinner>
        </div>
      <div v-show="ishashistory&&!isspainner" class="list-container">
        <ul  
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
            class="items"
        >
            <bill-list
                ref="test_c"
                align="right"
                @download="download"
                @sendemail="sendemail"
                @gotodetali="gotodetali"
                @reticket ="reticket"
                v-model="arr"
                :options="msgs"
                >
            </bill-list>
            <div class="load">
                <mt-spinner v-show="!loading" type="fading-circle" color="#26a2ff"></mt-spinner>
            </div>
        </ul>
      </div>
      <div class="nohis" v-show="!ishashistory&&!isspainner" @click="reloadhis">

         <img :src="nohisimg" width="150px" height="150px">
         <p>暂无历史记录</p>
      </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueRouter from 'vue-router'

    import BillList from '../lib/BillList'
    

    import Api from '../lib/Api'
    import StateListView from '../lib/StateListView'
    import TitleBar from '../lib/TitleBar'
    import XCell from '../lib/cell/index.js';
    import Spinner from '../lib/Spinner'
    Vue.component('spinner',Spinner);
    Vue.component("bill-list",BillList);
     Vue.component("title-bar",TitleBar);
     Vue.component("state-listview",StateListView);
    // let token = window.localStorage.getItem("token");
    //电子发票类型
    // const CREATE = 0;
    // const CORE_CREATE = 1; //创建中
    // const SUCCESS = 2;    //开票成功
    // const TICKET_SUBMITING = 21;  //开票中
    // const TICKET_IO = 22; //开票中
    // const TICKET_ERROR = 23;  

    export default {
        name: "bill_history",
        data(){
            return {
                arr:[],
                msgs: [],
                list:null,
                position:0,
                loading:true,
                state:"",
                ishashistory:false,
                nohisimg:Api.getImgUrl()+"/static/img/noorder.png",
                isspainner:true
            }
        },
          components: { XCell },
        mounted(){
            console.log(this.position);
            // let data = {token:window.localStorage.getItem("token"),position:this.position?this.position:0}
            // Api.api({
            //     url:'tc_ticket/his',
            //     data:data,
            //     success:(result)=>{
            //         if(result.length!=0){
            //           this.msgs = result;
            //           this.ishashistory = true;
            //         }else{
            //            this.ishashistory = false; 
            //         }
                
            //         this.loading = false;
            //     }
            // })
            this.getHis();
        },
      methods:{
            getHis(){
                let data = {token:window.localStorage.getItem("token"),position:this.position?this.position:0}
                Api.api({
                    url:'tc_ticket/his',
                    data:data,
                    success:(result)=>{
                        this.isspainner = false;
                        if(result.length!=0){
                        this.msgs = result;
                        this.ishashistory = true;
                        }else{
                        this.ishashistory = false; 
                        }
                    
                        this.loading = false;
                    }
                })
            },
            reloadhis(){
                this.getHis();
            },
            loadMore() {
                console.log("我正在加载更多....")
           
                setTimeout(() => {
                 
                this.position =  this.msgs ? this.msgs.length : 0     
                let data = {token:window.localStorage.getItem("token"),position:this.position?this.position:0}
                Api.api({
                    url:'tc_ticket/his',
                    data:data,
                    success:(result)=>{
                        
                        this.msgs = this.msgs.concat(result);
                    }
                })
                    this.loading = true;
            }, 2500);
            
        },
        gotodetali(option){
            console.log("详情"+option.id);
            Api.push({str:'/bill_history_detail',query:{id:option.id}})
        },
        sendemail(option){
            console.log("跳转发送电子邮箱"+option.id);
            Api.push({str:'/sendEmail',query:{id:option.id}})
           
        },
        download(option){
            console.log("下载"+ option.content);
            let data ={id:option.id};
            console.log(this.$route.query.id);
            Api.api({
                url:"tc_ticket/detail",
                data:data,
                success:(result)=>{
                    window.location.href= result.pdf;
                }
            })
            // Api.push({str:'/download-ticket',query:{id:option.id}}) //0707

        },
        reticket(option){
            //重新开票
         Api.push({ str:'/billDetail',query:{list:option.content,redid:option.id } })
        },
        goback(){
          Api.replace({str:"/allowOrders" })
        }
 

   
      }
    }
</script>

<style>
    .bill-ul{
         width:100%;
          display: flex;
          flex-direction:column;
          /*justify-content:flex-start;*/
    }
    .items{
        display: flex;
        /*flex: 1;*/
        flex-direction:column;
    }
    .item{
        display: flex;
        flex-direction:column;
    }
  
    .item-time{
        display: flex;
        margin-top: 10px;
        flex-direction: row
        
    }
   .btn-group{
       display: flex;
       flex: 1;
       flex-direction: row;
       margin-top: 10px;
    }
    /*.download{
       display: flex;
       flex: 1;
       justify-content: center;
       align-items: center;
       margin-right: 10px;
    }*/
    .nohis{
          display: flex;
          flex: 1;
          margin-top:50%; 
          justify-content: center;
          align-items: center;
          flex-direction: column;
    }
    #bill-history .list-container ul{
        padding-left:10px;
    }
    #bill-history .load{
       display: flex;
       justify-content: center;
       align-items: center
          
    }
   

</style>