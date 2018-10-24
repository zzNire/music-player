import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import rank from '../components/rank/rank.vue'
import recommend from '../components/recommend/recommend.vue'
import search from '../components/search/search.vue'
import singer from '../components/singer/singer.vue'
import singerDetial from '../components/singer-detial/singer-detial.vue' 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect :'/recommend',
    },
    {
      path:'/rank',
      name:'rank',
      component:rank,
    },
    {
      path:'/recommend',
      name:'recommend',
      component:recommend,
    },
    {
      path:'/search',
      name:'search',
      component:search,
    },
    {
      path:'/singer',
      name:'singer',
      component:singer,
      children:[
        {
          path:':id',
          name:'singerDetial',
          component:singerDetial,
        },
      ]
    }
  ]
})
