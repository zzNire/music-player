<template>
  <div class='history-list' v-if="searchHistory.length!==0" >
    <p class="history-title" v-if="showTitle">搜索历史</p>
    <i class='icon-clear' @click.stop="clearAllSearchHisory" v-if="showTitle"></i>
    <transition-group name="list" tag="ul" class="history-ul">
    
      <li class='history-li' v-for="(history,index) in searchHistory" :key="history"
      @click="selectItem(index)">
        <p class="li-text"> {{history}}</p>
        <i class="icon-delete" @click.stop="clearItemSearchHisory(index)"> </i>
      </li>
    
    </transition-group>
  </div>
</template>

<script>
  export default {
    props: {
      searchHistory: {
        type: Array,
        default: [],
      },
      showTitle:{
        type:Boolean,
        default:true,
      }
    },
    methods:{
        clearAllSearchHisory(){
            this.$emit('clearAllSearchHisory');
        },
        clearItemSearchHisory(index){
            this.$emit('clearItemSearchHisory',index);
        },
        selectItem(index){
          this.$emit('selectItem',index);
        }
    }
  }

</script>

<style lang="stylus" scoped>
  .history-title {
    font-size: 15px;
    font-weight: bold;
    margin: 10px 5px;
  }


  .history-li {
    display: flex;
    font-size: 14px;
    line-height: 30px;
    align-items:center;
    height :30px;
    overflow :hidden;
  }

 .icon-delete {
   position :relative;
    text-align :center;
    display: block;
    flex: 16px 0 0;
    font-size: 12px;
  }

  .icon-delete:before {
    content: "\e908";
  
  }

 
  .li-text {
    flex: 1;
    margin-left :10px;
  }

  .history-list {
    position: relative;
  }



  .icon-clear:before {
    content: "\e907"
  }


  .icon-clear {
    position: absolute;
    right: 0px;
    top: 0px;
  }

.list-enter , .list-leave-to{
  height :0;
}
.list-enter-active , .list-leave-active{
  transition :all 0.1s;
  }
</style>
