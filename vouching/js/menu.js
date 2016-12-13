var def="1";
function mover(object){
	alert(object);
  var mm=document.getElementById("m_"+object);
  mm.className="m_li_a";
  if(def!=0){
    var mdef=document.getElementById("m_"+def);
    mdef.className="m_li";
  }
  var ss=document.getElementById("s_"+object);
  ss.style.display="block";
  if(def!=0){
    var sdef=document.getElementById("s_"+def);
    sdef.style.display="none";
  }
}

function mout(object){
  var mm=document.getElementById("m_"+object);
  mm.className="m_li";
  if(def!=0){
    var mdef=document.getElementById("m_"+def);
    mdef.className="m_li_a";
  }
  var ss=document.getElementById("s_"+object);
  ss.style.display="none";
  if(def!=0){
    var sdef=document.getElementById("s_"+def);
    sdef.style.display="block";
  }
}

function moutAnother(object,totalNum){
	for(var i=1;i<=totalNum;i++){
		if(i==object)
			continue;
		//主菜单
		var mm=document.getElementById("m_"+i);
		mm.className="m_li";
		//初始主菜单还原效果
		
		var mdef=document.getElementById("m_"+object);
		mdef.className="m_li_a";
		//子菜单
		var ss=document.getElementById("s_"+i);
		ss.style.display="none";
		//初始子菜单还原效果
		
		var sdef=document.getElementById("s_"+object);
		sdef.style.display="block";	
	}
	  
}
