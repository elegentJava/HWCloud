$(function(){
	
	//隐藏错误信息
	$("#errorMsg").hide();
	
	//装载班级信息
	var url = "/vouching/admin/loadClasses";
	var data = {
	    token : $("#token").val()
	};
	var successCallback = function(data){
		var classes = data.detail.classes;
		if(classes != null && classes.length > 0){
			$("#clas").append("<option value='0' selected='selected'>暂无班级</option>");
			for (var i = 0; i < classes.length; i++) {
				$("#clas").append("<option value='"+classes[i].classId+"'>"+classes[i].className+"</option>");
			}
		}
	};
	VCUtils.common.ajax.commonAjax(url, false, data, successCallback, null);
	
	//添加学生信息
	$("#add").bind("click",function(){
		$("#errorMsg").hide();
		var account = $("#account").val();
		var name = $("#name").val();
		var sex = $("#sex").val();
		var clas = $("#clas").val();
		var email = $("#email").val();
		if(VCUtils.common.util.isNotNullOrBlank(account)
			&& VCUtils.common.util.isNotNullOrBlank(name)
			&& VCUtils.common.util.isNotNullOrBlank(sex)
			&& VCUtils.common.util.isNotNullOrBlank(clas)
			&& VCUtils.common.util.isNotNullOrBlank(email)){
			var url = "/vouching/admin/addUser";
			var data = {
			    token : $("#token").val(),
			    account : account,
			    name : name,
			    sex : sex,
			    clas : clas,
			    email : email,
			    role : 1
			};
			var successCallback = function(data){
				VCUtils.common.tip.loadSuccessTip("添加成功!");
			};
			var faildCallback = function(data){
				$("#errorMsg>div>ul>li").text(data.errorCode);
				$("#errorMsg").show();
			};
			VCUtils.common.ajax.commonAjax(url, false, data, successCallback, faildCallback);
		}
	});
});