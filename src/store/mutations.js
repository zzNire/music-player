import * as types from './mutation-types'
import { type } from 'os';

const mutations = {
    [types.SET_SINGER] (state,singer){
        state.singer = singer;
    },
    [types.SHOW_CONTENT](state,contentName){
        state.contentName = contentName;
    },
    [types.SET_PLAYING](state,flag){
        state.playing = flag;
    },
    [types.SET_FULL_SCREEN](state,flag){
        state.fullScreen = flag;
    },
    [types.SET_PLAY_LIST](state,flag){
        state.playList = flag;
    },
    [types.SET_SEQUENCE_LIST](state,flag){
        state.sequenceList = flag;
    },
    [types.SET_MODE](state,flag){
        state.mode = flag;
    },
    [types.SET_CURRENT_INDEX](state,flag){
        state.currentIndex = flag;
    },
    [types.SET_DISC](state,flag){
        state.disc = flag;
    },
    [types.SET_TOPLIST](state,flag){
        state.toplist = flag;
    },
    [types.SET_SHOWSEARCH](state,flag){
        state.showSearch = flag;
    },
    [types.SET_SEARCHTEXT](state,flag){
        state.searchText = flag;
    },
    [types.SET_SEARCHRESULT](state,flag){
        state.searchResult = flag;
    },
    [types.SET_PERPAGE](state,flag){
        state.searchPerpage = flag;
    },
    [types.SET_P](state,flag){
        state.searchP = flag;
    },
    [types.SET_HASMORE](state,flag){
        state.hasMore = flag;
    },
    [types.SET_LISTSCROLL](state,flag){
        state.listScroll = flag;
    },
    [types.SET_SEARCHHISTORY](state,flag){
        state.searchHistory = flag;
    },
    [types.SET_SHOWCONFIRM](state,flag){
        state.showConfirm = flag;
    },
    [types.SET_SHOWPARAM](state,flag){
        state.showParam = flag;
    },
    [types.SET_PLAYHISTORY](state,flag){
        state.playHistory = flag;
    },
    [types.SET_SEARCHMODE](state,flag){
        state.searchMode = flag;
    }


}


export default mutations;