<template>
	<view class="flex-col page">
		<text class="text">欢迎来到文芯OA系统</text>

		<view class="flex-col items-start space-y-44 group">
			<text class="font_1">用户名</text>
			<input maxlength=11 class="text_2" placeholder="请输入您的用户名" @input="setTel" />
		</view>

		<view class="flex-col space-y-57 group_2">
			<text class="font_1 text_3">密码</text>
			<input :password="true" maxlength=20 class="text_2" placeholder="请输入密码" @input="setPassword"
				placeholder-style="font-size: 28rpx;" />
		</view>

		<view class="conceal">
			<radio-group @change="radioChange">
				<label>
					<radio value="isSelect" color="#208bfb" style="transform:scale(0.7)" />
				</label>
			</radio-group>
			<view>我已阅读并同意<text @click="openContract()">《用户协议及隐私政策》</text></view>
		</view>

		<button class="flex-col items-center button font_1" :style="{background: bntColor}" @click="Login()">登录</button>
		<text class="text_6">江西文芯信息技术有限公司</text>
	</view>
</template>

<script>
	import {
		useCounterStore
	} from '@/stores/counter';
	const counter = useCounterStore();

	import {
		login,
		getOpenid
	} from '@/api/api.js'

	export default {
		data() {
			return {
				tel: '',
				password: '',
				bntColor: '#9AD0FB',
				agreeConceal: false
			}
		},
		methods: {
			openContract() {
				uni.downloadFile({
					url: 'https://jxwx-carpark.oss-cn-shenzhen.aliyuncs.com/image/2023/03/27/0660019e37934fe98c642bdc626d0e2e.pdf',
					success: function(res) {
						var filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							showMenu: true,
							fail: (res) => {
								uni.showToast({
									title: "文档打开失败！",
									icon: 'none'
								})
							}
						});
					}
				});
			},

			radioChange: function(evt) {
				this.agreeConceal = true
			},

			//设置手机号
			setTel: function(event) {
				this.tel = event.target.value;
				this.check();
			},

			//设置密码
			setPassword: function(event) {
				this.password = event.target.value;
				this.check();
			},
			//检查输入是否为空并设置按钮颜色
			check() {
				if (this.tel != '' && this.password != '') {
					this.bntColor = '#208bfb';
				} else {
					this.bntColor = '#9AD0FB'
				}
			},
			/**
			 * 登录
			 */
			Login() {
				if (this.bntColor === '#208bfb') {
					if (this.agreeConceal) {
						login({
							username: this.tel,
							password: this.password,
							code: 0,
							uuid: 454652
						}).then((res) => {
							if (res.code != 200) {
								return uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 1500,
								})
							} else {
								counter.setStorageToken(res.data.token);
								// this.getCode()
								uni.switchTab({
									url: '/pages/index/index'
								});
							}
						})
					} else {
						uni.showToast({
							title: "请阅读并同意《用户协议及隐私政策》",
							icon: 'none'
						})
					}
				}
			},
			// getCode() {
			// 	//获取登录凭证（code）
			// 	wx.login({
			// 		success(res) {
			// 			if (res.code) {
			// 				getOpenid(res.code).then((res) => {

			// 				})
			// 			} else {
			// 				uni.showToast({
			// 					title: res.errMsg,
			// 					icon: 'error'
			// 				})
			// 			}
			// 		}
			// 	})
			// }
		}
	}
</script>

<style lang="less">
	.page {
		padding: 272rpx 87rpx 59rpx 94rpx;
		background-color: #ffffff;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;

		.text {
			margin-left: 5rpx;
			align-self: flex-start;
			color: #000000;
			font-size: 43rpx;
			font-family: SourceHanSansCN;
			line-height: 40rpx;
		}

		.space-y-44 {

			&>view:not(:first-child),
			&>text:not(:first-child),
			&>image:not(:first-child) {
				margin-top: 44rpx;
			}

			.text_2 {
				color: #000000;
				font-size: 28rpx;
				font-family: SourceHanSansCN;
				line-height: 21.5rpx;
			}
		}

		.group {
			margin-top: 102rpx;
			padding-bottom: 11rpx;
			border-bottom: solid 1rpx #a6a6a6;
		}

		.space-y-57 {

			&>view:not(:first-child),
			&>text:not(:first-child),
			&>image:not(:first-child) {
				margin-top: 57rpx;
			}

			.text_3 {
				align-self: flex-start;
				margin-bottom: 25rpx;
			}

			.text-wrapper {
				padding-bottom: 20rpx;
				border-bottom: solid 1rpx #a6a6a6;

				.text_4 {
					color: #000000;
					font-size: 28rpx;
					font-family: SourceHanSansCN;
					line-height: 6.5rpx;
				}
			}
		}

		.group_2 {
			margin-top: 82rpx;
			border-bottom: solid 1rpx #a6a6a6;
			padding-bottom: 11rpx;
		}

		.font_1 {
			font-size: 32rpx;
			font-family: SourceHanSansCN;
			line-height: 29.5rpx;
			color: #000000;
			margin-bottom: 25rpx;
		}

		.button {
			margin-top: 21px;
			padding: 30rpx 0 30rpx;
			background-color: #208bfb;
			border-radius: 10rpx;
			color: #ffffff;
			width: 562rpx;
		}

		.text_6 {
			align-self: center;
			color: #a6a6a6;
			font-size: 24rpx;
			font-family: SourceHanSansCN;
			line-height: 22.5rpx;
			position: absolute;
			bottom: 54rpx;
		}
	}

	.conceal {
		margin-top: 90px;
		display: flex;
		align-items: center;

		view {
			font-size: 24rpx;
		}

		text {
			color: #208bfb;
		}
	}
</style>