import {playMode} from '../commom/js/config.js'
import {getSearch,getFavoriteList,getPlayHistory} from '../commom/js/catch.js'
const state = {
    singer:{

    },
    contentName:'',
    playing:false,
    fullScreen:false,
    playList:[],
    sequenceList:[],
    mode:playMode.swquence,
    currentIndex:-1,
    disc:{},
    toplist:{},
    showSearch:false,
    
    searchText:'',
    searchResult:[],
    searchPerpage:20,
    searchP:1,
    hasMore:true,

    listScroll:null,
    searchHistory:getSearch(),

    showConfirm:false,
    showParam:{
        title:' ',
        positive:' ',
        negative:' ',
    },

    playHistory:getPlayHistory(),
    searchMode:false,
    favoriteList:getFavoriteList(),
}

export default state;

