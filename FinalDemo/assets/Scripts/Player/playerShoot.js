// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html


var PlayerModule = require('playerModule')


cc.Class({
    extends: cc.Component,

    properties: {

        bullet: {
            default: null,
            type: cc.Prefab
        },
        player: {
            default: null,
            type: cc.Node,
        },
        autoAttackBt: {
            default: null,
            type: cc.Button
        },
        unAutoAttackBt: {
            default: null,
            type: cc.Button
        },

    },



    onLoad() {

        var canvas = cc.find('Canvas');
        canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);//点击事件
        // canvas.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchBegan, this)


        //自动攻击与取消自动攻击button
        this.autoAttackBt.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.scheduleOnce(() => { this.call() }, 0.1);
            canvas.off(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
            this.unAutoAttackBt.node.active = true;
            this.autoAttackBt.node.active = false;
        })
        this.unAutoAttackBt.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.unscheduleAllCallbacks();
            canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this)
            this.autoAttackBt.node.active = true;
            this.unAutoAttackBt.node.active = false;
        })




    },

    update(dt) {

        if (this.player.BulletReload < PlayerModule.BulletReload) {
            this.unscheduleAllCallbacks();
            this.scheduleOnce(() => { this.call() }, 0.1);
            PlayerModule.BulletReload = this.player.BulletReload
        }

    },

    onTouchBegan: function (event) {
        var scene = cc.find('bulletPool')
        var playerPos = this.player.position

        var touchLoc = event.touch.getLocation();//鼠标点击位置
        var touchV2 = cc.v2(touchLoc.x, touchLoc.y); //点转向量

        // this.scheduleOnce(()=>{},this.player.BulletReload)

        var bullet = cc.instantiate(this.bullet);
        scene.addChild(bullet);//实例化子弹
        bullet.position = playerPos;//子弹发射位置

        //计算 玩家与鼠标 两点向量, 归一化得到方向后，缩放distanceBullet 获得射击距离，
        //最后moveBy每次子弹匀速朝该方向运动
        var v2Bullet = cc.pMult(cc.pNormalize(cc.pSub(touchV2, playerPos)), this.player.BulletRange)
        var moveByBullet = cc.moveBy(this.player.BulletSpeed, v2Bullet)
        var callFunc = cc.callFunc(() => {
            if (bullet.isValid) bullet.destroy();//子弹射程，到达射程即消失
        })
        bullet.runAction(cc.sequence(moveByBullet, callFunc))

    },


    getEnemyPos() {
        var enemy = cc.find('enemyPool')
        var enemyPos
        if (enemy.childrenCount > 1) {
            enemyPos = enemy.children[0].position
        }
        return enemyPos
    },


    playerAutoAttack(enemyPosPara) {//实例化敌人子弹
        var bulletPool = cc.find('bulletPool');//子弹池
        var bullet = cc.instantiate(this.bullet);
        bulletPool.addChild(bullet);
        var playerPos = this.player.position
        bullet.position = playerPos

        var v2Bullet = cc.pMult(cc.pNormalize(
            cc.pSub(enemyPosPara, playerPos)), this.player.BulletRange)
        var moveByBullet = cc.moveBy(this.player.BulletSpeed, v2Bullet)
        var callFunc = cc.callFunc(() => { if (bullet.isValid) bullet.destroy(); })//到达射程自毁
        bullet.runAction(cc.sequence(moveByBullet, callFunc))

    },

    call() {
        this.schedule(() => {
            this.playerAutoAttack(this.getEnemyPos())
        }, this.player.BulletReload)
    },

});
