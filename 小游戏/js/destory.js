
// 创建一个随机数的封装函数
function rand(min, max) {
    return Math.round(min + Math.random() * (max - min));
}

// 创建敌机子弹和玩家飞机,玩家子弹与敌机相撞时销毁的构造函数
function Destory() {
    // 传入玩家飞机与敌机信息,还有各自的子弹信息
    this.plane = null;
    this.planebulltes = null;
    this.enemybullets = null;
    this.enemy = null;
    this.ground = null;
    // 留一个记录分数的接口
    this.record = document.querySelector(".scores");;
    // 分数
    this.scores = 0;
    // 传入碰撞销毁的背景图片
    this.bg = ["url(./images/animations/destroy1/1.gif)", "url(./images/animations//destroy1/2.gif)", "url(./images/animations//destroy1/3.gif)", "url(./images/animations//destroy1/4.gif)"];
    this.bgc = null;
}

// 判断玩家飞机与敌相撞的情况(玩家飞机爆炸,敌机保持原状)
Destory.prototype.planeDestory1 = function () {
    this.enemy.enemies = document.querySelectorAll(".enemy");
    // console.log(this.enemy);
    for (let i = 0; i < this.enemy.enemies.length; i++) {
        if (this.plane.playPlane.offsetTop >= this.enemy.enemies[i].offsetTop - 32 && this.plane.playPlane.offsetTop <= this.enemy.enemies[i].offsetTop + 32 &&
            this.plane.playPlane.offsetLeft >= this.enemy.enemies[i].offsetLeft - 44 && this.plane.playPlane.offsetLeft <= this.enemy.enemies[i].offsetLeft + 44) {
            // console.log(4);
            this.plane.destory();
        }
    }
}

// 判断敌机子弹与玩家飞机相撞的情况
Destory.prototype.planeDestory2 = function () {
    // 获得敌机子弹信息
    this.enemy.enemybullets = document.querySelectorAll(".enemybullet");
    // console.log(this.enemy.enemybullets);
    for (let i = 0; i < this.enemy.enemybullets.length; i++) {
        // console.log( this.enemy.enemybullets[i].offsetLeft);
        if (this.plane.playPlane.offsetTop >= this.enemy.enemybullets[i].offsetTop - this.enemy.bulleth && this.plane.playPlane.offsetTop <= this.enemy.enemybullets[i].offsetTop + this.enemy.bulleth &&
            this.enemy.enemybullets[i].offsetLeft <= this.plane.playPlane.offsetLeft + this.plane.w && this.enemy.enemybullets[i].offsetLeft >= this.plane.playPlane.offsetLeft) {
            this.plane.destory();
        }
    }
}

// 玩家飞机子弹射中敌机,敌机销毁
Destory.prototype.enemyDestory = function () {
    let timer2 = 0;
    // 分数记录 
    let This = this;
    // 获取所有发射的子弹
    This.planebulltes = document.querySelectorAll(".bullet");
    // console.log(This.planebulltes);
    // This.plane.shot();

    // 获取所有生成的敌人机
    This.enemy.enemies = document.querySelectorAll(".enemy");
    // console.log(this.enemy.enemies);
    // 玩家飞机子弹和敌机数量都为0时
    if (This.enemy.enemies.length == 0 || This.planebulltes.length == 0) {
        // console.log(44);
        return;
    } else {
        try {
            for (let i = 0; i < This.planebulltes.length; i++) {
                for (let j = 0; j < This.enemy.enemies.length; j++) {
                     //   玩家飞机子弹与敌机相撞的情况
                    if (This.planebulltes[i].offsetTop <= This.enemy.enemies[j].offsetTop &&
                        This.planebulltes[i].offsetLeft >= This.enemy.enemies[j].offsetLeft &&
                        This.planebulltes[i].offsetLeft <= This.enemy.enemies[j].offsetLeft + This.enemy.w) {
                        // console.log(4);
                        // this.bg1[rand(0,this.bg1.length-1)]
                        This.bgc = This.bg[rand(0, This.bg.length - 1)];
                        This.enemy.enemies[j].style.backgroundImage = This.bgc;
                        // This.plane.removBullet();
                        // this.record = document.querySelector(".scores");
                        if (This.planebulltes[i].offsetTop < 150) {
                            This.planebulltes[i].remove();
                            This.enemy.enemies[j].remove();
                            This.scores += 50;
                            This.planebulltes = document.querySelectorAll(".bullet");
                            // console.log(This.planebulltes);
                            this.record.innerHTML = This.scores;
                        }
                        // 当分数达到600以上，切换游戏场景
                        if(This.scores>=600){
                            // console.log(This.ground);
                            This.ground.style.backgroundImage ="url(./images/background/stage3.gif)";
                        }else{
                            This.ground.style.backgroundImage ="url(./images/background/stage2.gif)";
                        }
                        // 问题(会报错)说没有数组的方法   问题原因：这是因为setTimeout是一个异步的
                        // setTimeout(function(){
                        //     This.enemy.enemies[j].remove();
                        //     This.planebulltes[i].remove();
                        // },500)   
                    }
                }
            }
        } catch (e) {
            console.log(e.name);
        }

    }
}