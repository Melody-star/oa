<template>
	<view class="main">
		<view class="flex-col items-center top">
			<view class="search">
				<uni-search-bar style="width: 100%;" placeholder="请输入任务名称" :radius="100" @input="search"
					clearButton="none" cancelButton="none" bgColor="#efefef">
				</uni-search-bar>
			</view>
			<view class="flex-row justify-between middle">
				<select-screen title="筛选" :allList="myCreateTaskList" @give-result="giveResult"></select-screen>

				<select-time title="时间" :allList="myCreateTaskList" @give-result="giveResult"></select-time>

				<my-select title="等级" :allList="myCreateTaskList" @give-result="giveResult"></my-select>
			</view>
		</view>

		<view class="flex-col items-center list" v-if="myCreateTaskList.length != 0">
			<view class=" item" :key="i" v-for="(item, i) in temp" @click="gotoDetail(item)">
				<view class="flex-row items-center justify-between item-top">
					<text class="item-top-text">{{item.taskName}}</text>
					<image class="item-top-img"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16671153239050794825.png"
						mode=""></image>
				</view>
				<view class="flex-row item-content">
					<image class="item-content-img"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16671153239070581438.png"
						mode=""></image>
					<text class="item-content-text">{{item.taskContent}}</text>
				</view>
				<view class="item-time">
					<image class="item-time-img"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16669318847138243434.png"
						mode=""></image>
					<text class="item-time-text">{{item.taskStartTime}}-{{item.taskEndTime}}</text>
				</view>
				<view class="flex-row justify-between item-under">
					<text class="item-under-text">执行人：{{item.taskUserName}}</text>
					<text class="item-under-status"
						v-if="item.taskDegreeOfCompletion === 1 && item.isDistribute === 1">已完成</text>
					<text class="item-under-status"
						v-if="item.taskDegreeOfCompletion === 0 && item.isDistribute === 1">未完成</text>
					<text class="item-under-status" v-if="item.isDistribute === 0">未下发</text>
				</view>
			</view>
		</view>

		<view v-else style="position: relative;height: 500rpx;">
			<image src="../../static/nomytask.png" mode="" class="imag-no"></image>
			<text class="text-no">暂无任务</text>
		</view>
	</view>
</template>

<script>
	import {
		getMyCreateTask
	} from '@/api/api.js'

	export default {
		data() {
			return {
				myCreateTaskList: [], //所有
				temp: [], //搜索后的列表
			}
		},
		methods: {
			giveResult(data) {
				this.temp = data
			},
			search(res) {
				if (res === '') {
					this.temp = this.myCreateTaskList
				} else {
					this.temp = this.myCreateTaskList.filter(item => item.taskName.includes(res))
				}
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: '/page_task/task_details/task_details?taskId=' + item.taskId + '&temp=1'
				})
			},
		},
		onLoad() {
			getMyCreateTask({
				pageNum: 1,
				pageSize: 1000
			}).then((res) => {
				let arr1 = []
				let arr2 = []
				res.rows.forEach(function(item, index, array) {
					if (item.isDistribute == 0) {
						arr1.push(item)
					} else {
						arr2.push(item)
					}
				});
				arr2.sort(function(a, b) {
					return b.createTime < a.createTime ? -1 : 1
				})

				this.myCreateTaskList = arr1.concat(arr2)
				this.temp = this.myCreateTaskList
			})
		}
	}
</script>

<style lang="less">
	.imag-no {
		width: 500rpx;
		height: 500rpx;
		position: absolute;
		left: 125rpx;
	}

	.main {
		padding-bottom: 30rpx;
	}

	.text-no {
		position: absolute;
		top: 520rpx;
		left: 313rpx;
		font-size: 28rpx;
		color: rgba(166, 166, 166, 1);
		text-align: left;
	}

	#mask {
		background: #000000;
		opacity: 0.75;
		height: 100%;
		width: 100%;
		position: absolute;
		z-index: 999;
	}

	.screen-box-item-text {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
	}

	.screen-box-item {
		margin-top: 15rpx;
	}

	.screen-box {
		width: 100%;
		height: 189rpx;
		padding-left: 62rpx;
		position: absolute;
		top: 175rpx;
		background-color: #ffffff;
		z-index: 1000;
	}

	.screen-box-item-icon {
		width: 27rpx;
		height: 27rpx;
		margin-left: 514rpx;
	}

	page {
		background: #F5F5F5;
	}

	.top {
		height: 175rpx;
		background-color: #ffffff;
	}

	.search {
		margin-top: 19rpx;
		width: 655rpx;
		overflow-y: hidden;
	}

	.uni-searchbar__box {
		height: 59rpx !important;
		justify-content: flex-start !important;
	}

	.uni-searchbar {
		padding: 0px !important;
	}

	.uni-searchbar__text-placeholder {
		font-size: 24rpx;
		color: #A6A6A6;
		font-family: SourceHanSansCN;
	}

	.middle {
		width: 344rpx;
		height: 35rpx;
		align-self: stretch;
		margin-left: 71rpx;
		margin-top: 24rpx;
	}

	.middle-img {
		margin-left: 11rpx;
		width: 16rpx;
		height: 16rpx;
	}

	.middle-text {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
	}

	.item {
		margin-top: 20rpx;
		width: 712.5rpx;
		height: 236rpx;
		border-radius: 15px;
		background: rgba(255, 255, 255, 1);
		overflow: hidden;
		padding-left: 27rpx;
		padding-top: 23rpx;
	}

	.sign {
		height: 100%;
		width: 13rpx;
		background: rgba(229, 229, 229, 1);
	}

	.item-top-img {
		width: 25rpx;
		height: 25rpx;
		margin-right: 25rpx;
	}

	.item-top-text {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		font-weight: 700;
		color: #000000;
		margin-left: 8rpx;
	}

	.item-content {
		margin-top: 5rpx;

		.item-content-img {
			width: 35rpx;
			height: 35rpx;
			margin-top: 3rpx;
		}

		.item-content-text {
			font-size: 24rpx;
			font-family: SourceHanSansCN;
			color: #a6a6a6;
			margin-left: 5rpx;
		}
	}

	.item-time {

		.item-time-img {
			width: 22rpx;
			height: 22rpx;
			margin-left: 6rpx;

		}

		.item-time-text {
			font-size: 24rpx;
			font-family: SourceHanSansCN;
			color: #a6a6a6;
			margin-left: 9rpx;
		}
	}

	.item-under {
		margin-top: 16rpx;
		border-top: 1rpx solid rgba(166, 166, 166, 0.2);
		width: 659.97rpx;
		padding-top: 12rpx;

		.item-under-text {
			font-size: 28rpx;
			font-family: SourceHanSansCN;
			color: #000000;
			padding-left: 9rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			width: 501rpx;
		}

		.item-under-status {
			font-size: 28rpx;
			font-family: SourceHanSansCN;
			color: #a6a6a6;
		}
	}
</style>
