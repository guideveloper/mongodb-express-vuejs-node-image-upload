<template>
	<b-row>
		<b-col cols="12">
			<b-jumbotron>
				<b-row class="justify-content-center">
					<b-col cols="12">
						<b-card
							no-body
							tag="article"
							class="mb-4">
							<b-tabs card>
								<b-tab title="Upload images">
									<b-media>
										<b-row>
											<b-col
												cols="12"
												sm="5"
												md="3"
												class="mb-3 mb-sm-0">
												<div
													v-if="images.length === 0"
													class="add-button">
													<b-btn
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
												<!-- <b-img slot="aside" fluid :src="`/uploads/${user.avatar}`" alt="Avatar" />
												<div
													class="remove-button">
													<b-btn
														size="md"
														variant="danger"
														@click="deleteImage()"
														class="cursor">
														Remove
													</b-btn>
												</div> -->
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

const uploadButtonTitle = 'Select image'

export default {
	name: 'UploadImages',
	computed: {
		...mapGetters({
			user: 'user',
		})
	},
	data () {
		return {
			errors: [],
			images: [],
			uploadButtonTitle: uploadButtonTitle,
			file: '',
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
		selectImage () {
			this.$refs.uploadInput.click()
		},
		updateUploadButton (e) {
			const fileName = e.target.value.split('\\').pop()
			if (fileName) {
				this.uploadButtonTitle = fileName
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
					this.$store.state.user.avatar = response.data
					this.getImages()
				})
				.catch(e => {
					this.errors.push(e)
				})
		},
		deleteImage () {
			axios.delete(`http://localhost:3000/uploads/${this.user.avatar}`)
				.then(result => {
					this.$store.state.user.avatar = undefined
					this.uploadButtonTitle = uploadButtonTitle
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
