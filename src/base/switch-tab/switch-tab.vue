<template>
    <div class="switch-tab">
        <ul class="switch-ul">
            <li class="switch-li" v-for="(tab,index) in data"
            :class="{'switch-active' : activeTab === index}"
            @click="chooseTab(index)">
                {{tab}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Array,
            default:[],
        },
    },
    data(){
        return {
            activeTab:0,

        }
    },
    methods:{
        chooseTab(index){
            this.activeTab = index;
        }
    },
    watch:{
        activeTab(){
            this.$emit('tabChange',this.activeTab);
        }
    }
}
</script>


<style lang="stylus" scoped>
@import '../../commom/stylus/variable.styl';

.switch-ul{
    margin :10px 0;
    text-align :center;
}
.switch-li{
   
    font-size :15px;
    padding:5px 20px;
    display :inline-block;
    color:black;
    border:solid 1px $color-sub-theme
}
.switch-active{
    background-color :$color-sub-theme;
    color:white;
}
</style>
