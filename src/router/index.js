import Vue from 'vue'
import Router from 'vue-router'
import BrowseImages from '@/views/BrowseImages'
import UploadImages from '@/views/UploadImages'
import Login from '@/views/Login'
import Register from '@/views/Register'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'BrowseImages',
			component: BrowseImages
		},
		{
			path: '/upload',
			name: 'UploadImages',
			component: UploadImages
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/register',
			name: 'Register',
			component: Register
		}
	]
})
