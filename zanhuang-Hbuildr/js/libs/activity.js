function activity(name, event) {
	var recommendArray = []; //推荐商品数组
	this.aname = name;
	this.anum = 0;

	this.add = function(title,caption,img) {
		var li = document.createElement('li');
		li.className = 'mui-table-view-cell mui-media mui-col-xs-6';
		var index = document.getElementById(this.aname).getElementsByTagName("li").length;
		li.index = index; //设置项目索引
		//li.setAttribute("tag", tab); //设置项目标记
		li.innerHTML = "<div class=\"mui-media-body\" style=\"position: absolute; background:#FFFFFF; top:25%; color:#000000;  height:35%; margin-top:0%; width:115px; font-family:'黑体'; font-size: 16px;\">" + title + "</div>\n"+
						"<div class=\"mui-media-body1\" style=\"position: absolute; background:#FFFFFF; top:65%; color:#AAAAAA;  height:35%; margin-top:0%; width:115px; font-family:'微软雅黑'; font-size: 10px;\">" + caption + "</div>\n"+
						"<img class=\"mui-media-object\" src=\" " + img + "\" style=\"width: 40px; margin-left: 100px;\">";

		var root = document.getElementById(this.aname);
		root.appendChild(li); //将卡片节点添加到卡片列表根节点
		this.anum = this.anum + 1;
	}

	//组件事件
	if(event != null) {
		mui("#" + this.aname).on("tap", "li", function() {
			var title = this.getElementsByClassName("mui-media-body")[0].innerText;
			var imgUrl = this.getElementsByClassName("mui-media-object")[0].src;
			var caption = this.getElementsByClassName("mui-media-body1")[0].innerText;
			event(Number(this.index), title,caption,imgUrl); //表项被单击事件，返回项目数据
		});
	}
}