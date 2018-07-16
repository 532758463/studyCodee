// 小米轮播图部分


// 获取到section元素
var ban = document.getElementById("banner");
var img = ban.getElementsByTagName("img");
console.log(img.length);
// 遍历img元素，并封装成切换图片的函数
function changeImg(){
	for(var i=0;i<img.length;i++){
		img[i].className="none";
	}
}