var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var jbP2;
(function (jbP2) {
    var DispUtil = (function () {
        function DispUtil() {
        }
        /**
         * 创建一个位图
         * 返回的图形锚点位于图形中心
         */
        DispUtil.createBitmapByName = function (name) {
            var result = new egret.Bitmap();
            var texture = RES.getRes(name);
            result.texture = texture;
            result.anchorOffsetX = result.width * 0.5;
            result.anchorOffsetY = result.height * 0.5;
            return result;
        };
        /**
        * 创建一个圆形
        * 返回的图形锚点位于图形中心
        */
        DispUtil.createBall = function (r) {
            var shape = new egret.Shape();
            shape.graphics.lineStyle(1, 0);
            shape.graphics.beginFill(0xfff000);
            shape.graphics.drawCircle(r, r, r);
            shape.graphics.moveTo(r, r);
            shape.graphics.lineTo(2 * r, r);
            shape.graphics.endFill();
            //将显示对象的锚点移到中心位置
            shape.anchorOffsetX = shape.width / 2;
            shape.anchorOffsetY = shape.height / 2;
            return shape;
        };
        /**
        * 创建一个方形
        * 返回的图形锚点位于图形中心
        */
        DispUtil.createBox = function (width, height) {
            console.log("createBox " + width + "," + height);
            var shape = new egret.Shape();
            shape.graphics.lineStyle(1, 0);
            shape.graphics.beginFill(0xfff000);
            shape.graphics.drawRect(0, 0, width, height);
            shape.graphics.endFill();
            //将显示对象的锚点移到中心位置
            shape.anchorOffsetX = shape.width / 2;
            shape.anchorOffsetY = shape.height / 2;
            return shape;
        };
        /**
         * 创建一个胶囊形
         * @param length
         * @param radius
         */
        DispUtil.createCapsule = function (length, radius) {
            console.log("createCapsule len:" + length + ",radius:" + radius);
            var shape = new egret.Shape();
            shape.graphics.lineStyle(1, 0);
            shape.graphics.beginFill(0xfff000);
            shape.graphics.drawRect(0, 0, length, radius * 2);
            shape.graphics.endFill();
            shape.graphics.beginFill(0xfff000);
            shape.graphics.drawCircle(0, radius, radius);
            shape.graphics.endFill();
            shape.graphics.beginFill(0xfff000);
            shape.graphics.drawCircle(length, radius, radius);
            shape.graphics.endFill();
            //将显示对象的锚点移到中心位置
            shape.anchorOffsetX = (length) / 2;
            shape.anchorOffsetY = shape.height / 2;
            return shape;
        };
        /**
         * 创建一个可以点击的文本，当作按钮用
         */
        DispUtil.createTouchTf = function (px, py, pwid, phei, text) {
            var tf = new egret.TextField();
            tf.width = pwid;
            tf.height = phei;
            tf.x = px;
            tf.y = py;
            tf.size = 16;
            tf.text = text;
            tf.touchEnabled = true;
            return tf;
        };
        return DispUtil;
    }());
    jbP2.DispUtil = DispUtil;
    __reflect(DispUtil.prototype, "jbP2.DispUtil");
})(jbP2 || (jbP2 = {}));
//# sourceMappingURL=DispUtil.js.map