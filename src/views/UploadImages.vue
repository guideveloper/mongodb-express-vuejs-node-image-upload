<template>
	<b-row>
		<b-col cols="12">
			<b-jumbotron>
				<b-row class="justify-content-center">
					<b-col cols="12">
						<b-card
							no-body
							tag="article"
							class="dashboard mb-4">
							<b-tabs card>
								<b-tab title="Image uploader">
									<b-media>
										<b-row>
											<b-col
												cols="12"
												sm="5"
												md="3"
												class="mb-4">
												<div
													class="add-button">
													<pulse-loader
														v-if="loading"
														:loading="loading"
														:color="'#c3c3c3'"
														class="text-center" />
														<p
															v-if="loading"
															class="text-center w-75"
															style="word-wrap:break-word;">
															<strong>Uploading</strong>
															{{ loadingText }}
														</p>
													<b-btn
														v-if="!loading"
														size="md"
														variant="primary"
														@click="selectImage()"
														class="cursor">
														{{ uploadButtonTitle }}
													</b-btn>
													<input
														id="upload"
														ref="uploadInput"
														type="file"
														name="file"
														class="image-input"
														@change="updateUploadButton($event); insertImage()">
												</div>
											</b-col>
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
												<div
													v-if="image.image"
													class="remove-button">
													<b-btn
														size="md"
														variant="danger"
														@click="deleteImage(image.image)"
														class="cursor">
														Remove
													</b-btn>
												</div>
											</b-col>
										</b-row>
									</b-media>
								</b-tab>
							</b-tabs>
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
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const uploadButtonTitle = 'Select image'

export default {
	name: 'Dashboard',
	components: {
		PulseLoader,
	},
	computed: {
		...mapGetters({
			user: 'user',
		})
	},
	data () {
		return {
			images: [],
			errors: [],
			uploadButtonTitle: uploadButtonTitle,
			file: '',
			loadingText: '',
			loading: false
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
		selectImage () {
			this.$refs.uploadInput.click()
		},
		updateUploadButton (e) {
			const fileName = e.target.value.split('\\').pop()
			if (fileName) {
				this.loadingText = fileName
				this.loading = true
			}
		},
		insertImage () {
			axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
			this.file = this.$refs.uploadInput.files[0]
			let formData = new FormData()
			formData.append('file', this.file)
			axios.post(`http://localhost:3000/uploads`, formData, {
				params: {
					user: this.user.userId
				}
			})
				.then(response => {
					setTimeout(() => {
						this.loading = false
						this.getImages()
						this.$refs.uploadInput.value = undefined
					}, 900)
				})
				.catch(e => {
					this.errors.push(e)
				})
		},
		deleteImage (image) {
			axios.delete(`http://localhost:3000/uploads/${image}`)
				.then(result => {
					this.getImages()
				})
				.catch(e => {
					this.errors.push(e)
				})
		},
	},
}
</script>

<style>
	.image-input {
		position: absolute;
		top: 0;
		left: 0;
		width: 0px;
		height: 0px;
		overflow: hidden;
		opacity: 0;
	}

	.add-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 250px;
		background: #f2f2f3;
		background-size: cover;
		background-position: 50% 50%;
	}

	.remove-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 15px;
    	right: 15px;
		bottom: 0;
		background: rgba(0, 0, 0, 0.4);
		opacity: 0;
		transition: all 0.3s ease-in;
	}

	.remove-button:hover {
		opacity: 1;
	}
</style>
