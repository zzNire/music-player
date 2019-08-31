function filterRecoment(data){
    data.songList = undefined;
    return data;
}

class RecommentSongList{
    constructor(data){
        this.songListDesc = data.name
        this.picUrl = data.coverImgUrl
        this.id = data.id
        this.accessnum = data.playCount
        this.songListAuthor = data.creator.nickname
        //this.pic_mid = 
       // this.album_pic_mid = 
    }
}

function filterRecomentSongList(data){
    return data.map(list=> new RecommentSongList(list));
}

export {filterRecoment,filterRecomentSongList};