/**
 * @description 公共工具文件
 * @author Tiam
 * @lastModifiedTime 2023-3-2 16:01:43
 */

/**
 * 显示接口返回信息并跳转到指定页面
 * @param {Object} res - 接口返回的信息
 * @param {Object} path- 要跳转的路径
 */
function skipAppointPage(res, path) {
	uni.showToast({
		title: res.msg,
		icon: 'none',
		duration: 2000,
		mask: true,
		success: function() {
			if (res.code == 200) {
				setTimeout(function() {
					uni.redirectTo({
						url: path
					});
				}, 1500)
			}
		}
	})
}

/**
 * 显示接口返回信息并返回上一级页面
 * @param {Object} res - 接口返回的内容
 */
function skipBacktPage(res) {
	uni.showToast({
		title: res.msg,
		icon: 'none',
		duration: 2000,
		mask: true,
		success: function() {
			if (res.code == 200) {
				setTimeout(function() {
					uni.navigateBack({
						delta: 1
					});
				}, 1500)
			}
		}
	})
}

export {
	skipAppointPage,
	skipBacktPage
}
