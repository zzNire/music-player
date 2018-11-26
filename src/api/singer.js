import jsonp from '../commom/js/jsonp.js';

import {
  commonParam,
  options
} from './config.js'
import axios from 'axios'

export function getSinger() {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const obj = {
    comm: {
      ct: 24,
      cv: 10000
    },
    singerList: {
      module: 'Music.SingerListServer',
      method: 'get_singer_list',
      param: {
        area: -100,
        sex: -100,
        genre: -100,
        index: -100,
        sin: 0,
        cur_page: 1
      }
    }
  }
  const data = Object.assign({}, commonParam, {
    // callback: '?',
    g_tk: 450503,
    // jsonpCallback: '?',
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    data: encodeURIComponent(JSON.stringify(obj))
  })
  // 已经在data中传入callback,若在传入options,则jsonp会再附加一个jsonpCallback???错误的想法!!!
  // return jsonp(url, data)
  return jsonp(url, data, {
    param: 'callback'
  })
}


export  function getSingerDetial(id) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  var data = Object.assign({}, commonParam, {
    // jsonpCallBack: 'MusicJsonCallbacksinger_track',
    // callBack: 'MusicJsonCallbacksinger_track',
    loginUin: 583497794,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: id,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1
  })
  return jsonp(url, data, options)
}


export function getVkey(songmid){
  const url = "https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg";

  //const url = '/api/getVkey';
 // console.log(songmid)
   const data = Object.assign({}, commonParam, {
     g_tk: 5381,
     inCharset: 'utf8',
     outCharset: 'utf-8',
     notice: 0,
     //jsonpCallback: MusicJsonCallbacksinger_track
     uin:0,
     platform: 'yqq',
     needNewCode: 1,
     loginUin: 0,
     hostUin: 0,
     format: 'jsonp',
     guid:'504753841',
     cid:'205361747',
     filename:'c400' + songmid + '.m4a',
     songmid: songmid,//002J4UUk29y8BY,
     //callback:'MusicJsonCallback'+(Math.random()+'').replace('0.',''),
   });
   return axios.get(url, {
     params: data
   }).then((res) => {
     return Promise.resolve(res.data)
   });
}