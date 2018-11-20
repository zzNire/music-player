import {mapGetters,mapMutations,mapActions} from 'vuex'

export const playListMixin = {
  
  
    computed:{
        ...mapGetters([
            'favoriteList',
        ]),
    },
    methods:{
        ...mapActions([
            'saveFavoriteList',
            'deleteFavoriteList',
        ]),
        handlePlaylist(){
            throw new Error('component must implement handlePlayList methord');
        },
        getFavoriteIcon(song){
            if(this.isFavorite(song)){
                return 'icon-like-fil';
            }
            else{
                return 'icon-like'
            }

        },
        toggltFavoriteSong(song){
            if(this.isFavorite(song)){
                this.deleteFavoriteList(song);
            }
            else{
                this.saveFavoriteList(song);
            }
        },
        isFavorite(song){
            const index = this.favoriteList.findIndex((item)=>{
                return item.id === song.id;
            })
            return index > -1;
        }
    }

}

