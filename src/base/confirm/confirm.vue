<template>
  <div class="background">
    <div class='confirm'>
      <div class='header'>
        <p class='title'>{{title}}</p>
      </div>
      <div class='content'>
        <p class='negative' @click="negativeSelect">{{negative}}</p>
        <p class='positive' @click="positiveSelect">{{positive}}</p>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    props: {
      title: {
        type: String,
        default: '',
      },
      positive: {
        type: String,
        default: '',
      },
      negative: {
        type: String,
        default: '',
      }
    },
    methods:{
        positiveSelect(){
            this.$emit('positiveSelect');
        },
        negativeSelect(){
            this.$emit('negativeSelect');
        }
    }
  }

</script>


<style lang="stylus" scoped>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    color: black;
  }

  .confirm {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 70%;
    background-color: white;
    border-radius: 8px;
  }

  .header {
    padding: 10px;
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
    font-size :12px;
    line-height :30px;
  }

  .content {
    display: flex;
    font-size :14px;
    line-height :16px;
  }

  .positive {
    flex: 1;
    padding: 10px;
    border-left: solid 1px rgba(0, 0, 0, 0.1);
  }

  .negative {
    flex: 1;
    padding: 10px;
  }

</style>
