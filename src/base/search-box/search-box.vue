<template>
  <div class='search-box'>
    <input class='box' :placeholder="placeholder" v-model="searchText" ref="input">
    <i class='icon-search'></i>
    <i class='icon-dismiss' v-if="searchText" @click="clearText"></i>
    </input>

  </div>
</template>


<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手',
      }

    },
    data(){
        return{
            searchText:'',
        }
    },
    created(){
        this.$watch('searchText',(newText)=>{
            this.$emit('searchText',newText);
        })
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
        }
    }
  }

</script>


<style lang="stylus" scoped>
  .search-box {
    position: relative;
    box-sizing: border-box;
    height: 26px;
    border-radius: 13px;
    padding: 0 25px;
    background: rgba(255, 255, 255, 0.3);

  }

  .box {
    background: rgba(255, 255, 255, 0);
    height: 26px;
    width: 100%;
    color: white;
    font-size: 13px;
    vertical-align: middle;
    outline: none;
    text-align: left;
  }

  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: rgba(255, 255, 255, 0.7);
    line-height: 13px;
    font-size: 13px;
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
