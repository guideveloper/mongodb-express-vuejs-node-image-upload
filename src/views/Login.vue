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
						class="login-input"
						placeholder="Username">
					<input
						v-model.trim="login.password"
						type="password"
						name="password"
						class="login-input"
						placeholder="Password">
					<b-button type="submit" variant="warning" class="login-button">
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
					localStorage.setItem('newUser', JSON.stringify(user))
					localStorage.setItem('jwtToken', response.data.token)
					this.$router.push({
						name: 'ImageList'
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

<style>
.login {
	display: flex;
	flex-direction: column;
	padding: 20px;
	background-color: white;
	border-radius: 3px;
}

.login-input {
	padding: 20px;
	border-radius: 3px;
	border: 2px solid #e9ecef;
	margin-bottom: 20px;
}

.login-button {
	padding: 15px;
	margin-bottom: 20px;
	cursor: pointer;
}

.register-button {
	padding: 15px;
	color: #2c3e50;
	background-color: #e9ecef;
	border-color: #e9ecef;
	cursor: pointer;
}

.register-button:hover {
	background-color: #c5d0da;
	border-color: #c5d0da;
	color: #2c3e50;
}

.btn-success:focus, .btn-success:active, .btn-success.focus {
	box-shadow: 0 0 0 0.2rem rgba(44, 62, 80, 0.2);
}

.btn-success:not([disabled]):not(.disabled):active, .btn-success:not([disabled]):not(.disabled).active {
	background-color: #c5d0da;
	border-color: #c5d0da;
	color: #2c3e50;
	box-shadow: 0 0 0 0.2rem rgba(44, 62, 80, 0.2);
}
</style>
