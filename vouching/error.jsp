<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String bp = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
    <center>
        <div>
        	<img alt="${requestScope.errorCode}" src="<%=bp%>/images/error.jpg">
    	</div>
    </center>
</body>
</html>