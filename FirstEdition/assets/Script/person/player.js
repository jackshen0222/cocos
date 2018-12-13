var com = require('window')
cc.Class({
    extends: cc.Component,

    properties: {
        maxMoveSpeed: 0,
    },

    onLoad: function () {

        var number = com.player.HP
        this.node.children[0]._components[0].string = "hp:" + number

        this.accLeft = false
        this.accRight = false
        this.accUp = false
        this.accDown = false
        this.xSpeed = 0
        this.ySpeed = 0
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

    },


    onKeyDown(event) {

        switch (event.keyCode) {
            case cc.KEY.a:
                this.accLeft = true;
                break;
            case cc.KEY.d:
                this.accRight = true;
                break;
            case cc.KEY.w:
                this.accUp = true;
                break;
            case cc.KEY.s:
                this.accDown = true;
                break;
        }
    },

    onKeyUp(event) {

        switch (event.keyCode) {
            case cc.KEY.a:
                this.accLeft = false;
                break;
            case cc.KEY.d:
                this.accRight = false;
                break;
            case cc.KEY.w:
                this.accUp = false;
                break;
            case cc.KEY.s:
                this.accDown = false;
                break;

        }
    },

    update: function (dt) {
        if (this.accLeft) {
            this.xSpeed -= com.player.accel * dt;
        }
        if (this.accRight) {
            this.xSpeed += com.player.accel * dt;
        }
        if (this.accUp) {
            this.ySpeed += com.player.accel * dt;
        }
        if (this.accDown) {
            this.ySpeed -= com.player.accel * dt;
        }




        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        if (Math.abs(this.ySpeed) > this.maxMoveSpeed) {
            this.ySpeed = this.maxMoveSpeed * this.ySpeed / Math.abs(this.ySpeed);
        }

        this.node.x += this.xSpeed * dt;
        this.node.y += this.ySpeed * dt;

        var number = com.player.HP
        this.node.children[0]._components[0].string = "hp:" + number
    },
});