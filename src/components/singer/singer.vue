<template>
  <div class="singer">
      <listview :data="map"></listview>

  </div>
</template>


<script>
const ERR_OK = 0;
const HOT_NAME = '热门';
const HOT_SINGER_LENGTH = 10;
import Singer from '../../commom/js/singer.js'
import Listview from '../../base/listview/listview.vue'
import {
    getSinger
  } from '../../api/singer.js';

  export default {
    components:{
        Listview,
    },
    created() {
      this._getSinger();
     
    },
    data() {
      return {
        singers: {},
        map:[],
      }
    },
    methods: {
      _getSinger() {
        getSinger().then((res) => {
         if (res.code === ERR_OK) {
             console.log("singer");
            console.log(res.data);
            this.singers = res.data.list;
            //console.log(this.recommends.slider.length);
             this._normalizeSinger(this.singers);
          }
        })
      },
      _normalizeSinger(list){
        let map ={
            hot:{
                title:HOT_NAME,
                items:[],
            }
        };
        list.forEach((element,index) => {
            if(index < HOT_SINGER_LENGTH){
                map.hot.items.push(
                    new Singer(
                        element.Fsinger_mid,
                        element.Fsinger_name)

                )
            }
            let key = element.Findex;
            if(!map[key]){
                map[key] = {
                    title:key,
                    items:[],
                }
            }
            map[key].items.push(
                    new Singer(
                        element.Fsinger_mid,
                        element.Fsinger_name)
            )
        });
        console.log(map);
        this.map = map;
        this._orderList(this.map);
      },
      _orderList(list){
          let hot = [];
          let ret = [];
          for(let key in list){
              let val = list[key];
              if(val.title.match(/[a-zA-Z]/)){
                  ret.push(val);
              }
              else if(val.title === HOT_NAME){
                  hot.push(val);
              }
          }
          ret.sort((a,b)=>{
              return a.title.charCodeAt(0) - b.title.charCodeAt(0) ;
          })
          console.log(ret);
          console.log(hot);
          this.map = hot.concat(ret);
          console.log(this.map);
      },
    }
  }

</script>


<style lang="stylus" scoped>
.singer{
    height :100%;
    widows :100%;
}
</style>
