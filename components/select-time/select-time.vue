<template>
	<view @click="showScreen()">
		<text class="middle-text">{{title}}</text>
		<image class="middle-img"
			src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16671153239086405883.png"
			style="transform: rotateX(180deg)" v-if="showIcon"></image>
		<image class="middle-img" v-else
			src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/634182aa5a7e3f03108738d8/635a5f5dfe65f70012e602cd/16671153239086405883.png">
		</image>
	</view>

	<view class="screen-box" v-show="isShowscreen">
		<view class="screen-box-item" @click="choose(0)">
			<text class="screen-box-item-text">不限</text>
			<image v-show="nonecompleteSelect" src="../../static/select.png" mode="" class="screen-box-item-icon">
			</image>
		</view>
		<view class="screen-box-item" @click="choose(1)">
			<text class="screen-box-item-text">按时间降序</text>
			<image v-show="completeSelect" src="../../static/select.png" mode="" class="screen-box-item-icon">
			</image>
		</view>
		<view class="screen-box-item" @click="choose(2)">
			<text class="screen-box-item-text">按时间升序</text>
			<image v-show="nocompleteSelect" src="../../static/select.png" mode="" class="screen-box-item-icon">
			</image>
		</view>
	</view>

	<view class="mask" v-show="isShowMask"></view>
</template>

<script>
	export default {
		name: "my-select",
		data() {
			return {
				myCreateTaskList: [], //所有
				temp: [], //搜索后的列表

				showIcon: false,

				// 选择标记
				completeSelect: false,
				nocompleteSelect: false,
				nonecompleteSelect: false,
				nullcompleteSelect: false,

				isShowscreen: false,
				isShowMask: false
			};
		},
		methods: {
			showScreen() {
				if (!this.isShowscreen) {
					this.showIcon = true
					this.isShowMask = true

					this.isShowscreen = true
				} else {
					this.showIcon = false
					this.isShowMask = false

					this.isShowscreen = false
				}
			},
			choose(value) {
				switch (value) {
					case 0:
						this.nonecompleteSelect = true
						this.completeSelect = false
						this.nocompleteSelect = false
						this.nullcompleteSelect = false

						this.$emit('give-result', this.allList)

						this.closeSelect()
						break;
					case 1:
						this.completeSelect = true
						this.nocompleteSelect = false
						this.nonecompleteSelect = false
						this.nullcompleteSelect = false

						let arr = this.allList.sort(function(a, b) {
							return b.createTime < a.createTime ? -1 : 1
						})
						this.$emit('give-result', arr)

						this.closeSelect()
						break;
					case 2:
						this.nocompleteSelect = true
						this.completeSelect = false
						this.nonecompleteSelect = false
						this.nullcompleteSelect = false

						let arr2 = this.allList.sort(function(a, b) {
							return b.createTime > a.createTime ? -1 : 1
						})
						this.$emit('give-result', arr2)

						this.closeSelect()
						break;
				}
			},
			closeSelect() {
				this.isShowMask = false
				this.isShowscreen = false
				this.showIcon = false
			}
		},
		props: ["title", "allList"],
	}
</script>

<style lang="less">
	.mask {
		top: 175rpx;
		background: #000000;
		opacity: 0.75;
		height: 100%;
		width: 100%;
		left: 0px;
		top: ;
		position: absolute;
		z-index: 999;
	}

	.screen-box-item-text {
		font-size: 28rpx;
		font-family: SourceHanSansCN;
	}

	.screen-box-item {
		margin-top: 15rpx;
	}

	.screen-box {
		width: 100%;
		height: 189rpx;
		padding-left: 62rpx;
		position: absolute;
		left: 0rpx;
		top: 175rpx;
		background-color: #ffffff;
		z-index: 1000;
	}

	.screen-box-item-icon {
		width: 27rpx;
		height: 27rpx;
		margin-left: 514rpx;
	}

	.top {
		height: 175rpx;
		background-color: #ffffff;
	}

	.search {
		margin-top: 19rpx;
		width: 655rpx;
		overflow-y: hidden;
	}

	.uni-searchbar__box {
		height: 59rpx !important;
		justify-content: flex-start !important;
	}

	.uni-searchbar {
		padding: 0px !important;
	}

	.uni-searchbar__text-placeholder {
		font-size: 24rpx;
		color: #A6A6A6;
		font-family: SourceHanSansCN;
	}

	.middle {
		width: 344rpx;
		height: 35rpx;
		align-self: stretch;
		margin-left: 71rpx;
		margin-top: 24rpx;
	}

	.middle-img {
		margin-left: 11rpx;
		width: 16rpx;
		height: 16rpx;
	}

	.middle-text {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
	}

	.item {
		margin-top: 20rpx;
		width: 712.5rpx;
		height: 236rpx;
		border-radius: 15px;
		background: rgba(255, 255, 255, 1);
		overflow: hidden;
		padding-left: 27rpx;
		padding-top: 23rpx;
	}

	.sign {
		height: 100%;
		width: 13rpx;
		background: rgba(229, 229, 229, 1);
	}

	.item-top-img {
		width: 25rpx;
		height: 25rpx;
		margin-right: 25rpx;
	}

	.item-top-text {
		font-size: 32rpx;
		font-family: SourceHanSansCN;
		font-weight: 700;
		color: #000000;
		margin-left: 8rpx;
	}

	.item-content {
		margin-top: 5rpx;

		.item-content-img {
			width: 35rpx;
			height: 35rpx;
			margin-top: 3rpx;
		}

		.item-content-text {
			font-size: 24rpx;
			font-family: SourceHanSansCN;
			color: #a6a6a6;
			margin-left: 5rpx;
		}
	}

	.item-time {

		.item-time-img {
			width: 22rpx;
			height: 22rpx;
			margin-left: 6rpx;

		}

		.item-time-text {
			font-size: 24rpx;
			font-family: SourceHanSansCN;
			color: #a6a6a6;
			margin-left: 9rpx;
		}
	}

	.item-under {
		margin-top: 16rpx;
		border-top: 1rpx solid rgba(166, 166, 166, 0.2);
		width: 659.97rpx;
		padding-top: 12rpx;

		.item-under-text {
			font-size: 28rpx;
			font-family: SourceHanSansCN;
			color: #000000;
			padding-left: 9rpx;
		}

		.item-under-status {
			font-size: 28rpx;
			font-family: SourceHanSansCN;
			color: #a6a6a6;
		}
	}
</style>
