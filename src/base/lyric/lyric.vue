<template>
    <div class='lyric'>
        <scroll :data="lyrics">
        <ul class='lyric-ul'>
            <li class='lyric-li' v-for="(lyric,index) in lyrics"
            :class="{'current-lyric-line':currentLyricLine === index}">
                <p class='lyric-text'>{{lyric.txt}}</p>
            </li>
        </ul>
        </scroll>
    </div>
</template>


<script>
import Scroll from '../scroll/scroll.vue'
export default {
    props:{
        lyrics:{
            type:Array,
            default:[],
        },
        currentLyricLine:{
            type:Number,
            default:0,
        }
    },
    components:{
        Scroll,
    }
}
</script>

<style lang="stylus" scoped>
.lyric{
    height:100%;
    width :100%;
    overflow :hidden;
    }

 .current-lyric-line{
      color:white;
      }

</style>
