<template>
    <div class="list">
       <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <div v-for="item in list" class="item">
             
            </div>
        </ul>

    </div>
</template>


<script>
 import Vue from 'vue';
  import VueRouter from 'vue-router'
  import axios from 'axios'
  import {MessageBox,Toast} from 'mint-ui'
  import Api from './Api'
  let router = new VueRouter();
  let title = "温馨提示";

  export default {
    name:'state-listview',
   
      props: {
       api:String,
       data:Object,
       paged:Boolean,
       row:String,
      
       

     
      },
       data(){
        return {
           list:[],
           loading:true,
           url:this.api,
           urldata:this.data,
           isPaged:this.paged,
    
         
        }
    },
       watch: {
        api(val) {
            this.url = val;//新增result的watch，监听变更并同步到myResult上
        }
     },
    // beforeCreate(){
    //     console.log(this.url);
    //     Api.api({
    //         url:this.url,
    //         data:this.urldata,
    //         success:(data)=>{
    //             console.log(data);
    //             // this.list = data
    //             // this.msgs = result;
    //         }
    //     })
    // },
    mounted: function () {
        //  console.log(this.url);
        //  console.log(this.rend);
        //      var componentTwo = Vue.extend({
        //     template:this.renderRow
        // })
        // Vue.component( 'component-two' ,this.rend);
           Api.api({
            url:this.url,
            data:this.urldata,
            success:(data)=>{
                console.log(data);
                this.list = data
                // this.msgs = result;
            }
        })
    },
    methods:{
        loadMore(){
            console.log("加载")
        }

    },
 
    
  }
 
</script>

<style>
    .list{
        display: flex;
        margin-top: 20px;
    }
    .item{
        display: flex;
        flex: 1;
        margin-top: 20px;
    }
</style>
