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
        player: {
            default: null,
            type: cc.Node
        },

        btFather: {
            default: null,
            type: cc.Node
        },

        btHealth: {
            default: null,
            type: cc.Button
        },
        btRecover: {
            default: null,
            type: cc.Button
        },
        btSpeed: {
            default: null,
            type: cc.Button
        },
        btRange: {
            default: null,
            type: cc.Button
        },
        btDemage: {
            default: null,
            type: cc.Button
        },
        btShootRate: {
            default: null,
            type: cc.Button
        },
        btShootSpeed: {
            default: null,
            type: cc.Button
        },

        IdleLable: {
            default: null,
            type: cc.Label
        },
        upgradeCountLable: {
            default: null,
            type: cc.Label
        },


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.player.Hp = PlayerModule.Health;
        this.player.HpRecover = PlayerModule.HpRecover;
        this.player.MoveSpeed = PlayerModule.PlayerMoveingSpeed;

        this.player.BulletRange = PlayerModule.BulletDistance;
        this.player.BulletDemage = PlayerModule.BulletDemage;
        this.player.BulletSpeed = PlayerModule.BulletSpeed;
        this.player.BulletReload = PlayerModule.BulletReload;

        this.player.Exp = PlayerModule.Exp
        this.player.Score = PlayerModule.Score

        this.Upgrade();



    },

    start() {

        this.playerHpRecoverFunc();//每秒回血

    },

    update(dt) {

        if (this.player.Exp >= 100) {
            this.btFather.active = true
            this.upgradeCountLable.string = 'COUNT:' + Math.floor(this.player.Exp / 100)
        }
        if (this.player.Exp < 100) {
            this.btFather.active = false
        }
        this.player.children[0].getComponent(cc.Label).string = this.player.Hp;

        if (this.btFather.childrenCount <= 2) {
            this.IdleLable.string = 'Top Level'
            this.upgradeCountLable.node.active = false;
            this.btFather.active = true
        }

    },


    playerHpRecoverFunc() {
        this.schedule(() => {
            this.player.Hp += this.player.HpRecover
            if (this.player.Hp > PlayerModule.Health) {
                this.player.Hp -= this.player.HpRecover
                if (PlayerModule.Health !== this.player.Hp) {
                    this.player.Hp = PlayerModule.Health
                }
            }

        }, 1)
    },

    Upgrade() {

        this.btHealth.node.on(cc.Node.EventType.TOUCH_END, () => {//Hp
            this.player.Exp -= 100
            PlayerModule.EnemyHp += 5
            if (this.player.Hp >= 1000) {
                this.btHealth.node.destroy()
            }
            PlayerModule.Health += 40
            this.player.Hp = PlayerModule.Health
        });

        this.btRecover.node.on(cc.Node.EventType.TOUCH_END, () => {//Hp recover
            this.player.Exp -= 100
            PlayerModule.EnemyHp += 10
            PlayerModule.EnemyDemage += 1
            if (this.player.HpRecover >= 45) {
                this.btRecover.node.destroy()
            }
            this.player.HpRecover += 5;
            PlayerModule.HpRecover = this.player.HpRecover
        });
        this.btSpeed.node.on(cc.Node.EventType.TOUCH_END, () => {//player speed
            this.player.Exp -= 100
            PlayerModule.EnemySpeed += 0.3
            if (this.player.MoveSpeed >= 10) {
                this.btSpeed.node.destroy()
                return
            }
            this.player.MoveSpeed += 0.5
            PlayerModule.PlayerMoveingSpeed = this.player.MoveSpeed
            if (PlayerModule.StickSpeed >= 5.5)
                return
            PlayerModule.StickSpeed += 0.2
            // console.log(`player speed is ${this.player.MoveSpeed}`)
        });
        this.btRange.node.on(cc.Node.EventType.TOUCH_END, () => {//bullet range
            this.player.Exp -= 100
            PlayerModule.EnemyCount += 0.34
            if (this.player.BulletRange >= 2000) {
                this.btRange.node.destroy()
            }
            this.player.BulletRange += 100;
            PlayerModule.BulletDistance = this.player.BulletRange;
            this.player.BulletSpeed += 0.25;
            PlayerModule.BulletSpeed = this.player.BulletSpeed;
            // console.log(`bullet range ${this.player.BulletRange}`)
        });
        this.btDemage.node.on(cc.Node.EventType.TOUCH_END, () => {//bullet demage
            this.player.Exp -= 100
            PlayerModule.EnemyHp += 5;
            if (this.player.BulletDemage >= 100) {
                this.btDemage.node.destroy()
            }
            this.player.BulletDemage += 10
            PlayerModule.BulletDemage = this.player.BulletDemage
        });
        this.btShootRate.node.on(cc.Node.EventType.TOUCH_END, () => {//bullet shooting speed
            this.player.Exp -= 100
            if (this.player.BulletReload < 0.15) {
                this.btShootRate.node.destroy()
            }
            this.player.BulletReload -= 0.05
        });
        this.btShootSpeed.node.on(cc.Node.EventType.TOUCH_END, () => {//bullet moving speed
            this.player.Exp -= 100
            PlayerModule.EnemySpeed += 0.09
            if (this.player.BulletSpeed < 0.78) {
                this.btShootSpeed.node.destroy()
            }
            this.player.BulletSpeed -= 0.08
            PlayerModule.BulletSpeed = this.player.BulletSpeed
        });


    },



});
