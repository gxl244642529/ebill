<template>
    <div class="assign_card_illustate">
        <title-bar
            title="指定开票卡说明"
            >
        </title-bar>
       
            <iframe 
                :src="decsurl"
                class="descurl"
                style="height:100%;visibility:inherit; width:100%;margin-top:35px;padding:3%"
                frameborder="0"
                >
            </iframe>
            
     
    
  </div>
 
</template>


<script>
    import Vue from 'vue';
    import VueRouter from 'vue-router'
    import TitleBar from '../lib/TitleBar'
    import Api from '../lib/Api'
    Vue.component('title-bar',TitleBar)

    export default {
        name: 'AssignCardIllustate',
        data(){
            return {

                decsurl:Api.getDocUrl()+"tcbind"
            }
        },
      
    }
</script>

<style>
    
    .assign_card_illustate{
         display: flex;
         flex: 1;
         height: 800px;

    }
    .assign_card_illustate .descurl{
        /*margin-top: 50px;*/
        width: 100%;
        /*height: 800px;*/

    }
</style>