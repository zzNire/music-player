<template>
  <div class="listview">
    <scroll class='listview-content' :data="data" :listenScroll="listenScroll" :probe-type="3" ref="listviewScroll"
      @scroll="scroll">
      <ul class="group-ul">
        <li class="group-li" v-for="group in data" ref="gropuLi">
          <p class="group-name">{{group.title}}</p>
          <ul class="list-ul">
            <li class="list-li" v-for="item in group.items">
              <img v-lazy="item.avatar" class="list-img" />
              <div class="list-name">{{item.name}}</div>

            </li>
          </ul>
        </li>
      </ul>
      <div class="menuList" @touchstart.stop.prevent='onMenuTouchStart' @touchmove.stop.prevent='onTouchMove'>
        <ul class="menu-ul">
          <li class="menu-li" v-for="(item,index) in menuList" :dataIndex="index" :class="{'currentLi':currentIndex===index}">
            {{item}}
          </li>
        </ul>
      </div>
      <div class='fixed' v-show="scrollY<=0" ref="fixedTitle">
          <p class="fixed-title">{{fixedTitle}}</p>
      </div>
    </scroll>
    
    <div class="loading-contain" v-show="!data.length">
        <my-loading class="loading"></my-loading>
      </div>
  </div>
</template>


<script>
  import Scroll from '../scroll/scroll.vue'
  import myLoading from '../loading/loading.vue';
  import {
    getData
  } from '../../commom/js/dom.js'

  const HEIGHT = 15;
  export default {
    props: {
      data: {
        type: Array,
        default: [],
      }
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff:-1,
      }
    },
    components: {
      Scroll,
      myLoading,
    },
    created() {
      this.touch = {};
      this.listenScroll = true;
      this.listHeight = [];
    },
    computed: {
      menuList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1);
        })
      },
       fixedTitle(){
           
            return this.data[this.currentIndex]?this.data[this.currentIndex].title:'';
      }
    },
    methods: {
      onMenuTouchStart(e) {
        console.log(e.target);
        let anchorIndex = getData(e.target, 'index');
        anchorIndex = parseInt(anchorIndex);
        console.log(anchorIndex);
        let firstTouch = e.touches[0];
        this.touch.y1 = firstTouch.pageY;
        this.touch.anchorIndex = anchorIndex;

        //this.currentIndex = parseInt(anchorIndex);
        this.scrollY = -this.listHeight[anchorIndex];
        console.log('height' + this.listHeight[anchorIndex]);

        // console.log('currentIndex' + this.currentIndex);
        this.$refs.listviewScroll.scrollToElement(this.$refs.gropuLi[anchorIndex], 0);
      },
      onTouchMove(e) {
        let firstTouch = e.touches[0];
        this.touch.y2 = firstTouch.pageY;
        //console.log(this.touch.y1 + " " + this.touch.y2);
        let delta = Math.floor((this.touch.y2 - this.touch.y1) / HEIGHT);
        // console.log("delta" + delta);
        let anchorIndex = Number(this.touch.anchorIndex) + delta;
        anchorIndex = parseInt(anchorIndex);
        console.log('currentIndex' + this.currentIndex);
        // console.log("now" + anchorIndex);

        this.scrollY = -this.listHeight[anchorIndex];
        // this.currentIndex = parseInt(anchorIndex);


        this.$refs.listviewScroll.scrollToElement(this.$refs.gropuLi[anchorIndex], 0);
      },
      scroll(pos) {
        //console.log(pos.y);
        this.scrollY = pos.y;

      },
      _calculateHeight() {
        const list = this.$refs.gropuLi;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
  
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight();
          console.log(this.listHeight);
        }, 20)
      },
      scrollY(newY) {
        //console.log(newY);
        this.diff = newY + this.listHeight[this.currentIndex+1];
        
        const listHeight = this.listHeight;
        if (newY > 0) {
          this.currentIndex = 0;
          return;
        }
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i];
          let height2 = listHeight[i + 1];
          if ((-newY) >= height1 && (-newY) < height2) {
            //console.log(i);
            this.currentIndex = i;
            return;
          }
        }
        this.currentIndex = this.listHeight.length - 2;
      },
      diff(newDiff){
         //console.log("diff");
        if(newDiff<=30 &&newDiff>0){
           // console.log("diff");
            let distance = -(30 - newDiff);
            //this.$refs.fixedTitle.style.top = distance +'px';
            this.$refs.fixedTitle.style.transform = `translateY(${distance}px)`; 
        }
        else
        {
            // this.$refs.fixedTitle.style.top = 0;
              this.$refs.fixedTitle.style.transform = `translateY(0)`; 
        }
    }
    },
    
  }

</script>


<style lang="stylus" scoped>
  @import '../../commom/stylus/variable.styl';

  .listview {
    height: 100%;
    width: 100%;
    color: $color-highlight-background;
  }

  .listview-content {
    height: 100%;
    width: 100%;
  }

  .group-name {
    background: $tab-background;
    font-size: 14px;
    padding: 8px;
    padding-left: 10px;
  }

  .list-li {
    display: table;
    vertical-align: middle;
    border-spacing: 10px;

  }

  .list-img {
    display: table-cell;
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  .list-name {
    position: relative;
    width: 100%;
    display: table-cell;
    font-size: 14px;
    vertical-align: middle;
  }

  .list-name:after {
    content: '';
    height: 1px;
    width: 100%;
    background: $tab-background;
    opacity: 0.5;
    position: absolute;
    left: 0px;
    bottom: -10px;
  }

  .menuList {
    position: absolute;
    top: 50%;
    transform: translateY(-50%)
      /* 垂直居中*/
      right:0;
    font-size: 12px;

    color: gray;
    text-align: center;
    padding: 10px 2px;

  }

  .menu-li {
    margin: 3px 1px;
  }

  .currentLi {
    font-weight: 600;
    color: $color-sub-theme;
  }

.fixed{
     position :absolute;
    top:0px;
    left :0px;  
    width :100%;
}
.fixed-title{ 
  
    background: $tab-background;
    font-size: 14px;
    padding: 8px;
    padding-left: 10px;
  
}

.loading-contain{
  width :100%;
  height :100%;
  background :rgba(0,0,0,0.5);
  position :fixed;
  top:0%;
  
  }
  .loading{
    position :relative;
    top:50%;
    }

</style>
