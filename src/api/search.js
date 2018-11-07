import jsonp from '../commom/js/jsonp.js'
import {
  commonParam,
  options
} from './config.js'
import axios from 'axios'


export function getHotkey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
  //const url = '/api/topList';
  const data = Object.assign({}, commonParam, {
    platform: 'h5',
    needNewCode: 1,

  });
  return jsonp(url, data, options);

};

export function search(searchWord,page,zhida,perpage) {
  //const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  const url = '/api/search';
  const data = Object.assign({}, commonParam, {
    /*w: searchWord,
    p: page,
    perpage:20,
    n: 20,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    platform: 'h5',
    g_tk:5381,
    format:'json',*/
    g_tk:5381,
    uin:0,
    format:'json',
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    platform:'h5',
    needNewCode:1,
    w:searchWord,
    zhidaqu:1,
    catZhida: zhida ? 1 : 0,
    t:0,
    flag:1,
    ie:'utf-8',
    sem:1,
    aggr:0,
    perpage:perpage,
    n:perpage,
    p:page,
    remoteplace:'txt.mqq.all',
    _:1537612841753,
    
  })

 // return jsonp(url, data, options)
 return axios.get(url, {
  params: data
}).then((res) => {
  return Promise.resolve(res.data)
});

}
