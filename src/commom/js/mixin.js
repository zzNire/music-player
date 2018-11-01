import mapGetters from 'vuex'
export const playListMixin = {
    computed:{
        ...mapGetters([
            'playlist'
        ])
    },
    mounted() {
        this.handlePlaylist(this.playlist);
    },
    activated() {
        this.handlePlaylist(this.playlist);
    },
    watch:{
        playlist(newval){
            this.handlePlaylist(newval);
        }
    },
    methods:{
        handlePlaylist(){
            throw new Error('component must implement handlePlayList methord');
        }
    }

}