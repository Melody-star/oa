<template>
	<view class="flex-col page">
		<view class="flex-col group">
			<view class="flex-col section_4">
				<view class="flex-row section_5 space-x-18">
					<uni-search-bar style="width: 100%;" placeholder="请输入标题" :radius="100" @input="search"
						clearButton="none" cancelButton="none" bgColor="#efefef">
					</uni-search-bar>
				</view>
			</view>
			<view class="flex-col list group_2 space-y-25" v-if="myCreateExamineList.length != 0">
				<view class="flex-col list-item" :key="i" v-for="(item, i) in temp" @click="gotoDetail(item)">
					<view class="flex-row justify-between group_3">
						<text class="font_2">{{item.procDefName}}</text>
						<image class="image_8"
							src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16671153239050794825.png" />
					</view>
					<view class="flex-row group_5 space-x-8">
						<image class="image_10"
							src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16669318847138243434.png" />
						<text class="font_1">{{item.createTime}}</text>
					</view>
					<view class="flex-row justify-between group_6">
						<text class="font_3">申请人：{{item.startUserName}}</text>
						<text class="font_4" v-if="item.state == '未审批'">未审批</text>
						<text class="font_4" v-else>已审批</text>
					</view>
				</view>
			</view>

			<view v-else style="position: relative;height: 600rpx;">
				<image src="../../static/nomytask.png" mode="" class="imag-no"></image>
				<text class="text-no">暂无任务</text>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		//未审批
		getMyExamineListt,
		//已审批
		getMyExamineList
	} from '@/api/api.js'

	export default {
		data() {
			return {
				myCreateExamineList: [],
				temp: [],
				searchValue: [],
			}
		},
		methods: {
			search(res) {
				if (res === '') {
					this.temp = this.myCreateExamineList
				} else {
					this.searchValue = this.myCreateExamineList
					if (res) {
						this.searchValue = this.myCreateExamineList.filter(item => item.procDefName.includes(res))
					}
					this.temp = this.searchValue
				}
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: '/page_examine/examine-details/examine-details?taskId=' + item.taskId + '&procInsId=' +
						item.procInsId + '&deployId' + item.deployId + '&title=' + item.procDefName +
						'&createTime=' + item.createTime + '&state=' + item.state
				})
			}
		},
		onLoad() {
			// getMyExamineListt({
			// 	pageNum: 1,
			// 	pageSize: 1000
			// }).then((res) => {
			// 	console.log(res);

			// 	this.myCreateExamineList = res.rows
			// 	this.myCreateExamineList.map(el => el.state = "未审批")
			// })

			// getMyExamineList({
			// 	pageNum: 1,
			// 	pageSize: 1000
			// }).then((res) => {
			// 	let temp = res.rows
			// 	temp.map(el => el.state = "已审批")
			// 	this.myCreateExamineList = [...this.myCreateExamineList, ...temp];

			// 	this.temp = this.myCreateExamineList
			// })

			getMyExamineListt({
				pageNum: 1,
				pageSize: 1000
			}).then((res) => {
				console.log(res);
				this.myCreateExamineList = res.rows
				this.myCreateExamineList.map(el => el.state = "未审批")

				return getMyExamineList({
					pageNum: 1,
					pageSize: 1000
				})

			}).then((res) => {
				console.log(res);
				let temp = res.rows
				temp.map(el => el.state = "已审批")
				this.myCreateExamineList = [...this.myCreateExamineList, ...temp];
				this.temp = this.myCreateExamineList
			})
		},
	}
</script>

<style>
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

	.uni-searchbar {
		padding: 0rpx !important;
	}

	page {
		background-color: #f5f5f5;
	}

	.page {
		width: 100%;
	}

	.group {
		padding-bottom: 30rpx;
		flex: 1 1 auto;
		overflow-y: auto;
	}

	.section_4 {
		padding: 19rpx 0 30rpx;
		background-color: #ffffff;
	}

	.section_5 {
		border-radius: 30rpx;
		margin: 0 48rpx;
	}

	.space-x-18>view:not(:first-child),
	.space-x-18>text:not(:first-child),
	.space-x-18>image:not(:first-child) {
		margin-left: 18rpx;
	}

	.font_1 {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
		line-height: 22rpx;
		color: #a6a6a6;
	}

	.list {
		margin-top: 22rpx;
	}

	.group_2 {
		padding: 0 19rpx;
	}

	.space-y-25>view:not(:first-child),
	.space-y-25>text:not(:first-child),
	.space-y-25>image:not(:first-child) {
		margin-top: 25rpx;
	}

	.list-item {
		padding: 32rpx 22rpx 0;
		background-color: #ffffff;
		border-radius: 15rpx;
		overflow: hidden;
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

	.image_8 {
		margin-bottom: 6rpx;
		width: 25rpx;
		height: 25rpx;
	}

	.group_4 {
		margin-top: 12rpx;
	}

	.image_9 {
		width: 35rpx;
		height: 35rpx;
	}

	.text_4 {
		margin: 6rpx 0 7rpx;
		line-height: 22.5rpx;
	}

	.group_5 {
		margin-top: 16rpx;
		padding: 0 6rpx;
	}

	.space-x-8>view:not(:first-child),
	.space-x-8>text:not(:first-child),
	.space-x-8>image:not(:first-child) {
		margin-left: 8rpx;
	}

	.image_10 {
		width: 22rpx;
		height: 22rpx;
	}

	.group_6 {
		margin-top: 16rpx;
		padding: 21rpx 4rpx 32rpx 10rpx;
		border-top: solid 1rpx #a6a6a633;
	}

	.font_3 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 26rpx;
		color: #000000;
	}

	.font_4 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 26rpx;
		color: #a6a6a6;
	}
</style>
