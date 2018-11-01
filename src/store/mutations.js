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
    }

}


export default mutations;