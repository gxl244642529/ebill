<template>
    <div id="bill-detail">
        <title-bar
            title="发票信息"
        >
        </title-bar>
        <div class="ticmsg"> 
            <my-radio
            @getstatus="getstatus"
            ></my-radio>
          
            <div v-if="value=='0'">

              <mt-field label="发票抬头" placeholder="个人" :attr="{ maxlength: 50 }" readonly></mt-field>
            </div>
             <div v-if="value=='1'">
                <div class="head-container" >
                    <mt-field label="发票抬头" 
                       placeholder="请填写单位名称" 
                       v-model="head" :attr="{ maxlength: 50 }" 
                       class="headfiled"
                       :rows=rowcont
                       contenteditable="true"
                       onselectstart="return false;"
                       type="textarea"></mt-field>
                    <mt-button size="small" @click="showPicker()" icon="more" class="head-btn"></mt-button>
                </div>
             </div>
              <div v-if="value=='1'">
                <mt-field label="税　　号" v-model="headCode" placeholder="请填写纳税人识别号" ></mt-field>
              </div>
             
              <mt-field label="发票内容" placeholder="易通卡充值款"  readonly></mt-field>
             
             <div>
              <mt-field label="发票金额" :placeholder="amttotal" readonly></mt-field>
             </div>
     
          
            <!--<div class="mtradio">
              <mt-radio
                class="seletradio"
                v-model="value"
                :options="options">
              </mt-radio>
            </div>-->
         
            <check-box 
                name="《开票说明》"
                :ischecked="ischecked"
                @check="check"
                @goUrl="goUrl"
            >
            </check-box>
        </div>
        <div class="bottom-btn-box"><mt-button type="danger" size="small" @click="submint">提交</mt-button></div>
        <div id="alert-choose" style="display:none">
            <div class="black-bg" @click="showPicker()"></div>
            <ul class="diy-list">
                <li v-for="item in arr">
                    <div @click="showPicker(item)">{{item.head}}</div>
                </li>
                <li v-if="arr.length==0">
                    <div @click="showPicker(item)">暂无历史发票抬头</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueRouter from 'vue-router'
    // let token = window.localStorage.getItem("token");
    import Api from '../lib/Api'
    import A from '../lib/A'
    import TitleBar from '../lib/TitleBar'
    import {MessageBox,Picker,Radio } from 'mint-ui'
    import Checkbox from '../lib/Checkbox'
    import radio from '../lib/radio'
    Vue.component('my-radio',radio)
    Vue.component('check-box',Checkbox)
    Vue.component('title-bar',TitleBar)
    Vue.component('mt-picker',Picker)
    const CONTENT ="厂,营业部,经营部,工作室,公司" 
   export default {
        name: 'bill_detail',
        data(){
            return {
               list:[],
               amttotal:"",
               head:"",
               readonly:true,
               visibility:true,
               ischecked:true,
               checked:true,
               arr:[],
               value:'0',
               headCode:'',
               options :[
                
                    {
                        label: '个人',
                        value: '0'
                    },
                    {
                        label: '单位',
                        value: '1'
                    }
                    ],
                constrct:"",
                needcode:false,
                rowcont:"1",
                templen:0,
            }
        },
    
        mounted(){
            //获取关键词
            this.getconstrct();
            this.arr=[];
            // this.value="0";
            this.ischecked =this.checked= true;  
            this.visibility=false;
            let data ={token:window.localStorage.getItem("token")};
            Api.api({
                url:'tc_ticket/heads',
                data:data,
                success:(data)=>{
                    this.arr=data;
                }
            })
            console.log(this.$route.query.list)
            console.log(this.arr.length);
            this.list =  JSON.parse(this.$route.query.list);
            console.log(this.list);
           //统计金额
            let  amttotal=0;
            this.list.forEach(function(item){
                amttotal = amttotal+item.amt;
            });
            this.amttotal = amttotal/100+"元";
            console.log( this.amttotal );
        },
     
        methods:{
            getconstrct(){
                console.log("正在访问")
                Api.api({
                url:'tc_ticket/headCode',
                data:{},
                success:(result)=>{
                    console.log(result);
                   this.constrct = result
                }

             });
            },
            //检查公司抬头
            checkhead(){

                if(this.head==null||this.head==""&&this.value=='1'){
                    A.alert("请填写单位名称");
                    return true;
                }
                //判断是否输入中文，可输入中英文括号,[增加可输入英文(170926)]
                var charMatch = this.head.match(/[\u4e00-\u9fa5\()\（）\a-\z\A-\Z]/g);   
                var reg = /^[\u4E00-\u9FA5\()\（）\a-\z\A-\Z]+$/;    
                if(!reg.test(this.head)&&this.value=='1'){
                    A.alert("请输入正确的单位名称");
                    return true;
                }
                //判断公司抬头是否大于4个汉字
                var charNum = charMatch ? charMatch.length : 0;   
                if(charNum<5&&this.value=='1'){
                    A.alert("请填写完整的单位名称");
                    return true;
                }
                //判断抬头是否含有“易通卡”
                if(this.head.indexOf('易通卡')>=0){
                    A.alert("发票销售方与购买方不能相同");
                    return true;
                }

            },
            //检查纳税人识别号
            checkcode(){
                var constrctarr = [];
                constrctarr =   this.constrct&&this.constrct.split(",");
                if(constrctarr!=null){
                    for(var i=0;i<constrctarr.length;i++){
                        if(this.head.indexOf(constrctarr[i])>0){
                            this.needcode = true;
                            break;
                        }else{
                            this.needcode = false;
                        }
                    }
                }
         
                //
                if(!this.headCode&&this.value=='1'&&this.needcode){
                    A.alert("请填写纳税人识别号");
                    return true;
                }
                //判断输入是否为数字或字母
                var reg = /^[0-9a-zA-Z]*$/g;
                if(!reg.test(this.headCode)&&this.value=='1'&&this.needcode){
                    A.alert("请输入正确的纳税人识别号");
                    return true;
                }

                //纳税人识别号判断位数若不是15/18/20位数的，不让填写
                console.log(this.headCode.length);
                if(this.headCode.length!=0&&this.headCode.length!=15&&this.headCode.length!=18&&this.headCode.length!=20&&this.value=='1'){
                    A.alert("请填写准确的纳税人识别号");
                    return true;
                }
                //检查纳税人识别号不能含“91350200761740855U”
                console.log(this.headCode);
                if(this.headCode=="91350200761740855U"){
                    A.alert("发票销售方与购买方税号不能相同");
                    return true;
                }
            },

            
            submint(){
                if(this.checkhead()){
                    return;
                }
                if(this.checkcode()){
                     return;
                }
                if(!this.checked){
                    A.alert("请先阅读开票说明");
                    return; 
                }
                if(!this.value){
                    A.alert("请选择类型");
                    return;  
                }
                if(this.value=='0'){
                    this.head = '个人';
                }

                console.log(this.list);
                console.log("红冲id"+this.$route.query.redid);
                let data = {token:window.localStorage.getItem("token"),orders:this.list,headCode:this.headCode,head:this.head,redid:this.$route.query.redid};
                console.log(data);
                MessageBox.confirm('请确保填写的信息准确无误！').then(action => {
                      Api.api({
                        url:'tc_ticket/submit',
                        data:data,
                        success:(result)=>{
                            console.log(result);
                            // Api.push('/billSuccess');
                            Api.replace({
                                str:"/billSuccess",
                            })
                        }

                    });
                });
             
            },
            showPicker:function(item){
                console.log("showPicker:");
                console.log(item);
                let picker=document.getElementById('alert-choose');
                if(picker.style.display=="none"){
                    picker.style.display="block"
                }else{
                    if(item){
                        this.head=item.head;
                        this.headCode = item.headCode;//默认带出税号
                    }
                    picker.style.display="none"
                }
                

            },
            check(ischecked){
              console.log(ischecked);
              this.checked = ischecked;
            
            },
            goUrl(){
               Api.push({str:'ticket_desc'})
            },
            getstatus(status){
                console.log("status"+status)
                this.value=status+"";
                 if(this.value=='0'){
                    this.head = '个人';
                    this.headCode = '';
                }else{
                    this.head = '';
                    this.headCode = '';
                }
            }
        },
        watch:{
            visibility(){
                console.log("正在改变可渲染"+this.visibility)
            },
            head(){
                // console.log(this.head);
                
                // if((this.head.length)/10>=1&&parseInt((this.head.length)/10)>this.templen){
                //     (this.rowcont++).toString();
                //     this.templen = parseInt((this.head.length)/10);
                // }else if(Math.ceil((this.head.length)/10)<this.templen){
                //     console.log(Math.ceil((this.head.length)/10)+" "+this.templen)
                //     // this.rowcont="1";
                //     // this.templen=0;
                //     if(this.rowcont!="1"){
                //         this.rowcont--;
                //         this.templen = this.rowcont;
                //     }else{
                //       this.rowcont="1";
                //       this.templen=0;
                //     }

                // }
                this.rowcont = (Math.ceil(this.head.length/10)).toString();
                if(this.head.length/10<1){
                     this.rowcont="1";
                }
                console.log(this.rowcont);
            }
        },
    }
</script>

<style>
 .ticmsg{
     margin-top: 60px
 }
 #bill-detail .head-container{
     position:relative;
     height: auto;
 }
 #bill-detail .head-btn{
     position:absolute;
     right:5px;
     top:15px;
 }
 #bill-detail .slots{
     display: block
 }
 #head-picker{
      position:absolute;
      background-color: 'green';
      width:100%;
      height:80px;
      bottom:0;
      left:0
 }
 #head-picker .picker-items{
     height:80px;
     
 }


 #bill-detail #alert-choose{
     display: block;
 }
#bill-detail .black-bg{
     width:100%;
     height:100%;
     background: #000;
     position: fixed;
     top:0;
     left:0;
     opacity:0.5
 }
 #bill-detail .choose-list{
     position: fixed;
     top:10%;
     left:10%;

     width:80%;
 }
 #bill-detail .diy-list{
     width:80%;
     -webkit-padding-start: 0;
     -webkit-margin-before:0;

     position: fixed;
     top:80px;
     left:10%;
 }
 #bill-detail .diy-list li{
    text-align: center;
    justify-content: center;
    background-color: #fff;
    box-sizing: border-box;
    color: inherit;
    min-height: 48px;
    overflow: hidden;
    position: relative;
    text-decoration: none;

     list-style-type:none;
     background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: top left;
    background-origin: content-box;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 16px;
    line-height: 1;
    padding: 0 10px;
    width: 100%;

    
 }
 .seletradio{
    display: flex;
    flex-direction: row;
    border-bottom: 1px;
 }
 #bill-detail .mtradio{
     margin-left: -23px;
 }
 #bill-detail .headfiled{
     /*background-color: red;*/
     width: 88%;
     /*height: auto;*/
     word-wrap: break-word; word-break: break-all;
     
     

 }
 .mint-cell-wrapper{
     height: auto;
     
 }
</style>