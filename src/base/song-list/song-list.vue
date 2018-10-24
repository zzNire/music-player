<template>
    <div class="song-list">
        <ul class="song-ul">
            <li  class="song-li" v-for="(song,index) in songs">
               <div class="mun-left">
                   {{index+1}}
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
        }
    }
}
</script>
    

<style lang="stylus" scoped>
.song-ul{
 
}
.song-li{
    padding-top :10px ;
    display :flex;

}
.mun-left{
    text-align :center;
    flex:40px 0 0;
    font-size :16px;
    vertical-align :middle;
    color :gray;
    line-height :35px;

}
.detial-right{
  
    text-align :left;
    flex :1;
    border-bottom :1px solid rgba(240,240,240,1);
}
.song-name{  
    margin-bottom :7px; 
    font-size :16px;

}
.album-name{
    margin-bottom :10px; 
    font-size :12px;
    color :gray;
}

</style>
