/**
 * @author xiongjian
 * 2017-1-15
 */

class ScoreSharePanel extends BasePanel {
    public constructor() {
        super();
        this.skinName = "ScoreShareSkin";
    }

    private closeBtn: eui.Button;
    private share_label: eui.Label;
    private jt_img:eui.Image;

    protected onEnable() {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeBtnTouch,this);
        this.jt_img.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeBtnTouch,this);
        this.setLabel();

    }

    protected onRemove() {

        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.closeBtnTouch,this);
        this.jt_img.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.closeBtnTouch,this);
    }

    private closeBtnTouch(){
        this.hide();
    }

    private setLabel(){
        var content;
        var tetleTextStyleJson = { "size":40,"textColor":0xffffff, "fontFamily":"SimHei"}
        var contentTextStyleJson = {"size":40,"textColor":0xff3c1c,"fontFamily":"SimHei"}

        content = <Array<egret.ITextElement>>[
            {text:"点击",style:tetleTextStyleJson}
            ,{text:"发送",style:contentTextStyleJson}
            ,{text:"给",style:tetleTextStyleJson}
            ,{text:"好友",style:contentTextStyleJson}
            ,{text:"，\n",style:tetleTextStyleJson}
            ,{text:"好友可查看游戏回放！",style:tetleTextStyleJson}
        ];

        this.share_label.textFlow =content; 
    }

}