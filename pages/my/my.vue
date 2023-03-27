<template>
	<view class="flex-col page">
		<view class="flex-col space-y-18">
			<view class="flex-row space-x-43 section">
				<image class="image" :src="counterInf.avatar"></image>
				<text class="text">{{ counterInf.nickName }}</text>
			</view>
			<view class="flex-col section_2">
				<view class="flex-row justify-between group">
					<view class="flex-row" @click="changeAvatar()">
						<image class="image_2"
							src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16668679754607254725.png" />
						<text class="font_1 text_2">修改头像</text>
					</view>
					<image class="image_3 image_4"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16668679754817152984.png" />
				</view>
				<view class="flex-row justify-between group_2">
					<view class="flex-row space-x-48" @click="inputDialogToggle">
						<image class="image_5"
							src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/603a32e98cdc1234f3a659f5ad20d6eb.png" />
						<text class="font_1 text_3">修改用户名</text>
					</view>
					<image class="image_3 image_6"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16668679754817152984.png" />
				</view>
				<view class="flex-row justify-between group_3">
					<view class="flex-row space-x-50" @click="inputDialogToggle2">
						<image class="image_7"
							src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16668679754694981558.png" />
						<text class="font_1 text_4">修改手机号</text>
					</view>
					<image class="image_3 image_8"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16668679754817152984.png" />
				</view>
			</view>
			<view class="flex-row justify-between section_3">
				<view class="flex-row space-x-50" @click="clearStorage()">
					<image class="image_7"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16668679754763374599.png" />
					<text class="font_1 text_5">清除缓存</text>
				</view>
				<image class="image_3 image_9"
					src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16668679754817152984.png" />
			</view>
		</view>

		<view class="flex-col items-center button" @click="deleteUser()">
			<text class="font_1 text_6">注销账号</text>
		</view>

		<view>
			<uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="修改用户名" placeholder="请输入新用户名"
					@confirm="dialogInputConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>

		<view>
			<uni-popup ref="inputDialog2" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="修改手机号" placeholder="请输入新手机号"
					@confirm="dialogInputConfirm2"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {
		useCounterStore
	} from '@/stores/counter';

	import {
		changeUserInfo,
		changeAvatar
	} from '@/api/api.js'

	import operate from '@/common/operate.js'

	const counter = useCounterStore();

	export default {
		data() {
			return {
				counterInf: counter,
				newNickName: '',
				newPhone: ''
			}
		},
		methods: {
			clearStorage() {
				uni.showModal({
					title: "提示",
					content: "确定清除缓存吗？",
					confirmText: "立即清除",
					success(res) {
						if (res.confirm) {
							uni.clearStorageSync();
							uni.showToast({
								title: "清除成功"
							})
							uni.reLaunch({
								url: '/page_login/login/login'
							});
						}
					}
				})
			},
			changeAvatar() {
				const that = this
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: operate.api + "/system/oss/upload",
							filePath: tempFilePaths[0],
							fileType: 'image',
							name: "file",
							header: {
								'Authorization': 'Bearer ' + counter.token
							},
							success: (res) => {
								setTimeout(function() {
									uni.hideLoading();
								}, 2000);

								counter.avatar = JSON.parse(res.data).data.url

								changeUserInfo({ //上传
									avatar: counter.avatar,
									userId: counter.userId
								}).then((res) => {
									if (res.code == 200) {
										uni.showToast({
											icon: 'success',
											title: "修改成功"
										})
									} else {
										uni.showToast({
											icon: 'error',
											title: "修改失败"
										})
									}
								})
							},
							fail: (err) => {
								uni.showToast({
									title: "上传失败",
									icon: 'none'
								})
							},
						});

						uploadTask.onProgressUpdate((res) => {
							uni.showLoading({
								title: '上传中'
							});
						});
					},
				});
			},
			deleteUser() {
				uni.clearStorageSync();
				uni.reLaunch({
					url: '/page_login/login/login'
				});
			},
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			inputDialogToggle2() {
				this.$refs.inputDialog2.open()
			},
			dialogInputConfirm(val) {
				this.newNickName = val
				this.$refs.inputDialog.close()
				changeUserInfo({
					nickName: this.newNickName,
					userId: counter.userId
				}).then((res) => {
					counter.userName = this.newNickName

					if (res.code == 200) {
						uni.showToast({
							icon: 'success',
							title: '修改成功'
						})
					} else {
						uni.showToast({
							icon: 'error',
							title: '修改失败'
						})
					}
				})
			},
			dialogInputConfirm2(val) {
				this.newPhone = val
				this.$refs.inputDialog2.close()

				if (this.newPhone.length == 11) {
					changeUserInfo({
						phonenumber: this.newPhone,
						userId: counter.userId
					}).then((res) => {
						if (res.code == 200) {
							uni.showToast({
								icon: 'success',
								title: '修改成功'
							})
						} else {
							uni.showToast({
								icon: 'error',
								title: '修改失败'
							})
						}
					})
				} else {
					uni.showToast({
						title: "请输入正确的11位手机号",
						duration: 2000,
						icon: 'none'
					})
				}

			},
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f5f5f5;
	}

	.page {
		padding-bottom: 363rpx;
		background-color: #f5f5f5;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;

		.space-y-18 {

			&>view:not(:first-child),
			&>text:not(:first-child),
			&>image:not(:first-child) {
				margin-top: 18rpx;
			}

			.space-x-43 {

				&>view:not(:first-child),
				&>text:not(:first-child),
				&>image:not(:first-child) {
					margin-left: 43rpx;
				}

				.image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 100%;
					border: 1px solid rgba(255, 255, 255, 1);
				}

				.text {
					align-self: center;
					color: #000000;
					font-size: 36rpx;
					font-family: SourceHanSansCN;
					line-height: 32.5rpx;
				}
			}

			.section {
				padding: 61rpx 71rpx;
				background-image: linear-gradient(0deg, #4481eb 0%, #04befe 100%);
				overflow: hidden;
			}

			.section_2 {
				padding: 4rpx 24rpx 8rpx;
				background-color: #ffffff;
				overflow: hidden;

				.group {
					padding: 36rpx 20rpx 23rpx;

					.image_2 {
						flex-shrink: 0;
						width: 40rpx;
						height: 40rpx;
					}

					.text_2 {
						margin: 6rpx 0 4rpx 46rpx;
					}

					.image_4 {
						margin: 8rpx 20rpx 8rpx 0;
					}
				}

				.group_2 {
					margin-top: 3rpx;
					padding: 36rpx 22rpx 28rpx;
					border-top: solid 1rpx #a6a6a666;
					border-bottom: solid 1rpx #a6a6a666;

					.space-x-48 {

						&>view:not(:first-child),
						&>text:not(:first-child),
						&>image:not(:first-child) {
							margin-left: 48rpx;
						}

						.image_5 {
							flex-shrink: 0;
							width: 35rpx;
							height: 35rpx;
						}

						.text_3 {
							margin-top: 4rpx;
							line-height: 30rpx;
						}
					}

					.image_6 {
						margin: 5rpx 17rpx 5rpx 0;
					}
				}

				.group_3 {
					margin-top: 8rpx;
					padding: 28rpx 24rpx 39rpx;

					.image_8 {
						margin: 4rpx 16rpx 4rpx 0;
					}
				}
			}

			.section_3 {
				padding: 26rpx 48rpx 25rpx;
				background-color: #ffffff;
				overflow: hidden;

				.image_9 {
					margin: 3rpx 16rpx 4rpx 0;
				}
			}

			.space-x-50 {

				&>view:not(:first-child),
				&>text:not(:first-child),
				&>image:not(:first-child) {
					margin-left: 50rpx;
				}

				.image_7 {
					flex-shrink: 0;
					width: 32rpx;
					height: 32rpx;
				}

				.text_4 {
					margin-top: 2rpx;
				}

				.text_5 {
					margin-top: 2rpx;
					line-height: 30rpx;
				}
			}

			.image_3 {
				width: 25rpx;
				height: 25rpx;
			}
		}

		.button {
			margin: 0 32rpx 0;
			background-color: #ffffff;
			border-radius: 10rpx;
			height: 72rpx;
			position: absolute;
			bottom: 50rpx;
			width: 687rpx;

			.text_6 {
				color: #f47669;
				line-height: 72rpx;
			}
		}

		.font_1 {
			font-size: 32rpx;
			font-family: SourceHanSansCN;
			line-height: 29.5rpx;
			color: #000000;
		}
	}
</style>
