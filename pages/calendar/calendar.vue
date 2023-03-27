<template>
	<view style="background-color: #F5F5F5;">
		<uni-calendar :selected="info.selected" :showMonth="false" @change="change"></uni-calendar>

		<view v-if="todayTask.length != 0 || todayExamine.length != 0" style="padding-bottom: 1rpx;">
			<view class="flex-row section_10 space-x-9" v-for="(item,i) in todayTask" :key="i"
				@click="gotoDetail(item)">
				<view class="section_11_jinji" v-if="item.taskUrgentDegree === 1"></view>
				<view class="section_11_youxian" v-if="item.taskUrgentDegree === 2"></view>
				<view class="section_11_changtai" v-if="item.taskUrgentDegree === 3"></view>

				<view class="flex-col group_12">
					<view class="flex-row justify-between group_13">
						<text class="font_4 text_17">{{item.taskName}}</text>
						<image class="image_8"
							src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16671153239050794825.png" />
					</view>
					<view class="flex-row group_14">
						<image class="image_10"
							src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16671153239070581438.png" />
						<text class="font_5 text_18">{{item.taskContent}}</text>
					</view>
					<view class="flex-row group_15 space-x-8">
						<image class="image_12"
							src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16669318847138243434.png" />
						<text class="font_3 text_19">{{item.taskStartTime}}-{{item.taskEndTime}}</text>
					</view>
					<view class="flex-row justify-between group_16">
						<view class="flex-row space-x-8">
							<text class="font_1">执行人：{{item.taskUserName}}</text>
						</view>
						<text class="font_6" v-if="item.taskDegreeOfCompletion == 0">未完成</text>
						<text class="font_6" v-if="item.taskDegreeOfCompletion == 1">已完成</text>
					</view>
				</view>
			</view>

			<view class="flex-col list-item" :key="j" v-for="(item, j) in todayExamine"
				@click="gotoExamineDetail(item)">

				<view class="flex-row justify-between group_3">
					<text class="font_2">{{item.procDefName}}</text>
					<image class="image_8"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16671153239050794825.png" />
				</view>
				<view class="flex-row group_5 space-x-8">
					<image class="image_15"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16669318847138243434.png" />
					<text class="font_7">{{item.createTime}}</text>
				</view>
				<view class="flex-row justify-between group_6">
					<text class="font_8">申请人：{{item.startUserName}}</text>
					<text class="font_9">未审批</text>
					<!-- <text class="font_9" v-else>已审批</text> -->
				</view>
			</view>
		</view>

		<view class="flex-col" v-else>
			<image src="/static/notask.png" mode="" class="no-img"></image>
			<text class="no-text">今日任务已完成~</text>
		</view>

	</view>
</template>

<script>
	import {
		//我的任务
		getMyTask,
		// 待审批
		getMyExamineListt
	} from '@/api/api.js'

	export default {
		data() {
			return {
				info: {
					selected: []
				},
				//当日未完成的任务
				todayTask: [],
				//当日未完成的审批
				todayExamine: []
			}
		},
		methods: {
			timestampToTime(times) {
				let time = times[1]
				let mdy = times[0]
				mdy = mdy.split('/')
				let month
				if (mdy[0].length === 1) {
					month = "0" + parseInt(mdy[0])
				} else {
					month = parseInt(mdy[0]);
				}
				let day = parseInt(mdy[1]);
				let year = parseInt(mdy[2])
				return year + '-' + month + '-' + day + ' ' + time
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: '/page_task/task_details/task_details?taskId=' + item.taskId + '&temp=0'
				})
			},
			gotoExamineDetail(item) {
				uni.navigateTo({
					url: '/page_examine/examine-details/examine-details?taskId=' + item.taskId + '&procInsId=' +
						item.procInsId + '&deployId=' + item.deployId + '&title=' + item.procDefName +
						'&createTime=' + item.createTime + '&state=未审批'
				})
			},
			change(e) {
				this.getInfo(e.fulldate)
			},
			/**
			 * 获取今日任务
			 * @param {Object} time
			 */
			getInfo(time) {
				let that = this
				getMyTask().then((res) => {
					//展示所有未完成的任务到日历中
					let arr1 = []
					res.rows.forEach(function(item, index, array) {
						if (item.taskDegreeOfCompletion == 0) {
							that.info.selected = [{
								date: (item.taskStartTime).slice(0, 10),
								info: "任务"
							}]
						}

						if (item.taskDegreeOfCompletion == 0 && item.taskEndTime >= time && item
							.taskStartTime <= time) {
							arr1.push(item)
						}
					});

					that.todayTask = arr1
				})

				getMyExamineListt({
					pageNum: 1,
					pageSize: 1000
				}).then((res) => {

					console.log(res);

					let arr = []
					let arr2 = []

					if (res.rows.length != 0) {
						//筛选标注
						res.rows.forEach(function(item, index, array) {
							arr.push({
								date: (item.createTime).slice(0, 10),
								info: '审批'
							})
							if (item.createTime <= time) {
								arr2.push(item)
							}

						});

						that.todayExamine = arr2
						that.info.selected = that.info.selected.concat(arr);
					}
				})
			}
		},
		onShow() {
			//获取今日日期
			let time = new Date()
			//格式化当前日期
			let nowTime = this.timestampToTime(time.toLocaleString('en-US', {
				hour12: false
			}).split(" "))

			this.getInfo(nowTime);
		}
	}
</script>

<style>
	page {
		padding-top: 50rpx;
		background-color: #f5f5f5;
	}

	.font_8 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 26rpx;
		color: #000000;
	}

	.font_9 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 26rpx;
		color: #a6a6a6;
	}

	.font_7 {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
		line-height: 22rpx;
		color: #a6a6a6;
	}

	.font_1 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		color: #000000;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 501rpx;
	}

	.font_4 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		line-height: 30rpx;
		color: #000000;
	}

	.font_5 {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
		line-height: 22.5rpx;
		color: #a6a6a6;
	}

	.font_6 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;

		color: #a6a6a6;
	}

	.font_3 {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
		line-height: 18rpx;
		color: #000000;
	}

	.group_6 {
		margin-top: 16rpx;
		padding: 21rpx 4rpx 32rpx 10rpx;
		border-top: solid 1rpx #a6a6a633;
	}

	.group_15 {
		margin-top: 6rpx;
		padding: 0 6rpx;
	}

	.group_5 {
		margin-top: 16rpx;
		padding: 0 6rpx;
	}

	.image_8 {
		margin-bottom: 6rpx;
		width: 25rpx;
		height: 25rpx;
	}

	.image_10 {
		width: 35rpx;
		height: 35rpx;
	}

	.image_12 {
		width: 22rpx;
		height: 22rpx;
	}

	.section_10 {
		margin: 20rpx 19rpx 0 19rpx;
		background-color: #ffffff;
		border-radius: 15rpx;
		overflow: hidden;
	}

	.section_11_jinji {
		flex-shrink: 0;
		background-color: #f47669;
		width: 13rpx;
		height: 236rpx;
	}

	.section_11_youxian {
		flex-shrink: 0;
		background-color: #F7B670;
		width: 13rpx;
		height: 236rpx;
	}

	.section_11_changtai {
		flex-shrink: 0;
		background-color: #A5D63F;
		width: 13rpx;
		height: 236rpx;
	}

	.group_12 {
		margin-right: 26rpx;
		flex: 1 1 auto;
		align-self: center;
	}

	.group_13 {
		padding-left: 6rpx;
	}

	.group_14 {
		margin-top: 12rpx;
	}

	.group_16 {
		margin-top: 17rpx;
		padding-left: 8rpx;
		padding-top: 20rpx;
		border-top: solid 1rpx #a6a6a633;
	}

	.text_17 {
		font-weight: 700;
	}

	.text_18 {
		margin: 6rpx 0 7rpx;
	}

	.text_19 {
		margin-top: 4rpx;
		color: #a6a6a6;
	}

	.space-x-9>view:not(:first-child),
	.space-x-9>text:not(:first-child),
	.space-x-9>image:not(:first-child) {
		margin-left: 9rpx;
	}

	.space-x-8>view:not(:first-child),
	.space-x-8>text:not(:first-child),
	.space-x-8>image:not(:first-child) {
		margin-left: 8rpx;
	}

	.no-img {
		width: 400rpx;
		height: 400rpx;
		margin: auto;
		margin-top: 40rpx;
	}

	.no-text {
		margin: auto;
		font-size: 28rpx;
		color: rgba(166, 166, 166, 1);
	}

	.list-item {
		padding: 32rpx 22rpx 0;
		background-color: #ffffff;
		border-radius: 15rpx;
		overflow: hidden;
		margin: 25rpx 19rpx;
	}

	.group_3 {
		padding-left: 6rpx;
		padding-right: 3rpx;
	}

	.font_2 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		line-height: 30rpx;
		color: #000000;
	}


	.image_15 {
		width: 22rpx;
		height: 22rpx;
	}
</style>