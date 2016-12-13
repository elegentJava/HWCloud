<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<%@include file="../../common/common.jsp" %>
<link href="<%=bp%>/css/dojo.css" rel="stylesheet" type="text/css" />
<link href="<%=bp%>/css/tundra.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" djConfig="parseOnLoad: true, isDebug: true" src="<%=bp%>/js/dojo.js"></script>
<script type="text/javascript">
	dojo.require("dijit.Dialog");
	dojo.require("dijit.Editor");
	dojo.require("dojo.parser");
	var dia = null;

	// 发送站内信显示框 
	function showDia(conf) {
		console.log(conf);
		var pane = dojo.byId("Dpane");

		if (!pane) {
			pane = document.createElement("DIV");
			pane.setAttribute("id", "Dpane");
			pane.style.width = "300px";
			document.body.appendChild(pane);
			pane.innerHTML = "";
			dia = new dijit.Dialog(conf, pane);
		}
		dia.show();
	}
	function hide() {
		var t = document.getElementById("showdiv");
		var array = t.getElementsByTagName("select");
		for (var i = 0; i < array.length; i++)
			array[i].style.display = "none";
	}
	function show(test) {
		hide();
		var iid = "i" + (test.id);
		var result = document.getElementsByName(test.id)[1];
		var m = document.getElementById("changeDiv");
		m.innerHTML = "<select name=" + test.id + " onchange='change(this)'>"
				+ result.innerHTML + "</select>";
	}
	function change(test) {
		var t = document.getElementById(test.name);
		t.innerHTML = test.options[test.selectedIndex].innerHTML;
	}
</script>
<body class="tundra">
	<table width="90%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: 10px;">
		<tr>
			<td height="600" valign="top" class="left_td" width="10%"></td>
			<td valign="top" class="right_td">
				<table border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td width="80" rowspan="3">
							<img src="<%=bp%>images/pic_user1.jpg" width="80" height="70" />
						</td>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td colspan="2" class="weizhi">&nbsp;
							<strong>首页 ->资源平台 ->教学板块</strong>
						</td>
					</tr>
					<tr>
						<td colspan="2">&nbsp;</td>
					</tr>
				</table>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr><td height="20"></td></tr>
				</table>
				<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 10px auto;table-layout: fixed;">
					<tr height="30">
						<td align="left" valign="top" class="t2" width="15%">
							<strong>
								<a href="#" onclick="showDia({	title : '发送函电',href : 'mail/showMailBox.do?value=1'})">发送函电</a>
							</strong>
						</td>
						<td width="84%"></td>
					</tr>
					<tr>
						<td></td>
						<td align="left" style="word-wrap:break-word;">${content}</td>
					</tr>
					<tr>
						<td></td>
						<td><hr /><br /></td>
					</tr>
					<tr>
						<td></td>
						<td align="left">${translation }<br /></td>
					</tr>
					<tr>
						<td></td>
						<td><hr /><br /></td>
					</tr>
					<tr>
						<td></td>
						<td>
							<div id="showdiv" style="display: ">
								<c:choose>
									<c:when test="${!empty selectList }">
										<c:forEach var="value" items="${selectList}">
		 				                      ${value }<br />
										</c:forEach>
									</c:when>
									<c:otherwise>
									</c:otherwise>
								</c:choose>
							</div>
						</td>
					</tr>
				</table>

				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr><td height="20" colspan="1"></td></tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>


