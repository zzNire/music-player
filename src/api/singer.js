import jsonp from '../commom/js/jsonp.js';

import {
  commonParam,
  options
} from './config.js'
import axios from 'axios'

export function getSinger() {
  const url = '/api/getSinger';
  // const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  const data = Object.assign({}, commonParam, {

    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 1664029744
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  });
}


export  function getSingerDetial(singermid) {
  const url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg";
 //const url = '/api/getSingerDetial';
  const data = Object.assign({}, commonParam, {
    g_tk: 5381,
    //jsonpCallback: MusicJsonCallbacksinger_track
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singermid,//002J4UUk29y8BY,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,

  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  });
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