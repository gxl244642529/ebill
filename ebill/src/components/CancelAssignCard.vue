<template>
    <div id="assign_card">
      <title-bar
         title="解绑指定卡"
         rightMsg="绑定e通卡"
          :isgobackFunction=true
          @goback="goback">
      </title-bar>
      <div v-show="isspinner">
          <spinner></spinner>
      </div>
      <div v-show="ishascard&&!isspinner">
         <div class="tipdiv">
            <p id="tip">每月最多解绑{{unbindCard}}张开票的卡号,以下为你已经指定的卡号,勾选可进行解绑</p>
            <img id="tip_help" :src="helpimg" width="22px" height="22px" @click="gobindhelp">
         </div>
          <div id="tip">
            当前还可解绑{{isCancelCount}}张
          </div>
         <div class="m-bottom">
             <card-canlist
                 ref="test_c"
                 align="right"
                 v-model="arr"
                 :options="msgs"
                 :nochecksty="nochecksty"
                 >
             </card-canlist>
         </div>
         <div class="btn-bg">
             <div id="btn"><mt-button :type="buttype" size="small" :disabled="isNotChange" v-on:click="cancelBind" :plain="plain">确认解绑</mt-button></div>
         </div>

      </div>
      <div v-show="!ishascard&&!isspinner&&!numLimit" class="nocard">
          <img :src="nocardimg" width="150px" height="150px">
          <p>您还没有指定开票卡或者未绑定e通卡</p>
      </div>
      <div v-show="numLimit&&!isspinner" class="nocard">
          <img :src="nocardimg" width="150px" height="150px">
          <p>您本月解绑的张数已达上限不能再解绑</p>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue';
  import TitleBar from '../lib/TitleBar'
  import Api from '../lib/Api'
  import A from '../lib/A'
  import CardCancellist from '../lib/CardCancellist'
  import {MessageBox,Picker,Radio } from 'mint-ui'
  Vue.component('title-bar',TitleBar);
  Vue.component('card-canlist',CardCancellist);
  export default{
    name:'CancelAssignCard',
    data(){
      return{
        isspinner:true,
        helpimg:Api.getImgUrl()+ "/static/img/help.png",
        nocardimg:Api.getImgUrl()+ "/static/img/nobindcard.png",
        unbindCard:0,
        isCancelCount:0,
        msgs:[],
        arr:[],
        nochecksty:'mint-checkbox-input',
        isNotChange:true,
        buttype:"default",
        plain:"plain",
        ishascard:false,
        numLimit:false,//张数限制是否达到上限
      }
    },
    watch:{
      arr:function(){
           if (this.arr&&this.arr.length!=0) {
              this.isNotChange=false;
              this.buttype = "danger";
              this.plain = null;
              console.log("有")
           }else{
             this.isNotChange=false;
             this.buttype = "default";
             this.plain = "plain";
               console.log("无")
           }
      }
    },
    mounted(){
      this.isUnbindCount(); //还剩次数
      this.loadData();
      this.getUnbindCard(); //总共可解绑数量
    },
    methods:{
      goback(){
         this.$router.go(-1)
      },
      loadData(){
        let data = {token:window.localStorage.getItem("token")};
          Api.api({
            url:"tc_ecard/ticketCardList",
            data:data,
            success:(result)=>{
              this.isspinner = false;
              if(result&&result.length!=0&&this.isCancelCount!=0){
                this.ishascard = true;
                this.msgs = result;
              }else {
                this.ishascard = false;
              }

            }
        });
      },
      getUnbindCard(){
        let data = {token:window.localStorage.getItem("token")};
        Api.api({
          url:'tc_ecard/canUnbindCount',
          data:data,
          success:(result)=>{
            this.unbindCard = result
          }
        })
      },
      isUnbindCount(){
        let data = {token:window.localStorage.getItem("token")};
        Api.api({
          url:'tc_ecard/isUnbindCount',
          data:data,
          success:(result)=>{
            //还剩次数
            this.isCancelCount = result
            if(result==0){
              this.ishascard = false;
              this.numLimit = true;
            }
            console.log("还剩余额次数",result)
          }
        })
      },
      gobindhelp(){
        Api.push({
          str:'/assignCardIllustate',
        })
      },
      gobind(){
          Api.push({
              str:'/bindCard',
          })
      },
      cancelBind(){
        let count = this.isCancelCount - this.arr.length;
        if (count<0) {
            A.confirm("您当前勾选数量已超过可解绑数量,确定解绑？",(action)=>{
              this.delTicketCard();
            })
        }else {
          A.confirm("确定解绑？这次解绑后还剩"+count+"张可以解绑",(action)=>{
              // var lineList = this.arr.join(',');
              // let data = {token:window.localStorage.getItem("token"),cards:lineList}
              //
              // Api.api({
              //     url:'tc_ecard/delTicketCard',
              //     data:data,
              //     success:(result)=>{
              //       if (result) {
              //         A.toast("解绑成功");
              //         this.$router.go(-1)
              //       }
              //     }
              // })
              this.delTicketCard();
          })
        }
      },
      delTicketCard(){
        var lineList = this.arr.join(',');
        let data = {token:window.localStorage.getItem("token"),cards:lineList}

        Api.api({
            url:'tc_ecard/delTicketCard',
            data:data,
            success:(result)=>{
              if (result) {
                A.toast("解绑成功");
                this.$router.go(-1)
              }
            }
        })
      }
    }
  }
</script>
<style scope>


</style>
