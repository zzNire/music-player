import jsonp from '../commom/js/jsonp.js';

import {
  commonParam,
  options
} from './config.js'
import axios from 'axios'


export function getLyric(mid) {
  //const url = '/api/lyric';
//const url='https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
  const url = `https://v1.itooi.cn/netease/lrc`
  const data = {
    id:mid
  }

  return axios.get(url,{
      params:data
  }).then((res)=>{
    return Promise.resolve(res);
    //console.log(res);
  })
}
