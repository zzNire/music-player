function filterRecoment(data){
    data.songList.forEach(recommend=>{
        if (!~recommend.picUrl.indexOf('y.gtimg.cn')){
            recommend.picUrl = `//y.gtimg.cn/music/photo_new/T006R300x300M000${recommend.pic_mid}.jpg?max_age=2592000`;
        }
        
    })
    return data;
}

export {filterRecoment};