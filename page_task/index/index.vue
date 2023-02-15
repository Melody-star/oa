<template>
	<view class="flex-col page">
		<navigator class="flex-row space-x-36 group" url="../my-task/my-task" hover-class="none">
			<image class="image"
				src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/1fb162a58dbb5a0cccc2ca734a1986df.png" />
			<text class="font_1 text">我的任务</text>
		</navigator>
		<navigator class="flex-row space-x-28 group_2" url="../my-create/my-create" hover-class="none">
			<image class="image_2"
				src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16669318841129717299.png" />
			<text class="font_1 text_2">我创建的</text>
		</navigator>
		<navigator class="flex-row space-x-27 group_3" url="../copy/copy" hover-class="none">
			<image class="image_2"
				src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16669318841078041362.png" />
			<text class="font_1 text_3">抄送我的</text>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {}
	}
</script>

<style lang="less">
	.page {
		padding: 70rpx 32rpx 0rpx;
		width: 100%;

		.space-x-36 {

			&>view:not(:first-child),
			&>text:not(:first-child),
			&>image:not(:first-child) {
				margin-left: 36rpx;
			}

			.image {
				width: 46rpx;
				height: 52rpx;
			}

			.text {
				align-self: center;
			}
		}

		.group {
			padding: 0 26rpx;
		}

		.space-x-28 {

			&>view:not(:first-child),
			&>text:not(:first-child),
			&>image:not(:first-child) {
				margin-left: 28rpx;
			}

			.text_2 {
				align-self: center;
			}
		}

		.group_2 {
			margin-top: 30rpx;
			padding: 32rpx 17rpx 26rpx;
			border-top: solid 1rpx #a6a6a6;
			border-bottom: solid 1rpx #a6a6a6;
		}

		.font_1 {
			font-size: 32rpx;
			font-family: SourceHanSansCN;
			line-height: 29.5rpx;
			color: #000000;
		}

		.space-x-27 {

			&>view:not(:first-child),
			&>text:not(:first-child),
			&>image:not(:first-child) {
				margin-left: 27rpx;
			}

			.text_3 {
				align-self: center;
			}
		}

		.group_3 {
			padding: 30rpx 17rpx 26rpx;
			border-bottom: solid 1rpx #a6a6a6;
		}

		.image_2 {
			width: 64rpx;
			height: 64rpx;
		}
	}
</style>
