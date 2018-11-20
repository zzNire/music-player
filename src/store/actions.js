import * as types from './mutation-types'
import {
  playMode
} from '../commom/js/config';
import {
  shuffle
} from '../commom/js/utils';
import {saveSearch ,clearSearch, deleteSearchItem, savePlayHistory,saveFavorite,deleteFavorite} from '../commom/js/catch.js'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id;
  })
}
export const selectPlay = function (context, {
  list,
  index
}) {
  if (context.state.mode === playMode.random) {
    let randomList = shuffle(list);
    context.commit(types.SET_PLAY_LIST, randomList);
    let currentindex = findIndex(randomList,list[index]);
    context.commit(types.SET_CURRENT_INDEX, currentindex);
    context.commit(types.SET_SEQUENCE_LIST, list);
    context.commit(types.SET_FULL_SCREEN, true);
    context.commit(types.SET_PLAYING, true);
  } else {
    context.commit(types.SET_SEQUENCE_LIST, list);
    context.commit(types.SET_PLAY_LIST, list);
    context.commit(types.SET_CURRENT_INDEX, index);
    context.commit(types.SET_FULL_SCREEN, true);
    context.commit(types.SET_PLAYING, true);
  }


}


export const insertSong = function(context,song){
  let playlist = context.state.playList.slice();
  let sequenceList = context.state.sequenceList.slice();
  let currentindex = context.state.currentIndex;

  
  //记录当前歌曲
  let currentSong = playlist[currentindex];

  let findSongIndex = findIndex(playlist,song);
  if(context.state.searchMode)
  { 
    if(findSongIndex === -1){
      playlist.splice(playlist.length,0,song);
    }
  }
  else
  {
    //插入歌曲
  currentindex++;
  playlist.splice(currentindex,0,song);
  //已存在歌曲
  if(findSongIndex > -1){
    if(currentindex > findSongIndex){
      playlist.splice(findSongIndex,1);
      currentindex--;
    }else{
      playlist.splice(findSongIndex+1,1);
    }
  }
  }
  

  let currentSIndex = findIndex(sequenceList,currentSong);
  let fsIndex = findIndex(sequenceList,song);
  if(context.state.searchMode){
    if(fsIndex === -1){
      sequenceList.splice(sequenceList.length,0,song);
    }
  }
  else{
    currentSIndex++;
  sequenceList.splice(currentSIndex,0,song);
  if(fsIndex > -1){
    if(currentSIndex > fsIndex){
      sequenceList.splice(fsIndex,1);
      currentSIndex--;
    }
    else{
      sequenceList.splice(fsIndex+1,1);
    }
  }
  }
  
  context.commit(types.SET_PLAY_LIST,playlist);
  context.commit(types.SET_SEQUENCE_LIST,sequenceList);
  

  if(context.state.searchMode){
   
  }
  else{
  context.commit(types.SET_CURRENT_INDEX,currentindex); 
  context.commit(types.SET_FULL_SCREEN,true);
  context.commit(types.SET_PLAYING,true);
  } 
  

} 


export const saveSearchHistory = function(context,searchText){
  context.commit(types.SET_SEARCHHISTORY,saveSearch(searchText));
}

export const deleteAllSearchHistory = function(context){
  context.commit(types.SET_SEARCHHISTORY,clearSearch());
}

export const deleteItemSearchHistory = function(context,text){
  context.commit(types.SET_SEARCHHISTORY,deleteSearchItem(text));
}


export const deleteSong = function (context,item){
  let playlist = context.state.playList.slice();
  let sequenceList = context.state.sequenceList.slice();
  let currentindex = context.state.currentIndex;

  if(item.id === playlist[currentindex].id)
  {
     context.commit(types.SET_PLAYING,true);
  }

  let pIndex = findIndex(playlist,item);
  playlist.splice(pIndex,1);
  let sIndex = findIndex(sequenceList,item);
  sequenceList.splice(sIndex,1);

  
  if(currentindex > pIndex ||currentindex === playlist.length){
    currentindex--;
  }

  //context.commit(types.SET_FULL_SCREEN,true);
  context.commit(types.SET_PLAY_LIST,playlist);
  context.commit(types.SET_SEQUENCE_LIST,sequenceList);
  context.commit(types.SET_CURRENT_INDEX,currentindex);
  
  
 

  if(!playlist.length){
    context.commit(types.SET_PLAYING,false);
  }
}


export const deleteAllPlayList = function(context){
  context.commit(types.SET_PLAY_LIST,[]);
  context.commit(types.SET_SEQUENCE_LIST,[]);
  context.commit(types.SET_PLAYING,false);
  context.commit(types.SET_CURRENT_INDEX,-1);
}

export const storePlayHistory = function(context,song){
  context.commit(types.SET_PLAYHISTORY,savePlayHistory(song))
}

export const saveFavoriteList = function(context,song){
  context.commit(types.SET_FAVORITELIST,saveFavorite(song));
}

export const deleteFavoriteList = function(context,song){
  context.commit(types.SET_FAVORITELIST,deleteFavorite(song));
}
