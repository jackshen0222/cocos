// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var com = require('window')
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var number = com.enemy.HP
        this.node.children[0]._components[0].string = "hp:" + number
    },


    move() {
        this.playerPos = cc.find('player').getPosition()
        this.enemyPos = cc.find('enemy').getPosition()
        this.playerV2 = cc.v2(this.playerPos)
        this.enemyV2 = cc.pMult(cc.pNormalize(cc.pSub(this.playerV2, this.enemyPos)), 100)
        this.mouveByenemy = cc.moveBy(8, this.enemyV2)
        this.node.runAction(this.mouveByenemy)
    },
    start() {

    },

    update(dt) {
        var number = com.enemy.HP
        this.node.children[0]._components[0].string = "hp:" + number
    },
    onEnable() {
        this.schedule(() => {
            this.move()
        }, 1.5);
    },
});