<tempalte></tempalte>


<script>
  import VueRouter from 'vue-router'
  import axios from 'axios'
  import {MessageBox,Toast} from 'mint-ui'
  let router = new VueRouter();
  let header={
    'content-type': 'multipart/form-data'
  };
  let BASE_URL="http://192.168.1.236:8191/api/";//本地测试地址
  // let BASE_URL="http://110.80.22.108:28080/api/";    //服务器110测试地址
  // let BASE_URL="http://218.5.80.17:28095/api/";    //正式服务器218地址
    // let BASE_IMAGE_URL_RELEASE = "http://www.cczcc.net/resources/ticket"//测试图片地址
    //  let BASE_IMAGE_URL_RELEASE = "http://110.80.22.108:8887/resources/ticket"//测试图片地址

    let BASE_IMAGE_URL_RELEASE = "http://218.5.80.17:8092/resources/ticket_release"//正式图片地址
  // let BASE_IMAGE_URL_RELEASE = "http://www.cczcc.net/resources/ticket_release"//正式图片地址
  // let BASE_IMAGE_URL_RELEASE="http://127.0.0.1:8080";
  let BASE_DOC_URL = "http://218.5.80.17:8092/index.php/sys_agree_detail/content/" //协议地址
  export default {
    name:'Api',
    method:{
      api:()=>{
        console.log("yes");
      },
      param:()=>{
         console.log("param");
      }
    },
    api:(api)=>{
      axios.post(BASE_URL+api.url,api.data,{headers:header})
      .then((res)=>{
        console.log(res);
        let flag=res.data.flag;
        let result=res.data.result;
        if(flag==0){
          //成功
          api.success && api.success(result);
        }else if(flag<0){
          //弹出对话框
          console.log(result);
          MessageBox.alert(result+"")
          api.message&&api.message(result);
        }else if(flag==7){
          //未登录、token失效,过期登录重新获取token保存，微信用openid获取token
          // MessageBox.alert("登录超时，请重新登录！").then(()=>{
          //   router.push({path:'/login'})
          // });
          Api.api({
            url:'tc_gate/wxGetToken',
            data:data,
            success:(result)=>{
                if(window.localStorage){
                    localStorage.setItem("token",result);
                }
            }
        })


        }else{
          MessageBox.alert("服务器错误！");
          api.error&&api.error(result);
        }

      })
      .catch((err)=>{
        Toast({
          message: '网络错误',
          position: 'bottom',
          duration: 2500
        });
      });
      console.log("hi");
    },
    push(param){
      router.push({path:param.str,query:param.query});
    },
    replace(param){
        router.replace({path:param.str,query:param.query});
    },
    getRouter(){
      return router;
    },
    getApiBase(){
      return BASE_URL;
    },
    getImgUrl(){
        // return BASE_IMAGE_URL_TEST;
       return BASE_IMAGE_URL_RELEASE;
    },
    getDocUrl(){
      return BASE_DOC_URL;
    }
  }
  /*
    Api.api({
      url:'',

    })
  */
</script>
