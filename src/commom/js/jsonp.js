import originJSONP from 'jsonp'
import { rejects } from 'assert';

export default function jsonp(url,data,option)
{
    url += (url.indexOf('?') <0 ? '?' :'&') + param(data);
    return new Promise ((resolve,reject)=>{  //promise异步编程方式
        originJSONP(url,option,(err,data)=>{
            if(!err){
                resolve(data);   //pomise已成功 返回数据
            }
            else{
                reject(err);       //   promise已失败
            }
        });
    });
}

function param(data){
    let url='';
    for(var k in data){
        let value = data[k] !== undefined ? data[k] : '';
        url += `&${k}=${encodeURIComponent(value)}`;
    }
    return url? url.substring(1) :'';
}