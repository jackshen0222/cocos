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
        moveSpeed: {
            default: null,
            type: cc.Button
        },
        bulletSize: {
            default: null,
            type: cc.Button
        },
        bulletSpeed: {
            default: null,
            type: cc.Button
        },
        energy: {
            default: null,
            type: cc.Label
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var number = com.energy
        this.energy.string = "energy:"+number

        this.moveSpeed.node.on(cc.Node.EventType.TOUCH_START, () => {
            com.player.accel += 10
        }, this)
        this.bulletSize.node.on(cc.Node.EventType.TOUCH_START, () => {
            com.bullet.size.x += 10
            com.bullet.size.y += 10
        }, this)
        this.bulletSpeed.node.on(cc.Node.EventType.TOUCH_START, () => {
            com.bullet.speed -= 1
        }, this)
    },

    start() {

    },

     update (dt) {
        var number = com.energy
        this.energy.string = "energy:"+number
     },
});