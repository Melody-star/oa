import Request from '@/utils/requset.js'
import operate from '@/common/operate.js'
let request = new Request().http

export const getUserInfo = function(hideLoading, data) {
	return request({
		url: "/system/user/profile",
		method: "GET",
		hideLoading: hideLoading
	})
}

export const getNotice = function(data) {
	return request({
		url: "/system/notice/list",
		method: "GET",
	})
}

export const getNoticeDetail = function(data) {
	return request({
		url: "/system/notice/" + data,
		method: "GET",
		// data: data
	})
}

export const changeUserInfo = function(data) {
	return request({
		url: "/system/user/profile",
		method: "PUT",
		data: data
	})
}

export const changeAvatar = function(data) {
	return request({
		url: "/system/user/profile/avatar",
		method: "POST",
		data: data
	})
}

export const login = function(data) {
	return request({
		url: "/login",
		method: "POST",
		data: data
	})
}

export const foundNotice = function(data) {
	return request({
		url: "/system/notice",
		method: "POST",
		data: data
	})
}

export const getMyCreateExamine = function(data) {
	return request({
		url: "/workflow/process/ownList",
		method: "GET",
		data: data,
		hideLoading: true
	})
}

export const getExamineDetail = function(data) {
	return request({
		url: "/workflow/process/detail",
		method: "GET",
		data: data
	})
}

export const deleteExamine = function(data) {
	return request({
		url: "/workflow/task/delete",
		method: "DELETE",
		data: data
	})
}

export const getMyExamineList = function(data) {
	return request({
		url: "/workflow/process/finishedList",
		method: "GET",
		data: data
	})
}

export const getMyExamineListt = function(data) {
	return request({
		url: "/workflow/process/todoList",
		method: "GET",
		data: data
	})
}

export const agreeExamine = function(data) {
	return request({
		url: "/workflow/task/complete",
		method: "POST",
		data: data
	})
}

export const rejectExamine = function(data) {
	return request({
		url: "/workflow/task/reject",
		method: "POST",
		data: data
	})
}

export const startExamine = function(data, processDefId) {
	return request({
		url: "/workflow/process/start/" + processDefId,
		method: "POST",
		data: data
	})
}

export const getCopyExamine = function(data) {
	return request({
		url: "/workflow/process/copyList",
		method: "GET",
		data: data,
		hideLoading: true
	})
}

//获取任务列表
export const getMyCreateTask = function(data) {
	return request({
		url: "/system/task/listAll",
		method: "GET",
		data: data
	})
}

//获取任务代办列表
export const getMyTask = function(data) {
	return request({
		url: "/system/task/list",
		method: "GET",
		data: data,
		hideLoading: true
	})
}

export const getTaskDetail = function(data) {
	return request({
		url: "/system/task/" + data,
		method: "GET",
	})
}

export const getAllUser = function(data) {
	return request({
		url: "/system/user/list",
		method: "GET",
		data: data
	})
}

export const addTask = function(data) {
	return request({
		url: "/system/task",
		method: "POST",
		data: data
	})
}

export const saveTask = function(data) {
	return request({
		url: "/system/task/preservationTask",
		method: "POST",
		data: data
	})
}

export const completeTask = function(u, data) {
	return request({
		url: "/system/task/completeTask/" + u,
		method: "POST",
		data: data
	})
}

export const getCopyTesk = function(data) {
	return request({
		url: "/system/task/copyListAll",
		method: "GET",
		data: data,
		hideLoading: true
	})
}

export const urgTesk = function(data) {
	return request({
		url: "/system/task/urgTesk/" + data,
		method: "GET",
	})
}

export const changeUser = function(data) {
	return request({
		url: "/system/user",
		method: "PUT",
		data: data
	})
}

export const addUser = function(data) {
	return request({
		url: "/system/user",
		method: "POST",
		data: data
	})
}

export const getProcessList = function(data) {
	return request({
		url: "/workflow/process/list",
		method: "GET",
		data: data
	})
}

export const getProcessForm = function(data) {
	return request({
		url: "/workflow/process/getProcessForm",
		method: "GET",
		data: data
	})
}

export const getOpenid = function(data) {
	return request({
		url: "/system/getOpenId/getId/" + data,
		method: "GET",
	})
}

export const sendTemplate = function(accesstoken, openId, templateId, data) {
	return request({
		url: "/system/getOpenId/sendTemplate?openId=" + openId + "&templateId=" + templateId +
			"&accessToken=" + accesstoken,
		method: "POST",
		data: data
	})
}

export const addTaskBySave = function(data) {
	return request({
		url: "/system/task/issued/" + data,
		method: "GET",
	})
}

export const getAccessToken = function(data) {
	return request({
		url: "/system/getOpenId/getAccessToken",
		method: "GET",
		data: data
	})
}

export const deteleTask = function(data) {
	return request({
		url: "/system/task/" + data,
		method: "DELETE",
	})
}
