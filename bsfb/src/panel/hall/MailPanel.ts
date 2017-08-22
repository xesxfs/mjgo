/**
 *
 * @author 
 *
 */
class MailPanel extends KFPanel {
    MailList:eui.List;

    Girl_bg:eui.Group;
    MyProps1:eui.Group;
    MyProps2:eui.Group;
    MyProps3:eui.Group;
    MyProps4:eui.Group;
    GetGift:eui.Group;
    Content:eui.Group;
    TimeBoard:eui.Group;

    Label_Title:eui.Label;
    Label_Content:eui.Label;
    label_Time:eui.Label;
    Label_Props1:eui.Label;
    Label_Props2:eui.Label;
    Label_Props3:eui.Label;
    Label_Props4:eui.Label;

    PropsImage1:eui.Image;
    PropsImage2:eui.Image;
    PropsImage3:eui.Image;
    PropsImage4:eui.Image;

    Btn_Close:eui.Button;
    Btn_Get:eui.Button;
    Btn_Delete:eui.Button;

    PropsImage = [];
    PropsLabel = [];

    protected init() {
        this.TAG = "Panel_Mail";
        this.skinName = "Panel_Mail";
        
        super.init();
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);

        this.PropsImage = [this.PropsImage1, this.PropsImage2, this.PropsImage3, this.PropsImage4];
        this.PropsLabel = [this.Label_Props1, this.Label_Props2, this.Label_Props3, this.Label_Props4];
        
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }

    protected setOnClickListener() {
        
    }

    protected removeOnClickListener() {

    }
}


class MailItem extends eui.ItemRenderer {
Unread:eui.Group;
Read:eui.Group;

Label_Title_Read:eui.Label;
// Label_Time_Read:eui.Label;
Label_Title_Unread:eui.Label;
// Label_Time_Unread:eui.Label;
Label_Time:eui.Label;

Line:eui.Image;
Icon_Read:eui.Image;
Icon_UnRead:eui.Image;

Btn_Item:eui.Button;

MailList:eui.List;


    public constructor() {
        super();
        // this.skinName = "MailItem";
        this.setOnClickListener();
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }

    protected dataChanged():void{
        let idata = this.data
        idata["display"] = this;
        this.Line.visible = false;
        this.Read.visible = idata.status == 1 || idata.status == 3;
        this.Unread.visible = idata.status == 0 || idata.status == 2;
        let hasAward = idata.status == 2 || idata.status == 3
        this.Label_Title_Read.text = idata.title;
        // this.Label_Time_Read.text = idata.createtime.split (' ')[1];
        this.Icon_Read.source = RES.getRes(hasAward?"UI_present_2":"letter_yidu");
        this.Label_Title_Unread.text = idata.title;
        // this.Label_Time_Unread.text = idata.createtime.split (' ')[1];
        this.Label_Time.text = idata.createtime.split (' ')[1];        
        this.Icon_UnRead.source = RES.getRes(hasAward?"UI_present_1":"letter_weidu");
        idata.unselectCB = ()=>{
            this.Line.visible = false;
        }
    }

    private MailOnClick(event:egret.TouchEvent):void{
        console.log("点击邮件",this.data);
        this.Line.visible = true;
    }

    protected setOnClickListener() {
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.MailOnClick,this);
    }

    protected removeOnClickListener() {
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.MailOnClick,this);
    }
}