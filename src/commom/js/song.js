import {
  getVkey
} from '../../api/singer.js'
import {
  Base64
} from 'js-base64';
import {
  getLyric
} from '../../api/song.js'

export default class Song {
  constructor({
    id,
    mid,
    songname,
    singer,
    name,
    album,
    duration,
    image,
    url
  }) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
    this.songname = songname;
  }
  getLyric() {
    if (this.lyric) return Promise.resolve(this.lyric);
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          this.lyric = Base64.decode(res.data.lyric);
          console.log(this.lyric);
        resolve(this.lyric);
        }
        else{
            reject('no lyric');
        }
      })
    })

  }
}

export function createSong(musicData, vkey) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    name: filterSinger(musicData.singer),
    album: musicData.albumname,
    duration: musicData.interval,
    songname: musicData.songname,
    singer: musicData.singer,
    image: `//y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=0&guid=126548448`,
    //url:`http://isure.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=6780662315&vkey=${vkey}&uin=0&fromtag=66`
    // 'http://isure.stream.qqmusic.qq.com/C400001Qu4I30eVFYb.m4a?guid=6780662315&vkey=B3C5B9D48E1179611FE99F3D01DA0C794649131083DD331C69475798919CB4E7DD311097732656FBE6E94DE9331D6B644B6B5FDC0CB3969F&uin=0&fromtag=66'

  })

}

//http://isure.stream.qqmusic.qq.com/C400001Qu4I30eVFYb.m4a?guid=6780662315&vkey=B3C5B9D48E1179611FE99F3D01DA0C794649131083DD331C69475798919CB4E7DD311097732656FBE6E94DE9331D6B644B6B5FDC0CB3969F&uin=0&fromtag=66
//http://isure.stream.qqmusic.qq.com/C400001Qu4I30eVFYb.m4a?guid=6780662315&vkey=ED1C712288D8DEFB038D209669FD281691268CB83336A82FED00C978449AD427FF505019EB51380BD92732EFF50F40D5C6A21136796FA59F&uin=0&fromtag=66"
function filterSinger(singer) {
  let singers = [];
  if (!singer) {
    return;
  }
  singer.forEach(element => {
    singers.push(element.name)
  });

  return singers.join('/')
}