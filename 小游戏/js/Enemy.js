function Enemy(ground) {
    //各种数据初始化
    // 敌机信息设置
    this.w = 46;
    this.h = 34;
    this.class = "enemy";
    this.bg1 = ['url("./images/enemies/enemy1.gif")','url("./images/enemies/enemy2.gif")','url("./images/enemies/boss3.gif")',
    'url("./images/enemies/enemy3.gif")','url("./images/enemies/boss1.gif")','url("./images/enemies/boss2.gif")'];
    this.bg =this.bg1[rand(0,this.bg1.length-1)];

    this.speed = 8;
    this.time = 80;
    this.enemies=null;
    this.distory=null;
    // 子弹信息设置
    this.bulleth=10;
    this.bulletw=10;
    this.bulletclass="enemybullet";
    this.bulletspeed=10;
    this.bulletbg = 'url("./images/enemyBullets/enemyBullet1.gif")';
    // 创建的子弹数组
    this.bullets=null;
    
    this.shoottime=null;
    

    //场地相关的信息
    this.ground = document.querySelector(ground);
    this.ground_width = document.querySelector(ground).getBoundingClientRect().width;
    this.ground_height = document.querySelector(ground).getBoundingClientRect().height;
    // 得到玩家飞机相关信息
    this.plane=null;
}

//生成随机数
function rand(min, max) {
    return Math.round(min + Math.random() * (max - min));
}

//创建敌机
Enemy.prototype.createEnemy = function () {
    this.enemy = document.createElement("div");
    this.enemy.classList.add(this.class);
    this.enemy.style.width = this.w + "px";
    this.enemy.style.height = this.h + "px";
    // this.enemy.style.transition = "all " + this.time / 1000 + "s";
    this.bg=this.bg1[rand(0,this.bg1.length-1)];
    this.enemy.style.backgroundImage = this.bg; //敌机款式
    this.enemy.style.backgroundSize = this.w + "px " + this.h + "px"; //敌机大小
    // console.log((this.ground_width - this.w) / this.w);
    this.enemy.style.left = rand(0, (this.ground_width - this.w) / this.w) * this.w + 'px'; //敌机水平位置
    this.enemy.style.top = -this.h + 'px';//敌机垂直位置
    this.ground.appendChild(this.enemy);
    //console.log(this.ground_height);
    // this.fly();
    //this.createEnemybullet();

}


Enemy.prototype.fly = function () {//让敌机飞起来
    let This = this;
    This.enemies = document.querySelectorAll("."+This.class);
    for(let i=0;i<This.enemies.length;i++){
        This.enemies[i].style.top =  This.enemies[i].offsetTop + This.speed + 'px';
    }
    // This.planeid = setInterval(() => {
    //     This.enemy.style.top = This.enemy.offsetTop + This.speed + 'px';
    //     This.checkEnemy();
    //     //This.enemy.style.transition = "all " + This.time / 1000 + "s";
    // }, This.time);
}


//敌机销毁
Enemy.prototype.disappear = function () {
    let This = this;
    This.enemy.remove();
}

//敌机触底销毁
Enemy.prototype.checkEnemy = function () {
    let This= this;
    This.enemies = document.querySelectorAll("."+This.class);
    // console.log(This.enemies);
    for(let i=0;i<This.enemies.length;i++){
    if(This.enemies[i].offsetTop>=This.ground_height){
        //console.log('触底');
        // This.disappear();
        This.enemies[i].remove();
    }
  } 
}

//创建子弹
Enemy.prototype.createEnemybullet=function(){
        this.enemybullet = document.createElement("div");
        this.enemybullet.style.width = this.bulletw + "px";
        this.enemybullet.style.height = this.bulleth + "px";
        this.enemybullet.classList.add(this.bulletclass);
        this.enemybullet.style.backgroundImage = this.bulletbg;
        this.enemybullet.style.backgroundSize = this.bulletw + "px " + this.bulleth + "px";
        this.enemybullet.style.top = this.enemy.offsetTop + this.h + "px";
        //console.log(this.enemy.offsetTop);
        this.enemybullet.style.left = this.enemy.offsetLeft + this.w / 2 + "px";
        this.ground.appendChild(this.enemybullet);
        this.bulletfly();
}


//让子弹飞起来
Enemy.prototype.bulletfly=function(){
    let This = this;
    This.bullets = document.querySelectorAll("."+ This.bulletclass);
    for(let i=0;i<This.bullets.length;i++){
        This.bullets[i].style.top = This.bullets[i].offsetTop + This.bulletspeed + 'px'; 
        // 让子弹有轨迹的移动
        if(This.bullets[i].offsetLeft>This.ground_width/2){
            This.bullets[i].style.left = This.bullets[i].offsetLeft -2 +"px";
        }
        if(This.bullets[i].offsetLeft<=This.ground_width/2){
            This.bullets[i].style.left = This.bullets[i].offsetLeft +2 +"px";
        }
        //当子弹运动出场地时子弹被销毁
        // console.log(This.ground_height);
        if(This.bullets[i].offsetTop>This.ground_height){
            This.bullets[i].remove();
        } 
    }
}

// 敌机子弹销毁


//敌机触底销毁
Enemy.prototype.checkEnemybullet = function () {
    let This= this;
    if(This.enemybullet.offsetTop>=This.ground_height){
        //console.log('触底');
        This.bulletdisappear(); 
    }
}

//敌机随机射击子弹
Enemy.prototype.shoot=function(){
    let This= this;
    //This.createEnemybullet();
    // console.log(This);
    This.enemy.shoot_position = rand(0, 3)*1000;
    This.shootid=setTimeout(function(){    
        This.createEnemybullet();
     },This.enemy.shoot_position);
}
