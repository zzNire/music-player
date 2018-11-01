import jsonp from '../commom/js/jsonp.js'
import {
  commonParam,
  options
} from './config.js'
import axios from 'axios'


export function getTopList(disstid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
  //const url = '/api/topList';
  const data = Object.assign({}, commonParam, {



    platform: 'h5',
    needNewCode: 1,



  });
  return jsonp(url, data, options);

};


export function getTopListDetail(id) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
  const data = Object.assign({}, commonParam, {
    page: 'detail',
    type: 'top',
    g_tk: 5381,
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    topid: id,

  });
  return jsonp(url,data,options);
}
