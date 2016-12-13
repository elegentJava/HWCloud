<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<%@include file="../../common/common.jsp" %>
<script type="text/javascript" src="<%=bp%>/js/dtreebase.js"></script>
<link rel="stylesheet" href="<%=bp%>/css/dtree.css" type="text/css"></link>
<script type="text/javascript">
	var tree = new dTree("tree");
	var url = "/vouching/resource/loadCategoryTree";
	var data = {
		token : $("#token").val()
	};
	var successCallback = function(data){
		var categories = data.detail.categories;
		tree.add(0, -1, "生成函电","");
		for (var i = 0; i < categories.length; i++) {
			tree.add(categories[i].ccid, categories[i].fatherId, categories[i].name, categories[i].flag, "main");
		} 
		document.getElementById("dtree").innerHTML=tree;
	};
	VCUtils.common.ajax.commonAjax(url, true, data, successCallback, null);
</script>
    <title>函电导航栏</title>
</head>
<body>
	<input type="hidden" id="token" value="${token}"/>
	<div id="dtree" class="dtree"></div>
</body>
</html>
