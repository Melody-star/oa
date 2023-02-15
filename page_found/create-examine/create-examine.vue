<template>
	<view class="flex-col group">
		<view class="flex-col group_3">
			<view class="flex-col section_4">
				<view style="margin-bottom: 20rpx;" v-for="(item,i) in ProcessForm" :key="i">
					<text class="font_1 text_3">{{item.__config__.label}}</text>
					<br>
					<!-- 					<image v-if="item.__vModel__== 'file'" class="up-img" @click="chooseImg(item.__vModel__)"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/51ae67e043a7fbf6a79fbbccf4d45b17.png"
						mode=""></image> -->


					<uni-file-picker v-if="item.name== 'file'" v-model="imageValue" fileMediatype="image"
						@select="mentouSelect" :auto-upload="false" @delete="mentouDelete" />

					<view v-else class="flex-col items-start text-wrapper">
						<input type="text" @input="inputData($event,item.__vModel__)" />
					</view>

				</view>
			</view>
		</view>

		<view class="flex-row justify-between section_11">
			<view class="flex-col items-center text-wrapper_4" @click="submit"><text class="font_1 text_14">提交</text>
			</view>
			<view class="flex-col items-center text-wrapper_5" @click="cancel"><text class="font_1">取消</text></view>
		</view>
	</view>
</template>

<script>
	import {
		getProcessForm,
		startExamine
	} from '@/api/api.js'

	import {
		useCounterStore
	} from '@/stores/counter';

	import operate from '@/common/operate.js'

	const counter = useCounterStore();

	export default {
		data() {
			return {
				datetimesingle: '',
				datetimesingle2: '',
				contentValue: '',
				remarksValue: '',
				//表单信息
				ProcessForm: [],
				//表单用户输入的值
				formData: {},
				imgUrl: "",
				//每个__vModel__的值
				vModelValue: [],
				//从上一个界面传过来的
				definitionId: '',
				file: [],
				type: "",
				imgList: []
			}
		},
		methods: {
			changeLog(e) {
				console.log('change事件:', e);
			},
			//获取输入框的值
			inputData(event, dataValue) {
				this.formData[dataValue] = event.target.value
			},
			//提交
			submit() {
				let arr = []
				this.imgList.forEach(function(item, index, array) {
					arr.push(item.url)
				});

				this.formData['file'] = arr
				let temp = JSON.stringify(this.formData)

				startExamine(
					temp,
					this.definitionId
				).then((res) => {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						success: () => {
							if (res.code == 200) {
								uni.redirectTo({
									url: '/page_examine/my-create/my-create'
								});
							}
						}
					})
				})
			},
			// uploadImg() {
			// 	let imgArr = []
			// 	for (let i = 0; i < this.file.length; i++) {
			// 		let obj = new Object();
			// 		obj.name = 'img' + i;
			// 		obj.uri = this.file[i].path;
			// 		imgArr.push(obj);
			// 	}
			// },
			cancel() {
				uni.redirectTo({
					url: '/page_found/select-template/select-template'
				});
			},
			mentouSelect(e) {
				let that = this
				if (e.tempFilePaths && e.tempFiles) {
					this.file = e.tempFiles

					uni.showLoading({
						title: "上传中"
					})

					// 上传图片到相依的接口
					uni.uploadFile({
						url: operate.api + '/system/oss/upload', //这里为拼接的接口地址
						filePath: this.file[0].tempFilePath ? this.file[0].tempFilePath : this.file[0].path,
						fileType: "image",
						header: {
							'Authorization': 'Bearer ' + counter.token
						},
						name: 'file',
						success: uploadFileRes => {
							console.log(uploadFileRes);
							// 这里可以对返回的参数进行处理了
							uni.showToast({
								title: '上传成功',
								icon: "success"
							});

							that.imgList.push({
								name: e.tempFiles[0].name,
								url: JSON.parse(uploadFileRes.data).data.url
							})
						},
						fail(err) {
							console.log(err);
							uni.showToast({
								title: '上传失败',
								icon: "error"
							});
						},
						complete: () => {
							uni.hideLoading()
						}
					})
				}
			},
			mentouDelete(e) {
				let that = this
				for (let i = 0; i < that.imgList.length; i++) {
					if (that.imgList[i].name == e.tempFile.name) {
						that.imgList.splice(i, 1)
					}
				}
			}
		},
		onLoad(data) {
			let that = this
			this.definitionId = data.definitionId
			getProcessForm({
				definitionId: data.definitionId,
				deployId: data.deployId
			}).then((res) => {
				console.log(res);
				this.ProcessForm = res.data.fields
				this.ProcessForm.forEach(function(item, index, array) {
					that.vModelValue.push(item.__vModel__)
				});
			})
		}
	}
</script>

<style>
	.uni-file-picker {
		padding-top: 27rpx;
	}

	.up-img {
		width: 90rpx;
		height: 90rpx;
		margin-top: 18rpx;
	}

	.uni-collapse-item__title-box {
		padding: 0 20rpx;
		height: 62rpx !important;
	}

	.uni-collapse-item__title {}

	.uni-collapse-item__title-text {}

	.uni-easyinput {
		padding: 11rpx 19rpx;
	}

	.uni-date-x {
		background-color: #e5e5e566 !important;
	}

	page {
		background-color: #f5f5f5;

	}

	/* 	.page {
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;
	} */

	.space-y-54>view:not(:first-child),
	.space-y-54>text:not(:first-child),
	.space-y-54>image:not(:first-child) {
		margin-top: 54rpx;
	}

	.group_2 {
		/* 		flex: 1 1 auto;
		overflow-y: auto; */
	}

	.group {}

	.group_3 {
		padding: 17rpx 18rpx 0 19rpx;
		margin-bottom: 140rpx;
	}

	.section_4 {
		padding: 34rpx 32rpx 30rpx;
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
		margin-left: 12rpx;
		align-self: flex-start;
		line-height: 25.5rpx;
	}

	.text-wrapper {
		margin-top: 28rpx;
		height: 62rpx;
		background-color: #e5e5e566;
		border-radius: 10rpx;
		overflow: hidden;
		padding: 11rpx 0 11rpx 20rpx;
	}

	.text_4 {
		margin-left: 22rpx;
	}

	.text_5 {
		margin-left: 14rpx;
		margin-top: 41rpx;
		align-self: flex-start;
	}

	.space-x-10>view:not(:first-child),
	.space-x-10>text:not(:first-child),
	.space-x-10>image:not(:first-child) {
		margin-left: 10rpx;
	}

	.section_5 {
		margin-top: 28rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.font_2 {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
		line-height: 21.5rpx;
		color: #000000;
	}

	.text_6 {
		margin-left: 13rpx;
		margin-top: 42rpx;
		align-self: flex-start;
	}

	.text_7 {
		margin-left: 15rpx;
		margin-top: 34rpx;
		align-self: flex-start;
	}

	.text-wrapper_2 {
		margin-top: 28rpx;
		background-color: #e5e5e566;
		border-radius: 10rpx;
		overflow: hidden;
		height: 204rpx;
	}

	.text_8 {
		margin-left: 20rpx;
		margin-right: 26rpx;
		line-height: 34rpx;
	}

	.space-y-28>view:not(:first-child),
	.space-y-28>text:not(:first-child),
	.space-y-28>image:not(:first-child) {
		margin-top: 28rpx;
	}

	.section_6 {
		padding: 34rpx 32rpx 42rpx;
		background-color: #ffffff;
		border-radius: 15rpx;
		overflow: hidden;
	}

	.view {
		margin-top: 20rpx;
	}

	.text_9 {
		margin-left: 13rpx;
		align-self: flex-start;
	}

	.text_10 {
		line-height: 25.5rpx;
	}

	.space-y-21>view:not(:first-child),
	.space-y-21>text:not(:first-child),
	.space-y-21>image:not(:first-child) {
		margin-top: 21rpx;
	}

	.section_7 {
		padding: 20rpx 20rpx 12rpx 22rpx;
		background-color: #ffffff66;
		border-radius: 10rpx;
		overflow: hidden;
		border: solid 2rpx #e5e5e5;
	}

	.image_7 {
		width: 20rpx;
		height: 20rpx;
	}

	.image_8 {
		margin-bottom: 4rpx;
	}

	.space-y-38>view:not(:first-child),
	.space-y-38>text:not(:first-child),
	.space-y-38>image:not(:first-child) {
		margin-top: 38rpx;
	}

	.section_8 {
		padding: 20rpx 16rpx 39rpx 24rpx;
		background-color: #ffffff66;
		border-radius: 10rpx;
		overflow: hidden;
		border: solid 2rpx #e5e5e5;
	}

	.image_9 {
		margin-right: 4rpx;
		margin-bottom: 4rpx;
	}

	.group_4 {
		padding: 20rpx 24rpx 30rpx 36rpx;
	}

	.space-x-32>view:not(:first-child),
	.space-x-32>text:not(:first-child),
	.space-x-32>image:not(:first-child) {
		margin-left: 32rpx;
	}

	.section_9 {
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

	.group_5 {
		padding-left: 8rpx;
	}

	.section_10 {
		flex-shrink: 0;
		background-color: #cccccc;
		width: 3rpx;
		height: 101rpx;
	}

	.font_3 {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
		line-height: 21.5rpx;
		color: #a6a6a6;
	}

	.text_11 {
		margin-top: 26rpx;
		line-height: 22rpx;
	}

	.image_10 {
		border-radius: 5rpx;
		width: 45rpx;
		height: 45rpx;
	}

	.space-x-30>view:not(:first-child),
	.space-x-30>text:not(:first-child),
	.space-x-30>image:not(:first-child) {
		margin-left: 30rpx;
	}

	.group_6 {
		margin-top: 3rpx;
	}

	.text_12 {
		margin-left: 51rpx;
		margin-top: 2rpx;
		align-self: flex-start;
		line-height: 22rpx;
	}

	.view_2 {
		margin-top: 28rpx;
	}

	.text-wrapper_3 {
		background-color: #e5e5e566;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.text_13 {
		margin-left: 22rpx;
	}

	.section_11 {
		padding: 24rpx 52rpx;
		background-color: #ffffff;
		overflow: hidden;
		width: 100%;
		position: fixed;
		bottom: 0;
	}

	.text-wrapper_4 {
		padding: 24rpx 0 21rpx;
		background-color: #2973ff;
		border-radius: 10rpx;
		overflow: hidden;
		width: 295rpx;
		height: 71rpx;
	}

	.text_14 {
		color: #ffffff;
	}

	.text-wrapper_5 {
		padding: 24rpx 0 22rpx;
		background-color: #e5e5e5;
		border-radius: 10rpx;
		overflow: hidden;
		width: 295rpx;
		height: 71rpx;
	}
</style>
