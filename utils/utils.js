/**
 * 显示接口返回信息并跳转到指定页面
 * @param {Object} res
 * @param {Object} path
 */
function Skip(res, path) {
	uni.showToast({
		title: res.msg,
		icon: 'none',
		duration: 2000,
		//显示透明蒙层，防止触摸穿透
		mask: true,
		success: function() {
			if (res.code == 200) {
				setTimeout(function() {
					//要延时执行的代码
					uni.redirectTo({
						url: path
					});
				}, 1500) //延迟时间
			}
		}
	})
}

export {
	Skip
}
