<template>
	<view class="flex-col page">
		<view class="flex-col list">
			<!-- 			<navigator url="../examine-process/examine-process" hover-class="none"
				class="flex-row list-item space-x-30">
				<image class="image"
					src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16676577054292730557.png" />
				<text class="font_1 text">设置审批流程</text>
			</navigator> -->
			<navigator url="../found-notice/found-notice" hover-class="none" class="flex-row list-item_2 space-x-30">
				<image class="image"
					src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16676577054288925281.png" />
				<text class="font_1 text_2">设置公告</text>
			</navigator>
			<!-- 			<navigator url="../addAdministrators/addAdministrators" hover-class="none"
				class="flex-row list-item_3 space-x-30">
				<image class="image"
					src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16676577054243954147.png" />
				<text class="font_1 text_3">设置子管理员</text>
			</navigator> -->
			<navigator url="../addUser/addUser" hover-class="none" class="flex-row list-item_2 space-x-29">
				<image class="image"
					src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16676577054263472329.png" />
				<text class="font_1 text_4">添加通讯录成员</text>
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
		margin-top: 40rpx;
	}

	.page {
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;
	}

	.list {
		margin: 0 32rpx;
	}

	.list-item {
		padding: 24rpx 15rpx 26rpx;
		border-bottom: solid 1rpx #a6a6a6;
	}

	.image {
		width: 64rpx;
		height: 64rpx;
	}

	.font_1 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		line-height: 29.5rpx;
		color: #000000;
	}

	.text {
		align-self: center;
		line-height: 30rpx;
	}

	.list-item_2 {
		padding: 32rpx 15rpx 26rpx;
		border-bottom: solid 1rpx #a6a6a6;
	}

	.text_2 {
		align-self: center;
	}

	.list-item_3 {
		padding: 32rpx 15rpx 24rpx;
		border-bottom: solid 1rpx #a6a6a6;
	}

	.space-x-30>view:not(:first-child),
	.space-x-30>text:not(:first-child),
	.space-x-30>image:not(:first-child) {
		margin-left: 30rpx;
	}

	.text_3 {
		align-self: center;
	}

	.space-x-29>view:not(:first-child),
	.space-x-29>text:not(:first-child),
	.space-x-29>image:not(:first-child) {
		margin-left: 29rpx;
	}

	.text_4 {
		align-self: center;
	}
</style>
