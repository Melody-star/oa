<template>
	<view class="flex-col">
		<view class="loginInfo">
			<view class="loginInfo-username">
				<text class="text-username font">用户名</text>
				<view class="input">
					<input type="text" v-model="username" />
				</view>
			</view>
			<view class="loginInfo-username">
				<text class="text-username font">密码</text>
				<view class="input">
					<input type="text" v-model="password" />
				</view>
			</view>
		</view>
		<view class="baseInfo">
			<view class="loginInfo-username">
				<text class="text-tel font">手机号码</text>
				<view class="input">
					<input type="text" v-model="tel" />
				</view>
			</view>
			<view class="loginInfo-username">
				<text class="text-card font">银行卡号</text>
				<view class="input">
					<input type="text" v-model="card" />
				</view>
			</view>
			<view class="loginInfo-username">
				<text class="text-department font">部门ID</text>
				<view class="input">
					<input type="text" v-model="departmentId" />
				</view>
			</view>
		</view>
		<view class="foot flex-row items-center">
			<view class="foot-put" @click="input">提交</view>
			<view class="foot-cal" @click="cancel">取消</view>
		</view>
	</view>
</template>

<script>
	import {
		addUser
	} from '@/api/api.js'

	import {
		Skip
	} from '../../utils/utils.js'

	export default {
		data() {
			return {
				username: '',
				password: '',
				tel: '',
				card: '',
				departmentId: ''
			}
		},
		methods: {
			input() {
				if (this.tel.length === 11) {
					addUser({
						userName: this.username,
						nickName: this.username,
						password: this.password,
						phonenumber: this.tel,
						bankCardNumber: this.card,
						deptId: this.departmentId
					}).then((res) => {
						Skip(res, '/pages/index/index')
					})
				} else {
					uni.showToast({
						title: "请输入11位手机号",
						icon: 'none'
					});
				}
			},
			cancel() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
	}

	.loginInfo {
		background-color: #ffffff;
		width: 713rpx;
		margin: 17rpx 18rpx 0rpx 19rpx;
		border-radius: 15rpx;
		padding-top: 25rpx;
		padding-bottom: 36rpx;
	}

	.font {
		font-size: 28rpx;
		color: rgba(0, 0, 0, 1);
		font-family: SourceHanSansCN;
		margin-left: 44.25rpx;
	}

	.baseInfo {
		background-color: #ffffff;
		border-radius: 15rpx;
		margin: 17rpx 18rpx 0rpx 19rpx;
		padding-top: 25rpx;
		padding-bottom: 36rpx;
	}

	.input {
		background: rgba(229, 229, 229, 0.4);
		width: 648rpx;
		height: 62rpx;
		border-radius: 10rpx;
		margin-left: 32rpx;
		margin-top: 22rpx;
		padding-left: 20rpx;
		padding-top: 10.5rpx;
		padding-right: 20rpx;
	}

	input {
		font-size: 28rpx;
	}

	.loginInfo-username {
		margin-bottom: 19rpx;
	}

	.foot {
		height: 120rpx;
		background-color: #ffffff;
		position: absolute;
		bottom: 0px;
		width: 100%;

	}

	.foot-put {
		width: 295rpx;
		height: 71rpx;
		background: rgba(41, 115, 255, 1);
		margin-left: 52rpx;
		border-radius: 10rpx;
		text-align: center;
		line-height: 71rpx;
		color: #ffffff;
		font-size: 28rpx;
	}

	.foot-cal {
		width: 295rpx;
		height: 71rpx;
		background: rgba(229, 229, 229, 1);
		margin-left: 56rpx;
		border-radius: 10rpx;
		text-align: center;
		line-height: 71rpx;
		color: black;
		font-size: 28rpx;
	}
</style>
