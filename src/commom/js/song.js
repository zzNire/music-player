export default class Song {
    constructor({
        id,mid,songname,singer,name,album,duration,image,url}){
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration  = duration;
        this.image = image;
        this.url = url;
        this.songname = songname;

    }
}

export function createSong(musicData){
    return new Song({
        id:musicData.songid,
        mid:musicData.songmid,
        name:filterSinger(musicData.singer),
        album:musicData.albumname,
        duration:musicData.interval,
        songname:musicData.songname,
        image:`//y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        //url:`http://ws.stream.qqmusic.qq.com/C100${musicData.songid}.m4a?fromtag=0&guid=126548448`,
        url:'http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46',
    })
}

function filterSinger(singer){
    let singers = [];
    if(!singer)
    {
        return ;
    }
    singer.forEach(element => {
        singers.push(element.name)
    });
   
    return singers.join('/')
}