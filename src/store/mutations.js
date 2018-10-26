import * as types from './mutation-types'

const mutations = {
    [types.SET_SINGER] (state,singer){
        state.singer = singer;
    },
    [types.SHOW_CONTENT](state,contentName){
        state.contentName = contentName;
    }
}

export default mutations;