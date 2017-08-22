class RoomLogPanel extends KFPanel  {

	public Btn_Close:eui.Button;
    public Label_Null:eui.Label;
    public LogList:eui.List;

    protected init() {
        this.skinName = "Panel_RoomLog";
        super.init();
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }
}

class DHTLogItem extends eui.ItemRenderer {

Label_Desc:eui.Label;
Label_Time:eui.Label;
Label_WL:eui.Label;

Image_WLBG:eui.Image;

LogList:eui.List;


    public constructor() {
        super();
    }

    protected dataChanged():void{
        let idata = this.data
        
        //奖励
        let prize = idata["prize"];
    
        //房主信息
        let ownerId = idata["ownerId"];
        let ownerName = idata["oName"];

        //挑战者信息
        let opponentId = idata["challengerId"];
        let opponentName = idata["cName"];


        let winnerId = idata["winner"];
        let endTime = idata["endTime"];
        
        let time = CommonFuc.getDate(endTime.toString());
        this.Label_Time.text = time;

        //是否获胜
        let isWiner = GlobalClass.UserInfo.str_UserID == winnerId;
        let challengerName;
        if (GlobalClass.UserInfo.str_UserNickname == ownerName)
        {
            challengerName = opponentName;
        }
        else
        {
            challengerName = ownerName;
        }
        if(isWiner){
            this.Label_WL.text = LocalizationMgr.getText("胜");
            this.Label_Desc.text = LocalizationMgr.getText("您击败了{0},获得{1}点",challengerName,prize);
            this.Label_Desc.textColor = 0xFFF397;
            this.Image_WLBG.source = RES.getRes("GF_commonButton_json.Input_BG");
            CommonFuc.imgFilterHex(this.Image_WLBG.source,0x636363FF);
        }
        else{
            this.Label_WL.text = LocalizationMgr.getText("负");
            this.Label_Desc.text = LocalizationMgr.getText("{0}击败了您,损失{1}点",challengerName,prize);
            this.Label_Desc.textColor = 0x929292;
            this.Image_WLBG.source = RES.getRes("GF_commonButton_json.UI_small_btn_1_1");
            CommonFuc.imgFilterHex(this.Image_WLBG.source,0xFFFFFFFF);
        }
    }
}