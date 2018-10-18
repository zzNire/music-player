<template>
  <div class="tab">
    <div class="tab-tab">
    <ul class="tab-ul">
      <li class="tab-item" :class="{'itemActive':nowIndex === index}" @click="changeTab(index)" v-for="(item,index) in list">
        {{item.name}}
      </li>
    </ul>
    </div>
    <div class="swiper-container">

      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in componentList">
          <keep-alive>
            <component :is="item.component"></component>
          </keep-alive>
        </div>
      </div>
      <div class="swiper-scrollbar"></div>
    </div>
  </div>
</template>


<script>
  import rank from '../rank/rank.vue'
  import recommend from '../recommend/recommend.vue'
  import search from '../search/search.vue'
  import singer from '../singer/singer.vue'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css';
  export default {
    data() {
      return {
        list: [{
            name: '推荐',
          },
          {
            name: '排行',
          },
          {
            name: '歌手',
          },
          {
            name: '搜索',
          }
        ],
        componentList: [{
            path: '/recommend',
            component: recommend,

          },
          {
            path: '/rank',
            component: rank,
          },
          {
            path: '/singer',
            component: singer,
          },
          {
            path: '/search',
            component: search,
          }
        ],
        nowIndex: 0,
      }
    },
    mounted() {
      let i;
      for (i = 0; i < this.componentList.length; i++) {

        if (this.$route.path === this.componentList[i].path)
          break;
      }
      this.nowIndex = i;
      if (!this.mySwiper) {
        this.mySwiper = new Swiper(".swiper-container", {
          initialSlide: this.$route.path === '/recommend' ? 0 : this.$route.path === '/rank' ? 1 : this.$route.path ===
            '/singer' ? 2 : this.$route.path === '/search' ? 3 : 0,
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
          },

        });
        this.mySwiper.scrollbar.$el.css({
          'background': 'rgb(212,68,57)',
          'height': '3px'
        });
        let drag = this.mySwiper.scrollbar.$dragEl;
        drag.css({
          'background': 'white',
          'height': '3px',

        });
        drag.css({
          'border-radius': '0',
          'box-sizing': 'border-box',
          //假装缩短滚动条 其实长度未变 只是将左右边框设为白色 
          'border-left': 'solid rgb(212,68,57) 25px',
          'border-right': 'solid rgb(212,68,57) 25px',


        });
      }
      this.mySwiper.on('slideChange', () => {
        let index = this.mySwiper.activeIndex;
        this.nowIndex = index;
        this.$router.push(this.componentList[index].path);
      });
    },
    methods: {
      changeTab(index) {
        console.log(index);
        this.mySwiper.slideTo(index);
      }
    },
    watch: {
      '$route'(to, from) {
        console.log(to.path + from.path);
        console.log(this.componentList[0].path);
        let i;
        for (i = 0; i < this.componentList.length; i++) {

          if (to.path === this.componentList[i].path)
            break;
        }
        this.mySwiper.slideTo(i);
      }
    }
  }

</script>


<style lang="stylus" scoped>
  @import '../../commom/stylus/variable.styl';

  .tab-ul {

    width: 100%;
    background: $color-sub-theme;
  }

  .tab-item {
    padding-top: 10px;
    font-size: 14px;
    text-align: center;
    width: 25%;
    display: inline-block;
    color: $color-text-l;
  }

  .itemActive {
    color: white;
    font-weight: 600;
  }

  .swiper-container {
    position: relative;
  }
.swiper-wrapper{
  padding-top:16px;
}
  .swiper-scrollbar {
    padding: 5px 0px;
    border-radius: 0px;
     width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
  }


</style>
