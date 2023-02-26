<template>
	<view class="flex-col page space-y-61">
		<view class="flex-col">
			<view class="flex-row justify-between section_5">
				<view class="flex-col space-y-22">
					<text class="font_2 text_3">{{data.title}}</text>
					<view class="flex-row space-x-6">
						<text class="font_3">发布时间：{{data.createTime}}</text>
					</view>
				</view>
				<text class="font_4 text_6" v-if="data.finishTime == 'null'">待审批</text>
				<text class="font_4 text_6" v-else>已完成</text>
			</view>
			<view class="flex-row justify-between section_6" v-for="(item,i) in processFormList" :key="i">
				<text class="font_5">{{item.label}}</text>
				<text class="font_6 text_8">{{item.defaultValue}}</text>
			</view>
			<view class="flex-col section_7 space-y-26">
				<view class="flex-row group_7 space-x-90">
					<text class="font_5 text_13">开始时间</text>
					<text class="font_6 text_14">{{data.createTime}}</text>
				</view>
				<view class="flex-row group_7 space-x-90" v-if="data.finishTime != null">
					<text class="font_5 text_13">结束时间</text>
					<text class="font_6 text_14">{{data.finishTime}}</text>
				</view>
			</view>
			<view class="flex-col section_8 space-y-18">
				<uni-steps :options="node" direction="column" :active="active"></uni-steps>
			</view>
		</view>
		<view class="flex-col items-center section_11" v-if="data.finishTime == 'null' && data.copy == '1'">
			<view class="flex-col items-center text-wrapper" @click="recallExamine"><text
					class="font_4 text_24">撤回</text></view>
		</view>

		<!-- 		<view class="flex-col items-center text-wrapper_2" @click="deleteExamine" v-if="data.copy == '1'"><text
				class="text_detele">删除</text>
		</view> -->

	</view>
</template>

<script>
	import {
		getExamineDetail,
		deleteExamine
	} from '@/api/api.js'

	export default {
		data() {
			return {
				data: {},
				node: [],
				processFormList: [],
				active: 0
			}
		},
		methods: {
			recallExamine() {
				deleteExamine({
					procInsId: data.procInsId
				}).then((res) => {
					console.log(res);
				})
			},
			deleteExamine() {

			}
		},
		onLoad(option) {
			let that = this

			this.data = option
			getExamineDetail({
				procInsId: option.procInsId,
				deployId: option.deployId,
				taskId: option.taskId
			}).then((res) => {
				/**
				 * 提取流程信息
				 */
				res.data.historyTaskList.forEach(function(item, index, array) {
					let obj = {}
					obj["title"] = item.assigneeName;
					obj["desc"] = item.createTime;
					that.node.push(obj);

					if (item.finishTime === null) {
						that.active = index - 1;
					} else {
						that.active = res.data.historyTaskList.length - 1;
					}
				})

				/**
				 * 提取表单和内容信息
				 */
				let arr = res.data.processFormList
				arr.forEach(function(item, index, array) {
					let obj = {}
					obj["defaultValue"] = item.fields[0].__config__.defaultValue;
					obj["label"] = item.fields[0].__config__.label;
					that.processFormList.push(obj);
				})
			})
		}
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
	}

	.box {
		width: 20rpx;
		height: 86rpx;
		position: absolute;
		bottom: 0rpx;
		left: 76rpx;
		background-color: #ffffff;
	}

	.text_detele {
		color: #f47669;
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 26rpx;
	}

	.text-wrapper_2 {
		margin: 30rpx 20rpx 0;
		padding: 34rpx 0 32rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		overflow: hidden;
		margin-bottom: 30rpx;
	}

	.space-y-61>view:not(:first-child),
	.space-y-61>text:not(:first-child),
	.space-y-61>image:not(:first-child) {
		margin-top: 61rpx;
	}

	.section_5 {
		padding: 40rpx 36rpx 44rpx;
		background-color: #ffffff;
		overflow: hidden;
	}

	.space-y-22>view:not(:first-child),
	.space-y-22>text:not(:first-child),
	.space-y-22>image:not(:first-child) {
		margin-top: 22rpx;
	}

	.font_2 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		line-height: 29.5rpx;
		color: #000000;
	}

	.text_3 {
		align-self: flex-start;
	}

	.space-x-6>view:not(:first-child),
	.space-x-6>text:not(:first-child),
	.space-x-6>image:not(:first-child) {
		margin-left: 6rpx;
	}

	.font_3 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 26rpx;
		color: #a6a6a6;
	}

	.text_5 {
		margin-top: 2rpx;
	}

	.font_4 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 26rpx;
		color: #808080;
	}

	.text_6 {
		margin-right: 16rpx;
		align-self: center;
		color: #000000;
	}

	.section_6 {
		margin-top: 18rpx;
		padding: 36rpx 39rpx 36rpx;
		background-color: #ffffff;
		overflow: hidden;
	}

	.font_5 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		color: #808080;
	}

	.font_6 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		color: #000000;
	}

	.text_8 {
		margin-right: 14rpx;
		width: 506rpx;
	}

	.section_7 {
		margin-top: 23rpx;
		padding: 29rpx 36rpx 36rpx;
		background-color: #ffffff;
		overflow: hidden;
	}

	.space-y-26>view:not(:first-child),
	.space-y-26>text:not(:first-child),
	.space-y-26>image:not(:first-child) {
		margin-top: 15rpx;
	}

	.font_7 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		line-height: 24.5rpx;
		color: #000000;
	}

	.text_10 {
		margin: 3rpx 0 2rpx 26rpx;
	}

	.text_12 {
		margin: 3rpx 0 2rpx 26rpx;
	}

	.group_7 {
		margin-right: 12rpx;
	}

	.space-x-90>view:not(:first-child),
	.space-x-90>text:not(:first-child),
	.space-x-90>image:not(:first-child) {
		margin-left: 26rpx;
	}

	.text_13 {
		flex-shrink: 0;
	}

	.text_14 {
		flex: 1 1 auto;
	}

	.section_8 {
		margin-top: 22rpx;
		padding: 30rpx 40rpx;
		background-color: #ffffff;
		overflow: hidden;
		position: relative;
	}

	.space-y-18>view:not(:first-child),
	.space-y-18>text:not(:first-child),
	.space-y-18>image:not(:first-child) {
		margin-top: 40rpx;
	}

	.group_10 {
		width: 30rpx;
		position: relative;
	}

	.section_9 {
		background-color: #cccccc;
		border-radius: 50%;
		height: 30rpx;
	}

	.view_2 {
		margin-top: 88rpx;
	}

	.view_3 {
		margin-top: 86rpx;
	}

	.section_10 {
		background-color: #cccccc;
		height: 101rpx;
		position: absolute;
		left: 12.5rpx;
		right: 12.5rpx;
		top: 88%;
		transform: translateY(-50%);
	}

	.group_11 {
		margin: 2rpx 0 4rpx 49rpx;
	}

	.text_15 {
		line-height: 29rpx;
	}

	.font_8 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 21.5rpx;
		color: #a6a6a6;
	}

	.text_16 {
		margin-top: 20rpx;
	}

	.text_17 {
		margin-top: 43rpx;
	}

	.text_18 {
		margin-top: 21rpx;
	}

	.text_19 {
		margin-top: 43rpx;
	}

	.group_12 {
		margin: 4rpx 0 7rpx;
	}

	.space-y-88>view:not(:first-child),
	.space-y-88>text:not(:first-child),
	.space-y-88>image:not(:first-child) {
		margin-top: 88rpx;
	}

	.text_20 {
		align-self: center;
	}

	.text_21 {
		align-self: center;
	}

	.text_22 {
		align-self: flex-end;
	}

	.text_23 {
		margin-left: 79rpx;
		align-self: flex-start;
	}

	.section_11 {
		padding: 25rpx 0 24rpx;
		background-color: #ffffff;
		overflow: hidden;
	}

	.text-wrapper {
		padding: 24rpx 0 21rpx;
		background-color: #f47669;
		border-radius: 10rpx;
		overflow: hidden;
		width: 584rpx;
	}

	.text_24 {
		color: #ffffff;
	}
</style>
