import jsonp from '../commom/js/jsonp.js'
import {
  commonParam,
  options
} from './config.js'
import axios from 'axios'

//获取轮播图
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


//获取推荐歌单
export function getRecommendSongList(){
  const url = 'https://v1.itooi.cn/netease/songList/hot';

  const data = {
    cat:'全部',
    pageSize:12,
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}


export function getDiscList() {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParam, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
