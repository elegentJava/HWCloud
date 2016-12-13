/**
功能：统一界面元素校验组件
author：zhaoyf
time：2008-06-30
开发说明：
1、本组件目前只支持input域type='text'的校验，其它类型的校验未实现.
组建功能扩展说明：
1、如果需要扩展此组件的校验函数，则需要将函数名称定义为如下格式
	function ××Verify(obj)
	{
		//如果校验失败，返回失败信息
	    if(FALSE)
	    {
	    	return errorMsg;
	    }else
	    //如果校验通过，必须这样写
	    {
	    	return success;
	    }
	}
	
*/
/**
校验函数入口
*/
//错误信息存储变量
var errMessage = '';
//定制Alert框，wangzm add(20100912)
console.log("ffff");
function divAlert(str){
     var msgw,msgh,bordercolor;
     msgw=400;//提示窗口的宽度
     msgh=100;//提示窗口的高度
     //提示窗口的高度
     //扣分的提示信息时，根据扣分的多少，设置高度
     var find = "填写错误";
     var reg = new RegExp(find,"g");
     var c = str.match(reg);
     var number=c?c.length:0;
     if(number>0){
     msgh=50+number*40;
     }
     titleheight=25; //提示窗口标题高度
     bordercolor="#333333";//提示窗口的边框颜色
     titlecolor="#cccccc";//提示窗口的标题颜色
  
     var sWidth,sHeight;
     sWidth=document.body.offsetWidth+10;
     //sHeight=screen.height;
     //sHeight=document.documentElement.scrollHeight;
     sHeight=document.body.scrollHeight+95;
     if(sHeight<425){
     sHeight=425;
     }
     //判断是否存在DIV
     var bgDIVObj=document.getElementById("bgDiv");
     if(bgDIVObj==null){ 
     
	     var bgObj=document.createElement("div");
	     bgObj.setAttribute('id','bgDiv');
	     bgObj.style.position="absolute";
	     bgObj.style.top="0";
	     bgObj.style.background="#777";
	     bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
	     bgObj.style.opacity="0.6";
	     bgObj.style.left="0";
	     bgObj.style.width=sWidth + "px";
	     bgObj.style.height=sHeight + "px";
	     bgObj.style.zIndex = "10000";
	     document.body.appendChild(bgObj);
	  
	     var msgObj=document.createElement("div");
	     msgObj.setAttribute("id","msgDiv");
	     msgObj.setAttribute("align","center");
	     msgObj.style.background="white";
	     msgObj.style.border="1px solid " + bordercolor;
	        msgObj.style.position = "absolute";
	              msgObj.style.left = "50%";
	              msgObj.style.top = "40%";
	              msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
	              msgObj.style.marginLeft = "-225px" ;
	              //msgObj.style.marginTop = -75+document.documentElement.scrollTop+"px";
	              msgObj.style.width = msgw + "px";
	              msgObj.style.height =msgh + "px";
	              msgObj.style.textAlign = "center";
	              msgObj.style.lineHeight ="25px";
	              msgObj.style.zIndex = "10001";
	  
	       var title=document.createElement("h4");
	       title.setAttribute("id","msgTitle");
	       title.setAttribute("align","right");
	       title.style.margin="0";
	       title.style.padding="3px";
	       title.style.background=bordercolor;
	       title.style.filter="progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";
	       title.style.opacity="0.75";
	       title.style.border="1px solid " + bordercolor;
	       title.style.height="18px";
	       title.style.font="12px Verdana, Geneva, Arial, Helvetica, sans-serif";
	       title.style.color="white";
	       title.style.cursor="pointer";
	       title.innerHTML="关闭";
	       title.onclick=function(){
	            	  document.body.removeChild(bgObj);
	                  document.getElementById("msgDiv").removeChild(title);
	                  document.body.removeChild(msgObj);
	                  };
	       document.body.appendChild(msgObj);
	       document.getElementById("msgDiv").appendChild(title);
	       var txt=document.createElement("p");
	       txt.style.margin="1em 0";
	       txt.setAttribute("id","msgTxt");
	       txt.innerHTML=str;
           document.getElementById("msgDiv").appendChild(txt);
           window.scrollTo(0,0);
      }
  }     
//IE6图片透明
function imgFilter(img){
	   img.style.display='';
	   var imgName = img.src.toUpperCase() 
       if (imgName.substring(imgName.length-3, imgName.length) == "PNG") 
       { 
          var imgID = (img.id) ? "id='" + img.id + "' " : "" 
          var imgClass = (img.className) ? "class='" + img.className + "' " : "" 
          var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' " 
          var imgStyle = "display:inline-block;" + img.style.cssText 
          if (img.align == "left") imgStyle = "float:left;" + imgStyle 
          if (img.align == "right") imgStyle = "float:right;" + imgStyle 
          if (img.parentElement.href) imgStyle = "cursor:pointer;" + imgStyle 
          var strNewHTML = "<span " + imgID + imgClass + imgTitle 
          + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";" 
          + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" 
          + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>" 
          img.outerHTML = strNewHTML 
       } 
}
function _checkForm(obj)
{
	//如果form对象不为空，继续执行校验过程，否则提示错误信息,返回false
	if(obj!=null){
		errMessage="";
		_verify(obj);
	}else{
		_showMessage('校验错误，输入的校验对象为空，请检查代码书写是否正确，注意字符大小写！');
		return false;
	}
	
	//如果出错信息串不为空,则显示出校验信息,同时返回false
	if(errMessage.trim()!=null&&errMessage.trim()!='')
	{
		//document.write('q'+errMessage.trim()+'q');
		divAlert(errMessage.trim());
		return false;
	}else//如果出错信息串为空，则表示校验通过，返回true
	{
		return true;
	}
	
}
/**
显示校验信息
*/
function _showMessage(msg)
{

	errMessage = errMessage+'\n'+msg;
	divAlert(errMessage);
}
/**
追加校验信息
*/
function appendShowMessage(msg)
{
	if(errMessage==""){
		errMessage =errMessage+'\n'+msg;
	}

	
}
function _verify(objs)
{
	//获得form中包含的input标签
	var iup = $("input");//objs.tags("input");
	
	//操作过程是否成功标记位
	var operatorFlag = false;
	//保存校验信息
	var verifyInfo = "";
	//循环遍历input对象数组，取得每一对象，然后调用校验方法（文本区域的校验方法）
	for(var i=0;i<iup.length;i++)
	{
		//获得input对象
		var inputTemp = iup[i];
		var inputType = inputTemp.getAttribute("type");
		if(inputType!=null){
			inputType = inputType.toLowerCase();
		}
		if(inputType=="text")
		{
			if (!_checkFile(inputTemp)) {
				break;
			}
			//alert(operatorFlag);
		}
	}
	//循环遍历input对象数组，取得每一对象，然后调用校验方法（按钮(BUTTON)的校验方法）
	for(var i=0;i<iup.length;i++)
	{
		//获得input对象
		var inputTemp = iup[i];
		var inputType = inputTemp.getAttribute('type');
		if(inputType!=null){
			inputType = inputType.toLowerCase();
		}
		if(inputType=='button')
		{
			disableButton(inputTemp);
		}
	}
	//add by zhaoyf 2010-07-02 增加textarea校验
	//获得form中包含的input标签
	var textareas = $("input");//objs.tags("textarea");
	//操作过程是否成功标记位
	//var operatorFlag = false;
	//保存校验信息
	//var verifyInfo = "";
	//alert(inputs.length);
	//循环遍历input对象数组，取得每一对象，然后调用校验方法（文本区域的校验方法）
	for(var i=0;i<textareas.length;i++)
	{
		//获得input对象
		var textareasTemp = textareas[i];
		//var inputType = inputTemp.getAttribute('type')
		//inputType = inputType.toLowerCase();
		//if(inputType=='text')
		//{
			//alert(k);
			if (!_checkFile(textareasTemp)) {
				break;
			}
			//alert(operatorFlag);
		//}
	}
	
	
	
}
/**
//校验按钮
function verifyButton(obj){
	//获得form中包含的input标签
	var inputs = obj.tags("input");
	
	//循环遍历input对象数组，取得每一对象，然后调用校验方法（按钮(BUTTON)的校验方法）
	for(var i=0;i<inputs.length;i++)
	{
		//获得input对象
		var inputTemp = inputs[i];
		var inputType = inputTemp.getAttribute('type')
		inputType = inputType.toLowerCase();
		if(inputType=='button')
		{
			disableButton(inputTemp);
		}
	}
}
**/
//执行校验函数
/*
function _checkFile(obj)
{
		//获得校验类型
		var verifyType = obj.getAttribute("fileType");//.value;
		//获得域名称
		var verifyName= obj.getAttribute("fileName");//obj.fileName.value;
		try
		{
			//如果校验类型为空或没有书写校验属性，则不对其进行校验
			if(verifyType!=null)
			{
				var functionName = verifyType+'Verify(obj);';
				resultStr =  eval(functionName);
				//校验失败
				if(resultStr!=success)
				{
					appendShowMessage('['+verifyName+']'+resultStr);
				}else
				{
					//校验通过，不执行任何操作
				}
			}
		}catch(e)
		{
			appendShowMessage('校验错误，输入的校验对象为空，请检查代码书写是否正确，注意字符大小写！');
			return false;
		}
	
}*/
//执行校验函数,校验文本区域
function _checkFile(obj)
{
		obj.value=obj.value.trim();
		//获得校验类型
		var verifyType = obj.getAttribute("fileType");//.value;
		// 默认除"非空校验"外，其他校验只有在有输入信息时才进行校验。
		// 增加 nullable 属性为了是辅助实现，必填且要对所输信息进行数据有效性校验的功能。
		var nullable = obj.getAttribute("nullable");//.value;
		//获得域名称
		var verifyName= obj.getAttribute("fileName");//obj.fileName.value;
		//获得域的长度
		var verifyLength= obj.getAttribute("fileLength");
		var resultStr = success;
		var lengthInfo = success;
		try
		{
			//如果校验类型为空或没有书写校验属性，则不对其进行校验
			if(verifyType!=null)
			{
				if (verifyType == "notNull") {// 如果是非空校验，直接校验
					var functionName = verifyType+'Verify(obj);';
					resultStr =  eval(functionName);
				} else {// 不是非空校验
					if (nullable == "no") {// 必填且需要进行数据有效性检测
						var functionName = "notNull"+'Verify(obj);';
						resultStr =  eval(functionName);
						
						if(resultStr!="不能为空！"){
							
							functionName2 = verifyType+'Verify(obj);';
							resultStr =  eval(functionName2);
						}
						
					} else {// 非必填
					
						if (obj.value != "") {
						// 只有在填写数据时菜进行数据有效性校验
							var functionName = verifyType+'Verify(obj);';
							resultStr =  eval(functionName);
						}
					}
				}
			}
			// 如果校验长度为空或没有书写校验属性，则不对其进行校验
			if(verifyLength!=null && !isNaN(parseInt(verifyLength)) && parseInt(verifyLength) > 0){
				lengthInfo = checkLength(obj);
			}
			
			
			//校验失败
			if(resultStr!=success&&lengthInfo!=success)
			{
				appendShowMessage('['+verifyName+']'+resultStr+lengthInfo);
				//obj.focus();
				return false;
			}else if(resultStr!=success && lengthInfo==success){
				appendShowMessage('['+verifyName+']'+resultStr);
				//obj.focus();
				return false;
			}else if(resultStr==success && lengthInfo!=success){
				appendShowMessage('['+verifyName+']'+lengthInfo);
				//obj.focus();
				return false;
			}else{
				//校验通过，不执行任何操作
				return true;
			}
		}catch(err)
		{
			appendShowMessage('校验错误，输入的校验对象为空，请检查代码书写是否正确，注意字符大小写！');
			return false;
		}
	
}
//校验文本输入区域的长度
function checkLength(obj){
	var content=obj.value;
	var verifyLength= obj.getAttribute("fileLength");
	var textLength=content.length;
	if (textLength != null) {
		if(content.getByte()> parseInt(verifyLength)){
			return "文本域的长度超过"+verifyLength+"个字符";
		}
	}
	return success;
}
//使按钮BUTTON置灰
function disableButton(obj){
	//获得校验类型
	var verifyType = obj.getAttribute("fileType");
	try
	{
		//如果校验类型为空或没有书写校验属性，则不对其进行校验
		if(verifyType!=null)
		{
			var buttonName = obj.getAttribute("name");
			document.getElementById(buttonName).disabled = true;
		}
	}catch(e)
	{
		alert('操作失败，请重试！');
		return;
	}
}

function Verify(obj)
{
	return success;
}

function test(){  
    var file = document.getElementById('file');  
    file.onchange = function (){    
        var filePath = document.getElementById("file").value;     
        document.getElementById("paths").value=filePath;
    };  
    if(document.all){  
          file.click();  
     }  
     else{  
         var evt =  document.createEvent("MouseEvents");   
         evt.initEvent("click", true, true);  
         file.dispatchEvent(evt);  
     }  
}  
