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

			<view class="flex-col list group_2 space-y-21" v-if="examineList.length != 0">
				<view class="flex-col list-item space-y-19" :key="i" v-for="(item, i) in temp"
					@click="gotoDetail(item)">
					<view class="flex-row justify-between group_3">
						<text class="font_2">{{item.procDefName}}</text>
						<text v-if="item.finishTime == null" class="font_3 text_4">待审批</text>
						<text v-else class="font_3 text_4">已完成</text>
					</view>
					<view class="flex-row space-x-40">
						<view class="flex-col group_4 space-y-11">
							<view class="flex-row group_5 space-x-11">
								<image class="image_9"
									src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16675489855206176065.png" />
								<text class="font_1">{{item.createTime}}</text>
							</view>
						</view>
						<image class="image_9 image_10"
							src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16671153239050794825.png" />
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
		getMyCreateExamine
	} from '@/api/api.js'

	export default {
		data() {
			return {
				examineList: [],
				temp: [],
				searchValue: [],
			}
		},
		onLoad() {
			getMyCreateExamine({
				pageNum: 1,
				pageSize: 1000
			}).then((res) => {
				this.examineList = res.rows
				this.temp = this.examineList
			})
		},
		methods: {
			gotoDetail(item) {
				uni.navigateTo({
					url: '/page_examine/mycreate-details/mycreate-details?taskId=' + item.taskId + '&procInsId=' +
						item.procInsId + '&deployId=' + item.deployId + '&title=' + item.procDefName +
						'&createTime=' + item.createTime + '&finishTime=' + item.finishTime + '&procInsId=' + item
						.procInsId
				})
			},
			search(res) {
				if (res === '') {
					this.temp = this.examineList
				} else {
					this.searchValue = this.examineList
					if (res) {
						this.searchValue = this.examineList.filter(item => item.procDefName.includes(res))
					}
					this.temp = this.searchValue
				}
			}
		}
	}
</script>

<style>
	.imag-no {
		width: 500rpx;
		height: 500rpx;
		position: absolute;
		left: 125rpx;
		margin-top: 157rpx;
	}

	.text-no {
		position: absolute;
		top: 660rpx;
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
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;
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
		margin: 0 48rpx;
		border-radius: 30rpx;
	}

	.space-x-18>view:not(:first-child),
	.space-x-18>text:not(:first-child),
	.space-x-18>image:not(:first-child) {
		margin-left: 18rpx;
	}

	.image_7 {
		width: 28rpx;
		height: 28rpx;
	}

	.font_1 {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
		line-height: 22rpx;
		color: #a6a6a6;
	}

	.text_3 {
		margin-top: 4rpx;
	}

	.list {
		margin-top: 14rpx;
	}

	.group_2 {
		padding: 0 19rpx;
	}

	.space-y-21>view:not(:first-child),
	.space-y-21>text:not(:first-child),
	.space-y-21>image:not(:first-child) {
		margin-top: 21rpx;
	}

	.list-item {
		padding: 33rpx 22rpx 32rpx;
		background-color: #ffffff;
		border-radius: 15rpx;
		overflow: hidden;
	}

	.space-y-19>view:not(:first-child),
	.space-y-19>text:not(:first-child),
	.space-y-19>image:not(:first-child) {
		margin-top: 19rpx;
	}

	.group_3 {
		padding-left: 6rpx;
		padding-right: 2rpx;
	}

	.font_2 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		line-height: 29.5rpx;
		color: #000000;
	}

	.font_3 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 26rpx;
		color: #a6a6a6;
	}

	.text_4 {
		margin-bottom: 2rpx;
	}

	.space-x-40>view:not(:first-child),
	.space-x-40>text:not(:first-child),
	.space-x-40>image:not(:first-child) {
		margin-left: 40rpx;
	}

	.group_4 {
		flex: 1 1 auto;
	}

	.image_8 {
		flex-shrink: 0;
		width: 44rpx;
		height: 35rpx;
	}

	.text_5 {
		margin: 6rpx 0 7rpx;
		line-height: 22.5rpx;
	}

	.group_5 {
		padding: 0 10rpx;
		padding-top: 14rpx;
	}

	.space-x-11>view:not(:first-child),
	.space-x-11>text:not(:first-child),
	.space-x-11>image:not(:first-child) {
		margin-left: 11rpx;
	}

	.image_9 {
		width: 25rpx;
		height: 25rpx;
	}

	.image_10 {
		margin-right: 34rpx;
		flex-shrink: 0;
		align-self: center;
	}

	.space-y-11>view:not(:first-child),
	.space-y-11>text:not(:first-child),
	.space-y-11>image:not(:first-child) {
		margin-top: 11rpx;
	}
</style>
