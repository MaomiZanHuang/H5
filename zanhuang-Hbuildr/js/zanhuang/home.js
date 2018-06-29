mui.init({

});
var topupimg1 = new topupimg("topupimg1", topclick, imgclick);
var goodsListShow1 = new goodsListShow("goodsListShow1", goodsListClick);
var slider1 = new slider("slider", true, 3, null, null);
var activity1 = new activity("activity1", activityClick);
//初始化判断
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
//初始化
function initialize() {
	/*获取销量商品*/
	getDayVolumeGoods();
	/*获取轮播图*/
	getSliderImg();
	/*获取顶部图形导航*/
	getTopup();
	/*获取活动内容*/
	getActivity();
}
//顶部图形框被单机响应事件
function topclick(index) {
	console.log(index)
}
//顶部图形库大图单机响应事件
function imgclick(index) {
	console.log(index)
}
//商品列表被被点击事件
function goodsListClick(index, title, imgUrl, price,volume,tag) {
	/*itemlist.goodsid = tag;
	itemlist.img = imgUrl;
	itemlist.name = title;
	itemlist.price = price;
	*/
	mui.openWindow({
		url: 'viewdan.html',
		id: 'viewdan.html',
		extras: {
			goodsid:tag,
			img: imgUrl,
			name: title,
			price: price,
		},
	});
}
//活动内容被单机响应事件
function activityClick(index,title,caption,imgUrl){
	console.log(imgUrl)
}

//按日销量查询商品
function getDayVolumeGoods() {
	mui.ajax(server + ":9101/goods/findVolume" + suffix + "?size=10", {

		dataType: 'txt', //服务器返回txt格式数据
		type: 'get', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		headers: '',
		success: function(data) {
			//转换操作.文本转json
			var items = eval("(" + data + ")");
			for(var i = 0; i < items.length; i++) {
				goodsListShow1.initSomeData(items[i].goodsName, items[i].smallPic, items[i].price, "日销：" + items[i].volumeDay,items[i].id);
			}
			//console.log(data);
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	});
}

/*获取轮播图*/
function getSliderImg() {
	mui.ajax(server + ":9101/content/findByCategoryId" + suffix + "?categoryId=1", {

		dataType: 'txt', //服务器返回txt格式数据
		type: 'get', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		headers: '',
		success: function(data) {
			slider1.置轮播周期(3000);
			//转换操作.文本转json
			var items = eval("(" + data + ")");
			for(var i = 0; i < items.length; i++) {
				slider1.置项目图片(i,items[i].pic);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	});
}
/*获取顶部图形导航*/
function getTopup(){
	mui.ajax(server + ":9101/content/findByCategoryId" + suffix + "?categoryId=2", {
		dataType: 'txt', //服务器返回txt格式数据
		type: 'get', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		headers: '',
		success: function(data) {
			//转换操作.文本转json
			var items = eval("(" + data + ")");
			for(var i = 0; i < items.length; i++) {
				var transferParameters = eval("(" + items[i].transferParameters + ")");
				topupimg1.add(items[i].pic,items[i].title, transferParameters.color, transferParameters.identification);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	});
}
function getActivity(){
	mui.ajax(server + ":9101/content/findByCategoryId" + suffix + "?categoryId=3", {
		dataType: 'txt', //服务器返回txt格式数据
		type: 'get', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		headers: '',
		success: function(data) {
			//转换操作.文本转json
			var items = eval("(" + data + ")");
			for(var i = 0; i < items.length; i++) {
				var transferParameters = eval("(" + items[i].transferParameters + ")");
				activity1.add(items[i].title,transferParameters.caption,items[i].pic);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	});
}
