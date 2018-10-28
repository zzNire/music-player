import * as types from './mutation-types'

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


}


export default mutations;