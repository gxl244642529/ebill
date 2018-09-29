<template>
  <div @change="$emit('change', currentValue)" class="mint-checklist" :class="{ 'is-limit': max <= currentValue.length }">
    <label class="mint-checklist-title" v-text="title"></label>

    <x-cell v-for="option in options">
      <label class="mint-checklist-label" slot="title" id="option.cardId">
        <div class="left-two">
        <img :src="cardImg" width="30px" height="24px">
        <span class="test-class">
            <span class="mint-checkbox-label" v-text="option.cardId&& option.cardId"></span>
            <span class="mint-checkbox-label littlefont" v-text="option.remark && option.remark"></span>
        </span>
        </div>
        <span
          :class="{'is-right': align === 'right'}"
          class="mint-checkbox">
          <input
            :class="checkstyle"
            type="checkbox"
            v-model="currentValue"
            
            :value="option.cardId || option"
            >
          <span class="mint-checkbox-core"></span>
        </span>

      </label>
    </x-cell>
  </div>
</template>

<script>
import XCell from './cell/index.js';
if (process.env.NODE_ENV === 'component') {
  require('./cell/style.css');
}

/**
 * mt-checklist
 * @module components/checklist
 * @desc 复选框列表，依赖 cell 组件
 *
 * @param {(string[]|object[])} options - 选项数组，可以传入 [{label: 'label', value: 'value', disabled: true}] 或者 ['ab', 'cd', 'ef']
 * @param {string[]} value - 选中值的数组
 * @param {string} title - 标题
 * @param {number} [max] - 最多可选的个数
 * @param {string} [align=left] - checkbox 对齐位置，`left`, `right`
 *
 *
 * @example
 * <mt-checklist :v-model="value" :options="['a', 'b', 'c']"></mt-checklist>
 */
 const checkcolor = '#ef4f4f'
 const nocheckcolor = '#ccc'
 import Api from './Api'
export default {
  name: 'CardCheckList',

  props: {
    max: Number,
    title: String,
    align: String,
    options: {
      type: Array,
      required: true
    },
    value: Array
  },

  components: { XCell },

  data() {
    return {
      currentValue: this.value,
      cardImg:Api.getImgUrl()+ "/static/img/card_g.png",
      checkstyle:'mint-checkbox-input',
      nostyle:''

    };
  },

  computed: {
    limit() {
      return this.max < this.currentValue.length;
    }
  },

  watch: {
    value(val) {
      this.currentValue = val;
    },

    currentValue(val) {
      if (this.limit) val.pop();
      this.$emit('input', val);
    }
  }
};
</script>

<style>
    .mint-cell-wrapper{
        height:60px;
    }
    .mint-checklist-label{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .test-class{
        display: flex;
        flex-direction: column ;
        margin-left:20px;
        /*display: block;*/
    }
    .mint-checkbox-label{
        line-height:22px;
    }
    .mint-checkbox.is-right{
        display: flex;
        align-items: center;
    }
    .left-two{\
        display: flex;
        align-items: center;
    }
    /*.mint-checkbox-input[disabled] + .mint-checkbox-core {
      background-color: #d9d9d9;
      border-color: #ccc;
  }*/


</style>
