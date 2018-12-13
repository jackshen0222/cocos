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
        var manager = cc.director.getCollisionManager()
        manager.enabled = true
    },
    onCollisionEnter: function (other, self) {

        if (other.node.group === "enemy") {
            com.enemy.HP--
            if (com.enemy.HP < 0) {
                other.node.destroy()
            }
            other.node.children[0]._components[0].string = "hp:" + com.enemy.HP
            self.node.destroy()
        }
        if (other.node.group === "barrier") {
            other.node.destroy()
            self.node.destroy()
        }
        if (other.node.group === "ebullet") {
            other.node.destroy()
            self.node.destroy()
        }

    },
    start() {

    },

    // update (dt) {},
});