<template>
  <div class='touch-bar' 
  @touchstart.prevent='progressTouchStart' 
  @touchmove.prevent='progressTouchMove'
  @touchend.prevent='progressTouchEnd'
  @click="changerProgress">
    <div class="progress-bar" ref="bar">
      <div class="bar-left" ref="progressBar">
        <div class="bar-btn">

        </div>
      </div>

      <div class='bar-right'>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      progress: {
        type: Number,
        default: 0,
      }
    },
    mounted() {
      this.barWidth = this.$refs.bar.clientWidth
    },
    watch: {
      progress(newProgress) {
        if(this.touch.initialed) return;
        this.$refs.progressBar.style.width = this.barWidth * this.progress + 'px';
      }
    },
    created() {
      this.touch = {};
    },
    methods: {
      progressTouchStart(e) {
        this.touch.initialed = true;
        this.touch.startX = e.touches[0].pageX;
        this.touch.btnX = this.$refs.progressBar.clientWidth;
        console.log(this.touch);
      },
      progressTouchMove(e) {
         
        if (!this.touch.initialed) {
          return;
        } 
        //console.log(this.touch);
        let deltaX = e.touches[0].pageX - this.touch.startX;
        let offsetWidth = Math.max(0, this.touch.btnX + deltaX)
        if (offsetWidth > this.barWidth) return;
        this.$refs.progressBar.style.width = offsetWidth + 'px';
        //let rightProgress = offsetWidth /this.barWidth;
       // this.progress = offsetWidth /this.barWidth;
       
      },
      progressTouchEnd(e) {
        this.touch.initialed = false; 
        let rightProgress = this.$refs.progressBar.clientWidth / this.barWidth;
        this.$emit('changeProgress',rightProgress);
      },
      changerProgress(e){
        let deltaX = e.offsetX;
        //console.log(e.offsetX ,this.$refs.progressBar.offsetLeft,deltaX);
        let offsetWidth = Math.max(0,deltaX );
        if(offsetWidth > this.barWidth) return ;
        this.$refs.progressBar.style.width = offsetWidth + 'px';
        let rightProgress = this.$refs.progressBar.clientWidth / this.barWidth;
        this.$emit('changeProgress',rightProgress);


      }
    }
  }

</script>


<style lang="stylus" scoped>
  .touch-bar {
    padding: 15px 0;
  }

  .progress-bar {
    position: relative;
    width: 100%;
    height: 2px;
    background-color: rgba(221, 221, 221, 0.5);
  }

  .bar-left {
    text-align: right;
    width: 0;
    position: relative;
    top: 50%;

    left: 0px;
    transform: translateY(-50%);
    height: 2px;
    background-color: rgba(221, 221, 221, 0.9);
  }

  .bar-btn {
    position: absolute;
    right: -7px;
    top: 50%;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    box-sizing: border-box;
    border: 5px solid rgba(221, 221, 221, 1);
    background-color: rgba(165, 165, 165, 1);
  }

</style>
