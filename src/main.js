import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import store from './store'
import Home from './views/Home'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(VueRouter);
Vue.config.devtools = true;
Vue.use(ElementUI);
Vue.config.productionTip = false;
const routes=[
	{
		path:'/',
		name:'home',
		component:Home
	}
]

const router=new VueRouter({
	linkActiveClass:'active',
	routes,
	mode:'history',
})

router.beforeEach((to,from,next)=>{
	const {fullPath}=to
	if (!localStorage.getItem('token')&&fullPath!=='/' ) {
		next('/')
	} else{
		next()
	}
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
