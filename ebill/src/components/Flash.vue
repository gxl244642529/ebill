<template>
    <div class="login">
     
      
            <div>
                 <mt-spinner type="double-bounce" color="#26a2ff"></mt-spinner>
            </div>
           
    </div>
</template>

<script>

    import Api from '../lib/Api'
    import EbillUtils from './EbillUtils'
    import A from '../lib/A'
    // let token = window.localStorage.getItem("token");
  
    let header = {
    'content-type': 'multipart/form-data'
    }
    export default {
        name: 'Flash',
   
        data(){
            return {
              bindCount:0,
            }
        },
      mounted: function () {
            // this.$destroy()
      window.bundleType='weixin'//测试
        if(window.bundleType&&window.bundleType=='weixin'){
            //用openid换取获取token1234567890
            // let openId = window.openid;
            let openId = '1234567890';//测试
            let data = {openId:openId}
            this.gourl(data,"tc_gate/wxGetToken")
        } if(window.bundleType&&window.bundleType=='app'){
            //app登录
            let hash = window.userid;
            let data ={hash:hash};
            this.gourl(data,"tc_gate/getToken")
        }
        //未获取到bundleType
        if(!window.bundleType){
            
            A.toast("bundleType获取失败");
             var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                let openId = window.openid;
                let data = {openId:openId}
                this.gourl(data,"tc_gate/wxGetToken")
            }else{
                let hash = window.userid;
                let data ={hash:hash};
                this.gourl(data,"tc_gate/getToken") 
            }
        
        }

  
      },
      methods:{
        gourl(data,url){
          Api.api({
            url:url,
            data:data,
            success:(result)=>{
                if(result!=null){
                    // console.log(result)
                    if(window.localStorage){
                       localStorage.setItem("token",result);
                    }
                    console.log(localStorage.getItem("token"));
                      console.log("hsdfgbdjf="+ window.token);
                      Api.api({
                        url:'tc_ecard/isBindCount',
                        data:{token:window.localStorage.getItem("token")},
                        success:(result)=>{
                            console.log("shdgjf"+result);
                            //如果大于0跳转订单页面，等于零跳转指定卡页面
                            if(result>0){
                                // Api.push({str:'/allowOrders',query:{id:result}})
                                Api.replace({str:'/allowOrders',query:{id:result}});
                            }else{
                                Api.replace({str:'/assignCard'}) 
                            }
                        
                        }
                    });
                }else{
                    Api.replace({str:'/login'});
                }

            }
        })
        }
      }
    }
</script>

<style>
     .login{
         display: flex;
         flex: 1;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         margin-top: 250px;

     };

    
</style>