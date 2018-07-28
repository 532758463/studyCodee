// 小米轮播图部分


// 获取到section元素
var ban = document.getElementById("banner");
var img = ban.getElementsByTagName("img");
// console.log(img.length);
// 遍历img元素，并封装成切换图片的函数
var index=0,size=img.length;
function changeImg(){
	for(var i=0;i<img.length;i++){
		img[i].className="none";
	}
	img[index].className="active";
}


// 上一张图片切换
var pre = document.getElementById("pre");
pre.onclick=function(){
	index--;
	if(index>size-1){
		index=0;	
	}else if(index<0){
		index=size-1;
	}
	changeImg();
}
// 下一张图片切换
var next = document.getElementById("next");
next.onclick = function(){
	index++;
	if(index>size-1){
		index=0;
	}else if(index<0){
		index=size-1;
	}
	changeImg();
}

// 圆点导航
var dots = document.querySelectorAll(".dots");
// console.log(dots);
// 使用匿名函数的目的是为了获得即时的i值
for(var i=0;i<dots.length;i++){
	(function(num){
		dots[num].onclick=function(){
		index=num;
		changeImg();
	}
	})(i)
}

// 图片定时轮播
setInterval(function(){
	index++;
	if(index>size-1){
		index=0;
	}else if(index<0){
		index=size-1;
	}
	changeImg();
},2000)

