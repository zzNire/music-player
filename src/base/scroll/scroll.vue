<template>
  <div class="wrapper" ref="wrapper">
    <slot>

    </slot>
  </div>
</template>


<script>
  import BScroll from 'better-scroll'
  import {
    setTimeout
  } from 'timers';
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1,
      },
      click: {
        type: Boolean,
        default: true,
      },
      data: {
        type: Array,
        default: () => [],
      },
      listenScroll: {
        type: Boolean,
        default: false,
      },
      pullup:{
        type:Boolean,
        default:false,
      },
      beforeScroll:{
        type:Boolean,
        default:false,
      },
      scrollToRightPosition:{
        type:Boolean,
        default:false,
      }
    },

    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return;
        }
        console.log('init bscroll');
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
        })
        if (this.probeType === 3) {
          this.scroll.on('scroll', (pos) => {
            // console.log(pos.x + ' ' + pos.y);
            this.$emit('changeLocation', pos);
          })
        }
         if (this.listenScroll) {
            console.log("listenscroll");
            this.scroll.on('scroll', (pos) => {
              this.$emit('scroll', pos);
            })
          }
          if(this.pullup){
            this.scroll.on('scrollEnd',()=>{
              if(this.scroll.y <= (this.scroll.maxScrollY + 50)){
                this.$emit('scrollToEnd');
              }
            })
          }
          if(this.beforeScroll){
            this.scroll.on('beforeScrollStart',()=>{
              this.$emit('beforeScroll');
            })
          }
          
        /*this.scroll.on('scrollStart',()=>{
            this.$emit('isAllowSwiper',false);
        });
        this.scroll.on('scrollEnd',()=>{
            this.$emit('isAllowSwiper',true);
        })*/

      },
      enable() {
       // console.log('sroll enable');
        this.scroll && this.scroll.enable();
      },
      disable() {
        this.scroll && this.scroll.disable();
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      onScroll(x, y) {

        // this.$emit
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
      },
      scrollToElement() {
        console.log('scrolltoelement');
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
      },

    },
    watch: {
      data() {
        setTimeout(() => {
          console.log('refresh');
          this.refresh();
        }, 20);
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll();
        if(this.scrollToRightPosition){
            this.$emit('scrollToRight');
        }
      }, 20);
      

    }
  }

</script>


<style lang="scss" scoped>
  .wrapper {
    width:100%;
  
  }

</style>
