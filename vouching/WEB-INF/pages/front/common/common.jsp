<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String bp = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>

<link href="<%=bp%>/css/style.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="<%=bp%>/js/jquery.js"></script>
<script type="text/javascript" src="<%=bp%>/js/VCUtils.js"></script>
<script type="text/javascript" src="<%=bp%>/js/md5.js" ></script>
<script type="text/javascript" src="<%=bp%>/js/checkForm/hdJsVerify.js" defer="defer"></script>

<c:set var="token" value="${requestScope.token}"/>

