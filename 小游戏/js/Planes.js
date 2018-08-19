// 创建一个玩家飞机的构造函数
function Planes(ground) {
    // 创建玩家飞机的信息
    // 玩家飞机的宽高以及背景图片
    this.w = 46;
    this.h = 34;
    this.bgc = "url(./images/planes/plane1.gif)";
    // 玩家飞机所处位置
    this.playPlane = null;
    this.left = 250;
    this.top = 500;
    this.direction = 1;
    // 控制玩家飞机的速度
    this.speed = 20;
    // 玩家飞机被销毁时的背景图片
    this.destoryImg="url(./images/animations/destroy2/3.gif)";


    // 玩家飞机发射子弹子弹节点
    this.bullet = null;
    // 设置玩家子弹的信息
    this.bw = 16;
    this.bh = 55;
    this.bgc2 = 'url(./images/planeBullets/planeBullet1_Power1.gif)';
    this.bgSize = '60%';
    // 子弹发射的间歇调用的时间（可以控制子弹发射的速度）
    this.time = 50;
    this.bulletSpeed = 50;
    // 获得所有的子弹
    this.bullets = null;
    // 获得游戏场地的相关信息
    this.ground = document.querySelector(ground);
    this.ground_width = document.querySelector(ground).getBoundingClientRect().width;
    this.ground_height = document.querySelector(ground).getBoundingClientRect().height;
    this.createPlane();
    // this.movePlane();

    // 清除定时器的接口
    this.timer2 = 0;
    this.timer3 =0;
    this.timer4 =0;
}

//创建一个玩家飞机
Planes.prototype.createPlane = function () {
    //  创建一个元素节点
    this.playPlane = document.createElement("div");
    // 添加class类名
    this.playPlane.classList.add("plane");
    // 玩家飞机信息
    this.playPlane.style.width = this.w + "px";
    this.playPlane.style.height = this.h + "px";
    this.playPlane.style.background = this.bgc;
    this.playPlane.style.backgroundSize ="90%";
    this.playPlane.style.backgroundRepeat = "no-repeat";
    this.playPlane.style.left = this.left + "px";
    this.playPlane.style.top = this.top + "px";
    // 将玩家飞机添加到场地上
    this.ground.appendChild(this.playPlane);
}



//控制玩家飞机的移动
Planes.prototype.movePlane = function () {
    // 防止this指向改变
    let This = this;
    // console.log(This);
    let code = This.direction;
    switch (code) {
        case 1:
            // console.log(This.playPlane.offsetLeft);
            This.playPlane.style.left = This.playPlane.offsetLeft - This.speed + "px";
            // console.log(This.playPlane.offsetLeft);
            if (This.playPlane.offsetLeft <= 0) {
                This.playPlane.style.left = 0;
            }
            break;

        case 2:
            // console.log(This.playPlane.offsetLeft);
            This.playPlane.style.top = This.playPlane.offsetTop - This.speed + "px";
            if (This.playPlane.offsetTop <= 0) {
                This.playPlane.style.top = 0;
            }
            break;
        case 3:
            // console.log(This.playPlane.offsetLeft);
            This.playPlane.style.left = This.playPlane.offsetLeft + This.speed + "px";
            if (This.playPlane.offsetLeft >= This.ground_width - This.w) {
                // console.log(This.playPlane.offsetLeft);
                This.playPlane.style.left = This.ground_width - This.w + "px";
            }
            break;
        case 4:
            // console.log(This.playPlane.offsetLeft);
            This.playPlane.style.top = This.playPlane.offsetTop + This.speed + "px";
            // console.log(This.playPlane.offsetTop);
            // console.log(This.ground_height);

            if (This.playPlane.offsetTop >= This.ground_height - This.h) {
                This.playPlane.style.top = (This.ground_height - This.h) + "px";
            }

            break;
        default:
            break;
    }
}

// 玩家飞机被销毁
Planes.prototype.destory = function(){
    let This = this;
    this.playPlane.style.backgroundImage = this.destoryImg;
    this.playPlane.style.backgroundSize="100%";
    this.playPlane.style.top = this.playPlane.offsetTop+"px";
    setTimeout(function(){
        This.ground.innerHTML='';
        This.ground.innerHTML='<img class="gameover" src="./images/background/gameOverEn.gif"/>'
        //C:\Users\xu\Desktop\小游戏\images\background\gameOverEn.gif
        // This.ground.style.backgroundImage ="url(./images/background/gameOverEn.gif)";
        // This.ground.style.backgroundRepeat ="no-repeat";
        // clearInterval(This.timer2);
        // clearInterval(This.timer3);
        // clearInterval(This.timer4);

    },500)
       
}

// 创建发射的子弹
Planes.prototype.createBullet = function () {
    let This = this;
    This.bullet = document.createElement("div");
    This.bullet.style.width = This.bw + "px";
    This.bullet.style.height = This.bh + "px";
    This.bullet.classList.add("bullet");
    This.bullet.style.backgroundImage = This.bgc2;
    This.bullet.style.backgroundSize=This.bgSize;
    This.ground.appendChild(This.bullet);
    This.bullet.style.left = This.playPlane.offsetLeft + This.w /2.5 + "px";
    This.bullet.style.top = This.playPlane.offsetTop - This.bh + "px";
    // console.log((This.playPlane.offsetLeft+This.w/2));
}

// 子弹发射的功能
Planes.prototype.shot = function () {
    let This = this;
    This.bulltes = document.querySelectorAll(".bullet");
    // console.log(This.bulltes);
    for (let i = 0; i <This.bulltes.length; i++) {
        This.bullets[i].style.top = This.bullets[i].offsetTop - This.bulletSpeed + "px";
        // console.log(This.bullet.offsetTop+ This.bulletSpeed);
        // console.log(This.bullets[i].offsetTop); 
    }
}

// 删除子弹
Planes.prototype.removBullet = function(){
    let This=this;
    This.bulltes = document.querySelectorAll(".bullet");
    for (let i = 0; i < This.bulltes.length; i++) {
       
        if(This.bullets[i].offsetTop<0){
            This.bulltes[i].remove(); 
        }   
    }
}
