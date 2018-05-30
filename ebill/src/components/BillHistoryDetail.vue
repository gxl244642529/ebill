<template>
    <div id="bill_his_de">
        
        <title-bar
            title="开票充值明细"
            :isgobackFunction=true 
            @goback="goback"
        >
        </title-bar>
    
              <div class="list">
                <order-checklist
                    ref="test_c"
                    align="right"
                    v-model="arr"
                    :options="msgs"
                    >
                </order-checklist>
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
    Vue.component("bill-list",BillList);
     Vue.component("title-bar",TitleBar);
     Vue.component("state-listview",StateListView);
    // let token = window.localStorage.getItem("token");
    export default {
        name: "bill_history_detail",
        data(){
            return {
                arr:[],
                msgs: [],
                list:null,
                position:20,
                loading:true,
            }
        },
        beforeCreate(){
          
            let data = {id: this.$route.query.id}
            Api.api({
                url:'tc_ticket/detailOrders',
                data:data,
                success:(result)=>{
                    console.log(result)
                    this.msgs = result;
                    // this.loading = false;
                }
            })
        },
      methods:{
            loadMore() {
                console.log("我正在加载更多....")
             
            //     setTimeout(() => {
                 
            //     this.position =  this.msgs ? this.msgs.length : 0     
            //     let data = {token:token,position:this.position?this.position:0}
            //     Api.api({
            //         url:'tc_ticket/detailOrders',
            //         data:data,
            //         success:(result)=>{
                        
            //             this.msgs = this.msgs.concat(result);
            //         }
            //     })
            //       this.loading = true;
            // }, 2500);
            
        },
        goback(){
                Api.replace({str:"/billHistory" })
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
 
    #bill_his_de .list{
        margin-top:45px!important;
    }
     #bill_his_de .list .mint-cell{
       height:110px;
   }
   #bill_his_de .list .mint-cell-wrapper{
       height:100px;
   }
   #bill_his_de .list .mint-checkbox-label.littlefont{
       font-size:14px;
   }
   #bill_his_de .list .orders-content{
       display: flex;
       flex-direction: column;
       align-items: flex-start;
       margin-left:20px;
   }
   /*#allow_orders .check-all{
       position: relative;
   }*/
   #bill_his_de .check-all .mint-cell-wrapper{
       height:20px;
       display: flex;
       justify-content: flex-start;
   }
   #bill_his_de .check-all .mint-checklist-label{
       display: block!important;
   }
   
   #bill_his_de .list-top{
       display: flex;
       align-items: center;
   }
   #bill_his_de .mint-cell{
       border:none;
   }
   #bill_his_de .order_tag{
       position: absolute;
       top:10px;
       right:20px;
   }
   #bill_his_de .topmsg{
       display: flex;
       justify-content: flex-end;
   }
   #bill_his_de .topmsg label{
       margin-top: 50px;
       padding:10px;
       padding-bottom:0;
   }
   #bill_his_de .topmsg .harp{
       padding:5px;
       padding-top:12px;
   }
   #bill_his_de .list{
        margin-top: 60px
    }

   

</style>