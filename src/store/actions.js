import * as types from './mutation-types'

export const selectPlay = function(context,{list,index}){
    context.commit(types.SET_SEQUENCE_LIST,list);
    context.commit(types.SET_PLAY_LIST,list);
    context.commit(types.SET_CURRENT_INDEX,index);
    context.commit(types.SET_FULL_SCREEN,true);
    context.commit(types.SET_PLAYING,true);
}