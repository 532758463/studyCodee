   //当资源加载完成后再执行以下代码
   window.onload = function () {
       let timer1 = [];
       let plane = new Planes(".ground");
       // 控制玩家飞机移动的键盘事件 
       window.onkeydown = function (e) {
           // console.log(e.keyCode);
           let code = e.keyCode;
           switch (code) {
               // 左
               case 37:
                   plane.direction = 1;
                   plane.movePlane()
                   break;
                   // 上
               case 38:
                   plane.direction = 2;
                   plane.movePlane()
                   break;
                   // 右
               case 39:
                   plane.direction = 3;
                   plane.movePlane()
                   break;
                   // 下
               case 40:
                   plane.direction = 4;
                   plane.movePlane();
                   break;
                   // j键控制飞机发射事件
               case 74:
                   // 当超出游戏场地后清除子弹
                   plane.removBullet();
                   plane.createBullet();
                  
                   // console.log( plane.bullets[0].offsetTop);
                   //    clearInterval(timer1);
                   // 子弹发射后不停移动的效果
                   timer1 = setInterval(function () { 
                       plane.bullets = document.querySelectorAll(".bullet");
                       plane.shot();
                   }, plane.time);
                   
                   break;

                   // 飞机自毁装置,空格键
               case 32:
                   // console.log(plane.destory());
                   plane.destory();
                   break;
               default:
                   break;
           }
       }
       //    plane.removBullet();

       /*随机生成敌机与发射子弹的功能代码块*/
       // document.querySelector("#start").onclick = function () {
       let enemy, timer2 = 0,
           timer3 = 0,
           timer4 = 0;
       let enemybullet;
       // 创建敌机对象
       enemy = new Enemy(".ground");
       // 获取所有生成的敌机
       enemy.enemies = document.querySelectorAll(".enemy");
       // console.log(enemy.enemies)
       // 将plane对象传入敌机对象里面,方便敌机代码里面获取玩家飞机的信息 
       enemy.plane = plane;
       /*开始游戏 */
       document.querySelector("#start").onclick = function () {
           // 生成飞机与子弹
           plane.removBullet();
           clearInterval(timer2);
           clearInterval(timer3);
           clearInterval(timer4);
           timer2 = setInterval(function () {
               enemy.createEnemy();
               enemy.createEnemybullet();
               enemy.shoot();
           }, 2000);

           //  让飞机与子弹飞起来
           timer3 = setInterval(function () {
               enemy.fly();
               // 玩家飞机死亡情况
               destory.planeDestory1();
               destory.planeDestory2();
               enemy.bulletfly();
               enemy.checkEnemy();
               destory.enemyDestory();
           }, 50);

           // 改变背景图片位置，让它有种动画的效果
           let groundBgc = document.querySelector(".ground");
           let y = 0;
           timer4 = setInterval(function () {
               y = y + 4;
               groundBgc.style.backgroundPosition = "0px " + y + "px";
           }, 70)
       }
    //    plane.timer2 = timer2;
    //    console.log(timer2);
    //    console.log(plane.timer2);
    //    plane.timer3 = timer3;
    //    plane.timer4 = timer4;
       //    暂停游戏
       document.querySelector("#end").onclick = function () {
           clearInterval(timer2);
           clearInterval(timer3);
           clearInterval(timer4);
       }

       /*敌我销毁爆炸代码块*/
       // 创建销毁对象
       let destory = new Destory();
       // 将destory对象传入敌机对象
       enemy.destory = destory;
       // 传入玩家飞机对象信息到销毁对象里面
       destory.plane = plane;
       //传入敌机信息到destory对象信息里面
       destory.enemy = enemy;
       destory.ground = document.querySelector(".ground");  
   }