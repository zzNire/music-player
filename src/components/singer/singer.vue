<template>
  <div class="singer">
    <listview :data="map" @select="getSingerDetial"></listview>
    <transition :name="showClass">
      <singer-detial class="singer-content" v-if="isDetial"></singer-detial>
    </transition>
    
  </div>
</template>


<script>
const ERR_OK = 0;
const HOT_NAME = "热门";
const HOT_SINGER_LENGTH = 10;
import Singer from "../../commom/js/singer.js";
import Listview from "../../base/listview/listview.vue";
import singerDetial from "../../components/singer-detial/singer-detial.vue";
import { getSinger } from "../../api/singer.js";
import {mapMutations} from 'vuex'

export default {
  components: {
    Listview,
    singerDetial
  },
  created() {
    this._getSinger();
  },
  data() {
    return {
      singers: {},
      map: [],
      isDetial: false,
      showClass:'slideTo',
    };
  },
  methods: {
    _getSinger() {
      getSinger().then(res => {
        if (res.code === ERR_OK) {
          console.log("singer");
          console.log(res.data);
          this.singers = res.data.list;
          //console.log(this.recommends.slider.length);
          this._normalizeSinger(this.singers);
         
          }
      });
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((element, index) => {
        if (index < HOT_SINGER_LENGTH) {
          map.hot.items.push(
            new Singer(element.Fsinger_mid, element.Fsinger_name)
          );
        }
        let key = element.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer(element.Fsinger_mid, element.Fsinger_name)
        );
      });
      console.log(map);
      this.map = map;
      this._orderList(this.map);
    },
    _orderList(list) {
      let hot = [];
      let ret = [];
      for (let key in list) {
        let val = list[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      console.log(ret);
      console.log(hot);
      this.map = hot.concat(ret);
      console.log(this.map);
    },
    ...mapMutations({
      setSinger:'SET_SINGER'
    }),
    getSingerDetial(singer) {
      this.setSinger(singer);
      console.log("singer-detial");
      this.$router.push({
        path: `/singer/${singer.id}`
      });
    },
    

  },
  watch:{
     '$route'(to, from){
       let indexTo = [];
       let indexFrom = [];
      indexTo = to.path.split('/');
      indexFrom = from.path.split('/');
       if(indexTo.length > indexFrom.length)
       {
         this.isDetial = true;
         this.showClass = 'slideTo';
         console.log(1);
       }
       else{
         this.showClass = 'slideFrom';
         this.isDetial = false;
       }
     }
  }
};
</script>


<style lang="stylus" scoped>
.singer {
  height: 100%;
  widows: 100%;
}

.singer-content {
  position: absolute;
  top: 0;
  bottom :0px;
  left: 0px;

  width: 100%;
  background :white;
  color :black;
 
  z-index:100;

}

.slideTo-enter,.slideTo-leave-to{
  transform :translate3d(100%,0,0);
}
.slideTo-enter-to,.slideTo-leave{

}
.slideTo-enter-active,.slideTo-leave-active{
  transition :all 0.5s;
}
</style>
