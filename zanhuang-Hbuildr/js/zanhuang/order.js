//监听QQ输入框内容获取头像
var entity = {
	receiverMessage: {}
};

function qq(e) {
	document.getElementById('headportrait').src = "http://q1.qlogo.cn/g?b=qq&nk=" + document.getElementById('qq').value + "&s=100&t=1449411350"
}
var extras
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

function initialize() {
	extras = mui.getExtras();
	console.log(extras.iid);
	document.getElementById("itemImg").src = decodeURIComponent(extras.img);
	document.querySelector("#itemName").innerHTML = decodeURIComponent(extras.title);
	document.getElementById("itemNum").innerHTML = "数量：" + extras.num;
	document.querySelector("#itemSpecName").innerHTML = "规格：" + decodeURIComponent(extras.itemTitle);

	entity.paymentType = "1";
	money();
}
mui("#chicuncun").on("tap", ".chicun", function() {
	var tag = Number(this.getAttribute("tag"))
	entity.paymentType = tag;
	document.getElementsByClassName("dianji")[0].className = "mui-btn mui-btn-grey mui-btn-outlined mui-btn-block chicun";
	this.className = "mui-btn mui-btn-grey mui-btn-outlined mui-btn-block chicun dianji";
	money();
});

function money() {
	if(entity.paymentType == "1") {
		var price = extras.price * extras.num;
		document.querySelector("#itemPrice").innerHTML = "¥ " + price.toFixed(2) + "元";
		document.querySelector("#totalMoney").innerHTML = "¥ " + price.toFixed(2) + "元";
		document.querySelector("#should").innerHTML = "¥ " + price.toFixed(2) + "元";
	}
	if(entity.paymentType == "2") {
		document.querySelector("#itemPrice").innerHTML = extras.integral * extras.num + "积分";
		document.querySelector("#totalMoney").innerHTML = extras.integral * extras.num + "积分";
		document.querySelector("#should").innerHTML = extras.integral * extras.num + "积分";
	}
}
document.getElementById('submitOrder').addEventListener('tap', function() {
	console.log("66666");
	entity.receiverMessage.qq = document.getElementById('qq').value;
	entity.buyerMessage = document.getElementById('beizhu').value;


    $.ajax({
        type: "POST",
        url: "http://localhost:9101/order/add3.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(entity),
        dataType: "text",
        success: function (message) {
            if (message > 0) {
                alert("请求已提交！我们会尽快与您取得联系");
            }
        },
        error: function (message) {
            $("#request-process-patent").html("提交数据失败！");
        }
    });


function GetJsonData() {
    var json = {
        "classid": 2,
        "name": $("#tb_name").val(),
        "zlclass": "测试类型1,测试类型2,测试类型3",
        "pname": $("#tb_contact_people").val(),
        "tel": $("#tb_contact_phone").val()
    };
    return json;
}



});