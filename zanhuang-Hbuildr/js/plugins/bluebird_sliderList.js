
    function slider(name,haveTitle,coloumn,functionName1,functionName2){  
        this.名称 = name;
        this.显示标题 = haveTitle;
        this.项目数量 = coloumn;

        this.置可视 = function (value){
            if(value==true){
                var div = document.getElementById(this.名称);
                div.style.display="";	                
            }else{
                var div = document.getElementById(this.名称);
                div.style.display="none"; //不占位               
            }
        } 

        this.置可视2 = function (value){
            if(value==true){
                var div = document.getElementById(this.名称);
                div.style.visibility="visible";	                
            }else{
                var div = document.getElementById(this.名称);
                div.style.visibility="hidden"; //占位               
            }
        } 

        this.置项目图片 = function (index,image){
            var img = document.getElementById(this.名称).getElementsByTagName("img");
            if(img==null){
                return;
            }
            if((img.length-2)<=index){
                return;
            }                   
            img[index+1].setAttribute("src",image); //设置项目图片
            if(index==0){
                img[img.length-1].setAttribute("src",image);//设置尾部图片
            }else if(index==(this.项目数量-1)){
                img[0].setAttribute("src",image);//设置头部图片
            } 
        }
        
        this.取项目图片 = function (index){
            var img = document.getElementById(this.名称).getElementsByTagName("img");
            if(img==null){
                return "";
            }
            if((img.length-2)<=index){
                return "";
            }
            var image = img[index+1].getAttribute("src");  
            if(image == null){
                image = "";
            }                         
            return image;
        }
        
        this.置项目标题 = function (index,title){
            if(this.显示标题!=true){
                return;
            }
            var p = document.getElementById(this.名称).getElementsByClassName("mui-slider-title");
            if(p==null){
                return;
            }
            if((p.length-2)<=index){
                return;
            }
            p[index+1].innerText=title; //设置项目标题
            if(index==0){
                p[p.length-1].innerText=title;//设置尾部标题
            }else if(index==(this.项目数量-1)){
                p[0].innerText=title;//设置头部标题
            }                  
        }
        
        this.取项目标题 = function (index){
            if(this.显示标题!=true){
                return "";
            }        
            var p = document.getElementById(this.名称).getElementsByClassName("mui-slider-title");
            if(p==null){
                return "";
            }
            if((p.length-2)<=index){
                return "";
            }         
            var title = p[index+1].innerText;
            title = title.replace(/(^\n*)|(\n*$)/g, ""); //去掉首尾的换行符
            return title;
        }
       
        this.置轮播周期 = function (time){
            var slider = mui("#" + this.名称);
            slider.slider({
                interval: time
            });            
        }
 
        this.置全屏模式 = function (){
            var slider = document.getElementById(this.名称);
            slider.className="mui-slider mui-fullscreen";       
        }
 
        if(functionName1!=null){
            mui('#'+this.名称).on('tap', 'a', function() {
                var index = this.getAttribute("index");  
                var img = this.getElementsByTagName("img");
                var image = img[0].getAttribute("src"); 
                var title = ""; 
                if(haveTitle==true){
                    var p = this.getElementsByClassName("mui-slider-title");
                    title = p[0].innerText;
                    title = title.replace(/(^\n*)|(\n*$)/g, ""); //去掉首尾的换行符                    
                }
                functionName1(Number(index),image,title);//表项被单击事件，返回项目索引、项目图片、项目标题              
            }); 
        }
        
        if(functionName2!=null){
            document.getElementById(this.名称).addEventListener('slide', function(event) {
                var index = event.detail.slideNumber;
                var title = "";
                if(haveTitle==true){
                    var p = this.getElementsByClassName("mui-slider-title");
                    title = p[index+1].innerText;
                    title = title.replace(/(^\n*)|(\n*$)/g, ""); //去掉首尾的换行符
                }
                var img = this.getElementsByTagName("img");
                var image = img[index+1].getAttribute("src");
                functionName2(index,image,title);//表项被切换事件，返回项目索引、项目图片、项目标题
            });       	
        }
    }  


 