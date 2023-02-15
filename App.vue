<script>
	export default {
		onLaunch: function() {
			uni.showLoading({
				title: '加载中'
			});
			uni.loadFontFace({
				family: 'PingFang',
				source: 'url("http://img.zlpo.xyz/PingFang.ttf")',
				success() {
					uni.hideLoading();
				},
				fail() {
					uni.hideLoading();
				}
			})
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */

	// 设置整个项目的背景色
	page {
		background-color: #ffffff;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}

	html {
		font-size: 16px;
	}

	body {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
			'Droid Sans', 'Helvetica Neue', 'Microsoft Yahei', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	view,
	image,
	text {
		box-sizing: border-box;
		flex-shrink: 0;
	}

	#app {
		width: 100vw;
		height: 100vh;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
	}

	.flex-col {
		display: flex;
		flex-direction: column;
	}

	.justify-start {
		justify-content: flex-start;
	}

	.justify-center {
		justify-content: center;
	}

	.justify-end {
		justify-content: flex-end;
	}

	.justify-evenly {
		justify-content: space-evenly;
	}

	.justify-around {
		justify-content: space-around;
	}

	.justify-between {
		justify-content: space-between;
	}

	.items-start {
		align-items: flex-start;
	}

	.items-center {
		align-items: center;
	}

	.items-end {
		align-items: flex-end;
	}
</style>
