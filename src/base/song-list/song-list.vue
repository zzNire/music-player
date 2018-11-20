<template>
    <div class="song-list" v-if="songs">
        <ul class="song-ul">
            <li  class="song-li" v-for="(song,index) in songs" @click="selectItem(song,index)">
               <div class="mun-left" v-if="showNum">
                  <p :class="{'before-third': index<=2&&rank, 'rank-num':rank}"> {{index+1}}</p>
                    <p v-if="rank" class='rank-change-num'>{{song.inCount}}</p>
                </div> 
                <div class="detial-right">
                    <p class="song-name">{{song.songname}}</p>
                    <p class="album-name">{{song.album}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>


<script>
export default {
    props:{
        songs:{
            type:Array,
            default:'',
        },
        rank:{
            type:Boolean,
            default:false,
        },
        showNum:{
            type:Boolean,
            default:true,
        }
    },
    methods:{
        selectItem(song,index){
            this.$emit('songSelect',song,index);
        }
    },
    filters:{
        countFilter(count){
           
            let num = (count*100+'').split('.');
            console.log(num);
            if(num[0].length>=3){
                return num[0].substr(0,3)+'%';
            }
            else{
                if(num[1])
                {
                    return num[0] + '.' + num[1].substr(0,3-num[0].length)+'%';
                }
                else{
                    return num[0]+'%';
                }
                
            }
        }
    }
}
</script>
    

<style lang="stylus" scoped>
@import '../../commom/stylus/variable.styl';
.song-list{
    width :100%;
}
.song-ul{
 
}
.song-li{
    
    padding-top :10px ;
    display :flex;
   

}
.mun-left{
    position :relative;
    text-align :center;
    flex:40px 0 0;
    font-size :16px;
    vertical-align :middle;
    color :gray;
    line-height :35px;

}

.rank-num{ 
    line-height :16px;
}
.detial-right{
    width:100%;
    text-align :left;
    flex :1;
    border-bottom :1px solid rgba(240,240,240,1);
     overflow :hidden;
     text-overflow :ellipsis;
}
.song-name{  
    box-sizing :border-box;
    width:100%;
    margin-bottom :7px; 
    font-size :16px;
    white-space :nowrap;
    padding-right:10px;
     overflow :hidden;
     text-overflow :ellipsis;


}
.album-name{
    box-sizing :border-box;
    margin-bottom :10px; 
    font-size :12px;
    color :gray;
     white-space :nowrap;
    padding-right:10px;
     overflow :hidden;
     text-overflow :ellipsis;
     
}

.before-third{
    color :$color-sub-theme;
    }

.rank-change-num{
    font-size:12px;
    line-height :14px;
    position :absolute;
    bottom:10px;
    width :100%;
        }
</style>
