// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html


var Trap = require('trapModule')
var PlayerModule = require('playerModule')
cc.Class({
    extends: cc.Component,

    properties: {
        squnarePre: {
            default: null,
            type: cc.Prefab,
        },
        enemyPre: {
            default: null,
            type: cc.Prefab,
        },


    },


    onLoad() {


    },


    update(dt) {

        this.SqunareSpawn(Trap.squareCount, Trap.squareHp, Trap.squareExp);
        this.EnemySpawn(PlayerModule.EnemyCount, PlayerModule.EnemyHp, PlayerModule.EnemySpeed,PlayerModule.EnemyDemage);
    },
    lateUpdate(dt) {
        this.getPlayerPos();
    },

    //获取玩家位置
    getPlayerPos() {
        var player = cc.find('player');
        var playerPosition = player.position;
        return playerPosition;
    },

    //实例化敌人 并追逐玩家
    EnemySpawn(eCount, eHp, eSpeed, eDemage) {
        var enemyPool = cc.find('enemyPool');

        if (enemyPool.childrenCount < eCount) {//敌人数量少于eCount
            var enemy = cc.instantiate(this.enemyPre);
            enemy.hp = eHp;
            enemy.children[0].getComponent(cc.Label).string=enemy.hp
            enemy.eDemage = eDemage;
            enemyPool.addChild(enemy);
            enemy.position = this.randomPosition();
        }

        //如果敌人存在，
        //取每个敌人的位置，当前玩家的位置，获取向量方向，移动距离
        //最后为每个敌人位置 累加 当前移动距离
        if (enemyPool.childrenCount > 0) {
            enemyPool.children.forEach((v, i) => {
                var EnemyAutoMove = cc.pMult(cc.pNormalize(cc.pSub(this.getPlayerPos(), v.position)), eSpeed)
                v.position = cc.pAdd(EnemyAutoMove, v.position)
            })
        }
    },


    //实例化正方形
    SqunareSpawn(sCount, sHp, sExp) {

        var trapPoolSquare = cc.find('trapPool')//场景

        if (trapPoolSquare.childrenCount < sCount) {
            var trapSquare = cc.instantiate(this.squnarePre)
            trapSquare.exp = sExp;
            trapSquare.hp = sHp;
            trapSquare.children[0].getComponent(cc.Label).string=trapSquare.hp
            trapPoolSquare.addChild(trapSquare)
            trapSquare.position = this.randomPosition();
        }

    },

    randomPosition() {

        let originPosition = null; //随机位置 480 320  720 480 1440*960
        if (Math.random() >= 0.5) {
            originPosition = cc.v2(Math.random() * 820 + 180, Math.random() * 400 + 400);
        } else {
            originPosition = cc.v2(Math.random() * 920 + 380, Math.random() * 400 + 120);
        }

        return originPosition
    },

});


// module.exports=this.EnemySpawn();