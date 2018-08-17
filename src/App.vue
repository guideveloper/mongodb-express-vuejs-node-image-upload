<template>
	<div>
		<main-header />
		<b-container fluid>
			<router-view />
		</b-container>
	</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import MainHeader from '@/components/Header'

export default {
	name: 'app',
	components: {
		MainHeader,
	},
	computed: {
		...mapGetters({
			user: 'user',
		})
	},
	data () {
		return {
			errors: [],
		}
	},
	created () {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem(
			'jwtToken'
		)
		let getUser = JSON.parse(localStorage.getItem('user'))

		if (getUser !== null) {
			this.$store.state.user = getUser
		}
	},
	methods: {
		logout () {
			localStorage.clear()
			this.$store.state.user = {}
			this.$router.push({
				name: 'Login'
			})
		},
	}
}
</script>

<style>
	@import url("https://fonts.googleapis.com/css?family=Roboto:900");

	html,
	body,
	#app {
		font-family: "Roboto", sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		background-color: #f2f2f3;
	}

	.cursor {
		cursor: pointer;
	}
</style>
