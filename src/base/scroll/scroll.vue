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
        type: Object,
        default: [],
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
        /*this.scroll.on('scrollStart',()=>{
            this.$emit('isAllowSwiper',false);
        });
        this.scroll.on('scrollEnd',()=>{
            this.$emit('isAllowSwiper',true);
        })*/
      },
      enable() {
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
      }
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
      }, 20);

    }
  }

</script>


<style lang="scss" scoped>
  .wrapper {}

</style>
