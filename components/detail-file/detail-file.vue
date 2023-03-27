<template>
	<view class="flex-row section_6" style="padding-bottom: 14px;">
		<view class="font_5" style="width: 126rpx;">附件</view>
		<view class="img_list">
			<view v-for="(item,i) in processFileFormList" :key="i" class="box_img">
				<image class="image1" :src="item" mode="" @click="showPic(item)" v-if="isPic(item)">
				</image>
				<image class="image1" src="@/static/file.svg" mode="" @click="showFile(item)" v-if="!isPic(item)">
				</image>
			</view>
		</view>
	</view>

	<uni-popup ref="popup" type="bottom">
		<image :src="url" mode="widthFix"></image>
	</uni-popup>
</template>

<script>
	export default {
		name: "detail-file",
		data() {
			return {
				url: "",
			};
		},
		props: {
			processFileFormList: {
				type: Array,
				required: true
			}
		},
		methods: {
			showPic(url) {
				this.$refs.popup.open('center')
				this.url = url
			},

			// 判断附件是否为图片
			isPic(url) {
				if (url.substr(-3, 3) == 'png' || url.substr(-3, 3) == 'jpg') {
					return true;
				} else {
					return false;
				}
			},
			showFile(url) {
				uni.downloadFile({
					url: url,
					success: function(res) {
						var filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							showMenu: false
						})
					}
				})
			}
		},
	}
</script>

<style scoped>
	.img_list {
		display: flex;
		flex-direction: row;
		width: 532rpx;
	}

	.image1 {
		width: 104rpx;
		height: 95rpx;
		border-radius: 5px;
		margin-left: 29rpx;
		margin-bottom: 22rpx;
	}

	.box_img {
		display: flex;
		flex-direction: row;
	}
</style>