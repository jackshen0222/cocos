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

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.player = cc.find('player')
    },

    start() {

    },

    update(dt) {


    },

    onCollisionEnter(other, self) {


        if (other.node.group === 'Player' && self.node.group === 'EnemyBullet') {
            self.node.destroy();

            this.player.Hp -= 10
            this.player.children[0].getComponent(cc.Label).string = this.player.Hp
            
            //player is dead
            if (this.player.Hp < 0) {
                cc.director.loadScene("GameOver");
            }

        }

    }
});
