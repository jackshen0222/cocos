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

    },

    onLoad() {
        this.player = cc.find('player')
        PlayerModule.Score = this.player.Score

    },
    // update (dt) {},

    onCollisionEnter: function (other, self) {


        //碰到障碍物
        if (other.node.group === 'Trap' && self.node.group === 'Bullet') {
            this.playerShootTrap(other, self, 50, 0)
        }
        if (other.node.group === 'Wall' && self.node.group === 'Bullet') {
            self.node.destroy();
        }
        if (other.node.group === 'Enemy' && self.node.group === 'Bullet') {
            self.node.destroy();
            this.playerShootTrap(other, self, 0, 1);
            cc.find('Canvas/score').getComponent(cc.Label).string = 'SCORE:' + this.player.Score
        }

    },

    playerShootTrap(other, self, exp, score) {
        self.node.destroy()
        other.node.hp -= this.player.BulletDemage
        other.node.children[0].getComponent(cc.Label).string = other.node.hp
        if (other.node.hp <= 0) {
            other.node.destroy();
            this.player.Exp += exp
            this.player.Score += score
        }
    },


});
