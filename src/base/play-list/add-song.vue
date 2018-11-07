<template>
  <div class="addsong-content">
    <div class="header">
      <p class='title'>添加歌曲到列表</p>
      <p class="close" @click="closeAddSong">关闭</p>
    </div>
    <div class='search-box-content' @click="maxSearchBox">
      <search-box :color="'gray'" :font-size="'14px'"></search-box>
    </div>
    <div class="content">
      <div class="tab">
        <p class="recent-play" :class="{'right-tab':rightTab===0}">最近播放</p>
        <p class="search-history" :class="{'right-tab':rightTab===1}">搜索历史</p>
      </div>
      <div class="result-content">
        <component :is="tabName"></component>
      </div>
    </div>
    <div class="search-content">
        <search></search>
    </div>
  </div>
</template>


<script>
  import SearchBox from '../search-box/search-box.vue'
  import SearchList from '../search-list/search-list.vue'
  import Search from '../../components/search/search.vue'
  export default {
    components: {
      SearchBox,
      SearchList,
      Search
    },
    data() {
      return {
        rightTab: 1,
        ifMaxSearchBox
      }
    },
    computed: {
      tabName() {
        if (this.rightTab === 0) {
          return '';
        } else {
          return 'SearchList'
        }
      }
    },
    methods: {
      closeAddSong() {
        this.$emit('closeAddSong');
      }
    }
  }

</script>


<style lang="stylus" scoped>
  @import '../../commom/stylus/variable.styl';

  .addsong-content {

    background-color: rgb(245, 245, 245);
  }

  .header {
    background-color: white;
    padding: 20px 0 15px 0;
    position: relative;
    text-align: center;

  }

  .title {
    font-size: 16px;
  }

  .close {
    position: absolute;
    right: 0;
    bottom: 15px;
    font-size: 14px;
    padding: 0 10px;
  }

  .search-box-content {
    margin: 10px;
    background-color: white;

  }

  .content {
    background-color: white;
    padding: 10px 0;
  }

  .tab {

    width: 50%;
    margin: 0 auto;
    display: flex;
    text-align: center;
    font-size: 14px;
    border: 1px solid $color-sub-theme;
  }

  .recent-play {
    padding: 5px 10px;
    flex: 1;
  }

  .search-history {
    padding: 5px 10px;
    flex: 1;
  }

  .right-tab {
    color: white;
    background-color: $color-sub-theme;
  }

</style>
