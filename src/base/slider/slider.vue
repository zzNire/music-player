<template>
    <div class="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
    </div>
</template>


<script>
import BScroll from 'better-scroll';
import {addClass} from '../../commom/js/dom.js'
import { setTimeout } from 'timers';

export default {
    props:{
        loop:{
            type:Boolean,
            default:true,
        },
        autoPlay:{
            type:Boolean,
            default:true,
        },
        interval:{  //翻页时间
            type:Number,
            default:4000,
        }
        
    },
    mounted(){
        this.$nextTick(()=>{
                    //初始化better-scroll
        });
        setTimeout(()=>{    //等待刷新完成
          this._setSliderWidth();
            this._initSlider();
        },20);
    },
    methods:{
        _setSliderWidth(){
            this.children = this.$refs.sliderGroup.children;
            console.log(this.children);
            let width = 0;
            let sliderWidth = this.$refs.sliderGroup.clientWidth;
            console.log(sliderWidth);
            for(let i=0 ;i<this.children.length;i++)
            {
                //console.log('this.child.className');
                let child = this.children[i];
                addClass(child,'slider-item');
                width += sliderWidth;
                //console.log(child.className);
                child.style.width = sliderWidth+'px';

            }
            if(this.loop){
                width += 2*sliderWidth;
            }
             console.log(width);
            this.$refs.sliderGroup.style.width = width+'px';
        },
        _initSlider(){

        }
    }
}
</script>


<style lang="stylus" scoped>
.slider-group{
    position: relative
    overflow: hidden
    white-space: nowrap
}

.slider-item{
    float :left;
    box-sizing:border-box;
    overflow :hidden;
    text-align :center;
}
</style>
