<template>
	<view class="flex-col justify-between section_6">
		<view class="flex-row" v-for="(item,i) in processFormList" :key="i">
			<view class="font_5" style="width: 160rpx;">{{item.label}}</view>

			<text class="font_6" style="width: 513rpx;"
				v-if="typeof(item.defaultValue) == 'object'">{{item.defaultValue[0]}}-{{item.defaultValue[1]}}</text>
			<text style="width: 513rpx;" class="font_6" v-else>{{item.defaultValue}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "form-data",
		data() {
			return {

			};
		},
		props: {
			processFormList: {
				type: Array,
				required: true
			}
		},
	}
</script>

<style scoped>
</style>
