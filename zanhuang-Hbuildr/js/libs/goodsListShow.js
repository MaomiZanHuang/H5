function goodsListShow(name, event) {
	var recommendArray = []; //推荐商品数组
	this.名称 = name;
	this.项目总数 = 0;

	this.initSomeData = function(goodsName, goodsImg, goodsPrice, volume, tab) {
		var li = document.createElement('li');
		li.className = 'mui-table-view-cell mui-media mui-col-xs-6';
		//li.id = "goodsList"+this.项目总数;
		li.setAttribute("index", "" + this.项目总数); //设置项目索引
		var index = document.getElementById(this.名称).getElementsByTagName("li").length;
		li.index = index; //设置项目索引
		li.setAttribute("tag", tab); //设置项目标记
		li.innerHTML = "<div class= \"bgDiv\">\n"+
						"<img class=\"mui-media-object\" src=\"" + goodsImg + "\" onerror=\"this.src='../images/pic-null.png';this.onerror=null\"/>\n"+
						"<div class=\"mui-media-body\">\n"+
						"	<p class=\"mui-ellipsis-2\">" + goodsName + "</p>\n"+
						"	<p class=\"price-one\">¥" + goodsPrice + "</p>\n"+
						"	<p class=\"price-two\">" + volume + "</p>\n"+
						"</div>\n"+
					"</div>";

		var root = document.getElementById(this.名称);
		root.appendChild(li); //将卡片节点添加到卡片列表根节点
		this.项目总数 = this.项目总数 + 1;
	}

	//组件事件
	if(event != null) {
		mui("#" + this.名称).on("tap", "li", function() {
			var title = this.getElementsByClassName("mui-ellipsis-2")[0].innerText;
			var imgUrl = this.getElementsByClassName("mui-media-object")[0].src;
			var price = this.getElementsByClassName("price-one")[0].innerText.replace("¥", "");;
			var volume = this.getElementsByClassName("price-two")[0].innerText;
			var tag = this.getAttribute("tag");
			event(Number(this.index), title, imgUrl, price, volume,tag); //表项被单击事件，返回项目数据
		});
	}
}