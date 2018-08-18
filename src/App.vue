<template>
	<div>
		<sp-header />
		<b-container fluid>
			<router-view />
		</b-container>
	</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import truncate from 'vue-truncate-collapsed'
import SpHeader from '@/components/Header'

export default {
	name: 'app',
	components: {
		SpHeader,
		truncate
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
		let getUser = JSON.parse(localStorage.getItem('newUser'))

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
	@import url('https://fonts.googleapis.com/css?family=Varela+Round');

	html,
	body,
	#app {
		font-family: 'Varela Round', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		background-color: #f2f2f3;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	.navbar-brand,
	button {
		font-family: 'Varela Round', sans-serif;
		font-weight: bold;
	}

	.navbar-brand {
		font-size: 25px;
	}

	a {
		font-family: 'Varela Round', sans-serif;
		font-weight: bold;
		color: #2c3e4f;
	}

	.medium-font {
		font-family: 'Varela Round', sans-serif;
		font-weight: bold;
	}

	.bold-font {
		font-family: 'Varela Round', sans-serif;
		font-weight: bold;
	}

	.logo {
		width: 35px;
	}

	nav.bg-warning {
		background-color: #ffffff !important;
	}

	.navbar {
		position: relative;
		margin-bottom: 1.5rem;
		width: 100%;
		border-color: transparent;
	}

	.nav-link {
		display: block;
		font-family: 'Varela Round', sans-serif;
		font-weight: bold;
		padding: 0.5rem 1rem 0.7rem;
	}

	.btn-warning {
		color: #fff;
		background-color: #2c3e50;
		border-color: #2c3e50;
	}
	.btn-warning:hover {
		color: #e9ecef;
		background-color: #496786;
		border-color: #496786;
	}

	.btn-warning:not([disabled]):not(.disabled):active,
	.btn-warning:not([disabled]):not(.disabled).active {
		color: #e9ecef;
		background-color: #2c3e50;
		border-color: #2c3e50;
		box-shadow: 0 0 0 0.2rem rgba(44, 62, 80, 0.2);
	}

	.btn-warning:focus,
	.btn-warning.focus {
		box-shadow: 0 0 0 0.2rem rgba(44, 62, 80, 0.2);
	}

	.jumbotron {
		background-color: #f2f2f3;
		padding-top: 1rem;
	}

	.card {
		position: relative;
		margin-bottom: 1.5rem;
		width: 100%;
		min-height: 260px;
		border-color: transparent;
	}

	.card.dashboard {
		min-height: 0;
	}

	.cursor {
		cursor: pointer;
	}

	.card-body {
		display: flex;
		flex-direction: column;
	}

	.card-title {
		font-size: 1.2rem;
	}

	.card-text {
		font-size: 1rem;
	}
</style>
