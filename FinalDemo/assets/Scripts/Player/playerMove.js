

var PlayerModule = require('playerModule')

cc.Class({
    extends: cc.Component,

    properties: {
        _left: false,
        _right: false,
        _up: false,
        _down: false,

        ifPlayer: true,//判断是否为玩家，不是即为AI



    },

    onLoad: function () {
        cc.systemEvent.on('keydown', this.onKeyDown, this);
        cc.systemEvent.on('keyup', this.onKeyUp, this);

        cc.director.getCollisionManager().enabled = true;

    },

    update: function (dt) {

        if (this.ifPlayer) {
            let moveSpeed = PlayerModule.PlayerMoveingSpeed;
            if (this._left) { this.node.x -= moveSpeed };
            if (this._right) { this.node.x += moveSpeed };
            if (this._down) { this.node.y -= moveSpeed };
            if (this._up) { this.node.y += moveSpeed };
        }
        // if(!this.ifPlayer){
        //     let enemySpeed=PlayerModule.EnemySpeed
        //     var enemyPos=this.node.position;
        //     var playerPos=cc.find('player').position

        //     var v2 = cc.pMult(cc.pNormalize(cc.pSub(enemyPos, playerPos)), 100)
        //     var moveByV2=cc.moveBy(enemySpeed, v2)

        //     this.node.runAction(cc.moveBy(2,moveByV2))
        // }
    },

    onKeyDown: function (e) {  //在按下的时候设置方向标志位↓
        switch (e.keyCode) {
            case cc.KEY.w: { this._up = true; break; }
            case cc.KEY.s: { this._down = true; break; }
            case cc.KEY.a: { this._left = true; break; }
            case cc.KEY.d: { this._right = true; break; }
        }
    },

    onKeyUp: function (e) { //在弹起的时候解除方向标志位↓
        switch (e.keyCode) {
            case cc.KEY.w: { this._up = false; break; }
            case cc.KEY.s: { this._down = false; break; }
            case cc.KEY.a: { this._left = false; break; }
            case cc.KEY.d: { this._right = false; break; }
        }
    },





});
