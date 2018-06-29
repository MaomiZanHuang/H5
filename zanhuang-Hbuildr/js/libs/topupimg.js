function topupimg(name, event,event1) {
	//name表示组件在被创建时的名称，event表示组件拥有的事件
	//如果组件有多个事件，可以在后面继续填写这些事件名称
	//例如：function 顶部图形导航(name,event1,event2,event3){

	//组件内部属性，仅供组件内部使用：
	this.pname = name;
	this.pnum = 0;

	//组件命令：
	this.add = function(imgUrl, title, color, identification) {
		var li = document.createElement("li");
		li.className = "mui-table-view-cell mui-media mui-col-xs-3";
		var index = document.getElementById(this.pname).getElementsByTagName("li").length;
		li.index = index; //设置项目索引

		li.innerHTML = "<a class=\"shoudan\"><img class=\"mui-media-object\" src=\"" + imgUrl + "\" style=\"position:relative; width: 40px;\"></a>\n" +
			"<div class=\"title\" style=\"margin-top:1px; color:" + color + "; font-size: 9px;\">" + title + "</div>";

		var img = document.createElement("img");
		img.className = "zanhuang-img";
		//img.style="width: 100%;";
		img.src = "../images/da.jpg"
		var root = document.getElementById(this.pname);
		root.appendChild(li); //将卡片节点添加到卡片列表根节点
		if(identification != 0) {
			root.appendChild(img); //将卡片节点添加到卡片列表根节点
		}
		this.pnum = this.pnum + 1;
	}

	//组件命令：
	this.取标题 = function() {
		return document.getElementById(this.pname).innerHTML;
	}

	//组件命令：
	this.置可视 = function(value) {
		if(value == true) {
			var div = document.getElementById(this.pname).parentNode;
			div.style.display = "block"; //显示	                
		} else {
			var div = document.getElementById(this.pname).parentNode;
			div.style.display = "none"; //不占位隐藏               
		}
	}

	//组件命令：
	this.置可视2 = function(value) {
		if(value == true) {
			var div = document.getElementById(this.pname).parentNode;
			div.style.visibility = "visible"; //显示	                
		} else {
			var div = document.getElementById(this.pname).parentNode;
			div.style.visibility = "hidden"; //占位隐藏               
		}
	}

	//组件事件
	if(event != null) {
		mui("#" + this.pname).on("tap", "li", function() {
			var title = this.getElementsByClassName("title")[0].innerText;
			event(Number(this.index), title); //表项被单击事件，返回项目数据
		});
		
	}
	//组件事件
	if(event1 != null) {
		mui("#" + this.pname).on("tap", ".zanhuang-img", function() {
			//var title = this.getElementsByClassName("zanhuang-img")[0].innerText;
			event(Number(1)); //表项被单击事件，返回项目数据
		});
	}
}