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

        scoreLabel: {
            default: null,
            type: cc.Label
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.scoreLabel.string = 'SCORE:' + PlayerModule.Score;
        PlayerModule.Health = 300;
        PlayerModule.HpRecover = 5;
        PlayerModule.PlayerMoveingSpeed = 6.5;
        PlayerModule.StickSpeed = 2;
        PlayerModule.BulletDistance = 400;
        PlayerModule.BulletDemage = 20;
        PlayerModule.BulletSpeed = 1;
        PlayerModule.BulletReload = 0.5;
        PlayerModule.Exp = 0;
        PlayerModule.Score = 0;
        PlayerModule.EnemyCount = 3;
        PlayerModule.EnemyHp = 100;
        PlayerModule.EnemyDemage = 10;
        PlayerModule.EnemySpeed = 2;

    },

    start() {

    },

    // update (dt) {},
});
