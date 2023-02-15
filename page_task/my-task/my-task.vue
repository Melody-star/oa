<template>
	<view class="flex-col space-y-20 page">
		<view class="flex-col section">
			<view class="search flex--direction">
				<uni-search-bar style="width: 100%;" placeholder="请输入任务名称" :radius="100" @input="search"
					clearButton="none" cancelButton="none" bgColor="#efefef">
				</uni-search-bar>
			</view>
			<view class="flex-row space-x-64 justify-between group">
				<select-screen title="筛选" :allList="myTaskList" @give-result="giveResult"></select-screen>
				<select-time title="时间" :allList="myTaskList" @give-result="giveResult"></select-time>
			</view>
		</view>

		<view class="flex-col list" v-if="myTaskList.length != 0">
			<view class="flex-row space-x-9 list-item" :key="i" v-for="(item, i) in temp" @click="gotoDetail(item)">
				<view class="section_2_jinji" v-if="item.taskUrgentDegree === 1"></view>
				<view class="section_2_youxian" v-if="item.taskUrgentDegree === 2"></view>
				<view class="section_2_cahngtai" v-if="item.taskUrgentDegree === 3"></view>

				<view class="flex-col group_2">
					<view class="flex-row justify-between group_3">
						<text class="font_3">{{item.taskName}}</text>
						<image class="image_3"
							src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16671153239050794825.png" />
					</view>
					<view class="flex-row group_4">
						<image class="image_4"
							src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16671153239070581438.png" />
						<text class="font_1 text_4">{{item.taskContent}}</text>
					</view>
					<view class="flex-row space-x-8 group_5">
						<image class="image_5"
							src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16669318847138243434.png" />
						<text class="font_4 text_5">{{item.taskStartTime}}-{{item.taskEndTime}}</text>
					</view>
					<view class="flex-row justify-between group_6">
						<view class="flex-row space-x-8">
							<text class="font_5">执行人：{{item.taskUserName}}</text>
						</view>
						<text class="font_6" v-if="item.taskDegreeOfCompletion === 1">已完成</text>
						<text class="font_6" v-if="item.taskDegreeOfCompletion === 0">未完成</text>
					</view>
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
		getMyTask
	} from '@/api/api.js'

	export default {
		data() {
			return {
				myTaskList: [],
				temp: [],
				searchValue: [],
			}
		},
		onLoad() {
			getMyTask({
				pageNum: 1,
				pageSize: 1000
			}).then((res) => {
				this.myTaskList = res.rows.sort(function(a, b) {
					return b.createTime < a.createTime ? -1 : 1
				})
				this.temp = this.myTaskList
			})
		},
		methods: {
			gotoDetail(item) {
				uni.navigateTo({
					url: '/page_task/task_details/task_details?taskId=' + item.taskId + '&temp=0'
				})
			},
			search(res) {
				if (res === '') {
					this.temp = this.myTaskList
				} else {
					this.searchValue = this.myTaskList
					if (res) {
						this.searchValue = this.myTaskList.filter(item => item.taskName.includes(res))
					}
					this.temp = this.searchValue
				}
			},
			giveResult(data) {
				this.temp = data
			},
		}
	}
</script>

<style>
	page {
		background: #F5F5F5;
	}

	.imag-no {
		width: 500rpx;
		height: 500rpx;
		position: absolute;
		left: 125rpx;
	}

	.text-no {
		position: absolute;
		top: 520rpx;
		left: 313rpx;
		font-size: 28rpx;
		color: rgba(166, 166, 166, 1);
		text-align: left;
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

	.search {
		margin-top: 19rpx;
		width: 655rpx;
		overflow-y: hidden;
	}

	.uni-searchbar {
		padding: 0rpx !important;
	}

	.page {
		padding-bottom: 30rpx;
	}

	.space-y-20>view:not(:first-child),
	.space-y-20>text:not(:first-child),
	.space-y-20>image:not(:first-child) {
		margin-top: 20rpx;
	}

	.section {
		padding: 19rpx 48rpx 0;
		background-color: #ffffff;
	}

	.space-x-18>view:not(:first-child),
	.space-x-18>text:not(:first-child),
	.space-x-18>image:not(:first-child) {
		margin-left: 18rpx;
	}

	.image {
		width: 28rpx;
		height: 28rpx;
	}

	.font_1 {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
		line-height: 22.5rpx;
		color: #a6a6a6;
	}

	.text {
		margin-top: 5rpx;
		line-height: 22rpx;
	}

	.group {
		padding: 24rpx 24rpx 25rpx;
		width: 255rpx;
	}

	.space-x-64>view:not(:first-child),
	.space-x-64>text:not(:first-child),
	.space-x-64>image:not(:first-child) {
		margin-left: 64rpx;
	}

	.font_2 {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
		line-height: 22.5rpx;
		color: #000000;
	}

	.text_2 {
		line-height: 22rpx;
	}

	.image_2 {
		margin-top: 4rpx;
		flex-shrink: 0;
		width: 16rpx;
		height: 16rpx;
	}

	.space-x-10>view:not(:first-child),
	.space-x-10>text:not(:first-child),
	.space-x-10>image:not(:first-child) {
		margin-left: 10rpx;
	}

	.text_3 {
		line-height: 22rpx;
	}

	.list {
		padding: 0 19rpx;
	}

	.list-item {
		background-color: #ffffff;
		border-radius: 15rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
	}

	.section_2_jinji {
		flex-shrink: 0;
		background-color: #f47669;
		width: 13rpx;
		height: 236rpx;
	}

	.section_2_youxian {
		flex-shrink: 0;
		background-color: #F7B670;
		width: 13rpx;
		height: 236rpx;
	}

	.section_2_cahngtai {
		flex-shrink: 0;
		background-color: #A5D63F;
		width: 13rpx;
		height: 236rpx;
	}



	.group_2 {
		margin-right: 25rpx;
		flex: 1 1 auto;
		align-self: center;
	}

	.group_3 {
		padding-left: 6rpx;
	}

	.font_3 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		line-height: 13rpx;
		font-weight: 700;
		color: #000000;
	}

	.image_3 {
		margin-bottom: 6rpx;
		width: 25rpx;
		height: 25rpx;
	}

	.group_4 {
		margin-top: 12rpx;
	}

	.image_4 {
		width: 35rpx;
		height: 35rpx;
	}

	.text_4 {
		margin: 6rpx 0 7rpx;
	}

	.group_5 {
		margin-left: 6rpx;
		margin-top: 6rpx;
		align-self: flex-start;
		width: 526rpx;
	}

	.space-x-8>view:not(:first-child),
	.space-x-8>text:not(:first-child),
	.space-x-8>image:not(:first-child) {
		margin-left: 8rpx;
	}

	.image_5 {
		margin-bottom: 8rpx;
		flex-shrink: 0;
		width: 22rpx;
		height: 22rpx;
	}

	.font_4 {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
		line-height: 29rpx;
		color: #a6a6a6;
	}

	.text_5 {
		flex: 1 1 auto;
		word-break: break-all;
		width: 100rpx;
	}

	.group_6 {
		margin-top: 9rpx;
		padding-left: 8rpx;
		padding-top: 20rpx;
		border-top: solid 1rpx #a6a6a633;
	}

	.font_5 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 22.5rpx;
		color: #000000;
	}

	.font_6 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 26rpx;
		color: #a6a6a6;
	}

	.space-x-9>view:not(:first-child),
	.space-x-9>text:not(:first-child),
	.space-x-9>image:not(:first-child) {
		margin-left: 9rpx;
	}
</style>
