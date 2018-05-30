<template>
    <div id="check_box">
     <img :src="checked?checkimg:nocheckimg" width="18px" height="18px" @click="check"/>
     <p class="agreet">本人已阅读并知晓</p>
     <p class="agreetment" @click="goUrl" >{{name}}</p>
  </div>
</template>

<script>
    import Vue from 'vue';
    import VueRouter from 'vue-router'
    import Api from './Api'

    import { 
        Header,
        Button,
    } from 'mint-ui';
    export default {
        name: 'check-box',
        props: {
            name: String,
            ischecked:Boolean,
             
        },
        
        data(){
            return {
              checkimg:Api.getImgUrl()+"/static/img/ic_insurance_checked@2x.png",
              nocheckimg:Api.getImgUrl()+"/static/img/ic_insurance_uncheck@2x.png",
              checked:this.ischecked,
              named :this.name,
         }
        },
        watch: {
            ischecked(val) {
              this.checked = val;
              console.log("正在监听变化"+this.checked);
            },

          
        },
      
        methods:{
             check(){
                //  console.log("check")
                // this.$emit('check');
                this.checked = !this.checked;
                this.$emit('check',this.checked);
            },
            goUrl(){
                console.log("goUrl")
                this.$emit('goUrl');
            },
        }
   
        
    }
</script>

<style>
   #check_box{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;
    }
    #check_box .agreet{
        padding-left: 10px;
    }
    #check_box .agreetment{
        color: red;
    }
    
</style>