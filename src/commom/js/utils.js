function getRandomNum(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
export function shuffle(list){
    let arr =list.slice();
    for(let i=0; i<arr.length;i++){
        let exchange = arr[i];
        let j = getRandomNum(0,i);
        arr[i] = arr[j];
        arr[j] = exchange;
    }
    return arr;

}

export function debounce(func,delay){ //无操作 delay 秒 执行函数func
    let timer;
    return function(...args){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            func.apply(this,args)
        },delay)
    }
}