<template>
   <div id="title-bar">

          <mt-header fixed v-bind:title="title" class="topbar">
          
                <mt-button icon="back" slot="left"  @click.stop="goBack"></mt-button>
            
                
            <mt-button v-if="isRight"  slot="right" class="title-tight" @click="touRight" >{{rightMsg}}</mt-button>
        </mt-header>
   </div>
</template>

<script>
    import Vue from 'vue';
    import VueRouter from 'vue-router'
   

    import { 
        Header,
        Button,
    } from 'mint-ui';
    export default {
        name: 'tilte-bar',
        props: {
            title: String,
            isRight:Boolean,
            rightMsg:String,
            isgobackFunction:Boolean,
          
        },
        
        data(){
            return {
              isgoback:this.isgobackFunction
            }
        },
        methods:{
            touRight(){
                  this.$emit('renderRight'); //主动触发upup方法，'hehe'为向父组件传递的数据
            },
            goBack(){
                // this.isgoback? this.$emit('goback'): window.history.go(-1);
                // this.isgoback? this.$emit('goback'): window.history.back(-1);
                console.log(this.$router);
                this.isgoback? this.$emit('goback'):this.$router.go(-1);
               
            }
        }
   
        
    }
</script>

<style>
  .topbar{
     /*color: #000*/
  }
  #title-bar .title-tight{
      padding-right: 8px;
      padding-left: 8px;
      width: auto;
      /*font-size: 18px;*/
      /*background-color: green;*/
      /*margin-right: 3px;*/

  }
    
</style>