<template>
  <div class="slider">
    <div class="slider-swipper" ref="sliderSwipper">
      <div class="slider-group" ref="sliderGroup">
        <slot></slot>
      </div>
      <div class="dots">
        <span class="dot" v-for="(dot,index) in dots" :class="{'active' : currentIndex === index}"></span>
      </div>
    </div>

  </div>
</template>


<script>
  import BScroll from 'better-scroll';
  import mySwiper from 'swiper';

  import {
    addClass
  } from '../../commom/js/dom.js'
  import {
    setTimeout, clearTimeout
  } from 'timers';

  export default {
    data() {
      return {
        dots: [],
        currentIndex: 0,
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true,
      },
      autoPlay: {
        type: Boolean,
        default: true,
      },
      interval: { //翻页时间
        type: Number,
        default: 4000,
      }

    },
    mounted() {
      this.$nextTick(() => {
        //初始化better-scroll
      });
      setTimeout(() => { //等待刷新完成
        this._setSliderWidth();
        this._initDots();
        this._initSlider();
        if (this.autoPlay) {
          this._play();
        }
      }, 20);
      window.addEventListener('resize',()=>{
          if(!this.scrollSlider)
          {
              return;
          }
          this._setSliderWidth(true);
          this.scrollSlider.refresh();
      })
    },
    methods: {
      _setSliderWidth(isResize) {
          
        this.children = this.$refs.sliderGroup.children;
        console.log(this.children);
        let width = 0;
        let sliderWidth = this.$refs.sliderSwipper.clientWidth;
        console.log(sliderWidth);
        for (let i = 0; i < this.children.length; i++) {
          //console.log('this.child.className');
          let child = this.children[i];
          addClass(child, 'slider-item');
          width += sliderWidth;
          //console.log(child.className);
          child.style.width = sliderWidth + 'px';

        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth;
        }
        console.log(width);
        this.$refs.sliderGroup.style.width = width + 'px';
      },
      _initSlider() {
        let sliderSwipper = this.$refs.sliderSwipper;
        this.scrollSlider = new BScroll(sliderSwipper, {
          click: true,
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400,
          },
          bounce: false,
          stopPropagation: true,


        });
        this.scrollSlider.on('scrollEnd', () => {
          let pageIndex = this.scrollSlider.getCurrentPage().pageX;
          this.currentIndex = pageIndex;
            if(this.autoPlay)
            {
                 clearTimeout(this.timer);
                 this._play();
            }
         

        })

      },
      _initDots() {
        this.dots = new Array(this.children.length);
      },
      _play() {
    
        this.timer = setTimeout(() => {
         this.scrollSlider.next();
        }, this.interval);
      }
    },
    destroyed() {
        clearTimeout(this.timer);
    },
  }

</script>


<style lang="stylus" scoped>
  @import '../../commom/stylus/variable.styl';

  .slider {
    position: relative;
  }

  .slider-swipper {
    overflow: hidden;
  }

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap
  }

  .slider-item {
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
  }

  .dots {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 2px;
  }

  .dot {

    display: inline-block;
    margin: 5px;
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background: rgb(255, 255, 255) ;
    opacity:0.6;
  }

  .active {
    background: $color-sub-theme;
    opacity: 1;
  }

</style>
