<template>
	<view>
		<uni-calendar :insert="true" :start-date="'2019-3-2'" :end-date="'2019-5-20'" :showMonth="false"
			:selected="info.selected" />

		<view class="flex-row section_10 space-x-9" v-if="todayTask.length != 0" v-for="(item,i) in todayTask" :key="i"
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



		<view class="flex-col" v-else>
			<image src="http://img.zlpo.xyz/notask.png" mode="" class="no-img"></image>
			<text class="no-text">今日任务已完成~</text>
		</view>

	</view>
</template>

<script>
	import {
		getMyTask,
		getMyExamineListt
	} from '@/api/api.js'

	function getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)

		dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	}

	export default {
		data() {
			return {
				info: {
					selected: []
				},
				//当日未完成的任务
				todayTask: []
			}
		},
		methods: {
			timestampToTime(times) {
				let time = times[1]
				let mdy = times[0]
				mdy = mdy.split('/')
				let month = parseInt(mdy[0]);
				let day = parseInt(mdy[1]);
				let year = parseInt(mdy[2])
				return year + '-' + month + '-' + day + ' ' + time
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: '/page_task/task_details/task_details?taskId=' + item.taskId + '&temp=0'
				})
			}
		},
		onLoad() {
			//获取今日日期
			let time = new Date()
			let nowTime = this.timestampToTime(time.toLocaleString('en-US', {
				hour12: false
			}).split(" "))

			let arr = []

			getMyTask().then((res) => {
				console.log("今日任务：");
				console.log(res);

				let that = this

				//展示所有未完成的任务到日历中
				//所有未完成的任务
				let incompleteTask = []
				res.rows.forEach(function(item, index, array) {
					if (item.taskDegreeOfCompletion == 0) {
						incompleteTask.push({
							date: (item.taskStartTime).slice(0, 10),
							info: '任务'
						})
					}

					if (item.taskDegreeOfCompletion == 0) {
						that.todayTask.push(item)
					}

					// if (item.taskDegreeOfCompletion == 0 && nowTime > item.taskStartTime && nowTime < item
					// 	.taskEndTime) {
					// 	that.todayTask.push(item)
					// }
				});
				arr = incompleteTask
				console.log(this.todayTask);
			})

			getMyExamineListt({
				pageNum: 1,
				pageSize: 1000
			}).then((res) => {
				console.log("审批：");
				console.log(res);

				let that = this
				if (res.rows.length == 0) {
					that.info.selected = arr
				} else {
					let incompleteExamine = []
					res.rows.forEach(function(item, index, array) {
						incompleteExamine.push({
							date: (item.createTime).slice(0, 10),
							info: '审批'
						})
					});

					arr.push(incompleteExamine)
					this.info.selected = arr
				}
			})
		}
	}
</script>

<style>
	page {
		padding-top: 50rpx;
		background-color: #f5f5f5;
	}

	.font_1 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 26rpx;
		color: #000000;
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
		line-height: 26rpx;
		color: #a6a6a6;
	}

	.font_3 {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
		line-height: 18rpx;
		color: #000000;
	}

	.group_15 {
		margin-top: 6rpx;
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
		line-height: 31rpx;
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
</style>
