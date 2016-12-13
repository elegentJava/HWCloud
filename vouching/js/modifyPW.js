$(function(){
	
	//修改密码
	$("#modify").bind("click",function(){
		var oldPassword = $("#oldPassword").val();
		var newPassword = $("#newPassword").val();
		var url = "/vouching/user/modifyPW";
		var data = {
			token : $("#token").val(),
			oldPassword : oldPassword,
			newPassword : newPassword
		};
		var successCallback = function(data){
			divAlert("修改密码成功!");
		};
		var faildCallback = function(data){
			$("#errorMsg").text(data.errorCode);
		};
		VCUtils.common.ajax.commonAjax(url, false, data, successCallback, faildCallback);
	});
	
});

