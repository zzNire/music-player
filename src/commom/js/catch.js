/*
    localStorage 存取实现
*/
import storage from 'good-storage'
import Song from '../../commom/js/song'


const SEARCH_KEY = '__search__';
const SEARCH_MAX_LENGTH = 15;

const PLAY_HISTORY = '__play__';
const PLAY_MAX_LENGTH = 200;

const FAVORITE_KEY = '__favorite__';
const FAVORITE_LENGTH = 200;

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

function initSong(songs){
    let newSongs = [];
    songs.forEach(song => {
        let newSong = new Song({
            id: song.id,
            mid: song.mid,
            name: song.name,
            album: song.album,
            duration: song.duration,
            songname: song.songname,
            singer: song.singer,
            image: song.image,
           url: song.url,
          });
        newSongs.push(newSong);
    });
    return newSongs;
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

export function savePlayHistory(song){
    let playHistory = initSong(storage.get(PLAY_HISTORY,[]));
    insertArray(playHistory,song,(item)=>{
        return item.id === song.id
    },PLAY_MAX_LENGTH);

    storage.set(PLAY_HISTORY,playHistory);
    return playHistory;

}

export function getPlayHistory(){
    return initSong( storage.get(PLAY_HISTORY,[]));
}

export function deleteFavorite(song){
    let songs =initSong( storage.get(FAVORITE_KEY,[]));
    deleteItem(songs,(item)=>{
        return item.id === song.id
    });
    storage.set(FAVORITE_KEY,songs);
    return songs;
}

export function saveFavorite(song){
    let songs = initSong(storage.get(FAVORITE_KEY,[]));
    insertArray(songs,song,(item)=>{
        return item.id === song.id
    },FAVORITE_LENGTH);
    storage.set(FAVORITE_KEY,songs);
    return songs;
}

export function getFavoriteList(){
    return initSong(storage.get(FAVORITE_KEY,[]));
}