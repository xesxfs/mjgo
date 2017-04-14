var EffectUtils;
(function (EffectUtils) {
    /**
     *
     * @author chenwei
     *  2016/07/12
     */
    /*
     *  由大到小
     */
    function showMax2Min(egretObj, waitTime) {
        if (waitTime === void 0) { waitTime = 1000; }
        egretObj.anchorOffsetX = egretObj.width / 2;
        egretObj.anchorOffsetY = egretObj.height / 2;
        egretObj.scaleX = 4;
        egretObj.scaleY = 4;
        egretObj.alpha = 0;
        egret.Tween.get(egretObj).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200).wait(waitTime).call(function () { egretObj.parent && egretObj.parent.removeChild(egretObj); });
    }
    EffectUtils.showMax2Min = showMax2Min;
    function showFload(egretObj, waitTime) {
        if (waitTime === void 0) { waitTime = 1000; }
        var y = egretObj.y;
        var time = new Date();
        var timea = time.getSeconds();
        egret.Tween.get(egretObj).wait(waitTime).to({ y: y - 100, alpha: 0.5 }, 250).call(function () {
            var end = new Date();
            var enda = end.getSeconds();
            var a = enda - timea;
            console.log("tips显示时间=" + a);
            egretObj.parent && egretObj.parent.removeChild(egretObj);
        });
    }
    EffectUtils.showFload = showFload;
    /**
     * =跳动
     * @param egretObj  对象
     * @param bounceTime 跳动时间
     * @param beforewaitTime 跳动前等待时间
     * @param afterwaitTime  跳动后等待时间
     */
    function bounce(egretObj, bounceTime, beforewaitTime, afterwaitTime) {
        if (bounceTime === void 0) { bounceTime = 200; }
        if (beforewaitTime === void 0) { beforewaitTime = 0; }
        if (afterwaitTime === void 0) { afterwaitTime = 0; }
        var originalY = egretObj.y;
        egret.Tween.get(egretObj, { loop: true }).wait(beforewaitTime).to({ y: originalY - egretObj.height / 3 }, bounceTime / 2).to({ y: originalY }, bounceTime / 2).wait(afterwaitTime);
    }
    EffectUtils.bounce = bounce;
    /**
     *  一个跟着一个跳动
     * @param egretObjs 对象组
     */
    function bounceOneByOne(egretObjs) {
        var numChildren = egretObjs.length;
        //弹跳时间
        var bounceTime = 400;
        //弹跳前的等待时间
        var beforewaitTime = 0;
        //弹跳后的等待时间
        var afterwaitTime = 0;
        //弹跳等待(前后)的偏移时间 百分比
        var offset = 0.5;
        for (var i = 0; i < numChildren; i++) {
            beforewaitTime = (i) * (bounceTime * (1 - offset));
            afterwaitTime = (numChildren - i) * (bounceTime * (1 - offset));
            EffectUtils.bounce(egretObjs[i], bounceTime, beforewaitTime, afterwaitTime);
        }
    }
    EffectUtils.bounceOneByOne = bounceOneByOne;
    //移除单个缓动
    function removeTween(egretObj) {
        egret.Tween.removeTweens(egretObj);
    }
    EffectUtils.removeTween = removeTween;
    //移除组缓动
    function removeObjsTween(egretObjs) {
        var numChildren = egretObjs.length;
        for (var i = 0; i < numChildren; i++) {
            EffectUtils.removeTween(egretObjs[i]);
        }
    }
    EffectUtils.removeObjsTween = removeObjsTween;
})(EffectUtils || (EffectUtils = {}));
//# sourceMappingURL=EffectUtils.js.map