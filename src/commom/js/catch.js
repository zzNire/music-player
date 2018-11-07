/*
    localStorage 存取实现
*/
import storage from 'good-storage'

const SEARCH_KEY = '__search__';
const SEARCH_MAX_LENGTH = 15;

function insertArray(arr,val,compare,maxLen){
    const index = arr.findIndex(compare);
    if(index === 0){
        return;
    }
    if(index > 0 ){
        arr.splice(index,1);
    }
    arr.unshift(val);
    if(maxLen && arr.length > maxLen){
        arr.pop();
    }
}

function deleteItem(arr,compare){
    let index = arr.findIndex(compare);
    if(index>-1){
        arr.splice(index,1);
    }
    
}
export function saveSearch(text){
    let searches = storage.get(SEARCH_KEY,[]);
    insertArray(searches,text,(item)=>{
        return item === text
    },SEARCH_MAX_LENGTH);
    storage.set(SEARCH_KEY,searches);
    return searches;
}

export function getSearch(){
    let searches = storage.get(SEARCH_KEY,[]);
    return searches;
}

export function clearSearch(){
    storage.set(SEARCH_KEY,[]);
    return [];
}

export function deleteSearchItem(text){
    let searches = storage.get(SEARCH_KEY,[]);
    deleteItem(searches,(item)=>{
       return item === text;
    })
    storage.set(SEARCH_KEY,searches);
    return searches;
}