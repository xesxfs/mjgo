var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 对象池管理
 * @author chenkai
 * @date 2016/6/28
 *
 * Example:
 * 创建Ball对象池，并获取一个Ball对象实例
 * var ballPool:ObjectPool = ObjectPool.getPool("Ball");
 * var ball:Ball = ballPool.getObject();
 */
var ObjectPool = (function () {
    function ObjectPool(className) {
        this.className = className;
        this.list = [];
    }
    /**获取对象*/
    ObjectPool.prototype.getObject = function () {
        if (this.list.length > 0) {
            return this.list.shift();
        }
        var clazz = egret.getDefinitionByName(this.className);
        return new clazz();
    };
    /**回收对象*/
    ObjectPool.prototype.returnObject = function (value) {
        this.list.push(value);
    };
    /**
     * 获取对象池，如果不存在则新建一个
     * @className 对象类名
     * @initNum 初始化对象池数量
     * @return 返回一个对象池
     */
    ObjectPool.getPool = function (className, initNum) {
        if (initNum === void 0) { initNum = 0; }
        if (!ObjectPool.pool[className]) {
            ObjectPool.pool[className] = new ObjectPool(className);
            if (initNum != 0) {
                var clazz = egret.getDefinitionByName(className);
                var pool = ObjectPool.pool[className];
                for (var i = 0; i < initNum; i++) {
                    pool.returnObject(new clazz());
                }
            }
        }
        return ObjectPool.pool[className];
    };
    return ObjectPool;
}());
/**存储对象池的Object*/
ObjectPool.pool = {};
__reflect(ObjectPool.prototype, "ObjectPool");
//# sourceMappingURL=ObjectPool.js.map