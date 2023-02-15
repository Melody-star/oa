<template>
	<view class="flex-col space-y-404 page">
		<view class="flex-col space-y-21 group">
			<view class="flex-col space-y-28 section">
				<text class="font_1 text">标题</text>
				<view class="flex-col items-start text-wrapper">
					<input type="text" @blur="setTitle" :focus="true" />
				</view>
			</view>
			<view class="flex-col space-y-29 section_2">
				<text class="font_1 text_3">内容</text>
				<view class="flex-col items-start text-wrapper_2">
					<uni-easyinput maxlength="-1" type="textarea" v-model="contentValue" :clearable="false"
						:inputBorder="false"></uni-easyinput>
				</view>
			</view>
		</view>

		<view class="flex-col items-center section_3">
			<view class="flex-col items-center text-wrapper_3" @click="submit"><text class="font_1 text_5">提交</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		foundNotice
	} from '@/api/api.js'

	export default {
		data() {
			return {
				title: '',
				contentValue: '',
			}
		},
		methods: {
			setTitle: function(event) {
				this.title = event.target.value;
			},
			submit() {
				foundNotice({
					noticeTitle: this.title,
					noticeContent: this.contentValue,
					noticeType: 2
				}).then((res) => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					this.contentValue = ''
				})
			}
		}
	}
</script>

<style>
	input {
		width: 100%;
	}

	.uni-easyinput {
		padding: 11rpx 19rpx;
	}

	page {
		background-color: #f5f5f5;
	}

	.page {
		padding-top: 12rpx;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;
	}

	.space-y-404>view:not(:first-child),
	.space-y-404>text:not(:first-child),
	.space-y-404>image:not(:first-child) {
		margin-top: 404rpx;
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
		line-height: 26rpx;
		color: #000000;
	}

	.text {
		margin-left: 12rpx;
		align-self: flex-start;
		line-height: 25.5rpx;
	}

	.text-wrapper {
		padding: 11rpx 0 11rpx 20rpx;
		background-color: #e5e5e566;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.text_2 {
		margin-left: 22rpx;
	}

	.section_2 {
		padding: 34rpx 32rpx 46rpx;
		background-color: #ffffff;
		border-radius: 15rpx;
		overflow: hidden;
	}

	.space-y-29>view:not(:first-child),
	.space-y-29>text:not(:first-child),
	.space-y-29>image:not(:first-child) {
		margin-top: 29rpx;
	}

	.text_3 {
		margin-left: 15rpx;
		align-self: flex-start;
	}

	.text-wrapper_2 {
		background-color: #e5e5e580;
		overflow: hidden;
		margin-top: 28rpx;
		overflow: hidden;
		height: 466rpx;
	}

	.uni-easyinput__content-textarea {
		min-height: 466rpx !important;
		margin: 0rpx 6rpx !important;
	}

	.text_4 {
		margin-left: 41rpx;
		color: #a6a6a6;
	}

	.section_3 {
		padding: 25rpx 0 24rpx;
		background-color: #ffffff;
		overflow: hidden;
		position: fixed;
		bottom: 0rpx;
		width: 100%;
	}

	.text-wrapper_3 {
		padding: 24rpx 0 21rpx;
		background-color: #2973ff;
		border-radius: 10rpx;
		overflow: hidden;
		width: 584rpx;
	}

	.text_5 {
		color: #ffffff;
	}
</style>
