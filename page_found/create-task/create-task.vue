<template>
	<view class="flex-col page">
		<view v-show="showIndexedlist">
			<user-list @getAllUserId='getAllUserId' @getAllUserName='getAllUserName'
				@getAllUserOpenid='getAllUserOpenid' :user='userList' :userList="list">
			</user-list>
		</view>
		<view v-show="showIndexedlist1">
			<user-list @getAllUserId='getAllUserId1' @getAllUserOpenid='getAllCopyUserOpenid' :user='userList'
				:userList="list">
			</user-list>
		</view>
		<view class="flex-col group" v-show="showBox">
			<view class="flex-col space-y-20 group_2">
				<view class="flex-col section_4">
					<text class="font_1 text_3">标题</text>
					<view class="flex-col items-start text-wrapper">
						<input type="text" v-model="titleValue" />
					</view>
					<text class="font_1 text_5">开始时间</text>
					<view class="flex-row space-x-10 section_5">
						<uni-datetime-picker type="datetime" :border="false" v-model="beginTime" />
					</view>
					<text class="font_1 text_6">结束时间</text>
					<view class="flex-row space-x-10 section_5">
						<uni-datetime-picker type="datetime" :border="false" v-model="endTime" />
					</view>
					<!-- <text class="font_1 text_7">任务结束前一天发送提醒</text> -->

					<!-- 					<view class="flex-col items-start text-wrapper_2">
						<uni-data-select v-model="value" style="width: 100%;" :localdata="range" @change="change"
							:clear="false">
						</uni-data-select>
					</view> -->

					<text class="font_1 text_9">内容</text>
					<view class="flex-col text-wrapper_3">
						<uni-easyinput maxlength="-1" type="textarea" v-model="contentValue" :clearable="false"
							:inputBorder="false"></uni-easyinput>
					</view>
					<text class="font_1 text_11">等级</text>
					<view class="flex-row space-x-30 group_3">
						<view class="flex-col items-center" :class="urgentStyle" @click="gradeSelect(1)">
							<text class="font_3 text_12">紧急</text>
						</view>
						<view class="flex-col items-center" :class="priorStyle" @click="gradeSelect(2)"><text
								class="font_3">优先</text></view>
						<view class="flex-col items-center" :class="usualStyle" @click="gradeSelect(3)"><text
								class="font_3">常态</text>
						</view>
					</view>
				</view>
				<view class="flex-col space-y-23 section_6">
					<text class="font_1 text_13">执行人</text>
					<view class="flex-col group_4">
						<image src="/static/line.png" mode="" class="line-img"></image>
						<view class="flex-row justify-between">
							<view class="flex-col group_5">
								<view class="flex-row space-x-30">
									<!-- <view class="section_7"></view> -->
									<text class="font_1">执行人</text>
								</view>
								<view class="flex-row space-x-40">
									<!-- <view class="section_8"></view> -->
									<text class="font_4 text_14">{{impleNum}}人执行</text>
								</view>
							</view>
							<image class="image_7"
								src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/51ae67e043a7fbf6a79fbbccf4d45b17.png"
								@click="chooseImple('执行')" />
						</view>

						<view class="flex-row justify-between" style="margin-top: 35rpx;">
							<view class="flex-col group_5">
								<view class="flex-row space-x-30">
									<!-- <view class="section_7"></view> -->
									<text class="font_1">抄送人</text>
								</view>
								<view class="flex-row space-x-40">
									<text class="font_4 text_14">{{copyNum}}人抄送</text>
								</view>
							</view>
							<image class="image_7"
								src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/51ae67e043a7fbf6a79fbbccf4d45b17.png"
								@click="chooseImple('抄送')" />
						</view>
					</view>
				</view>

				<view class="flex-col space-y-28 section_9">
					<text class="font_1 text_16">备注</text>
					<view class="flex-col items-start text-wrapper_7">
						<uni-easyinput maxlength="-1" type="textarea" v-model="remarksValue" :clearable="false"
							:inputBorder="false"></uni-easyinput>
					</view>
				</view>
			</view>
			<view class="flex-row justify-between section_10">
				<view class="flex-col items-center text-wrapper_8" @click="addTask"><text class="font_3">下发</text>
				</view>

				<view class="flex-col items-center text-wrapper_9" @click="saveTask"><text
						class="font_1 text_18">保存</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getAllUser,
		addTask,
		saveTask,
		sendTemplate,
		getAccessToken,
		getMyCreateTask
	} from "@/api/api.js"

	import {
		useCounterStore
	} from '@/stores/counter';
	const counter = useCounterStore();

	export default {
		data() {
			return {
				showIndexedlist: false,
				showIndexedlist1: false,
				showBox: true,
				userList: [],
				allUserList: [],
				titleValue: "", //标题
				contentValue: "", //内容
				beginTime: '', //开始时间
				endTime: '', //结束时间
				remarksValue: '', //备注
				grade: 0, //等级
				priorStyle: 'text-wrapper_5',
				value: 0,
				urgentStyle: "text-wrapper_4",
				usualStyle: "text-wrapper_6",
				range: [{
						value: 0,
						text: "是"
					},
					{
						value: 1,
						text: "否"
					}
				],
				impleNum: 0,
				copyNum: 0,
				allSelectUserId: "",
				allSelectUserName: "",
				allSelectUserOpenId: [],
				allSelectUserId1: "",
				isSendInfo: 1,
				list: [{
					"letter": "",
					"data": []
				}],
				accesstoken: ""
			}
		},
		onLoad() {
			getAllUser({
				pageNum: 1,
				pageSize: 1000
			}).then((res) => {
				let userNameList = []
				this.userList = res.rows;
				this.userList.forEach(function(item, index, array) {
					userNameList.push(item.userName)
				});
				this.list[0].data = userNameList
			})
		},
		methods: {
			//是否发送提醒
			change(e) {
				this.isSendInfo = e
			},
			gradeSelect(value) {
				this.grade = value;
				if (this.grade == 1) {
					this.urgentStyle = "text-wrapper_4_choose"
					this.priorStyle = "text-wrapper_5"
					this.usualStyle = "text-wrapper_6"
				} else if (this.grade == 2) {
					this.priorStyle = "text-wrapper_5_choose"
					this.urgentStyle = "text-wrapper_4"
					this.usualStyle = "text-wrapper_6"
				} else {
					this.usualStyle = "text-wrapper_6_choose"
					this.urgentStyle = "text-wrapper_4"
					this.priorStyle = "text-wrapper_5"
				}
			},
			chooseImple(value) {
				if (value == '执行') {
					this.showIndexedlist = true
					this.showBox = false
				} else {
					this.showIndexedlist1 = true
					this.showBox = false
				}
			},
			getNowTime() {
				var date = new Date(); //年 getFullYear()：四位数字返回年份
				var year = date.getFullYear(); //getFullYear()代替getYear()
				var month = date.getMonth() + 1; //月 getMonth()：0 ~ 11
				var day = date.getDate(); //日 getDate()：(1 ~ 31)
				var hour = date.getHours(); //时 getHours()：(0 ~ 23)
				var minute = date.getMinutes(); //分 getMinutes()： (0 ~ 59)
				var second = date.getSeconds(); //秒 getSeconds()：(0 ~ 59)
				var time = year + '-' + this.addZero(month) + '-' + this.addZero(day) + ' ' + this.addZero(hour) + ':' +
					this.addZero(minute) + ':' + this.addZero(second);
				return time;
			},
			//小于10的拼接上0字符串
			addZero(s) {
				return s < 10 ? ('0' + s) : s;
			},
			addTask() {
				let that = this
				//添加任务
				addTask({
					createBy: counter.userName,
					createTime: this.getNowTime(),
					remarks: this.remarksValue,
					taskContent: this.contentValue,
					taskEndTime: this.endTime,
					taskName: this.titleValue,
					taskRecipientId: this.allSelectUserId,
					taskStartTime: this.beginTime,
					taskUrgentDegree: this.grade,
				}).then((res) => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});

					if (res.code === 200) {
						//获取access_token
						this.getAccess()
					}
				})
			},
			getAccess() {
				let that = this

				let temp = ""
				if (this.grade === 1) {
					temp = "紧急"
				}
				if (this.grade === 2) {
					temp = "优先"
				}
				if (this.grade === 3) {
					temp = "常态"
				}

				getAccessToken().then((res) => {
					if (res.code == 200) {
						this.accesstoken = res.data.AccessToken

						//发送订阅消息
						for (let i = 0; i < that.allSelectUserOpenId.length; i++) {
							uni.request({
								url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' +
									that.accesstoken,
								method: "POST",
								data: {
									"touser": that.allSelectUserOpenId[i],
									"template_id": "YPECEtpC0r020rqGPrhsZLGy1h4yAV46y0zkutqic0o",
									"page": "pages/index/index",
									"miniprogram_state": "trial",
									"lang": "zh_CN",
									"data": {
										"thing1": {
											"value": that.titleValue
										},
										"thing13": {
											"value": temp
										},
										"thing23": {
											"value": that.allSelectUserName
										},
										"time12": {
											"value": that.beginTime
										},
										"time14": {
											"value": that.endTime
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
			},
			saveTask() {
				let openid = this.allSelectUserOpenId.toString()
				let that = this

				getMyCreateTask({
					pageNum: 1,
					pageSize: 1000
				}).then((res) => {
					let arr = []
					res.rows.forEach(function(item, index, array) {
						if (item.isDistribute == 0) {
							arr.push(item)
						}
					});
					if (arr.length > 3) {
						uni.showToast({
							title: "保存的任务不能大于3个",
							icon: "none"
						})
					} else {
						saveTask({
							createBy: counter.userName,
							createTime: that.getNowTime(),
							remarks: that.remarksValue,
							taskContent: that.contentValue,
							taskEndTime: that.endTime,
							taskName: that.titleValue,
							taskRecipientId: that.allSelectUserId,
							taskStartTime: that.beginTime,
							taskUrgentDegree: that.grade,
							copyUserOpenId: openid,
						}).then((res) => {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 2000,
								complete: () => {
									if (res.code == 200) {
										uni.switchTab({
											url: '/page_task/my-create/my-create'
										})
									}
								}
							});
						})
					}
				})
			},
			getAllUserId(e) {
				this.allSelectUserId = e.join();
				console.log(this.allSelectUserId);
				this.impleNum = e.length
				this.showIndexedlist = false
				this.showBox = true
			},
			getAllUserName(e) {
				this.allSelectUserName = e.join();
			},
			//获取执行人openid
			getAllUserOpenid(e) {
				var arr = [];
				for (let i in e) {
					arr.push(e[i])
				}
				this.allSelectUserOpenId = arr;
			},
			//获取抄送人openid
			getAllCopyUserOpenid(e) {
				var arr = [];
				for (let i in e) {
					arr.push(e[i])
				}
				this.allSelectUserOpenId.push(arr)
			},
			getAllUserId1(e) {
				this.allSelectUserId1 = e.join();
				this.copyNum = e.length
				this.showIndexedlist1 = false
				this.showBox = true
			}
		}
	}
</script>

<style>
	.line-img {
		width: 20rpx;
		height: 139rpx;
		position: absolute;
		top: 5rpx;
	}

	.determine {
		width: 100%;
		height: 120rpx;
		background: rgba(255, 255, 255, 1);
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: 0rpx;
	}

	.determine-bnt {
		left: 83rpx;
		top: 25rpx;
		width: 584rpx;
		height: 71rpx;
		border-radius: 10rpx;
		background: rgba(41, 115, 255, 1);
		text-align: center;
		line-height: 71rpx;
	}

	.determine-text {
		left: 264rpx;
		top: 15rpx;
		width: 56rpx;
		height: 41rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
	}

	page {
		background: #F5F5F5;
	}

	.uni-select {
		border: 0rpx !important;
	}

	.uni-easyinput {
		padding: 11rpx 19rpx;
	}

	.uni-date-x {
		background: rgba(229, 229, 229, 0.4) !important;
		color: #000000 !important;
	}

	.page {
		background-color: #f5f5f5;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;
		margin-top: 27rpx;
	}

	.group {
		padding-bottom: 120rpx;
		position: relative;
	}

	.space-y-20>view:not(:first-child),
	.space-y-20>text:not(:first-child),
	.space-y-20>image:not(:first-child) {
		margin-top: 20rpx;
	}

	.group_2 {
		padding: 0 18rpx 34rpx;
	}

	.section_4 {
		padding: 34rpx 32rpx 31rpx;
		background-color: #ffffff;
		border-radius: 15rpx;
		overflow: hidden;
	}

	.font_1 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 26rpx;
		color: #000000;
	}

	.text_3 {
		margin-left: 14rpx;
		align-self: flex-start;
	}

	input {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		font-weight: 400;
		width: 100%;
	}

	.text-wrapper {
		margin-top: 28rpx;
		padding: 11rpx 0 11rpx 20rpx;
		background-color: #e5e5e566;
		border-radius: 10rpx;
		overflow: hidden;
		padding-right: 10rpx;
	}

	.text_5 {
		margin-left: 14rpx;
		margin-top: 38rpx;
		align-self: flex-start;
	}

	.section_5 {
		margin-top: 28rpx;
		overflow: hidden;
	}

	.font_2 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 21.5rpx;
		color: #000000;
	}

	.text_6 {
		margin-left: 14rpx;
		margin-top: 36rpx;
		align-self: flex-start;
	}

	.text_7 {
		margin-left: 14rpx;
		margin-top: 36rpx;
		align-self: flex-start;
	}

	.text-wrapper_2 {
		margin-top: 28rpx;
		background-color: #e5e5e566;
		border-radius: 10rpx;
		padding-right: 40rpx;
	}

	.text_8 {
		margin-left: 21rpx;
		line-height: 24.5rpx;
	}

	.text_9 {
		margin-left: 16rpx;
		margin-top: 36rpx;
		align-self: flex-start;
	}

	.uni-easyinput__content-textarea {
		margin: 6rpx !important;
		min-height: 204rpx !important;
	}

	.text-wrapper_3 {
		margin-top: 28rpx;
		background-color: #e5e5e566;
		border-radius: 10rpx;
		overflow: hidden;
		height: 204rpx;
	}

	.text_10 {
		margin-left: 20rpx;
		margin-right: 26rpx;
		line-height: 34rpx;
	}

	.text_11 {
		margin-left: 14rpx;
		margin-top: 34rpx;
		align-self: flex-start;
	}

	.space-x-30>view:not(:first-child),
	.space-x-30>text:not(:first-child),
	.space-x-30>image:not(:first-child) {
		margin-left: 30rpx;
	}

	.group_3 {
		margin-top: 25rpx;
	}

	.text-wrapper_4 {
		padding: 20rpx 0 17rpx;
		flex: 1 1 196rpx;
		background-color: #f4766980;
		border-radius: 10rpx;
		overflow: hidden;
		height: 62rpx;
	}

	.text-wrapper_4_choose {
		padding: 20rpx 0 17rpx;
		flex: 1 1 196rpx;
		background-color: #f4776a;
		border-radius: 10rpx;
		overflow: hidden;
		height: 62rpx;
	}

	.font_3 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 26rpx;
		color: #ffffff;
	}

	.text_12 {
		line-height: 25.5rpx;
	}

	.text-wrapper_5 {
		padding: 20rpx 0 16rpx;
		flex: 1 1 196rpx;
		background: rgba(247, 182, 112, 0.5);
		border-radius: 10rpx;
		overflow: hidden;
		height: 62rpx;
	}

	.text-wrapper_5_choose {
		padding: 20rpx 0 16rpx;
		flex: 1 1 196rpx;
		background-color: #F7B670;
		border-radius: 10rpx;
		overflow: hidden;
		height: 62rpx;
	}

	.text-wrapper_6 {
		padding: 20rpx 0 17rpx;
		flex: 1 1 196rpx;
		background: rgba(165, 214, 63, 0.5);
		border-radius: 10rpx;
		overflow: hidden;
		height: 62rpx;
	}

	.text-wrapper_6_choose {
		padding: 20rpx 0 17rpx;
		flex: 1 1 196rpx;
		background-color: #a5d63f;
		border-radius: 10rpx;
		overflow: hidden;
		height: 62rpx;
	}

	.space-y-23>view:not(:first-child),
	.space-y-23>text:not(:first-child),
	.space-y-23>image:not(:first-child) {
		margin-top: 23rpx;
	}

	.section_6 {
		padding: 34rpx 45rpx 38rpx;
		background-color: #ffffff;
		border-radius: 15rpx;
		overflow: hidden;
	}

	.text_13 {
		align-self: flex-start;
	}

	.group_4 {
		padding: 0 32rpx;
		height: 188rpx;
		position: relative;
	}

	.group_5 {
		margin-top: 4rpx;
		margin-left: 55rpx;
	}

	.section_7 {
		margin-bottom: 4rpx;
		flex-shrink: 0;
		border-radius: 50%;
		width: 20rpx;
		height: 20rpx;
		border: solid 3rpx #cccccc;
	}

	.space-x-40>view:not(:first-child),
	.space-x-40>text:not(:first-child),
	.space-x-40>image:not(:first-child) {
		margin-left: 40rpx;
	}

	.section_8 {
		flex-shrink: 0;
		background-color: #cccccc;
		width: 3rpx;
		height: 101rpx;
	}

	.font_4 {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
		line-height: 21.5rpx;
		color: #a6a6a6;
	}

	.text_14 {
		margin-top: 26rpx;
		line-height: 22rpx;
	}

	.image_7 {
		margin-right: 8rpx;
		border-radius: 5rpx;
		width: 45rpx;
		height: 45rpx;
	}

	.group_7 {
		align-self: center;
	}

	.text_15 {
		margin-left: 51rpx;
		margin-top: 6rpx;
		align-self: flex-start;
		line-height: 22rpx;
	}

	.space-y-28>view:not(:first-child),
	.space-y-28>text:not(:first-child),
	.space-y-28>image:not(:first-child) {
		margin-top: 28rpx;
	}

	.section_9 {
		padding: 34rpx 32rpx 42rpx;
		background-color: #ffffff;
		border-radius: 15rpx;
		overflow: hidden;
	}

	.text_16 {
		margin-left: 13rpx;
		align-self: flex-start;
	}

	.text-wrapper_7 {
		background-color: #e5e5e566;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.text_17 {
		margin-left: 22rpx;
	}

	.section_10 {
		padding: 24rpx 52rpx;
		background-color: #ffffff;
		overflow: hidden;
		position: absolute;
		left: 0;
		right: 0;
		top: 1861rpx;
	}

	.text-wrapper_8 {
		padding: 24rpx 0 21rpx;
		background-color: #2973ff;
		border-radius: 10rpx;
		overflow: hidden;
		width: 295rpx;
		height: 71rpx;
	}

	.text-wrapper_9 {
		padding: 24rpx 0 22rpx;
		background-color: #e5e5e599;
		border-radius: 10rpx;
		overflow: hidden;
		width: 295rpx;
		height: 71rpx;
	}

	.text_18 {
		color: #2973ff;
	}
</style>
