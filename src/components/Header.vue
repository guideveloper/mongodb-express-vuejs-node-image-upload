<template>
	<b-navbar toggleable="md" type="light" variant="warning" stick="true">
		<b-navbar-toggle v-if="user.loggedIn" target="nav_collapse"></b-navbar-toggle>
		<b-navbar-brand href="#/"><img src="/static/img/mevn-logo.png" style="width: 50px;"> MEVN Boilerplate</b-navbar-brand>
		
		<b-collapse is-nav id="nav_collapse">
			<b-navbar-nav v-if="user.loggedIn" class="ml-auto">
				<b-nav-item href="#/" class="mx-3">Browse images</b-nav-item>
				<b-nav-item href="#/upload" class="mx-3">Upload images</b-nav-item>
			</b-navbar-nav>
			<b-navbar-nav
				class="ml-auto">
				<b-nav-item
					v-if="!user.loggedIn"
					class="ml-auto"
					@click="logout">Login</b-nav-item>
				<b-nav-item
					v-if="user.loggedIn"
					class="ml-3"
					@click="logout">Logout
				</b-nav-item>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'
import { UserIcon } from 'vue-feather-icons'

export default {
	name: 'Header',
	components: {
		UserIcon
	},
	computed: {
		...mapGetters({
			user: 'user'
		})
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
