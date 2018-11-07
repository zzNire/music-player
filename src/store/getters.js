export const singer = state => state.singer;

export const contentName = state => state.contentName;

export const playing = state => state.playing;

export const fullScreen = state => state.fullScreen;

export const playList = state => state.playList;

export const sequenceList = state => state.sequenceList;

export const mode = state => state.mode;

export const currentIndex = state => state.currentIndex;

export const currentSong = (state) => {
    return state.playList[state.currentIndex];
}

export const disc = state => state.disc;

export const toplist = state => state.toplist;

export const showSearch = state => state.showSearch;

export const searchText = state => state.searchText;

export const searchResult = state=> state.searchResult;

export const searchPerpage = state => state.searchPerpage;

export const searchP = state => state.searchP;

export const hasMore = state =>state.hasMore;

export const listScroll = state => state.listScroll;

export const searchHistory = state => state.searchHistory;

export const showConfirm = state => state.showConfirm;

export const showParam = state => state.showParam;