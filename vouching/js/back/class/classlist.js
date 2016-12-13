$(function(){
	
	//初始化隐藏分页
	$("#pager").hide();
	
	//全选事件
	$("#checkall").click(function() {
		$("input[name='classId']").each(function() {
			if (this.checked) {
				this.checked = false;
			} else {
				this.checked = true;
			}
		});
	});
	
	//初始化装载数据
	initData(1);
	
	//更新事件
	updateClassStatus("active", 0);
	updateClassStatus("inactive", 1);
	
	//删除单个班级
	deleteSingle();
	
	//批量删除
	multiDelete();
	
});

/**
 * 初始化加载数据
 * 
 * @param pageNum
 */
function initData(pageNum){
	var url = "/vouching/admin/loadClassList";
	var data = {
	    token : $("#token").val(),
	    pageNum : pageNum
	};
	var successCallback = function(data){
		var classes = data.detail.classes;
		$("#classList").children().remove();
		if (classes != null && classes.length > 0) {
			for (var i = 0; i < classes.length; i++) {
				$("#classList").append("<tr></tr>");
				var tr = $("#classList").children().eq(i);
				tr.append("<td><input type='checkbox' name='classId' value='"+classes[i].classId+"' /></td>");
				tr.append("<td>"+classes[i].className+"</td>");
				tr.append("<td>"+classes[i].bak+"</td>");
				tr.append("<td>"+classes[i].statusName+"</td>");
				tr.append("<td><div class='button-group'></div><td>");
				var buttons = $(tr).find(">td>div");
				if(classes[i].isActive == 0){
					buttons.append("<button classId='"+classes[i].classId+"' class='button border-main' name='active'><span class='icon-edit'></span>激活</button>");
				}else{
					buttons.append("<button classId='"+classes[i].classId+"' class='button border-main' name='inactive'><span class='icon-edit'></span>取消激活</button>");
				}
				buttons.append("<button classId='"+classes[i].classId+"' class='button border-red' name='deleteSingle'><span class='icon-trash-o'></span>删除</button>");
			}
			VCUtils.common.pager.back.loadPage(data);
			$("#pager").show();
			VCUtils.common.pager.back.registerEvent(initData);
			refreshEvent();
		}
	};
	var faildCallback = function(data){
	    VCUtils.common.tip.loadFaildTip("数据加载失败!");
	};
	VCUtils.common.ajax.commonAjax(url, false, data, successCallback, faildCallback);
}

/**
 * 更新班级状态
 * 
 * @param objectName
 * @param isActive
 */
function updateClassStatus(objectName,isActive){
	$("#button[name='"+objectName+"']").unbind("click");
	$("#button[name='"+objectName+"']").bind("click",function(){
		var classId = $(this).attr("classId");
		var url="/vouching/admin/updateClassStatus";
		var data = {
			token : $("#token").val(),
			isActive : isActive,
			classId : classId
		};
		var successCallback = function(data){
			VCUtils.common.tip.loadSuccessTip("修改成功!");
			var pageNum = parseInt($("#pageNum").text());
			initData(pageNum);
		};
		VCUtils.common.ajax.commonAjax(url,false,data,successCallback,null);
	});
}

/**
 * 删除一个班级
 */
function deleteSingle(){
	$("#deleteSingle").unbind("click");
	$("#deleteSingle").bind("click",function(){
		var classId = $(this).attr("classId");
		var url="/vouching/admin/deleteSingleClass";
		var data = {
			token : $("#token").val(),
			classId : classId
		};
		var successCallback = function(data){
			VCUtils.common.tip.loadSuccessTip("删除成功!");
			var pageNum = parseInt($("#pageNum").text());
			initData(pageNum);
		};
		VCUtils.common.ajax.commonAjax(url,false,data,successCallback,null);
	});
}

/**
 * 刷新事件处理
 */
function refreshEvent() {
	updateClassStatus("active", 0);
	updateClassStatus("inactive", 1);
	deleteSingle();
}

/**
 * 批量删除
 */
function multiDelete() {
	$("#multiDelete").unbind("click");
	$("#multiDelete").bind("click",function(){
		var classIds = new Array();
		var checkedObj = $("input[name='classId']");
		if (checkedObj.length > 0) {
			for (var i = 0; i < checkedObj.length; i++) {
				classIds[i] = $(checkedObj[i]).attr("value");
			}
			var url="/vouching/admin/batchDeleteClass";
			var data = {
				token : $("#token").val(),
				classIds : classIds
			};
			var successCallback = function(data){
				VCUtils.common.tip.loadSuccessTip("删除成功!");
				initData(1);
			};
			VCUtils.common.ajax.commonAjax(url,false,data,successCallback,null);
		} else {
			VCUtils.common.tip.loadFaildTip("请选择一个再删除!");
		}
	});
}

