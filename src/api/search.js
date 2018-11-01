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


