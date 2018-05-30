<tempalte></tempalte>


<script>
    let token = window.localStorage.getItem("token");
    import Api from '../lib/Api'
  export default {
    name:'EbillUtils',
    methods:{
  
  
    },
     getToken(){
         return token;
     },
     //获取可以绑定卡
     getCanbindCount(){
         let canBindCount ; 
         let data = {token:window.localStorage.getItem("token")};
           Api.api({
            url:"tc_ecard/canBindCount",
            data:data,
            success:(result)=>{
                console.log("hsadfjhf");
                canBindCount = result
                console.log(result);
            }
        });
        console.log(canBindCount);
       return canBindCount;
        
     },
     //获取已经绑定卡
     getbindCount(){
         let bindCount ;
         let data = {token:window.localStorage.getItem("token")};
          Api.api({
            url:'tc_ecard/isBindCount',
            data:data,
            success:(result)=>{
                  console.log(result);
              this.bindCount = result;
            }
        });
       return bindCount;
     },
    
  }
 
</script>