var Tips;
(function (Tips) {
    /**
     *
     * @author chenwei
     *2016/07/12
     */
    /*
     * 错误提示
     */
    function error(str) {
        show(str, true);
    }
    Tips.error = error;
    /*
     * 信息
     */
    function info(str) {
        show(str);
    }
    Tips.info = info;
    /*
     * 警告
     */
    function warn(str) {
        show(str);
    }
    Tips.warn = warn;
    function show(str, isError) {
        if (isError === void 0) { isError = false; }
        var showtext = new egret.TextField();
        showtext.size = 28;
        showtext.strokeColor = 0x934c26;
        var tipsBg = new egret.Sprite();
        tipsBg.graphics.beginFill(0x934c26);
        var x = 0;
        var y = 0;
        var offset = 40;
        tipsBg.graphics.drawRoundRect(x, y, str.length * showtext.size + offset, showtext.size + offset, 50);
        tipsBg.graphics.endFill();
        tipsBg.alpha = 0.9;
        showtext.stroke = 2;
        showtext.bold = true;
        showtext.text = str;
        if (isError) {
            //红色
            showtext.textColor = 0xfff57a;
        }
        else {
            //橙色
            showtext.textColor = 0xfff57a;
        }
        tipsBg.addChild(showtext);
        showtext.x = (tipsBg.width - showtext.width) / 2;
        showtext.y = (tipsBg.height - showtext.height) / 2;
        tipsBg.x = (App.StageUtils.stageWidth - tipsBg.width) / 2;
        tipsBg.y = (App.StageUtils.stageHeight - tipsBg.height) / 2;
        App.LayerManager.tipLayer && App.LayerManager.tipLayer.addChild(tipsBg);
        //      EffectUtils.showMax2Min(showtext,2000);
        EffectUtils.showFload(tipsBg, 2000);
    }
})(Tips || (Tips = {}));
//# sourceMappingURL=Tips.js.map