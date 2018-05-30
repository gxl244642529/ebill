<template>
  <div id="lib-radio">
   <div class="group">
       <div class="row-item" @click="itemclickper"  name="RadioGroup1"> 
            <img :src="person" width="25px" height="25px"/>
            <span class="per">个人  </span>
       </div>
       <div  class="row-item" @click="itemclickcom"  name="RadioGroup1">
             <img :src="com" width="25px" height="25px"/>
             <span class="per">单位  </span>
       </div>

   </div>
  </div>
</template>

<script>
    import Vue from 'vue';
    import VueRouter from 'vue-router'
    import Api from './Api'
    const radiose = Api.getImgUrl()+"/static/img/radiose.png"
    const radiono = Api.getImgUrl()+"/static/img/radiono.png"

    import { 
        Header,
        Button,
    } from 'mint-ui';
    export default {
        name: 'my-radio',
        props: {
            title: String,
            isRight:Boolean,
            rightMsg:String,
            isgobackFunction:Boolean,
          
        },
        
        data(){
            return {
              person:radiose,
              com:radiono,
              isselect:true,
            }
        },
        methods:{
            itemclickper(){
                if(this.person!=radiose){  
                   this.person = radiose;
                   this.com = radiono;
                   this.$emit('getstatus',0);

                }
            },
            itemclickcom(){
                if(this.com!=radiose){
                   this.com = radiose;
                   this.person = radiono;
                   this.$emit('getstatus',1);
                }
            },
   
        }
   
        
    }
</script>

<style>
  #lib-radio{
      
      border-bottom:1px solid #ccc;
      border-top: 1px solid #ccc;
      
      
  }
  #lib-radio .group{
    display: flex;
      flex-direction: row;
      /*justify-content: center;*/
      /*align-items: center;*/
      margin-left: 10px;
  }
  #lib-radio .per{
      /*margin-left: 5px;
      */
      padding: 20px;
    
  }
  #lib-radio .row-item{
       display: flex;
       align-items: center;
       margin-right: 35px;
  }
    
</style>