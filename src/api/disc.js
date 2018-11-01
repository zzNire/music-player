import jsonp from '../commom/js/jsonp.js'
import {
  commonParam,
  options
} from './config.js'
import axios from 'axios'


export function getDisc(disstid) {
  //const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
  const url = '/api/disc';
  const data = Object.assign({}, commonParam, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    loguin:0,
    hostUin: 0,
    needNewCode: 0,
    g_tk:5381,
    format:'json'

  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
};


