<template>
    <div id="allow_orders">
         <title-bar
            title="充值订单"
            api="tc_order/query"
            :data="data"
            :paged=true
            :isRight=true
            :rightMsg="rightext"
            @renderRight = "gotoAssignCard" >
         </title-bar>
           <div class="topmsg" @click="gethis">
                <img :src="his" width="30px"height="20px" class="imghis"/>
               
                <label @click="gethis" >开票历史</label>
           
            </div>
            <div v-show="isspinner">
                <spinner></spinner>
            </div>
            
         <div v-show="ishasorder&&!isspinner">
          
            <p>　您可以开具最近两个自然月内的发票：</p>
                <div class="check-all">
                <div v-on:click='checkedAll' class="checkallsty">
                    <input id="all-select" 
                    type='checkbox' value="全选" class='input-checkbox' v-model='checked' style="display:none" @click='checkedAll'>
                    <label for="all-select" class="all-select-label" @click="checkedAll"></label>
                    <span class="all-select-span">全选</span>
                </div>
                <div class="orderord" @click="orderList">
                    <p>按时间排序</P>
                    <img  v-show="sortord==1" :src="orderImg1" width="16" height="18" v/>
                    <img  v-show="sortord==2" :src="orderImg2" width="16" height="18" v/>
                </div>
            </div>
            <div class="list">
                <order-checklist
                    ref="test_c"
                    :max='10'
                    align="right"
                    v-model="arr"
                    :options="msgs"
                    :hascheck="true">
                </order-checklist>
            </div>
            <div class="bottom-btn-box">
                <div id="btn"><mt-button type="danger" size="small" v-on:click="confirm">开具发票</mt-button></div>
            </div>
         </div>
         <div class="noorder" v-show="!ishasorder&&!isspinner" @click="reload">
             <img :src="noorderimg" height="150" width="150"/>
             <p>暂无可开票订单</p>
         </div>
    </div>
</template>

<script>
import Vue from 'vue';

import VueRouter from 'vue-router'
import axios from 'axios'
import OrderChecklist from '../lib/OrderChecklist'
import Api from '../lib/Api'
import A from '../lib/A'
import {Confirm} from 'mint-ui'
import Spinner from '../lib/Spinner'
Vue.component('spinner',Spinner);
//Vue.component('mt-header', Header);
//Vue.component('mt-button', Button);
import TitleBar from '../lib/TitleBar'
Vue.component('title-bar',TitleBar);
Vue.component('order-checklist', OrderChecklist);
const TIME_DOWN = 1;
const TIME_UP = 2;
// let token = window.localStorage.getItem("token");


let router = new VueRouter();
  let header = {
    'content-type': 'multipart/form-data'
    }

export default {
  name: 'AllowOrders',

  data () {
    return {
      bindCount:0,
      msgs: [],
      arr:[],
      checkAll:"全选",
      test:'hello',
      order:"按时间排序↓",
      hasright:false,
      checked:false,
      data:"",
      sortord:TIME_DOWN,
      noorderimg:Api.getImgUrl()+"/static/img/noorder.png",
      ishasorder:"",
      orderImg1:Api.getImgUrl()+"/static/img/order_1.png",
      orderImg2:Api.getImgUrl()+"/static/img/order_2.png",
      rightext:"",
      isspinner:true,
      his:Api.getImgUrl()+"/static/img/his.png",
    //   canBindCount:0,
    }
  },
  watch:{
    sortord(){
        // console.log("正在改变排序");
         let data ={token:window.localStorage.getItem("token"),sortord:this.sortord};
        this.loadMore(data);
    }
  },
  mounted:function(){
     window.localStorage.setItem("orderrouter","allowOrders")
      
      this.getBindCardCount();
      let data ={token:window.localStorage.getItem("token"),sortord:this.sortord};
       Api.api({
            url:"tc_ecard/canBindCount",
            data:data,
            success:(result)=>{
                console.log(this.bindCount);
                if(this.bindCount<result){
                    // this.hasright = true;
                    this.rightext="添加指定卡"
                }else{
                    this.rightext="查看指定卡"
                }
                console.log(this.$route.query.id);
                if(this.$route.query.id==result){
                     this.rightext="查看指定卡"
                }

            }
        });
       
      this.loadMore(data);

 
  },

  methods:{
    getBindCardCount(){
        let data = {token:window.localStorage.getItem("token")};
        Api.api({
            url:'tc_ecard/isBindCount',
            data:data,
            success:(result)=>{
                    console.log("可绑定张数"+result);
                this.bindCount = result;
            }
        });
      },
      loadMore(data){
          console.log(data);
        Api.api({
            url:"tc_order/query",
            data:data,
            success:(result)=>{
                this.isspinner = false;
                if(result!=null){
                    this.msgs = result
                    this.ishasorder = true
                }else{
                    this.ishasorder = false
                }

              
            }
        });
      },
      //
      reload(){
        let data ={token:window.localStorage.getItem("token"),sortord:this.sortord};
        this.loadMore(data);
      },
      confirm:function(){
          let cardArr=[];
          if(this.arr.length==0){
              A.alert("请先选择要开票的订单");
              return;
          }
          //判断选择订单金额是否超过1000元0811
            let  amttotal=0;
            this.arr.forEach(function(item){
                amttotal = amttotal+item.amt;
            });
            console.log(amttotal);
            if(amttotal/100>=1000){
                A.alert("单张发票金额需在1000元以内"); 
                return;
            }


        Api.push({
            str:'/billDetail',
            query:{list:JSON.stringify(this.arr) }
        })

      },
   
      orderList:function(){
        //   this.order=this.order=="按时间排序↑"?"按时间排序↓":"按时间排序↑";
        if(this.sortord==1){
            this.sortord=2;
        }else{
              this.sortord=1;
        }
        
      },
      gotoAssignCard:function(){
        //   router.push({path:'/assignCard'});
         Api.push({str:'/assignCard'})
      },
      gethis(){
          Api.push({str:'/billHistory'})
      },
      godesc(){
        //   console.log("跳转开票说明")
        // window.location.href='http://218.5.80.17:8092/index.php/sys_agree_detail/content/qrrequest';
        Api.push({str:'/ticket_desc'})
      },
      checkedAll(){
          this.checked = !this.checked;
          if(this.checked){
             if(this.msgs.length>10){
                A.toast("最多只能选择10条记录")
            }
            var i;
            var arrlength = this.msgs.length>10?10:this.msgs.length
            for(i=0;i<arrlength;i++){
                this.arr.push(this.msgs[i])
            }
          }else{
            this.arr=[];
          }
      }
  }
}

</script>

<style>
   #allow_orders .list .mint-cell{
       height:110px;
   }
   #allow_orders .list .mint-cell-wrapper{
       height:100px;
   }
   #allow_orders .list .mint-checkbox-label.littlefont{
       font-size:12px;
   }
   #allow_orders .list .orders-content{
       display: flex;
       flex-direction: column;
       align-items: flex-start;
       margin-left:20px;
   }
   /*#allow_orders .check-all{
       position: relative;
   }*/
   #allow_orders .check-all .mint-cell-wrapper{
       height:20px;
       display: flex;
       justify-content: flex-start;
   }
   #allow_orders .check-all .mint-checklist-label{
       display: block!important;
   }
   
   #allow_orders .list-top{
       display: flex;
       align-items: center;
   }
   #allow_orders .mint-cell{
       border:none;
   }
   #allow_orders .order_tag{
       position: absolute;
       top:10px;
       right:20px;
   }
   #allow_orders .topmsg{
       
       display: flex;
       justify-content: flex-end;
   }
   #allow_orders .imghis{
        margin-top: 50px;
         padding-top:10px;
        padding-bottom:0;
   }
   #allow_orders .topmsg label{
       margin-top: 50px;
       padding:10px;
       padding-bottom:0;
   }
   #allow_orders .topmsg .harp{
       padding:5px;
       padding-top:12px;
   }
 
   .check-all{
       display: flex;
       align-items: center;
       flex: 1;
       margin-left:10px;
       flex-direction: row;
       
   }
  
   .orderord{
       display: flex;
       flex: 1;
       justify-content: flex-end;
       margin-right: 15px;
   }
   .orderord p{
       margin:0;
       line-height:20px;
       margin-right: 5px;
   }
   .checkallsty{
       display: flex;
       flex: 1;
     
   }
    #btn{
        position:fixed;
        left:0;
        bottom:0;
        width:100%;
        padding:20px;
        padding-left:0;
        background-color: #fff
    }
    .list{
        margin-bottom: 80px;
        margin-top:0!important;
    }
    .noorder{
        display: flex;
        flex: 1;
        margin-top:50%; 
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    #allow_orders .checkallsty{
        margin-left:10px;
    }
    #allow_orders .checkallsty #all-select{
        display:none;
    }
    #allow_orders .all-select-label{
        box-sizing: border-box;
        display: inline-block;
        background-color: #fff;
        border-radius: 100%;
        border: 1px solid #ccc;
        position: relative;
        width: 20px;
        height: 20px;
        vertical-align: middle;
    }
    #allow_orders .input-checkbox:checked+.all-select-label{
        background-color: #ef4f4f ;
        border-color: #ef4f4f ;
    }
    #allow_orders .input-checkbox:checked+.all-select-label:after{
        background-color: #fff;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    #allow_orders .all-select-label::after{
        content: " ";
        border-radius: 100%;
        top: 5px;
        left: 5px;
        position: absolute;
        width: 8px;
        height: 8px;
        -webkit-transition: -webkit-transform .2s;
        transition: -webkit-transform .2s;
        transition: transform .2s;
        transition: transform .2s,-webkit-transform .2s;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    #allow_orders .all-select-span{
        line-height:21px;
        margin-left:6px;
    }
   
</style>