<template>
	<view class="flex-col page">
		<view class="flex-col group_3">
			<navigator url="../my-examine/my-examine" hover-class="none" class="flex-row space-x-32 group_4">
				<image class="image_7"
					src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/1c7c388f58145e9d653e1d30aefd6f67.png" />
				<text class="font_1 text_3">我审批的</text>
			</navigator>
			<navigator url="../my-create/my-create" hover-class="none" class="flex-row space-x-28 group_5">
				<image class="image_8"
					src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16675308071703992354.png" />
				<text class="font_1 text_4">我发起的</text>
			</navigator>
			<navigator url="../copy/copy" hover-class="none" class="flex-row space-x-27 group_6">
				<image class="image_8"
					src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16675308071680627333.png" />
				<text class="font_1 text_5">抄送我的</text>
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
	.page {
		background-color: #ffffff;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;
	}

	.group_3 {
		padding: 35rpx 32rpx 778rpx 32rpx;
		flex: 1 1 auto;
		overflow-y: auto;
	}

	.group_4 {
		padding: 35rpx 23rpx 28rpx;
	}

	.space-x-32>view:not(:first-child),
	.space-x-32>text:not(:first-child),
	.space-x-32>image:not(:first-child) {
		margin-left: 32rpx;
	}

	.image_7 {
		width: 53.5rpx;
		height: 60rpx;
	}

	.font_1 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		line-height: 30rpx;
		color: #000000;
	}

	.text_3 {
		align-self: center;
	}

	.group_5 {
		padding: 32rpx 17rpx 26rpx;
		border-top: solid 1rpx #a6a6a6;
		border-bottom: solid 1rpx #a6a6a6;
	}

	.space-x-28>view:not(:first-child),
	.space-x-28>text:not(:first-child),
	.space-x-28>image:not(:first-child) {
		margin-left: 28rpx;
	}

	.image_8 {
		width: 64rpx;
		height: 64rpx;
	}

	.text_4 {
		align-self: center;
	}

	.group_6 {
		padding: 30rpx 17rpx 26rpx;
		border-bottom: solid 1rpx #a6a6a6;
	}

	.space-x-27>view:not(:first-child),
	.space-x-27>text:not(:first-child),
	.space-x-27>image:not(:first-child) {
		margin-left: 27rpx;
	}

	.text_5 {
		align-self: center;
		line-height: 29.5rpx;
	}
</style>
