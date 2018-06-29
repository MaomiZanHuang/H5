mui.init({

});
var itemlist = null;
var tag;
var items;
if(mui.os.plus) {
	//手机版初始化
	mui.plusReady(function() {
		initialize();

	});
} else {
	//电脑版初始化
	window.onload = function() {
		initialize();
	}
}
var goodsid;

function initialize() {
	var extras = mui.getExtras();
	console.log("商品详细初始化.js");
	document.querySelector("#title").innerHTML = decodeURIComponent(extras.name);
	document.querySelector("#jieshao").innerHTML = decodeURIComponent(extras.name);
	document.querySelector("#jiage").innerHTML = "最低价：¥ " + decodeURIComponent(extras.price);
	document.querySelector("#xiaojie").innerHTML = decodeURIComponent(name);
	document.getElementById("Goodsimg").src = decodeURIComponent(extras.img);
	document.getElementById("purchase_img").src = decodeURIComponent(extras.img);
	goodsid = extras.goodsid;
	getGoodsDetail();
}

function getGoodsDetail() {
	mui.ajax(server + ':9101/goods/getGoodsDetail' + suffix + "?goodsId=" + goodsid, {

		dataType: 'txt', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		headers: '',
		success: function(data) {
			//转换操作.文本转json
			items = eval("(" + data + ")");
			itemlist = items.itemList;
			document.querySelector("#jieshao").innerHTML = items.goods.caption;
			document.querySelector("#details").innerHTML = items.goodsDesc.introduction;
			document.querySelector("#peisong").innerHTML = " " + items.goods.tab;
			//console.log(items.itemList.status);
			/*显示图文详情*/
			var imgItems = eval("(" + items.goodsDesc.itemImages + ")");
			for(var i = 0; i < imgItems.length; i++) {
				appendfz("#details", "<img src=\"" + imgItems[i].url + "\" width=\"100%\">");
			}
			/*显示默认的规格*/
			document.querySelector("#guige").innerHTML = items.itemList[0].title;
			appendfz("#chicuncun", '<button type="button" class="mui-btn mui-btn-grey mui-btn-outlined mui-btn-block chicun dianji" style="float: left;" tag="0">' + items.itemList[0].title + '</button>');
			document.querySelector("#xiaojie").innerHTML = items.goods.goodsName + " " + items.itemList[0].title;
			document.querySelector("#purchase_price").innerHTML = "¥ " + items.itemList[0].price + "元 或 " + items.itemList[0].integral + "积分";
			/*遍历规格*/
			for(var i = 1; i < items.itemList.length; i++) {
				appendfz("#chicuncun", '<button type="button" class="mui-btn mui-btn-grey mui-btn-outlined mui-btn-block chicun " style="float: left;" tag="' + i + '">' + items.itemList[i].title + '</button>');
			}
			tag = 0;
			/*imgList=decodeURIComponent(items.goodsDesc.introduction);
			for(var i = 0; i < imgItems.length; i++) {
				//$("#details").append('<img src="' + imgItems[i].url +  '" width="100%">'); 
				imgList += "<img src=\"" + imgItems[i].url + "\" width=\"100%\">";
			}
			document.querySelector("#details").innerHTML=imgList;*/
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	});
}

//元素追加内容
function appendfz(aid, data) {
	var str = data;
	var html = document.querySelector(aid).innerHTML;
	html += str;
	document.querySelector(aid).innerHTML = html;
}

mui("#chicuncun").on("tap", ".chicun", function() {
	var title = this.innerText;
	tag = Number(this.getAttribute("tag"));
	//更改选中规格商品信息
	document.querySelector("#purchase_price").innerHTML = "¥ " + itemlist[tag].price + "元 或 " + itemlist[tag].integral + "积分";
	document.querySelector("#xiaojie").innerHTML = name + " " + itemlist[tag].title;
	//改变选中规格样式
	document.getElementsByClassName("dianji")[0].className = "mui-btn mui-btn-grey mui-btn-outlined mui-btn-block chicun"
	this.className = "mui-btn mui-btn-grey mui-btn-outlined mui-btn-block chicun dianji"
	//赋值选中的商品
	alterNum(document.querySelector("#num").value);

});

document.getElementById('lijidinggou').addEventListener('tap', function() {
	mui.openWindow({
		url: 'order.html',
		id: 'order.html',
		extras: {
			iid:itemlist[tag].id,
			title:items.goods.goodsName,
			itemTitle:itemlist[tag].title,
			img:items.goods.smallPic,
			num:document.querySelector("#num").value,
			price:itemlist[tag].price,
			integral:itemlist[tag].integral
		},
	});
});

document.getElementById('numSub').addEventListener('tap', function() {
	var num = Number(document.querySelector("#num").value) -1;
	alterNum(num);
});
document.getElementById('numUb').addEventListener('tap', function() {
	var num = Number(document.querySelector("#num").value)+1;
	alterNum(num);
});

function alterNum(num){
	var price = itemlist[tag].price * num;
	var integral = itemlist[tag].integral * num;
	document.querySelector("#purchase_price").innerHTML = "¥ " + price.toFixed(2) + "元 或 " + integral+ "积分";
}