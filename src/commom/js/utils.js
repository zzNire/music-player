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