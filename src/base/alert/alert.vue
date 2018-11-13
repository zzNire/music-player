<template>
<div class="alert">
    <p class="title">{{title}}</p>
</div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:'',
        }
    }
}
</script>


<style lang="stylus" scoped>
.alert{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    
    background-color :rgba(0,0,0,0.85);
    text-align :center;
    border-radius :5px;
    padding :20px;
    }

.title {
    margin :10px 0;
        color:white;
        font-size :14px;
    }


</style>
