<template>
	<b-row>
		<b-col cols="12">
			<b-jumbotron>
				<b-row
					v-if="images.length > 0">
					<b-col
						v-for="(image, i) of images"
						:key="i"
						cols="12"
						sm="6"
						md="4"
						lg="3">
						<b-card
							no-body
							tag="article"
							class="mb-4 cursor">
							<b-card-body>
								<b-img
									fluid
									:src="`/uploads/${image.image}`"
									:alt="image.image" />
							</b-card-body>
						</b-card>
					</b-col>
				</b-row>
				<b-row
					v-if="images.length === 0">
					<b-col
						cols="12">
						<b-card
							no-body
							tag="article">
							<b-card-body>
								<h3>Looks like you don't have any images uploaded</h3>
								<b-btn
									size="md"
									variant="primary"
									@click="uploadImages()"
									class="cursor">
									Upload Images
								</b-btn>
							</b-card-body>
						</b-card>
					</b-col>
				</b-row>
			</b-jumbotron>
		</b-col>
	</b-row>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
	name: 'BrowseImages',
	computed: {
		...mapGetters({
			user: 'user',
		})
	},
	data () {
		return {
			images: [],
			errors: [],
		}
	},
	created () {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem(
			'jwtToken'
		)
		// this.getImages()
	},
	methods: {
		getImages () {
			axios.get(`http://localhost:3000/uploads`)
				.then(response => {
					this.images = response.data
				})
				.catch(e => {
					this.errors.push(e)
					if (e.response.status === 401) {
						this.$router.push({
							name: 'Login'
						})
					}
				})
		},
		uploadImages () {
			this.$router.push({
				name: 'UploadImages'
			})
		}
	}
}
</script>
