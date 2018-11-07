<template>
  <div class='search-box'>
    <input class='box' :placeholder="placeholder" v-model="searchText" ref="input"
    :style="{color:color,fontSize:fontSize}">
    <i class='icon-search'></i>
    <i class='icon-dismiss' v-if="searchText" @click="clearText"></i>
    </input>

  </div>
</template>


<script>
import {mapMutations} from 'vuex'
import {debounce} from '../../commom/js/utils.js'
  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手',
      },
      color:{
        type:String,
        default:'black',
      },
      fontSize:{
         type:String,
        default:'13px',
      }
    },
    data(){
        return{
            searchText:'',
        }
    },
    created(){
        this.$watch('searchText',debounce((newText)=>{
          
            this.$emit('searchText',newText);
           // if(newText === this.searchText) return ;
           // this.setSearchText(newText);
        },200));
    },
    methods:{
        clearText(){
            this.searchText = '';
        },
        focus(){
            this.$refs.input.focus();
        },
        setSearchText(text){
            this.searchText = text;
        },
        unfocus(){
          this.$refs.input.blur();
        }
       
    }
  }

</script>


<style lang="stylus" scoped>
  .search-box {
    position: relative;
    box-sizing: border-box;
    
    border-radius: 13px;
    padding: 0 25px;
    background: rgba(255, 255, 255, 0.3);

  }

  .box {
    background: rgba(255, 255, 255, 0);
    padding:5px 0;
    width: 100%;
    vertical-align: middle;
    outline: none;
    text-align: left;
  }

  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color :inherit;
    opacity :0.8
 
  }

  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: rgba(255, 255, 255, 0.7);
    line-height: 13px;
    font-size: 13px;
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: rgba(255, 255, 255, 0.7);
    line-height: 13px;
    font-size: 13px;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: rgba(255, 255, 255, 0.7);
    line-height: 13px;
    font-size: 13px;
  }

  .icon-search {
    display: inline-block;
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
     color: rgba(255, 255, 255, 0.7);
  }

  .icon-search:before {

    content: "\e906"
  }

  .icon-dismiss {
    display: inline-block;
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color :rgba(0,0,0,0.3);
  }

  .icon-dismiss:before{
       content: "\e914"
  }

</style>
