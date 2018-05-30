<template>
    <div class="libspinner">
             <div>
                 <mt-spinner type="double-bounce" color="#26a2ff"></mt-spinner>
            </div>
    </div>
</template>

<script>
import Vue from 'vue';

import VueRouter from 'vue-router'
import axios from 'axios'





let router = new VueRouter();

export default {
  name: 'spinner',

  data () {
    return {
 
    }
  },

}

</script>

<style>
 .libspinner{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 250px;
 };
  
</style>