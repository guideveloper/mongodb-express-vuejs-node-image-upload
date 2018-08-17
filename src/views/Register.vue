<template>
	<b-row class="justify-content-center">
		<b-col cols="12" md="8" lg="6">
			<b-jumbotron>
				<h2 class="mt-0 mt-sm-3 mb-2">Register</h2>
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
						v-model.trim="register.firstName"
						type="text"
						name="firstName"
						class="login-input"
						placeholder="First name">
					<input
						v-model.trim="register.lastName"
						type="text"
						name="lastName"
						class="login-input"
						placeholder="Last name">
					<input
						v-model.trim="register.username"
						type="text"
						name="username"
						class="login-input"
						placeholder="Username">
					<input
						v-model.trim="register.email"
						type="email"
						name="email"
						class="login-input"
						placeholder="Email">
					<!-- <input
						v-model.trim="register.emailConf"
						type="email"
						name="emailConf"
						class="login-input"
						placeholder="Confirm email"> -->
					<input
						v-model.trim="register.password"
						type="password"
						name="password"
						class="login-input"
						placeholder="Password">
					<b-button type="submit" variant="warning" class="login-button">
						Register
					</b-button>
					<b-button
						type="button"
						variant="success"
						@click="$router.go(-1)"
						class="register-button">
						Cancel
					</b-button>
				</form>
			</b-jumbotron>
		</b-col>
	</b-row>
</template>

<script>
import axios from 'axios'

export default {
	name: 'Register',
	data () {
		return {
			register: {},
			errors: []
		}
	},
	methods: {
		onSubmit (evt) {
			evt.preventDefault()
			axios.post(`http://localhost:3000/api/auth/register/`, this.register)
				.then(response => {
					this.$router.push({
						name: 'Login'
					})
				})
				.catch(e => {
					this.errors.push(e)
				})
		}
	}
}
</script>
