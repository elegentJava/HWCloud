$(function(){
	
	//初始化隐藏分页
	$("#pager").hide();
	
	//全选事件
	$("#checkall").click(function() {
		$("input[name='userId']").each(function() {
			if (this.checked) {
				this.checked = false;
			} else {
				this.checked = true;
			}
		});
	});
	
	//初始化装载数据
	var url = "/vouching/user/loadUserList";
	var data = {
	    token : $("#token").val(),
	    role : 1,
	    pageNum : 1
	};
	var successCallback = function(data){
		var students = data.detail.students;
		$("#studentList").children().remove();
		if (students != null && students.length > 0) {
			for (var i = 0; i < students.length; i++) {
				$("#studentList").append("<tr></tr>");
				var tr = $("#studentList").children().eq(i);
				tr.append("<td><input type='checkbox' name='userId' value='"+students[i].userId+"' /></td>");
				tr.append("<td>"+students[i].account+"</td>");
				tr.append("<td>"+students[i].name+"</td>");
				tr.append("<td>"+students[i].sexName+"</td>");
				tr.append("<td>"+students[i].email+"</td>");
				tr.append("<td>"+students[i].isOnlineName+"</td>");
				tr.append("<td>"+students[i].formatLastLoginDate+"</td>");
				tr.append("<td>"+students[i].className+"</td>");
				tr.append("<div class='button-group'></div>");
				var buttons = $(tr).find(">div");
				buttons.append("<button userId='"+students[i].userId+"' class='button border-main' name='resetPassword'><span class='icon-edit'></span>重置密码</button>");
				buttons.append("<button userId='"+students[i].userId+"' class='button border-red' name='deleteSingle'><span class='icon-trash-o'></span>删除</button>");
			}
			VCUtils.common.pager.back.loadPage(data);
			$("#pager").show();
			VCUtils.common.pager.back.registerEvent(loadDataForPage);
		}
	};
	var faildCallback = function(data){
		VCUtils.common.tip.loadFaildTip("数据加载失败!");
	};
	VCUtils.common.ajax.commonAjax(url, false, data, successCallback, faildCallback);
	
	//重置密码事件
	resetPassword();
	
	//删除单个学生
	deleteSingle();
	
	//批量删除
	
	//添加用户
	
	//批量导入
	$("#batchInsert").unbind("click");
	$("#batchInsert").bind("click",function(){
		var token = $("#token").val();
		$.ajaxFileUpload({
            url:'/vouching/admin/batchInsertUsers',
            secureuri:false,                       
            fileElementId : "userFile",
            data : {
            	token : token,
            },
            dataType:'json',                       
            success:function(data, status){        
            	if (data.result == "success") {
					VCUtils.common.tip.loadSuccessTip("批量添加成功!");
				} else {
					VCUtils.common.tip.loadFaildTip(data.errorCode);
				}
            },
            error:function(data, status, e){ 
            	VCUtils.common.tip.loadFaildTip(data.errorCode);
            }
        });
	});
	
});

/**
 * 分页装载结果
 * @param pageNum
 */
function loadDataForPage(pageNum){
	var url = "/vouching/user/loadUserList";
	var data = {
	    token : $("#token").val(),
	    role : 1,
	    pageNum : pageNum
	};
	var successCallback = function(data){
		var students = data.detail.students;
		$("#studentList").children().remove();
		if (students != null && students.length > 0) {
			for (var i = 0; i < students.length; i++) {
				$("#studentList").append("<tr></tr>");
				var tr = $("#studentList").children().eq(i);
				tr.append("<td><input type='checkbox' name='userId' value='"+students[i].userId+"' /></td>");
				tr.append("<td>"+students[i].account+"</td>");
				tr.append("<td>"+students[i].name+"</td>");
				tr.append("<td>"+students[i].sexName+"</td>");
				tr.append("<td>"+students[i].email+"</td>");
				tr.append("<td>"+students[i].isOnlineName+"</td>");
				tr.append("<td>"+students[i].formatLastLoginDate+"</td>");
				tr.append("<td>"+students[i].className+"</td>");
				tr.append("<div class='button-group'></div>");
				var buttons = $(tr).find(">div");
				buttons.append("<button userId='"+students[i].userId+"' class='button border-main' name='resetPassword'><span class='icon-edit'></span>重置密码</button>");
				buttons.append("<button userId='"+students[i].userId+"' class='button border-red' name='deleteSingle'><span class='icon-trash-o'></span>删除</button>");
			}
			VCUtils.common.pager.back.loadPage(data);
			$("#pager").show();
			VCUtils.common.pager.back.registerEvent(loadDataForPage);
			resetPassword();
			deleteSingle();
		}
	};
	var faildCallback = function(data){
	    VCUtils.common.tip.loadFaildTip("数据加载失败!");
	};
	VCUtils.common.ajax.commonAjax(url, false, data, successCallback, faildCallback);
}

/**
 * 重置密码
 */
function resetPassword(){
	$("button[name='resetPassword']").unbind("click");
	$("button[name='resetPassword']").bind("click",function(){
		var userId = $(this).attr("userId");
		var url = "/vouching/user/resetPassword";
		var data = {
		    token : $("#token").val(),
		    userId : userId
		};
		var successCallback = function(data){
			VCUtils.common.tip.loadSuccessTip("重置成功!");	
		};
		var faildCallback = function(data){
			VCUtils.common.tip.loadFaildTip(data.errorCode);
		};
		VCUtils.common.ajax.commonAjax(url, false, data, successCallback, faildCallback);
	});
}

/**
 * 删除单个学生
 */
function deleteSingle(){
	$("button[name='deleteSingle']").unbind("click");
	$("button[name='deleteSingle']").bind("click",function(){
		var userId = $(this).attr("userId");
		var url = "/vouching/user/deleteSinglerUser";
		var data = {
		    token : $("#token").val(),
		    userId : userId
		};
		var successCallback = function(data){
			loadDataForPage(1);	
		};
		var faildCallback = function(data){
			VCUtils.common.tip.loadFaildTip(data.errorCode);
		};
		VCUtils.common.ajax.commonAjax(url, false, data, successCallback, faildCallback);
	});
}
