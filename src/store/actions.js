import * as types from './mutation-types'
import {
  playMode
} from '../commom/js/config';
import {
  shuffle
} from '../commom/js/utils';

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
   // let copyList = JSON.parse(JSON.stringify(list)); 
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
