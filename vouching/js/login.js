$(function(){
	
	//登录
	$("#login").click(function(){
		$("#password").attr("value",hex_md5($("#password").val()));
		$("#loginForm").submit();
	});
});