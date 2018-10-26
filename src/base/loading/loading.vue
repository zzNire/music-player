<template>
    <div class='loading'>
        <img width="24" height="24"  src="./loading.gif">
        <p class="loading-text">{{title}}</p>   
    </div>    
</template>


<script>
export default {
    name:'myLoading',
    props:{
        title:{
            type:String,
            default:'正在加载..',
        }
    }
}
</script>
    

<style <style lang="stylus" scoped>

@import '../../commom/stylus/variable.styl';
.loading{
    width: 100%;
    height :100%;
    text-align: center;
}
.loading-text{
    font-size: 12px;
    line-height: 20px;
    color: gray;

}
</style>
