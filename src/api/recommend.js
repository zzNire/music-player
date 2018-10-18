import jsonp from '../commom/js/jsonp.js'
import {commonParam , options}from './config.js'

export function getRecommend(){
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const data = Object.assign({},commonParam,{
        platform:'h5',
        needNewCode: 1,
        //_: 1539851836357,
        uin: 0,
    })
    return jsonp(url,data,options)
};