<template>
    <div class="header">
       <div class="content"> 
       <div class="icon-left">
            <i class="icon-playlist"></i>
        </div>
        <p class="player-name">NIREANMUSIC</p> 
        <div class="icon">
            <i class="icon-search"></i>
        </div>
       </div>
    </div>
</template>


<script>
export default {
    
}
</script>


<style lang="stylus" scoped>
@import '../commom/stylus/variable.styl';
.header{
    background :$color-sub-theme;
    text-align :center;
}
.content{
    position :relative;
    }
.player-name{
    display :inline-block;
    color : $color-text-ll;
    text-align :center;
    padding :15px;
    font-weight :600;
    font-size :16px;
    letter-spacing :2px;
    vertical-align :middle;
   
    }

.icon{
    position :absolute;
    height :26px;
    width :26px;
    padding :10px;
    right :0px;
    top:0;
}
.icon-search{
    display :inline-block;
    font-size :26px;
   
}

.icon-search:before{

  content: "\e906"
  }


.icon-playlist:before{
  content: "\e904"}

.icon-left{
      position :absolute;
    height :26px;
    width :26px;
    padding :10px;
    left  :0px;
    top:0;
    }
.icon-playlist{
    display :inline-block;
    font-size :20px;
    }
  .icon-play-mini:before{
  content: "\e903"}


</style>
