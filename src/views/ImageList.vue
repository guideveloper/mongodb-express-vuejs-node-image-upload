<template>
	<b-row>
		<b-col cols="12">
			<b-jumbotron>
				<b-row>
					<b-col
						cols="12">
						<b-media>
							<b-row>
								<b-col
									v-for="(image, i) of images"
									:key="i"
									cols="12"
									sm="5"
									md="3"
									class="mb-4">
									<div
										class="add-button"
										:style="{ 'background-image': 'url(' + '/uploads/' + image.image + ')' }">
									</div>
								</b-col>
								<b-col
									v-if="images.length === 0"
									class="text-center">
									<h1>Doh! Looks like you haven't uploaded any images.</h1>
									<b-btn
										size="md"
										variant="primary"
										@click="uploadImages()"
										class="cursor">
										Upload images
									</b-btn>
								</b-col>
							</b-row>
						</b-media>
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
	name: 'ImageList',
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
		this.getImages()
	},
	methods: {
		getImages () {
			axios.get(`http://localhost:3000/uploads`, {
				params: {
					user: this.user.userId
				}
			})
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
