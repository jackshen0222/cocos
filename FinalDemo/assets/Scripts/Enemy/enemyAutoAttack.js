// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        enemyBulletPre: {
            default: null,
            type: cc.Prefab
        }

    },


    onLoad() {

    },

    update(dt) {

    },

    onEnable() {
        //敌人子弹射率
        this.schedule(() => { this.enemyBulletSpawn(this.enemyPositionRefresh()) }, 0.5)
    },

    //获取玩家位置
    getPlayerPos() {
        var player = cc.find('player');
        var playerPosition = player.position;
        return playerPosition;
    },

    enemyPositionRefresh() {//敌人位置刷新
        var pos = this.node.position
        pos = cc.v2(pos)
        return pos
    },

    enemyBulletSpawn(enemyPositionPara) {//实例化敌人子弹
        var eBulletPool = cc.find('enemyBulletPool');//敌人子弹池
        var enemyBullet = cc.instantiate(this.enemyBulletPre);
        eBulletPool.addChild(enemyBullet);
        enemyBullet.position = enemyPositionPara

        var v2Bullet = cc.pMult(cc.pNormalize(
            cc.pSub(this.getPlayerPos(), enemyPositionPara)), 2000)
        var moveByBullet = cc.moveBy(4, v2Bullet)
        var callFunc = cc.callFunc(() => { if (enemyBullet.isValid) enemyBullet.destroy(); })//到达射程自毁
        enemyBullet.runAction(cc.sequence(moveByBullet, callFunc))

    },



});
