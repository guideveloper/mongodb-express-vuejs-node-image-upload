<template>
	<b-row class="justify-content-center">
		<b-col cols="12" md="8" lg="6">
			<b-jumbotron>
				<h2 class="mt-0 mt-sm-3 mb-2">Login</h2>
				<div v-if="errors && errors.length">
					<div
						v-for="(error, i) of errors"
						:key="i">
						<b-alert show>{{error.message}}</b-alert>
					</div>
				</div>
				<form
					@submit="onSubmit"
					class="login">
					<input
						v-model.trim="login.username"
						type="text"
						name="username"
						placeholder="Username">
					<input
						v-model.trim="login.password"
						type="password"
						name="password"
						placeholder="Password">
					<b-button type="submit" variant="warning">
						Login
					</b-button>
					<p class="mt-3">First time here? <a href="#/register">Create an account</a></p>
				</form>
			</b-jumbotron>
		</b-col>
	</b-row>
</template>

<script>
import axios from 'axios'

export default {
	name: 'Login',
	data () {
		return {
			login: {},
			errors: []
		}
	},
	methods: {
		onSubmit (evt) {
			evt.preventDefault()
			axios.post(`http://localhost:3000/api/auth/login/`, this.login)
				.then(response => {
					let user = response.data.user
					user.loggedIn = response.data.success
					this.$store.state.user = user
					localStorage.setItem('user', JSON.stringify(user))
					localStorage.setItem('jwtToken', response.data.token)
					this.$router.push({
						name: 'BrowseImages'
					})
				})
				.catch(e => {
					this.errors.push(e)
				})
		},
		register () {
			this.$router.push({
				name: 'Register'
			})
		}
	}
}
</script>
