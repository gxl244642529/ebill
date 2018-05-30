<template>
    <div id="assign_card">
         <title-bar
            title="指定开票卡"
            :isRight="hasright"
            rightMsg="绑定e通卡"
            @renderRight = "gobind" 
             :isgobackFunction=true 
             @goback="goback">
         </title-bar>
         <div v-show="isspinner">
             <spinner></spinner>
         </div>
         <div v-show="ishascard&&!isspinner">
            <div class="tipdiv">
              
               <p id="tip">　您可以指定最多{{canBindCount}}张可开票的卡号</p>
               <img id="tip_help" :src="helpimg" width="22px" height="22px" @click="gobindhelp"> 
            </div>
            <div class="m-bottom">
                <card-checklist
                    ref="test_c"
                    :max=this.maxCount
                    align="right"
                    v-model="arr"
                    :options="msgs"
                    :nochecksty="nochecksty"
                    @input="inputbut"
                    >
                </card-checklist>
            </div>
            <div v-if="hasbutton" class="btn-bg">
                <div id="btn"><mt-button :type="buttype" size="small" :disabled="isNotChange" v-on:click="confirm" :plain="plain">确认指定</mt-button></div>
            </div>
         </div>
         <div v-show="!ishascard&&!isspinner" class="nocard" @click="gobind">
             <img :src="nocardimg" width="150px" height="150px">
             <p>您的app还没有绑定e通卡赶紧去绑定吧！</p>
             <div  class="btn-bg">
                <div id="bindbtn"><mt-button type="danger" size="small"  v-on:click="gobind" >立即绑定</mt-button></div>
            </div>
         </div>
    </div>
</template>

<script>
import Vue from 'vue';

import VueRouter from 'vue-router'
import axios from 'axios'
import CardChecklist from '../lib/CardChecklist'
import Api from '../lib/Api'
import A from '../lib/A'
import {MessageBox} from 'mint-ui'
import TitleBar from '../lib/TitleBar'
import Spinner from '../lib/Spinner'
Vue.component('spinner',Spinner);
Vue.component('title-bar',TitleBar);
//Vue.component('mt-header', Header);
//Vue.component('mt-button', Button);
Vue.component('card-checklist', CardChecklist);


let router = new VueRouter();
  let header = {
    'content-type': 'multipart/form-data'
}
// let token = window.localStorage.getItem("token");

export default {
  name: 'AssignCard',

  data () {
    return {
      value:[],
      msgs: [],
      arr:[],
      test:'hello',
      canBindCount:0,
      tipimg:Api.getImgUrl()+ "/static/img/tip.png",
      nocardimg:Api.getImgUrl()+ "/static/img/nobindcard.png",
      helpimg:Api.getImgUrl()+ "/static/img/help.png",
      ishascard:false,
      bindCount:0,
      isNotChange:true,
      firstChange:false,
      isspinner:true,
      serarr:[],
      hasright:false,
      nochecksty:'mint-checkbox-input',
      buttype:"default",
      plain:"plain",
      hasbutton:true,
      maxCount:0,
    }
  },
  watch:{
    ishascard(){
        console.log("正在改变可渲染"+this.ishascard)
    },
    canBindCount(){
        console.log(this.canBindCount+" "+this.bindCount);
        if(this.canBindCount!=this.bindCount){
            this.hasright = true;
        }

    },
    arr:function(){//arr监听事件，第一次默认会修改arr值，不调用事件，第二次更改状态时调用（可能会有第一次arr不变化的情况）
        // if(!this.firstChange){
        //     this.firstChange=true;
        //     //   this.isNotChange=false;
        //     return
        // }else{
        //     this.isNotChange=false;
        //     console.log("arr发生了改变");
        // }
         console.log("arr发生了改变");
        if(this.canBindCount==this.bindCount){
             this.isNotChange=true;
             this.hasright = false;
             this.hasbutton = false
        }else if(this.canBindCount!=this.bindCount){
             this.hasright = true;
        }
            
    }
  },

  mounted(){
    let data = {token:window.localStorage.getItem("token")};
      //可绑定几张卡
    this.getcanBindCard(data);
     //已经绑定了几张卡
    this.getBindCardCount(data);
    //获取真实最大可绑定数量
    this.getMaxBind(data);//增加扫码账户自动加入列表中时修改列表max
    if(this.canBindCount!=this.bindCount){
          this.hasright = true;
    }
    Api.api({
        url:"tc_ecard/list",
        data:data,
        success:(result)=>{
            this.isspinner = false;
            if(result.length!=0){
                this.msgs = result;
                this.ishascard = true;
                this.canSelectCard();
                result.forEach((item)=> {
                    if(item.bind==true){
                        this.arr.push(item.cardId);
                        this.serarr.push(item.cardId);
                    }
                });
            }else{
                this.ishascard = false;
                console.log("改变")
            }
        }
    });   
  
          
  },
  methods:{
      getcanBindCard(data){
         Api.api({
            url:"tc_ecard/canBindCount",
            data:data,
            success:(result)=>{
                console.log("hsadfjhf");
                this.canBindCount = result
            }
        });
      },
      getBindCardCount(data){
            Api.api({
                url:'tc_ecard/isBindCount',
                data:data,
                success:(result)=>{
                  console.log(result);
                  this.bindCount = result;
                }
            });
      },
      getMaxBind(data){
        Api.api({
            url:'tc_ecard/maxBindCount',
            data:data,
            success:(result)=>{
                console.log(result);
                this.maxCount = result;
            }
        });
      },
      canSelectCard(){
          //绑定数量小于最大值时才能默认勾选
          console.log(this.bindCount);
          if(this.bindCount<this.canBindCount){
             this.bindcard();
          }
      },
      confirm:function(){
        //   console.log(this.arr);
          //取arr和serarr的差集
          var diff = [];
          this.arr.forEach((item)=> {
                  if(this.serarr.indexOf(item)<0){
                    diff.push(item);
                  }else{

                  }
                });
          console.log(diff);
          //上传差集
          if(diff.length==0){
            A.alert("请勿重复指定");
            return;
          }
          var lineList = diff.join(',');
          if(this.arr.length==0){
            A.alert("请先指定开票卡");
            return;
          }
          console.log(lineList);

          var data = {token:window.localStorage.getItem("token"),cards:lineList};
          
         MessageBox.confirm('卡指定后不能取消，是否确定?').then(action => {
             Api.api({
                url:"tc_ecard/setTicketCard",
                data:data,
                success:(result)=>{
                    
                    console.log(this.canBindCount);
                    Api.replace({str:'/allowOrders',query:{id:this.bindCount}});
                  
                }
            })
          });
      },
      gobind(){
          Api.push({
              str:'/bindCard',
          })
      },
      gobindhelp(){
            Api.push({
              str:'/assignCardIllustate',
          })
      },
      bindcard(){

        // console.log(this.$route.query.cardId);
       // 解决异形卡绑定问题，判断是否含有字母如果有为异形卡，不默认勾选（临时解决）
        //  var reg= /[a-z]/i;
        //  &&!reg.test(this.$route.query.cardId)
        //  console.log(reg.test(this.$route.query.cardId));
            if( this.$route.query.cardId!=null){
        // if( this.$route.query.cardId!=null && !reg.test(this.$route.query.cardId)){
              this.arr.push(this.$route.query.cardId);
              this.isNotChange=false;
              console.log("bindcard="+this.arr);
          }
      },
      goback(){
        //   console.log(window.localStorage.getItem("orderrouter"));
        console.log(this.arr.length+"   "+this.serarr.length);
          if( window.localStorage.getItem("orderrouter")=='allowOrders'&& this.serarr.length!=0){
            //返回到order页面
            console.log("第一次执行")
            Api.replace({str:'/allowOrders',query:{id:this.bindCount}})
          }else{
               console.log("第二次执行")
              this.$router.go(-1)
          }
      },
      //回调
      inputbut(val){
        //改变后的数组
        let diff = [];
        val.forEach((item)=> {
        if(this.serarr.indexOf(item)<0){
            diff.push(item);
            }else{

            }
        });
        //如果长度为0则按钮不可点击
        //如果长度大于0按钮可点击
        if(diff.length>0){
            this.isNotChange = false;
            this.buttype = "danger";
            this.plain = null;
        }else{
            this.isNotChange = true; 
             this.buttype = "default";
            this.plain = "plain";
        }
      }
  }
}

</script>

<style>

    #container{
        margin:0;
        padding:0
    }
    .topbar{
        width:100%;
        margin:0px;
    }
    #assign_card button{
        width:80%;    
        /*margin-left:10%;*/
    }
    #assign_card #btn{
        position:fixed;
        left:0;
        bottom:0;
        width:100%;
        padding:10px;
        padding-left:10%;
        background-color: #fff;
        
    }
    #assign_card #bindbtn{
        position:fixed;
        left:0;
        bottom:0;
        width:100%;
        padding:40px;
        padding-left:10%;
        background-color: #fff;
    }
    .m-bottom{
        margin-bottom:60px;
    }
    /*功能样式补充*/
    .is-left button{
        text-align: left
    }
    #assign_card #tip{
        /*margin-top: 60px;*/
        color: #e8464c;
    }
    #assign_card #tip_help{
        /*margin-top: 60px;*/
        /*color: #e8464c;*/
        margin-left: 10px;
    }
    .tipdiv{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 45px;
    }
    .tipdiv p{
        line-height:22px;
    }
    .nocard{
        
          display: flex;
          flex: 1;
          margin-top:50%; 
          justify-content: center;
          align-items: center;
          flex-direction: column;
    }
    .mint-button--danger {
        color: #fff;
        background-color: #ef4f4f;
    }

</style>