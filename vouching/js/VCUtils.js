var VCUtils = {
	
	//数据模块
	datas : {
		errorUrl : "/vouching/common/forwardError",
		successFlag : "success",
		tempSumPage : 0
	},
	
	//通用模块
	common : {
		
		//提示信息
		tip : {
			loadSuccessTip : function(tip){
				$("body>div").css("filter","alpha(opacity=60)");
				$("body>div").css("opacity",0.75);
				$("body>div").css("-moz-opacity",0.75);
				$("#success").children().remove();
				$("#success").append("<i class='icon-smile-o'></i>"+tip);
				$("#success").show();
				$("#tip").show();
				VCUtils.common.tip.closeTip();
			},
			loadFaildTip : function(tip){
				$("body>div").css("filter","alpha(opacity=60)");
				$("body>div").css("opacity",0.75);
				$("body>div").css("-moz-opacity",0.75);
				$("#faild").children().remove();
				$("#faild").append("<i class='icon-frown-o'></i>"+tip);
				$("#faild").show();
				$("#tip").show();
				VCUtils.common.tip.closeTip();
			},
			closeTip : function(){
				$("#close").bind("click",function(){
					$("body>div").css("filter","alpha(opacity=100)");
					$("body>div").css("opacity",1);
					$("body>div").css("-moz-opacity",1);
					$("#success").hide();
					$("#faild").hide();
					$("#tip").hide();
				});
			}
		},
	
		//分页处理
		pager : {
			
			back : {
				//装载初始化分页
				loadPage :	function(data){
					var page = data.page;
					$("#total").text(page.total);
					$("#pageSum").text(page.pageSum);
					$("#pageNum").text(page.pageNum);
					$("#prePage").show();
					$("#nextPage").show();
					$("#headPage").show();
					$("#tailPage").show();
					
					if(page.pageNum == 1){
						$("#prePage").hide();
						$("#headPage").hide();
						$("#tailPage").hide();
					}
					if(page.pageSum == 1){
						$("#prePage").hide();
						$("#nextPage").hide();
						$("#headPage").hide();
						$("#tailPage").hide();
					}
					if(!page.hasNextPage){
						$("#nextPage").hide();
						$("#tailPage").hide();
					}
				},
				//上一页点击事件
				prePage : function(loadTable){
					$("#prePage").unbind("click");
					$("#prePage").bind("click",function(){
						var pageNum = parseInt($("#pageNum").text()) - 1;
						loadTable(pageNum);
					});
				},
				//下一页点击事件
				nextPage : function(loadTable){
					$("#nextPage").unbind("click");
					$("#nextPage").bind("click",function(){
						var pageNum = parseInt($("#pageNum").text()) + 1;
						loadTable(pageNum);
					});
				},
				//首页点击事件
				headPage : function(loadTable){
					$("#headPage").unbind("click");
					$("#headPage").bind("click",function(){
						loadTable(1);
					});
				},
				//尾页点击事件
				tailPage : function(loadTable){
					$("#tailPage").unbind("click");
					$("#tailPage").bind("click",function(){
						var pageNum = parseInt($("#pageSum").text()) - 1;
						loadTable(pageNum);
					});
				},
				registerEvent : function(loadTable){
					VCUtils.common.pager.back.prePage(loadTable);
					VCUtils.common.pager.back.nextPage(loadTable);
					VCUtils.common.pager.back.headPage(loadTable);
					VCUtils.common.pager.back.tailPage(loadTable);
				},
			},
			
			front : {
				//装载初始化分页
				loadPage :	function(data){
					var page = data.page;
					$("#total").text(page.total);
					$("#pageSum").text(page.pageSum);
					$("#pageNum").text(page.pageNum);
					$("#prePage").show();
					$("#nextPage").show();
					if(page.pageNum == 1){
						$("#prePage").hide();
					}
					if(page.pageSum == 1){
						$("#prePage").hide();
						$("#nextPage").hide();
					}
					if(!page.hasNextPage){
						$("#nextPage").hide();
					}
				},
				//上一页点击事件
				prePage : function(loadTable){
					$("#prePage").unbind("click");
					$("#prePage").bind("click",function(){
						var pageNum = parseInt($("#pageNum").text()) - 1;
						loadTable(pageNum);
					});
				},
				//下一页点击事件
				nextPage : function(loadTable){
					$("#nextPage").unbind("click");
					$("#nextPage").bind("click",function(){
						var pageNum = parseInt($("#pageNum").text()) + 1;
						loadTable(pageNum);
					});
				},
				registerEvent : function(loadTable){
					VCUtils.common.pager.front.prePage(loadTable);
					VCUtils.common.pager.front.nextPage(loadTable);
				},
				
				//装载初始化分页
				loadPage1 :	function(data){
					var page = data.page;
					$("#total1").text(page.total);
					$("#pageSum1").text(page.pageSum);
					$("#pageNum1").text(page.pageNum);
					$("#prePage1").show();
					$("#nextPage1").show();
					if(page.pageNum == 1){
						$("#prePage1").hide();
					}
					if(page.pageSum == 1){
						$("#prePage1").hide();
						$("#nextPage1").hide();
					}
					if(!page.hasNextPage){
						$("#nextPage1").hide();
					}
				},
				//上一页点击事件
				prePage1 : function(loadTable){
					$("#prePage1").unbind("click");
					$("#prePage1").bind("click",function(){
						var pageNum = parseInt($("#pageNum1").text()) - 1;
						loadTable(pageNum);
					});
				},
				//下一页点击事件
				nextPage1 : function(loadTable){
					$("#nextPage1").unbind("click");
					$("#nextPage1").bind("click",function(){
						var pageNum = parseInt($("#pageNum1").text()) + 1;
						loadTable(pageNum);
					});
				},
				registerEvent1 : function(loadTable){
					VCUtils.common.pager.front.prePage1(loadTable);
					VCUtils.common.pager.front.nextPage1(loadTable);
				}
			},
		},
		
		//表格操作
		table : {
			
			simpleTable : function(tbodyId,id,data,columnNames,action){
				$("#" + tbodyId).children().remove();
				var tbody = $("#" + tbodyId);
				for (var i = 0; i < data.length; i++) {
					tbody.append("<tr></tr>");
					var tr = tbody.children().eq(i);
					if (id != null) {
						tr.append("<td><input type='checkbox' value='" + eval("data[" + i + "]." + id) + "' /></td>");
					}
					for (var j = 0; j < columnNames.length; j++) {
						tr.append("<td>" + eval("data[" + i + "]." + columnNames[j]) + "</td>");
					}
					if (action != null) {
						var temp = "";
						for (var k = 0; k < action.id.length; k++) {
							temp += "<a id='"+action.id[k]+"' href='javascript:;' class='tablelink'>  "+action.name[k]+"</a>";
						}
						tr.append("<td>" + temp + "</td>");
					}
				}
			}
		},
		
		//AJAX操作
		ajax : {
			commonAjax : function(url,async,data,successCallback,faildCallback){
				var formatData = {params : data};
				if (data == null) {
					var temp = { unused : "" };
					formatData = { params : temp };
				}
				$.ajax({
					type : "post",
					url : url,
					async: async,
					dataType:'json',
					contentType:'application/json',
					data : JSON.stringify(formatData),
					success : function(data){
						if (VCUtils.datas.successFlag == data.result) {
							if (successCallback != null) {
								successCallback(data);
							}
						} else {
							if (faildCallback != null) {
								faildCallback(data);
							} else {
								VCUtils.common.tip.loadFaildTip(data.errorCode);
							}
						}
					},
					error :function(data){
						VCUtils.common.util.simpleHref(VCUtils.datas.errorUrl);
					}
				});
			}
		},
		
		//简单的工具类
		util : {

			isNotNullOrBlank : function(val){
				if (val == null || $.trim(val) == "") {
					return false;
				}
					return true;
			},
			
			simpleHref : function(url){
				window.location.href = url;
			},
			
		}
	},
	
	//登录模块
	login : {
		//修正背景图片位置
		resizeImage :function(){
			$('.loginbox').css({
				'position' : 'absolute',
				'left' : ($(window).width() - 692) / 2
			});
			$(window).resize(function() {
				$('.loginbox').css({
					'position' : 'absolute',
					'left' : ($(window).width() - 692) / 2
				});
			});
		},
		
		//登陆校验
		loginValidate : function(validateUrl,forwardUrl){
			$("#account").blur(function() {
				if (!VCUtils.common.util.isNotNullOrBlank($(this).val())) {
					$("#errorMessage").text("用户名不能为空!");
				} else {
					$("#errorMessage").text("");
				}
			});

			$("#password").blur(function() {
				if (!VCUtils.common.util.isNotNullOrBlank($(this).val())) {
					$("#errorMessage").text("密码不能为空!");
				} else {
					$("#errorMessage").text("");
				}
			});
			
			//提交表单
			$("#login").click(function(){
				var account = $("#account").val();
				var password = $("#password").val();
				var url = validateUrl;
				var data = {
					account : account,
					password : hex_md5(password)
				};
				var successCallback = function(data) {
					VCUtils.common.util.simpleHref(forwardUrl);
				};
				var faildCallback = function(data) {
					$("#errorMessage").text(data.errorCode);
				};
				VCUtils.common.ajax.commonAjax(url,false,data,successCallback,faildCallback);
			});
		} 
	},
	
};