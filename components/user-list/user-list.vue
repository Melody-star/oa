<template>
	<view>
		<uni-indexed-list :options="userList" :showSelect="true" @click="bindClick"></uni-indexed-list>
		<view class="determine">
			<view class="determine-bnt" @click="sure">
				<text class="determine-text">确定</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getAllUser
	} from "@/api/api.js"

	export default {
		name: "user-list",
		data() {
			return {
				userNameList: [],
				selectList: [],
				selectUserIdList: [],
				selectUserNameList: [],
				selectUserOpenId: []
			};
		},
		methods: {
			bindClick(e) {
				this.selectList = e.select
				this.identifyPeople()
			},
			identifyPeople() {
				let arr = []
				let arr1 = []
				let arr2 = []

				let that = this
				this.selectList.forEach(function(item, index, array) {
					console.log(item);
					arr.push(that.user[item.itemIndex].userId)
					arr1.push(that.user[item.itemIndex].userName)
					arr2.push(that.user[item.itemIndex].openId)
				});
				this.selectUserIdList = arr
				this.selectUserNameList = arr1
				this.selectUserOpenId = arr2
			},
			sure() {
				this.$emit('getAllUserId', this.selectUserIdList)
				this.$emit('getAllUserName', this.selectUserNameList)
				this.$emit('getAllUserOpenid', this.selectUserOpenId)
			}
		},
		props: ["userList", "user"],
	}
</script>

<style>
	.determine {
		width: 100%;
		height: 120rpx;
		background: rgba(255, 255, 255, 1);
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: 0rpx;
	}

	.determine-bnt {
		left: 83rpx;
		top: 25rpx;
		width: 584rpx;
		height: 71rpx;
		border-radius: 10rpx;
		background: rgba(41, 115, 255, 1);
		text-align: center;
		line-height: 71rpx;
	}

	.determine-text {
		left: 264rpx;
		top: 15rpx;
		width: 56rpx;
		height: 41rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
	}
</style>
