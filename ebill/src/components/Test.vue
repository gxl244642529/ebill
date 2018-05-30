<template>
    <div>
            <mt-checklist
  title="复选框列表"
  v-model="value"
  :options="options">
</mt-checklist>
<span>7928985151</span>

    </div>
</template>

<script>
import Vue from 'vue';

import VueRouter from 'vue-router'
import axios from 'axios'
import CardChecklist from '../lib/CardChecklist'
import Api from '../lib/Api'

//Vue.component('mt-header', Header);
//Vue.component('mt-button', Button);
Vue.component('card-checklist', CardChecklist);


let router = new VueRouter();
  let header = {
    'content-type': 'multipart/form-data'
    }

export default {
  name: 'Test',

  data () {
    return {
      value:[],
      msgs: [],
      arr:[],
      test:'hello',
      list:[1,2,3,5,5,5,5,5,5,5,5,5,5,,5,5,6],
      options:[
  {
    label: '被禁用',
    value: '值F',
    disabled: true
  },
  {
    label: '选中禁用',
    value: '选中禁用的值',
    disabled: true
  },
  {
    label: '选项A',
    value: '值A'
  },
  {
    label: '选项B',
    value: '值B'
  }
]
    }
  },
  beforeCreate:function(){
    //   console.log("token"+window.localStorage.getItem("openId"));
      let token = window.localStorage.getItem("token");
      let data = {token:token};

        Api.api({
            url:"tc_ecard/list",
            data:data,
            success:(result)=>{
                this.msgs = result
            }
        });
  },
  methods:{
      confirm:function(){
          //console.log(CardChecklist);
          //console.log(CardChecklist.data);
          console.log(this.arr);
          router.push({path:'/allowOrders'})
         // MessageBox.confirm('确定执行此操作?').then(action => {
            // console.log("yes");
            // router.push({path:'/bindCard'})
            console.log();
          //});
      },
      loadMore() {
  this.loading = true;
  setTimeout(() => {
    let last = this.list[this.list.length - 1];
    for (let i = 1; i <= 10; i++) {
      this.list.push(last + i);
    }
    this.loading = false;
  }, 2500);
}
  }
}

</script>

<style>
   .test{
       display: flex;
       flex: 1;
   }
   element.style{
       flex: 1;
   }
   .test .test_but{
        flex: 1;
       /*display: flex;
       flex: 1; */
   }
</style>