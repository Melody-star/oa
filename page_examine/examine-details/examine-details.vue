<template>
	<view class="flex-col page">
		<view class="flex-col group_2 space-y-69">
			<view class="flex-col">
				<view class="flex-row justify-between section_4">
					<view class="flex-col space-y-22">
						<text class="font_1 text_3">{{data.title}}</text>
						<view class="flex-row space-x-6">
							<text class="font_3">发布时间：{{data.createTime}}</text>
						</view>
					</view>
					<text class="font_2 text_4" v-if="data.state == '未审批'">未审批</text>
					<text class="font_2 text_4" v-else>已审批</text>
				</view>

				<!-- 				<view class="flex-col section_5">
					<view class="flex-row" v-for="(item,i) in processFormList" :key="i">
						<text class="font_5">{{item.label}}</text>
						<text class="font_6">{{item.defaultValue}}</text>
					</view>
				</view> -->
				<form-data :processFormList="processFormList"></form-data>
				<detail-file v-if="processFileFormList.length != 0" :processFileFormList="processFileFormList">
				</detail-file>

				<view class="flex-row justify-between section_7">
					<text class="font_5">审批意见</text>
					<view class="flex-col items-start text-wrapper">
						<uni-easyinput maxlength="-1" type="textarea" v-model="value" :clearable="false"
							:inputBorder="false"></uni-easyinput>
					</view>
				</view>
				<!-- 				<view class="flex-col items-center text-wrapper_2" @click="deleteExamine"
					v-if="data.finishTime != 'null'"><text class="font_2 text_15">删除</text>
				</view> -->
			</view>

			<view class="flex-row justify-between section_8" v-if="data.state == '未审批'">
				<view class="flex-col items-center text-wrapper_3" @click="agreeExamine"><text
						class="font_2 text_16">批准</text></view>
				<view class="flex-col items-center text-wrapper_4" @click="rejectExamine"><text
						class="text_17">驳回</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		useCounterStore
	} from '@/stores/counter';
	const counter = useCounterStore();

	import {
		skipBacktPage
	} from '../../utils/utils.js'

	import {
		getExamineDetail,
		deleteExamine,
		agreeExamine,
		rejectExamine
	} from '@/api/api.js'

	export default {
		data() {
			return {
				data: {},
				// examineDetail: [{
				// 	assigneeName: ''
				// }],
				/**
				 * 审批意见
				 */
				value: '',
				//表单表头和内容
				processFormList: [],
				processFileFormList: []
			}
		},
		methods: {
			// deleteExamine() {
			// 	deleteExamine({

			// 	}).then((res) => {
			// 		console.log(res);
			// 	})
			// },
			agreeExamine() {
				agreeExamine({
					assignee: counter.userName,
					comment: this.value,
					taskId: this.data.taskId
				}).then((res) => {
					skipBacktPage(res, '/page_examine/my-examine/my-examine')
				})
			},
			rejectExamine() {
				rejectExamine({
					assignee: counter.userName,
					comment: this.value,
					taskId: this.data.taskId
				}).then((res) => {
					skipBacktPage(res, '/page_examine/my-examine/my-examine')
				})
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

				// 提取表单和内容信息
				let arr = res.data.processFormList[0].fields
				arr.forEach(function(item, index, array) {
					let obj = {}

					// 获取文件组件的url
					if (item.__config__.tag == 'el-upload') {
						let arr1 = []
						item.__config__.defaultValue.forEach(function(item, index, array) {

							arr1.push(item.url)
						})
						that.processFileFormList = arr1
					}

					// 获取非文件组件的值和名称
					else {
						obj["defaultValue"] = item.__config__.defaultValue;
						obj["label"] = item.__config__.label;
						that.processFormList.push(obj);
					}
				})
			})
		}
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
	}

	.page {
		margin-top: 2rpx;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;
	}

	.group_2 {
		flex: 1 1 auto;
		overflow-y: auto;
	}

	/* 	.space-y-69>view:not(:first-child),
	.space-y-69>text:not(:first-child),
	.space-y-69>image:not(:first-child) {
		margin-top: 69rpx;
	} */

	.section_4 {
		padding: 40rpx 36rpx 44rpx;
		background-color: #ffffff;
		overflow: hidden;
	}

	.space-y-22>view:not(:first-child),
	.space-y-22>text:not(:first-child),
	.space-y-22>image:not(:first-child) {
		margin-top: 22rpx;
	}

	.font_1 {
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
		line-height: 21.5rpx;
		color: #a6a6a6;
	}

	.text_5 {
		margin-top: 2rpx;
	}

	.font_2 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 26rpx;
	}

	.text_4 {
		margin-right: 16rpx;
		align-self: center;
		color: #000000;
	}

	.section_5 {
		margin-top: 18rpx;
		padding: 36rpx 39rpx 36rpx;
		background-color: #ffffff;
		overflow: hidden;
	}

	.font_5 {
		font-family: SourceHanSansCN;
		color: #808080;
	}

	.text_7 {
		margin-top: 3rpx;
	}

	.font_4 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		line-height: 49rpx;
		color: #000000;
		width: 513rpx;
		margin-left: 92rpx;
	}

	.text_6 {
		margin-right: 14rpx;
		width: 506rpx;
	}

	.section_6 {
		margin-top: 23rpx;
		padding: 39rpx 36rpx 34rpx;
		background-color: #ffffff;
		overflow: hidden;
	}

	.space-y-26>view:not(:first-child),
	.space-y-26>text:not(:first-child),
	.space-y-26>image:not(:first-child) {
		margin-top: 26rpx;
	}

	.group_3 {
		padding: 0 2rpx;
	}

	.space-x-58>view:not(:first-child),
	.space-x-58>text:not(:first-child),
	.space-x-58>image:not(:first-child) {
		margin-left: 58rpx;
	}

	.font_6 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		color: #000000;
		/* margin-left: 26rpx; */
		width: 525rpx;
		word-break: break-all;
	}

	.text_9 {
		margin: 3rpx 0 2rpx 26rpx;
		line-height: 24.5rpx;
	}

	.text_10 {
		margin: 3rpx 0 2rpx 26rpx;
		line-height: 24.5rpx;
	}

	.group_4 {
		margin-right: 12rpx;
	}

	.space-x-90>view:not(:first-child),
	.space-x-90>text:not(:first-child),
	.space-x-90>image:not(:first-child) {
		margin-left: 90rpx;
	}

	.text_12 {
		margin-top: 3rpx;
		flex-shrink: 0;
	}

	.text_11 {
		flex: 1 1 auto;
	}

	.section_7 {
		margin-top: 23rpx;
		padding: 29rpx 38rpx 55rpx;
		background-color: #ffffff;
		overflow: hidden;
	}

	.text-wrapper {
		margin-right: 9rpx;
		padding-left: 20rpx;
		background-color: #e5e5e580;
		border-radius: 10rpx;
		overflow: hidden;
		width: 513rpx;
		height: 206rpx;
	}

	.text_14 {
		margin-left: 40rpx;
		color: #a6a6a6;
	}

	.text-wrapper_2 {
		margin: 30rpx 20rpx 0;
		padding: 34rpx 0 32rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		overflow: hidden;
		margin-bottom: 30rpx;
	}

	.text_15 {
		color: #f47669;
	}

	.section_8 {
		padding: 24rpx 52rpx;
		background-color: #ffffff;
		overflow: hidden;
		position: absolute;
		bottom: 0px;
		width: 100%;
	}

	.text-wrapper_3 {
		padding: 24rpx 0 22rpx;
		background-color: #a4d53f;
		border-radius: 10rpx;
		overflow: hidden;
		width: 295rpx;
		height: 71rpx;
	}

	.text_16 {
		color: #ffffff;
	}

	.text-wrapper_4 {
		padding: 24rpx 0 22rpx;
		background-color: #f47669;
		border-radius: 10rpx;
		overflow: hidden;
		width: 295rpx;
		height: 71rpx;
	}

	.text_17 {
		color: #ffffff;
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 25rpx;
	}

	.section_6>view {
		margin-top: 10px;
	}
</style>
