<template>
    <div class='search'>
        <div class='hotkey-list'>
            <p class="hotkey-title"> 热门搜索</p>
            <ul class="hotkey-ul">
                <li class='hotkey-li' v-for="key in hotKey" @click="selectKey(key.k)">
                    {{key.k}}
                </li>
            </ul>
        </div>
        <div class='history-list'>
            <p class="hotkey-title">搜索历史</p>
            <ul class="hotkey-ul">
                <li class='hotkey-li' v-for="key in hotKey">
                    {{key.k}}
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
import {getHotkey} from '../../api/search.js'
import {mapMutations} from 'vuex'
export default {
    data(){
        return {
            hotKey:[],
        }
    },
    created(){
        this._getHotkey();
    },
    methods:{
        _getHotkey(){
            getHotkey().then((res)=>{
                if(res.code === 0){
                    this.hotKey = res.data.hotkey.slice(0,10);
                    console.log(this.hotKey);
                }
            })
        },
        selectKey(key){
            this.setSearchText(key);
        },
        ...mapMutations({
            setSearchText:'SET_SEARCHTEXT'
        })
    }
}
</script>


<style lang="stylus" scoped>
.search{
    color:black;
    padding:0 10px;
    }

.hotkey-list{
    margin :10px 0;
    }
.hotkey-title{
    font-size :15px;
    font-weight :bold;
    margin :10px 0;
    }
.hotkey-li{
    display:inline-block;
    font-size :14px;
    line-height :30px;
    padding:0 10px;
    height :30px;
    border-radius :30px;
    background-color :rgb(230,230,230);;
    margin :5px;
    }

.history-list{
    margin-top:30px;
        }
</style>