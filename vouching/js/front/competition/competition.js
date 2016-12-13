$(function() {

	// 装载竞技排行榜
	var url = "/vouching/competition/loadRank";
	var data = {
		token : $("#token").val()
	};
	var successCallback = function(data){
		var ranks = data.detail.ranks;
		$("#rankList").append("<tr></tr>");
		for (var i = 0; i < ranks.length; i++) {
			var tr = $("#rankList").children().eq(i);
			tr.append("<td class='bgbai'>"+ranks[i].name+"</td>");
			tr.append("<td class='bgbai'>"+ranks[i].credit+"</td>");
			tr.append("<td class='bgbai'>"+ranks[i].isOnlineName+"</td>");
		}
	};
	var faildCallback = function(data){
		divAlert(data.errorCode);
	};
	VCUtils.common.ajax.commonAjax(url, false, data, successCallback, faildCallback);

	// 装载竞技桌位
	loadDesk();
});

/**
 * 装载竞技桌位
 */
function loadDesk() {
	var url = "/vouching/competition/loadDesk";
	var data = {
		token : $("#token").val()
	};
	var successCallback = function(data){
		var desks = data.detail.desks;
		$("#deskList").children().remove();
		for (var i = 0; i < desks.length; i++) {
			$("#deskList").append("<tr></tr>");
			var tr = $("#deskList").children().eq(i);
			tr.append("<td height='120' align='center' valign='middle'><table border='0' cellspacing='1' cellpadding='0' class='hdbg'></table></td>");
			tr.append("<td height='120' align='center' valign='middle'><table border='0' cellspacing='1' cellpadding='0' class='hdbg'></table></td>");
			var table0 = $(tr).children().eq(0).children();
			var table1 = $(tr).children().eq(1).children();
			table0.append("<tr><td colspan='3' class='hdtitle'>小组"+(i+1)+"</td></tr>");
			table0.append();
			table0.append();
		}
	};
	var faildCallback = function(data){
		divAlert(data.errorCode);
	};
	VCUtils.common.ajax.commonAjax(url, false, data, successCallback, faildCallback);
}