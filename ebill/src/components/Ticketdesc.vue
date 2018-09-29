<template>
    <div class="ticket-desc">
        <title-bar
            title="开票说明"
            >
        </title-bar>

            <iframe
                :src="decsurl"
                class="descurl"
                style="height:100%;visibility:inherit; width:100%;margin-top:35px;padding:3%;"
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
        name: 'ticketdesc',
        data(){
            return {

                decsurl:Api.getDocUrl()+"tcdesc"
            }
        },

    }
</script>

<style>

    .ticket-desc{
         display: flex;
         flex: 1;
         height: 800px;

    }
    .ticket-desc .descurl{
        /*margin-top: 50px;*/
        width: 100%;
        /*height: 800px;*/

    }
</style>
