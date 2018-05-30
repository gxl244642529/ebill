<tempalte></tempalte>


<script>
  import VueRouter from 'vue-router'
  import axios from 'axios'
  import {MessageBox,Toast} from 'mint-ui'
  let router = new VueRouter();
  let title = "温馨提示";

  export default {
    name:'A',
    method:{
      alert:()=>{

      }
  
    },
     alert(msg){
         MessageBox.alert(msg, title);
    },
    toast(msg){
        Toast({
          message: msg,
          position: 'bottom',
          duration: 5000
        });
    },
    // then(action => {
    //      console.log(action);
    //         callback;
    //       });
    confirm(msg,callback){
       MessageBox.confirm(msg).callback
    }
 
    
  }
 
</script>