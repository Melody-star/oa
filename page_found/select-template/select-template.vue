<template>
	<view>
		<view class="flex-col">
			<view class="flex-col list group space-y-18">
				<view class="flex-col section_4" :key="i" v-for="(item, i) in tempList" @click="next(item)">
					<text class="self-start font_1">{{item.processName}}</text>
					<text class="font_2 text_3">流程标识：{{item.processKey}}</text>
					<view class="flex-row justify-between items-center group_2">
						<view class="flex-col items-start space-y-20">
							<text class="font_2">流程分类：{{item.category}}</text>
							<text class="font_2">流程版本：V{{item.version}}</text>
						</view>
						<image class="image_7"
							src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16671153239050794825.png" />
					</view>
					<text class="self-start font_2 text_4">状态：激活</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getProcessList,
		getProcessForm
	} from '@/api/api.js'

	export default {
		data() {
			return {
				tempList: []
			}
		},
		methods: {
			next(item) {
				uni.navigateTo({
					url: '/page_found/create-examine/create-examine?definitionId=' + item.definitionId +
						'&deployId=' + item.deploymentId
				});
			}
		},
		onLoad() {
			getProcessList({
				pageNum: 1,
				pageSize: 1000
			}).then((res) => {
				console.log(res.rows);
				this.tempList = res.rows
			})
		}
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
	}

	.list {
		flex: 1 1 auto;
	}

	.group {
		padding: 17rpx 18rpx 30rpx;
		overflow-y: auto;
	}

	.space-y-18>view:not(:first-child),
	.space-y-18>text:not(:first-child),
	.space-y-18>image:not(:first-child) {
		margin-top: 18rpx;
	}

	.section_4 {
		padding: 34rpx 28rpx 28rpx;
		background-color: #ffffff;
		border-radius: 15rpx;
		overflow: hidden;
	}

	.font_1 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		line-height: 29.5rpx;
		color: #000000;
	}

	.font_2 {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
		line-height: 22.5rpx;
		color: #a6a6a6;
	}

	.text_3 {
		margin-top: 28rpx;
	}

	.group_2 {
		margin-top: 18rpx;
	}

	.space-y-20>view:not(:first-child),
	.space-y-20>text:not(:first-child),
	.space-y-20>image:not(:first-child) {
		margin-top: 20rpx;
	}

	.image_7 {
		margin-right: 2rpx;
		width: 25rpx;
		height: 25rpx;
	}

	.text_4 {
		margin-top: 18rpx;
		line-height: 22rpx;
	}
</style>
