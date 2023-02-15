<template>
	<view class="flex-col space-y-29 page">
		<text class="text">{{noticeDetail.noticeTitle}}</text>
		<text class="text_2">{{noticeDetail.createTime}}</text>
		<text class="text_3">{{noticeDetail.noticeContent}}</text>
	</view>
</template>

<script>
	import {
		getNoticeDetail
	} from '@/api/api.js'

	export default {
		data() {
			return {
				noticeDetail: {}
			}
		},
		onLoad(options) {
			const data = options.noticeId
			getNoticeDetail(data).then((res) => {
				console.log(res);
				this.noticeDetail = res.data
			})
		},
		methods: {

		}
	}
</script>

<style>
	.page {
		padding: 36rpx 39rpx 956rpx;
		background-color: #ffffff;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;
	}

	.space-y-29>view:not(:first-child),
	.space-y-29>text:not(:first-child),
	.space-y-29>image:not(:first-child) {
		margin-top: 29rpx;
	}

	.text {
		align-self: flex-start;
		color: #000000;
		font-size: 36rpx;
		font-family: SourceHanSansCN;
		line-height: 46rpx;
	}

	.text_2 {
		align-self: flex-start;
		color: #a6a6a6;
		font-size: 28rpx;
		font-family: PingFang;
		font-weight: 800;
		line-height: 21rpx;
	}

	.text_3 {
		color: #000000;
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 46rpx;
	}
</style>
