<template>
	<view class="flex-col page">
		<view class="flex-col space-y-79 section">
			<text class="text">Hello，{{piniaInf.nickName}}</text>
			<view class="flex-row">
				<view class="flex-col items-center space-y-26 equal-division-item group">
					<text class="font_1">{{myTaskList.length}}</text>
					<text class="font_2">待办事项</text>
				</view>
				<view class="flex-col items-center space-y-26 equal-division-item group_2">
					<text class="font_1">{{myExamineNum}}</text>
					<text class="font_2">申请审批</text>
				</view>
				<view class="flex-col items-center space-y-26 equal-division-item group_3">
					<text class="font_1">{{warningList.length}}</text>
					<text class="font_2">超时预警</text>
				</view>
				<view class="flex-col items-center space-y-26 equal-division-item group_4">
					<text class="font_1">{{myCopy.length}}</text>
					<text class="font_2">抄送我的</text>
				</view>
			</view>
		</view>
		<view class="flex-col group_5">
			<view class="flex-row equal-division">
				<navigator url="../../page_task/index/index" hover-class="none"
					class="flex-col items-center space-y-20 equal-division-item group_6">
					<image class="image"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/80eabf240f4b4ec8563745a8ba9bca15.png" />
					<text class="font_3">任务</text>
				</navigator>
				<navigator url="../../page_examine/index/index" hover-class="none"
					class="flex-col items-center space-y-20 equal-division-item group_7">
					<image class="image"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16668670728436102262.png" />
					<text class="font_3">审批</text>
				</navigator>
				<navigator url="../../page_found/index/index" hover-class="none"
					class="flex-col items-center space-y-20 equal-division-item group_8">
					<image class="image"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/6e45bcd47f784a3874ebf9e77a9be181.png" />
					<text class="font_3">新建</text>
				</navigator>
				<view class="flex-col items-center space-y-20 equal-division-item group_9" @click="toManage()">
					<image class="image"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16668670728414289989.png" />
					<text class="font_3">管理</text>
				</view>
			</view>
			<view class="flex-col space-y-30 group_10">
				<view class="flex-row justify-between">
					<text class="text_2">通知公告</text>
					<view class="flex-row space-x-6 group_11" @click="updataNotice()">
						<image class="image_2"
							src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16668670728361728473.png" />
						<text class="font_4 text_3">刷新</text>
					</view>
				</view>
				<view class="flex-col">

					<view class="flex-col space-y-22 list-item" :key="i" v-for="(item, i) in noticeList"
						@click="gotoDetail(item)" v-if="noticeList.length != 0">
						<view class="flex-row justify-between">
							<text class="font_4 text_4">{{item.noticeTitle}}</text>
							<text class="font_5 text_5">更多 &gt;&gt;</text>
						</view>
						<view class="flex-row space-x-8">
							<text class="font_6">{{item.createTime}}</text>
						</view>
					</view>

					<view v-else>
						<image class="icon-nothing" src="/static/icon-nothing.png" mode="widthFix">
						</image>
						<view class="text-nothing">暂无公告</view>
					</view>
				</view>
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
		getUserInfo,
		getNotice,
		getMyCreateExamine,
		getMyTask,
		getCopyExamine,
		getCopyTesk,
	} from '@/api/api.js'

	export default {
		data() {
			return {
				// 公告列表
				noticeList: [],
				// vuex
				piniaInf: counter,
				// 我的任务列表
				myTaskList: [],
				// 我审批的数量
				myExamineNum: 0,
				// 抄送我的列表
				myCopy: [],
				// 超时预警列表
				warningList: []
			};
		},
		onShow() {
			let that = this

			//获取本地的token值
			uni.getStorage({
				key: "token",

				//没有获取到就重新登录
				fail: function(res) {
					uni.redirectTo({
						url: '/page_login/login/login'
					});
				},
				success: function(res) {

					//保存到vuex中
					counter.token = res.data

					//获取用户信息
					getUserInfo(true).then((res) => {
						if (res.code == 401) {
							uni.showToast({
								title: "登录失效，请重新登录！",
								icon: 'none',
								success: function(res) {
									uni.redirectTo({
										url: '/page_login/login/login'
									});
								}
							});
						} else {
							counter.admin = res.data.user.admin;
							counter.nickName = res.data.user.nickName;
							counter.avatar = res.data.user.avatar;
							counter.userId = res.data.user.userId;
							counter.userName = res.data.user.userName;
							counter.openId = res.data.user.openId;

							//获取所有抄送我的审批
							getCopyExamine({
								pageNum: 1,
								pageSize: 1000
							}).then((res) => {
								that.myCopy = res.rows

								//获取所有抄送我的任务
								getCopyTesk().then((res) => {
									that.myCopy = that.myCopy.concat(res.rows)

									//获取所有我创建的审批列表
									getMyCreateExamine({
										pageNum: 1,
										pageSize: 1000
									}).then((res) => {
										let temp = res.rows
											.filter(item => item
												.finishTime ==
												null)

										that.myExamineNum = temp.length

										//获取所有我代办的任务
										getMyTask({
											pageNum: 1,
											pageSize: 1000
										}).then((res) => {
											if (res.code != 200) {
												uni.showToast({
													icon: 'none',
													title: res
														.msg
												})
											} else {
												that.myTaskList = res
													.rows
													.filter(item =>
														item
														.taskDegreeOfCompletion ==
														0)

												//筛选即将超时的任务
												that.earlyWarning()

												//获取公告列表
												that.updataNotice();

												//订阅消息
												that.subscribeMsg();
											}

										})
									})
								})
							})
						}
					})
				}
			})
		},
		methods: {
			toManage() {
				if (!counter.admin) {
					uni.showToast({
						title: '无权限',
						duration: 2000,
						icon: 'none'
					});
				} else {
					uni.navigateTo({
						url: '../../page_manage/index/index'
					});
				}
			},
			updataNotice() {
				getNotice().then((res) => {
					this.noticeList = res.rows.sort(function(a, b) {
						return b.createTime < a.createTime ? -1 : 1
					})
				})
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: '/pages/notice-detail/notice-detail?noticeId=' + item.noticeId
				})
			},
			earlyWarning() {
				let arr = []
				var diyDate = new Date()
				let date = new Date(diyDate.setDate(diyDate.getDate() + 1));
				date = date.getFullYear() + "-" + ((date.getMonth() + 1) > 9 ? date.getMonth() + 1 : "0" + (date
					.getMonth() + 1)) + "-" + (date.getDate() > 9 ? date.getDate() : "0" + date.getDate());

				this.myTaskList.forEach((item, index, array) => {
					if ((item.taskEndTime < date || item.taskEndTime == date) && item.taskDegreeOfCompletion ==
						0) {
						arr.push(item)
					}
				})

				this.warningList = arr
			},

			//订阅消息
			subscribeMsg() {
				uni.requestSubscribeMessage({
					tmplIds: ['5nZQIY8akZCBjXuhQH7Nuy4oJSFiXLJgfY2EUL-gZT8',
						'YPECEtpC0r020rqGPrhsZLGy1h4yAV46y0zkutqic0o',
						'ns37cVqqGE0AMnDzVmdK2W1WfsEcXk2CodneI_m5Cr0'
					],
					success(res) {},
					fail(res) {
						// uni.showToast({
						// 	title: res.errMsg,
						// 	icon: 'error'
						// })
					}
				})
			}
		}
	}
</script>

<style>
	.page {
		padding-bottom: 26rpx;
		background-color: #ffffff;
		height: 100%;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.section {
		padding: 122rpx 0 180rpx;
		background-image: url('https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16668670728307953362.png');
		background-position: 0% 0%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.space-y-79>view:not(:first-child),
	.space-y-79>text:not(:first-child),
	.space-y-79>image:not(:first-child) {
		margin-top: 79rpx;
	}

	.text {
		margin-left: 54rpx;
		align-self: flex-start;
		color: #ffffff;
		font-size: 36rpx;
		font-family: SourceHanSansCN;
		line-height: 33.5rpx;
	}

	.equal-division-item {
		padding: 10rpx 0;
	}

	.group {
		flex: 1 1 188rpx;
	}

	.font_1 {
		font-size: 48rpx;
		font-family: SourceHanSansCN;
		line-height: 35rpx;
		color: #ffffff;
	}

	.font_2 {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
		line-height: 22rpx;
		color: #ffffff;
	}

	.group_2 {
		flex: 1 1 188rpx;
	}

	.group_3 {
		flex: 1 1 188rpx;
	}

	.group_4 {
		flex: 1 1 188rpx;
	}

	.space-y-26>view:not(:first-child),
	.space-y-26>text:not(:first-child),
	.space-y-26>image:not(:first-child) {
		margin-top: 26rpx;
	}

	.group_5 {
		margin-top: -148rpx;
		padding: 0 32rpx;
		position: relative;
	}

	.equal-division {
		padding: 29rpx 0 21rpx;
		background-color: #ffffff;
		border-radius: 8rpx;
		box-shadow: 0px 2rpx 8rpx #80808080;
		position: relative;
	}

	.group_6 {
		flex: 1 1 172rpx;
	}

	.image {
		width: 64rpx;
		height: 64rpx;
	}

	.font_3 {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
		line-height: 22rpx;
		color: #000000;
	}

	.group_7 {
		flex: 1 1 172rpx;
	}

	.group_8 {
		flex: 1 1 172rpx;
	}

	.group_9 {
		flex: 1 1 172rpx;
	}

	.group_10 {
		padding-top: 38rpx;
	}

	.space-y-30>view:not(:first-child),
	.space-y-30>text:not(:first-child),
	.space-y-30>image:not(:first-child) {
		margin-top: 30rpx;
	}

	.text_2 {
		color: #808080;
		font-size: 30rpx;
		font-family: PingFang;
		font-weight: 800;
		line-height: 28rpx;
	}

	.group_11 {
		margin-right: 2rpx;
		margin-bottom: 2rpx;
	}

	.space-x-6>view:not(:first-child),
	.space-x-6>text:not(:first-child),
	.space-x-6>image:not(:first-child) {
		margin-left: 6rpx;
	}

	.image_2 {
		flex-shrink: 0;
		width: 22rpx;
		height: 22rpx;
	}

	.font_4 {
		font-size: 24rpx;
		font-family: PingFang;
		line-height: 22rpx;
		font-weight: 800;
		color: #000000;
	}

	.text_3 {
		color: #808080;
	}

	.list-item {
		padding: 26rpx 18rpx 26rpx 23rpx;
		margin-bottom: 18rpx;
		background-color: #e5e5e580;
		border-radius: 8rpx;
	}

	.icon-nothing {
		width: 300rpx;
		margin-left: 193rpx;
		margin-top: 160rpx;
	}

	.text-nothing {
		font-size: 28rpx;
		color: #A6A6A6;
		text-align: center;
		margin-top: 60rpx;
	}

	.text_4 {
		line-height: 22.5rpx;
	}

	.font_5 {
		font-size: 20rpx;
		font-family: PingFang;
		line-height: 18.5rpx;
		font-weight: 800;
		color: #a6a6a6;
	}

	.text_5 {
		margin-bottom: 2rpx;
	}

	.space-x-8>view:not(:first-child),
	.space-x-8>text:not(:first-child),
	.space-x-8>image:not(:first-child) {
		margin-left: 8rpx;
	}

	.font_6 {
		font-size: 20rpx;
		font-family: PingFang;
		line-height: 14.5rpx;
		font-weight: 800;
		color: #a6a6a6;
	}

	.space-y-20>view:not(:first-child),
	.space-y-20>text:not(:first-child),
	.space-y-20>image:not(:first-child) {
		margin-top: 20rpx;
	}

	.space-y-22>view:not(:first-child),
	.space-y-22>text:not(:first-child),
	.space-y-22>image:not(:first-child) {
		margin-top: 22rpx;
	}
</style>