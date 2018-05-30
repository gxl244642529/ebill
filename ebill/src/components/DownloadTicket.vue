<template>
    <div class="send-email">
        <title-bar title="发票预览" :isgobackFunction=true 
             @goback="goback"></title-bar>
         
        <div v-show="isloading" class="isload">
                <mt-spinner type="double-bounce" color="#26a2ff"></mt-spinner>
        </div>
        <div v-show="!isloading" class="imgres">
               <img :src="imgsrc" width="100%" style="transform: matrix(1, 0, 0, 1, 0, 0)"> 
        </div>
     <!--<a :href="imgsrc" class="downloada"> <p>点击下载电子发票</p></a>-->
     <div v-show="showdownload">
       <div class="bottom-btn-box"><mt-button type="danger" size="small" @click="download" >下载电子发票</mt-button></div>
     </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueRouter from 'vue-router'
    import Api from '../lib/Api'
    import A from '../lib/A'
    import TitleBar from '../lib/TitleBar'
    Vue.component("title-bar",TitleBar);
    export default {
        name: 'download-ticket',
        data(){
            return {
                // imgsrc:Api.getApiBase()+"tc_ticket/image?id="+this.$route.query.id,
                imgsrc:'',
                showdownload:true,
                pdfurl:'',
                isloading:true,
            }
        },
        mounted(){
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            //如果是ios则不显示下载按钮
            if(isiOS){
                this.showdownload = false;
            }
            let data = {id:this.$route.query.id}
            Api.api({
                url:'tc_ticket/detail',
                data:data,
                success:(result)=>{
                     console.log(result);
                    if(result!=null){  
                        this.isloading = false;
                        this.imgsrc = result.image;
                        this.pdfurl = result.pdf
                    }
                }
            })
            // console.log(this.$route.query.id);
            // console.log(Api.getApiBase());
            // this.imgsrc = Api.getApiBase()+"tc_ticket/image?id="+this.$route.query.id;
            // console.log(this.imgsrc);
        },
          methods:{
            download(){
                let data ={id:this.$route.query.id};
                console.log(this.$route.query.id);
                Api.api({
                    url:"tc_ticket/detail",
                    data:data,
                    success:(result)=>{
                        window.location.href= result.pdf;
                    }
                })
                
                console.log("下载电子发票");
                  return false

            },
             goback(){
                Api.replace({str:"/billHistory" });
            }
        }
    
    }
</script>

<style>
    /*功能样式补充*/
    .send-email{
       margin-top:80px;
    }
    .send-email .is-left button{
        text-align: left
    }
    .send-email .mint-cell-title{
        width:25% !important;
    }
    .imgres{
        display: flex;
        align-items: center;
        justify-content: center
    }
    .downloada{
        display: flex;
        justify-content:  flex-end;
        margin-right: 10px;
    }
    .send-email .img{
        transform: matrix(1, 0, 0, 1, 0, 0);
    }
    .send-email .isload{
        display: flex;
        justify-content: center;
        padding: 15px
    }
</style>