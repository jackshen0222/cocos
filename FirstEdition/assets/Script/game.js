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
        bulletPrefab: cc.Prefab,
        barrierPerfab: cc.Prefab,
        ebulletPrefab: cc.Prefab,


        shoot: {
            default: null,
            type: cc.Button
        },

        player: {
            default: null,
            type: cc.Node
        },

        background: {
            default: null,
            type: cc.Node
        },
        prefabNode: {
            default: null,
            type: cc.Node
        },
        enemy: {
            default: null,
            type: cc.Node
        }
    },



    onLoad() {

        this.init()
        this.createBarrier()
        this.shoot.node.on(cc.Node.EventType.TOUCH_START, this.createBullet, this)

    },

    init() {
        this.bulletPool = new cc.NodePool()
        this.barrierPool = new cc.NodePool()

        let count = 5

        for (let i = 0; i < count; ++i) {
            let bullet = cc.instantiate(this.bulletPrefab)
            this.bulletPool.put(bullet)
        }

        for (let i = 0; i < count; ++i) {
            let barrier = cc.instantiate(this.barrierPerfab)
            this.barrierPool.put(barrier)
        }
    },

    createBarrier() {
        let barrier = null
        for (let i = 0; i < 80; ++i) {
            if (this.barrierPool.size() > 0) {
                barrier = this.barrierPool.get()
            } else {
                barrier = cc.instantiate(this.barrierPerfab)
            }
            this.prefabNode.children[1].addChild(barrier)
            this.barrierPosX = Math.round(Math.random() * 800)
            this.barrierPosY = Math.round(Math.random() * 800)
            barrier.setPosition(this.barrierPosX, this.barrierPosY)
        }
    },
    createBullet(event) {
        let bullet = null
        if (this.bulletPool.size() > 0) {
            bullet = this.bulletPool.get()
        } else {
            bullet = cc.instantiate(this.bulletPrefab)
        }

        this.prefabNode.children[0].addChild(bullet)
        bullet.setPosition(com.player.position)
        bullet.setContentSize(com.bullet.size.x,com.bullet.size.y)
        this.mousePos = event.touch.getLocation()
        this.mouseV2 = cc.v2(this.mousePos.x, this.mousePos.y)
        this.bulletV2 = cc.pMult(cc.pNormalize(cc.pSub(this.mouseV2, com.player.position)), com.bullet.distance)
        this.mouveByBullet = cc.moveBy(com.bullet.speed, this.bulletV2)
        this.callFunc = cc.callFunc(() => {
            if (bullet.isValid) {
                this.onbulletKilled(bullet)
            }

        })
        bullet.runAction(cc.sequence(this.mouveByBullet, this.callFunc))
    },
    createEbullet() {
        let ebullet = null
        var self = this
        self.ebulletPool = new cc.NodePool()
        let count = 5
        for (let i = 0; i < count; ++i) {
            let ebullet = cc.instantiate(self.ebulletPrefab)
            self.ebulletPool.put(ebullet)
        }
        if (self.bulletPool.size() > 0) {
            ebullet = self.ebulletPool.get()
        } else {
            ebullet = cc.instantiate(self.ebulletPrefab)
        }

        self.prefabNode.children[2].addChild(ebullet)

        ebullet.setPosition(com.enemy.position)
        self.playerV2 = cc.v2(com.player.position)
        self.ebulletV2 = cc.pMult(cc.pNormalize(cc.pSub(self.playerV2, com.enemy.position)), com.bullet.distance)
        self.mouveByeBullet = cc.moveBy(com.bullet.speed, self.ebulletV2)
        self.callFunc = cc.callFunc(() => {
            if (ebullet.isValid) {
                self.onEbulletKilled(ebullet)
            }

        })
        ebullet.runAction(cc.sequence(self.mouveByeBullet, self.callFunc))
    },



    onbulletKilled: function (bullet) {
        this.bulletPool.put(bullet)
    },
    onEbulletKilled: function (ebullet) {
        this.ebulletPool.put(ebullet)
    },

    start() {

    },

    update(dt) {
        com.player.position = this.player.getPosition()
        com.enemy.position = this.enemy.getPosition()
    },
    onEnable() {


        this.schedule(() => {                
            var state = cc.isValid(this.enemy)
            if (state) {
                this.createEbullet()
            }
        }, 0.5);


    },

});