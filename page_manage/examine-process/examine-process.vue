<template>
	<view class="flex-col space-y-708 page">
		<view class="flex-col space-y-21 group">
			<view class="flex-col space-y-28 section">
				<text class="font_1 text">标题</text>
				<view class="flex-col items-start text-wrapper"><text class="font_1 text_2">关于请假的申请</text></view>
			</view>
			<view class="flex-col space-y-24 section_2">
				<text class="font_1 text_3">流程</text>
				<view class="flex-row justify-between items-start group_2">
					<view class="flex-col group_3">
						<view class="flex-row space-x-42">
							<view class="section_3"></view>
							<text class="font_1">张三</text>
						</view>
						<view class="flex-row space-x-41">
							<view class="flex-col group_4">
								<view class="section_4"></view>
								<view class="section_5"></view>
							</view>
							<text class="font_1 text_4">李四</text>
						</view>
					</view>
					<image class="image"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/51ae67e043a7fbf6a79fbbccf4d45b17.png" />
				</view>
			</view>
		</view>
		<view class="flex-col items-center section_6">
			<view class="flex-col items-center text-wrapper_2" @click="submit"><text class="font_1 text_5">提交</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			submit() {

			}
		}
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
	}

	.page {
		padding-top: 13rpx;
		width: 100%;
		overflow-x: hidden;
	}

	.space-y-708>view:not(:first-child),
	.space-y-708>text:not(:first-child),
	.space-y-708>image:not(:first-child) {
		margin-top: 708rpx;
	}

	.group {
		padding-left: 19rpx;
		padding-right: 18rpx;
	}

	.space-y-21>view:not(:first-child),
	.space-y-21>text:not(:first-child),
	.space-y-21>image:not(:first-child) {
		margin-top: 21rpx;
	}

	.section {
		padding: 34rpx 32rpx 26rpx;
		background-color: #ffffff;
		border-radius: 15rpx;
		overflow: hidden;
	}

	.space-y-28>view:not(:first-child),
	.space-y-28>text:not(:first-child),
	.space-y-28>image:not(:first-child) {
		margin-top: 28rpx;
	}

	.font_1 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 25.5rpx;
		color: #000000;
	}

	.text {
		margin-left: 12rpx;
		align-self: flex-start;
	}

	.text-wrapper {
		padding: 20rpx 0 16rpx;
		background-color: #e5e5e566;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.text_2 {
		margin-left: 22rpx;
		line-height: 26rpx;
	}

	.section_2 {
		padding: 34rpx 46rpx 62rpx;
		background-color: #ffffff;
		border-radius: 15rpx;
		overflow: hidden;
	}

	.space-y-24>view:not(:first-child),
	.space-y-24>text:not(:first-child),
	.space-y-24>image:not(:first-child) {
		margin-top: 24rpx;
	}

	.text_3 {
		align-self: flex-start;
	}

	.group_2 {
		padding: 0 20rpx;
	}

	.group_3 {
		margin-top: 12rpx;
	}

	.space-x-42>view:not(:first-child),
	.space-x-42>text:not(:first-child),
	.space-x-42>image:not(:first-child) {
		margin-left: 42rpx;
	}

	.section_3 {
		margin-bottom: 4rpx;
		flex-shrink: 0;
		border-radius: 50%;
		width: 20rpx;
		height: 20rpx;
		border: solid 3rpx #cccccc;
	}

	.space-x-41>view:not(:first-child),
	.space-x-41>text:not(:first-child),
	.space-x-41>image:not(:first-child) {
		margin-left: 41rpx;
	}

	.group_4 {
		flex-shrink: 0;
		width: 20rpx;
	}

	.section_4 {
		flex-shrink: 0;
		align-self: center;
		background-color: #cccccc;
		width: 3rpx;
		height: 101rpx;
	}

	.section_5 {
		flex-shrink: 0;
		border-radius: 50%;
		height: 20rpx;
		border: solid 3rpx #cccccc;
	}

	.text_4 {
		margin-top: 93rpx;
	}

	.image {
		margin-right: 19rpx;
		border-radius: 5rpx;
		width: 45rpx;
		height: 45rpx;
	}

	.section_6 {
		padding: 25rpx 0 24rpx;
		background-color: #ffffff;
		overflow: hidden;
		position: fixed;
		bottom: 0;
	}

	.text-wrapper_2 {
		padding: 24rpx 0 21rpx;
		background-color: #2973ff;
		border-radius: 10rpx;
		overflow: hidden;
		width: 584rpx;
	}

	.text_5 {
		color: #ffffff;
		line-height: 26rpx;
	}
</style>
