<template>
	<view class="flex-col page">
		<view class="flex-col list">
			<navigator url="../create-task/create-task" hover-class="none" class="flex-row space-x-36 list-item">
				<image class="image"
					src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/86cc532bc737b92cfcd240a5ae287d08.png" />
				<text class="font_1 text">新建任务</text>
			</navigator>
			<navigator url="../select-template/select-template" hover-class="none"
				class="flex-row space-x-28 list-item_2">
				<image class="image_2"
					src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/f6da275367fdf084f2adeee5d7716326.png" />
				<text class="font_1 text_2">新建审批</text>
			</navigator>
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

		}
	}
</script>

<style>
	page {
		background-color: #ffffff;
	}

	.page {
		margin-top: 35rpx;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;
	}

	.list {
		margin: 0 32rpx;
	}

	.space-x-36>view:not(:first-child),
	.space-x-36>text:not(:first-child),
	.space-x-36>image:not(:first-child) {
		margin-left: 36rpx;
	}

	.list-item {
		padding: 34rpx 26rpx 31rpx;
		border-bottom: solid 1rpx #a6a6a6;
	}

	.image {
		width: 46rpx;
		height: 52rpx;
	}

	.font_1 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		line-height: 29.5rpx;
		color: #000000;
	}

	.text {
		align-self: center;
	}

	.space-x-28>view:not(:first-child),
	.space-x-28>text:not(:first-child),
	.space-x-28>image:not(:first-child) {
		margin-left: 28rpx;
	}

	.list-item_2 {
		padding: 34rpx 26rpx 28rpx;
		border-bottom: solid 1rpx #a6a6a6;
	}

	.image_2 {
		width: 53.5rpx;
		height: 60rpx;
	}

	.text_2 {
		align-self: center;
	}
</style>
