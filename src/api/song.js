import jsonp from '../commom/js/jsonp.js';

import {
  commonParam,
  options
} from './config.js'
import axios from 'axios'


export function getLyric(mid) {
  const url = '/api/lyric';
//const url='https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
  const data = Object.assign({}, commonParam, {
    //callback: 'MusicJsonCallback_lrc',
    pcachetime: +new Date(),
    songmid: mid,
    g_tk: 5381,
    //jsonpCallback: 'MusicJsonCallback_lrc',
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
  
  })

  return axios.get(url,{
      params:data
  }).then((res)=>{
    return Promise.resolve(res);
    //console.log(res);
  })
}
