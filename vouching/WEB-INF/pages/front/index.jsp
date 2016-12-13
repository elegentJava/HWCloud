<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

<title>国贸函电系统</title>

</head>
	<frameset rows='100, *' id="frame_main" border="0">
		<frame src="/vouching/forward/navigate?token=${requestScope.token}" noresize="noresize" name="header" id="header" scrolling="no">
		<frame src="/vouching/forward/forwardMain?token=${requestScope.token}" name="menu" id="menu" />
	</frameset>
</html>
