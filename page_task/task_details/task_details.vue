<template>
	<view class="flex-col page">
		<view class="flex-col space-y-59 group">
			<view class="flex-col">
				<view class="flex-col space-y-3 section_4">
					<view class="flex-col">
						<view class="flex-row space-x-12">
							<image src="../../static/jinji.png" class="state-img"
								v-if="taskList.taskUrgentDegree === 1"></image>
							<image src="/static/youxian.png" class="state-img" v-if="taskList.taskUrgentDegree === 2">
							</image>
							<image src="../../static/jinji.png" class="state-img"
								v-if="taskList.taskUrgentDegree === 3"></image>

							<text class="font_1">{{taskList.taskName}}</text>
						</view>
						<text class="font_2 text_5"
							v-if="taskList.taskDegreeOfCompletion === 1 && taskList.isDistribute === 1">已完成</text>
						<text class="font_2 text_5"
							v-if="taskList.taskDegreeOfCompletion === 0 && taskList.isDistribute === 1">未完成</text>
						<text class="font_2 text_5" v-if="taskList.isDistribute === 0">未下发</text>
					</view>
					<view class="flex-row space-x-6">
						<text class="font_3">发布时间：{{taskList.createTime}}</text>
					</view>
				</view>
				<view class="flex-row justify-between section_5">
					<text class="font_5 text_8">内容</text>
					<text class="font_4 text_7">{{taskList.taskContent}}</text>
				</view>
				<view class="flex-col space-y-26 section_6">
					<view class="flex-row space-x-60">
						<text class="font_5">执行人</text>
						<view class="flex-row">
							<text class="font_9">{{taskList.taskUserName}}</text>
						</view>
					</view>
					<view class="flex-row">
						<text class="font_5">开始时间</text>
						<text class="font_6 text_9">{{taskList.taskStartTime}}</text>
					</view>
					<view class="flex-row">
						<text class="font_5">结束时间</text>
						<text class="font_6 text_10">{{taskList.taskEndTime}}</text>
					</view>
					<view class="flex-row space-x-90 group_2">
						<text class="font_5 text_12">备注</text>
						<text class="font_4 text_11">{{taskList.remarks}}</text>
					</view>
				</view>

				<view class="flex-row justify-between section_7">
					<text class="font_5 text_13">反馈</text>

					<view class="text-wrapper_2"
						v-if="temp == 0&&taskList.taskDegreeOfCompletion === 0&&taskList.isDistribute === 1&&isFeedback == false">
						<uni-easyinput :styles="styles" focus maxlength="-1" type="textarea" v-model="feedbackValue"
							:clearable="false" :inputBorder="false"></uni-easyinput>
					</view>


					<view class="feedback-detail" v-if="temp == 1&&taskList.isDistribute === 1">
						<view v-for="(item,i) in feedbackList" :key="i" class="feedback-detail-box">
							<text class="feedback-detail-box-person">{{item.feedbackPerson}}</text>
							<text class="feedback-detail-box-content">{{item.feedbackContent}}</text>
						</view>
					</view>

					<view class="text-wrapper_2"
						v-if="temp == 0&&taskList.taskDegreeOfCompletion === 0&&taskList.isDistribute === 1&&isFeedback">
						<uni-easyinput disabled :styles="styles" type="textarea" :clearable="false"
							:inputBorder="false">
						</uni-easyinput>
					</view>

				</view>
			</view>

			<!-- 			<view v-show="temp == 0 && taskList.taskDegreeOfCompletion === 1 " class="detele-btn"
				@click="deteleTask(taskList.taskId)">
				<view class="detele-text">删除</view>
			</view> -->

			<view class="flex-col items-center section_8"
				v-if="temp == 0&&taskList.taskDegreeOfCompletion === 0&&taskList.isDistribute === 1&& isFeedback == false">
				<view class="flex-col items-center button" @click="feedback()"><text class="font_2 text_15">提交反馈</text>
				</view>
			</view>

			<view class="flex-col items-center section_8"
				v-if="temp == 0&&taskList.taskDegreeOfCompletion === 0&&taskList.isDistribute === 1&&isFeedback">
				<view class="flex-col items-center button" style="background: rgba(247, 182, 112, 0.5);"><text
						class="font_2 text_15">已反馈</text>
				</view>
			</view>

			<view class="flex-col items-center section_8" v-if="taskList.isDistribute === 0">
				<view class="flex-col items-center button1" @click="issued()"><text class="font_2 text_15">下发</text>
				</view>
			</view>

			<view class="flex-row items-center section_8"
				v-if="temp == 1&&taskList.taskDegreeOfCompletion === 0&&taskList.isDistribute === 1&&taskList.isUrge==0">
				<view class="but-complete" @click="complete()"><text class="font_2 text_15">完成</text>
				</view>
				<view class="but-urge" @click="urge()"><text class="font_2 text_15">催办</text>
				</view>
			</view>

			<view class="flex-col items-center section_8"
				v-if="temp == 1&&taskList.taskDegreeOfCompletion === 0&&taskList.isDistribute === 1&&taskList.isUrge==1">
				<view class="flex-col items-center button" @click="feedback()"><text class="font_2 text_15">完成</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		getTaskDetail,
		completeTask,
		urgTesk,
		addTaskBySave,
		sendTemplate,
		getAccessToken,
		getAllUser,
		deteleTask,
		addFeedback,
		getFeedbackList
	} from '@/api/api.js'

	import {
		useCounterStore
	} from '@/stores/counter';
	const counter = useCounterStore();

	export default {
		data() {
			return {
				feedbackValue: "",
				styles: {
					backgroundColor: '#e5e5e580',
				},
				taskList: [],
				//表示从哪个界面跳转过来的
				//0是从我的任务跳转，1是从我创建的跳转
				temp: 0,
				accesstoken: "",
				taskRecipientId: [],
				receiveOpenid: [],
				feedbackList: [],
				isFeedback: false,
			}
		},
		onLoad(option) {
			let that = this
			this.temp = option.temp
			const data = option.taskId
			getTaskDetail(data).then((res) => {
				console.log("任务详情");
				console.log(res);
				this.taskList = res.data

				this.taskRecipientId = this.taskList.taskRecipientId.split(',')
				this.receiveOpenid = this.taskList.copyUserOpenId.split(',')
			})

			getFeedbackList({
				taskIds: option.taskId
			}).then(res => {
				console.log(res);
				this.feedbackList = res.rows

				if (typeof(this.feedbackList.find(item => item.feedbackPerson == counter.userName)) ==
					"undefined") {
					//没有反馈
					that.isFeedback = false
				} else {
					//已经反馈
					that.isFeedback = true
				}
			})
		},
		methods: {
			complete() {
				let that = this

				completeTask(this.taskList.taskId, {
					taskId: that.taskList.taskId
				}).then((res) => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});

					if (res.code == 200) {
						getAccessToken().then((res) => {
							if (res.code == 200) {
								this.accesstoken = res.data.AccessToken

								let time = new Date()

								uni.request({
									url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' +
										that.accesstoken,
									method: "POST",
									data: {
										"touser": that.taskList.openId,
										"template_id": "SNJeNM9cnKBLgp5tqS805wEfvspqpG3aet5rezIuhOM",
										"page": "index",
										"miniprogram_state": "trial",
										"lang": "zh_CN",
										"data": {
											"thing1": {
												"value": that.taskList.taskName
											},
											"thing2": {
												"value": that.taskList.taskContent
											},
											"name3": {
												"value": counter.userName
											},
											"date4": {
												"value": time.toLocaleString()
											}
										}
									},
									success: (res) => {
										console.log(res);
									}
								});
							}
						})

						uni.redirectTo({
							url: '/page_task/my-create/my-create'
						});
					}
				})
			},
			feedback() {
				let that = this
				addFeedback({
					taskIds: that.taskList.taskId,
					feedbackUserId: counter.userId,
					feedbackContent: that.feedbackValue,
					feedbackPerson: counter.userName
				}).then((res) => {
					if (res.code == 200) {
						uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: 'success',
							success: () => {
								if (that.temp == 0) {
									uni.redirectTo({
										url: '/page_task/my-task/my-task'
									});
								} else {
									uni.redirectTo({
										url: '/page_task//my-create/my-create'
									});
								}
							}
						});
					} else {
						uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: 'error'
						});
					}

				})
			},
			urge() {
				let that = this

				//用userid获取openid
				getAllUser({
					pageNum: 1,
					pageSize: 1000
				}).then((res) => {
					let openIdList = []
					for (let i = 0; i < that.taskRecipientId.length; i++) {
						res.rows.forEach(function(item, index, array) {
							if (item.userId == that.taskRecipientId[i]) {
								openIdList.push(item.openId)
							}
						})
					}

					urgTesk(this.taskList.taskId).then((res) => {

						if (res.code == 200) {
							uni.showToast({
								title: res.msg,
								icon: 'success',
							})

							getAccessToken().then((res) => {
								if (res.code == 200) {
									this.accesstoken = res.data.AccessToken

									for (let z = 0; z < openIdList.length; z++) {

										uni.request({
											url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' +
												that.accesstoken,
											method: "POST",
											data: {
												"touser": openIdList[z],
												"template_id": "5nZQIY8akZCBjXuhQH7Nuy4oJSFiXLJgfY2EUL-gZT8",
												"page": "index",
												"miniprogram_state": "trial",
												"lang": "zh_CN",
												"data": {
													"thing2": {
														"value": that.taskList.taskName
													},
													"name1": {
														"value": counter.userName
													},
													"date3": {
														"value": that.taskList.taskEndTime
													}
												}
											},
											success: (res) => {
												console.log(res);
											}
										});
									}

									uni.redirectTo({
										url: '/page_task/my-task/my-task'
									});
								}
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'error',
							})
						}
					})
				})
			},
			issued() {
				let that = this

				addTaskBySave(that.taskList.taskId).then((res) => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
					if (res.code == 200) {
						uni.redirectTo({
							url: '/page_task/my-create/my-create'
						});

						//发送订阅消息
						let temp = ""
						if (that.taskList.taskUrgentDegree === 1) {
							temp = "紧急"
						}
						if (that.taskList.taskUrgentDegree === 2) {
							temp = "优先"
						}
						if (that.taskList.taskUrgentDegree === 3) {
							temp = "常态"
						}

						getAccessToken().then((res) => {
							if (res.code == 200) {
								that.accesstoken = res.data.AccessToken

								//发送订阅消息
								for (let i = 0; i < that.receiveOpenid.length; i++) {
									uni.request({
										url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' +
											that.accesstoken,
										method: "POST",
										data: {
											"touser": that.receiveOpenid[i],
											"template_id": "YPECEtpC0r020rqGPrhsZLGy1h4yAV46y0zkutqic0o",
											"page": "pages/index/index",
											"miniprogram_state": "trial",
											"lang": "zh_CN",
											"data": {
												"thing1": {
													"value": that.taskList.taskName
												},
												"thing13": {
													"value": temp
												},
												"thing23": {
													"value": that.taskList.taskUserName
												},
												"time12": {
													"value": that.taskList.taskStartTime
												},
												"time14": {
													"value": that.taskList.taskEndTime
												}
											}
										},
										success: (res) => {
											console.log(res);
										}
									});
								}

								//请求授权发送任务完成通知订阅消息
								uni.requestSubscribeMessage({
									tmplIds: ['SNJeNM9cnKBLgp5tqS805wEfvspqpG3aet5rezIuhOM'],
									success(res) {},
									fail(res) {}
								})

								uni.reLaunch({
									url: '/page_task/my-create/my-create'
								});
							} else {

							}
						})
					}
				})
			},
			getAccess() {

			},
			deteleTask(id) {
				deteleTask(id).then((res) => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					if (res.code == 200) {
						uni.redirectTo({
							url: ''
						})
					}
				})
			}
		}
	}
</script>

<style>
	.detele-btn {
		width: 710rpx;
		height: 75rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		margin: auto;
	}

	.detele-text {
		color: #F47669;
		font-size: 28rpx;
		line-height: 75rpx;
	}

	.uni-easyinput__content-textarea {
		margin-left: 18rpx !important;
	}

	page {
		background: #F5F5F5;
	}

	.state-img {
		width: 56rpx;
		height: 32rpx;
	}

	.feedback-input {
		border: 1px solid red;
		background-color: #f47669;
		width: 513rpx;
		height: 206rpx;
		min-height: 206rpx;
	}

	.group {
		flex: 1 1 auto;
		overflow-y: auto;
	}

	.feedback-detail {
		width: 520rpx;
	}

	.feedback-detail-box {
		width: 100%;
		background-color: rgba(229, 229, 229, 0.5);
		border-radius: 10rpx;
	}

	.feedback-detail-box-person {
		margin-left: 22rpx;
		margin-top: 14rpx;
		font-size: 32rpx;
		display: inline-block;
	}

	.feedback-detail-box-content {
		display: inline-block;
		font-size: 28rpx;
		margin-left: 22rpx;
		margin-top: 13rpx;
		width: 473rpx;
		margin-bottom: 28rpx;
	}

	.but-complete {
		margin-left: 52rpx;
		width: 295rpx;
		height: 71rpx;
		border-radius: 10rpx;
		background: rgba(41, 115, 255, 1);
		line-height: 71rpx;
		text-align: center;
	}

	.but-urge {
		margin-left: 56rpx;
		width: 295rpx;
		height: 71rpx;
		border-radius: 10rpx;
		background: rgba(247, 182, 112, 1);
		line-height: 71rpx;
		text-align: center;
	}


	.space-y-59>view:not(:first-child),
	.space-y-59>text:not(:first-child),
	.space-y-59>image:not(:first-child) {
		margin-top: 59rpx;
	}

	.section_4 {
		padding: 38rpx 35rpx 44rpx;
		background-color: #ffffff;
		overflow: hidden;
	}

	.space-y-3>view:not(:first-child),
	.space-y-3>text:not(:first-child),
	.space-y-3>image:not(:first-child) {
		margin-top: 3rpx;
	}

	.space-x-12>view:not(:first-child),
	.space-x-12>text:not(:first-child),
	.space-x-12>image:not(:first-child) {
		margin-left: 12rpx;
	}

	.text-wrapper {
		padding: 8rpx 0 6rpx;
		background-color: #f47669;
		border-radius: 5rpx;
		overflow: hidden;
		width: 56rpx;
		height: 32rpx;
	}

	.text_4 {
		color: #ffffff;
		font-size: 20rpx;
		font-family: SourceHanSansCN;
		font-weight: 300;
		line-height: 18rpx;
	}

	.font_1 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		line-height: 29.5rpx;
		color: #000000;
	}

	.font_9 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		color: #000000;
		width: 524rpx;
	}

	.font_2 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 26rpx;
	}

	.text_5 {
		margin-right: 16rpx;
		align-self: flex-end;
		color: #000000;
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

	.text_6 {
		margin-top: 2rpx;
	}

	.section_5 {
		margin-top: 18rpx;
		padding: 36rpx 39rpx 57rpx;
		background-color: #ffffff;
		/* overflow: hidden; */
	}

	.font_5 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		color: #808080;
	}

	.text_8 {
		margin-top: 3rpx;
	}

	.font_4 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		color: #000000;
	}

	.zhixin {
		margin-left: 22rpx;
		width: 300rpx;
		border: 1px solid red;
	}

	.text_7 {
		margin-right: 14rpx;
		width: 506rpx;
		word-wrap: break-word;
		/* word-break: break-all; */
		/* overflow: hidden; */
	}

	.section_6 {
		margin-top: 23rpx;
		padding: 29rpx 36rpx;
		background-color: #ffffff;
		overflow: hidden;
	}

	.space-y-26>view:not(:first-child),
	.space-y-26>text:not(:first-child),
	.space-y-26>image:not(:first-child) {
		margin-top: 12rpx;
	}

	.space-x-60>view:not(:first-child),
	.space-x-60>text:not(:first-child),
	.space-x-60>image:not(:first-child) {
		margin-left: 60rpx;
	}

	.space-x-22>view:not(:first-child),
	.space-x-22>text:not(:first-child),
	.space-x-22>image:not(:first-child) {
		margin-left: 22rpx;
	}

	.font_6 {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		color: #000000;
	}

	.text_9 {
		margin: 3rpx 0 2rpx 26rpx;
	}

	.text_10 {
		margin: 3rpx 0 2rpx 26rpx;
	}

	.group_2 {
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

	.text_13 {
		margin-top: 10rpx;
	}

	.text-wrapper_2 {
		margin-right: 9rpx;
		width: 513rpx;
	}

	.text_14 {
		margin-left: 40rpx;
		line-height: 26rpx;
	}

	.section_8 {
		width: 100%;
		padding: 25rpx 0 24rpx;
		background-color: #ffffff;
		overflow: hidden;
		position: absolute;
		bottom: 0px;
	}

	.button {
		padding: 24rpx 0 21rpx;
		background-color: #2973FF;
		border-radius: 10rpx;
		overflow: hidden;
		width: 584rpx;
	}

	.button1 {
		padding: 24rpx 0 21rpx;
		background-color: #2973FF;
		border-radius: 10rpx;
		overflow: hidden;
		width: 584rpx;
	}

	.text_15 {
		color: #ffffff;
	}
</style>
