<template>
	<b-navbar toggleable="md" type="light" variant="warning" stick="true">
		<b-navbar-toggle v-if="user.loggedIn" target="nav_collapse"></b-navbar-toggle>
		<b-navbar-brand href="#/">MEVN Boilerplate</b-navbar-brand>
		
		<b-collapse is-nav id="nav_collapse">
			<b-navbar-nav v-if="user.loggedIn" class="mx-auto">
				<b-nav-item href="#/upload" class="mx-3">Upload Image</b-nav-item>
				<b-nav-item href="#/" class="mx-3">Browse Images</b-nav-item>
			</b-navbar-nav>

			<b-navbar-nav
				:class="{ 'ml-auto' : !user.loggedIn }">
				<b-nav-item
					v-if="!user.loggedIn"
					@click="logout">Login</b-nav-item>
				<b-nav-item-dropdown right v-if="user.loggedIn">
					<b-dropdown-header>Welcome, {{ user.firstName }} {{ user.lastName }}</b-dropdown-header>
					<b-dropdown-divider></b-dropdown-divider>
					<b-dropdown-item @click="logout">Logout</b-dropdown-item>
				</b-nav-item-dropdown>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Header',
	computed: {
		...mapGetters({
			user: 'user'
		}),
		showUser () {
			console.log('user', this.user)
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
