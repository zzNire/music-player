import jsonp from '../commom/js/jsonp.js'
import {
  commonParam,
  options
} from './config.js'
import axios from 'axios'
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, commonParam, {
    platform: 'h5',
    needNewCode: 1,
    //_: 1539851836357,
    uin: 0,
  })
  return jsonp(url, data, options)
};

export function getDiscList() {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParam, {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    //w: query,
    zhidaqu: 1,
    //catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    //perpage: perpage,
    n: 20,
   // p: page,
    remoteplace: 'txt.mqq.all',
    _: 1537612841753
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
