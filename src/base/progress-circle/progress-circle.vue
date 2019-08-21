<template>
  <div class='progress-circle'>
    <svg :width='radius' :height='radius' viewBox='0 0 100 100' version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class='progress-bk' cx='50' cy='50' r='50'  fill='transparent'
      ></circle>
      <circle class='progress-bar' cx='50' cy='50' r='50'   fill='transparent'
         :stroke='color' stroke-width="10" stroke-dasharray='314' :stroke-dashoffset='rightCirleLength'></circle>
    </svg>
    <slot ></slot>
  </div>
</template>

<script>
  export default {
    props: {
      radius: {
        type: Number,
        default: 100,
      },
      color:{
          type:String,
          default:'red',
      },
      process:{
          type:Number,
          default:0,
      }
    },
    computed:{
        rightCirleLength(){
            return (1-this.process) *307;
        }
    }
  }

</script>

<style lang="stylus" scoped>

 .progress-circle
    position: relative
    circle
      transform-origin: center
      &.progress-bk
        transform: scale(0.8)
       
      &.progress-bar
        transform: scale(0.8) rotate(-90deg)
        


</style>
