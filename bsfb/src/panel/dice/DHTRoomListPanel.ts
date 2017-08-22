class DHTRoomListPanel extends KFPanel {

    CreateRoomBtn:eui.Button;
    Btn_Help:eui.Button;
    Btn_Refresh:eui.Button;
    Btn_back:eui.Button;
    Btn_FirstPage:eui.Button;
    Btn_EndPage:eui.Button;
    Btn_PageUp:eui.Button;
    Btn_PageDown:eui.Button;
    Btn_Setting:eui.Button;
    DDB_List:DropDownBox;

    Label_Page:eui.Label;

    RoomNum:eui.TextInput;

    Room_List:eui.List;

    Group_NewBie:eui.Group;
    Group_Text:eui.Group;
    Image_Arrow:eui.Image;
    Image_NewGuid:eui.Image;
    Btn_NewBieSkip:eui.Button;
    Label_NewBie:eui.Label;


    protected init() {
        this.skinName = "DHT_RoomList_main";
        super.init();
        this.Room_List.itemRenderer = DHTRoomListItem;
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }
}

class DHTRoomListItem extends eui.ItemRenderer {

Label_RoomNumber:eui.Label;
Label_RoomName:eui.Label;
Label_OwnerName:eui.Label;
Label_RoomScore:eui.Label;
Label_Number:eui.Label;
Label_Runing:eui.Label;

Lock:eui.Image;

Btn_JoinRoom:eui.Button;

DHTRoomList:eui.List;

    public constructor() {
        super();
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }

    protected dataChanged():void{
        let idata = this.data
        idata.rid =          idata[0];//房间ID
        idata.name =         idata[1];//房间名字
        idata.ownerID =      idata[2];//房主ID
        idata.ownerName =    idata[3];  //房主名字
        idata.diceMode =     idata[4];  //房间模式
        idata.prize =        idata[5];   //每局点数
        idata.isgaming =     idata[6];  //是否正在游戏
        idata.isHasPasswd =  idata[7];  //是否有密码

        this.Label_RoomNumber.text = idata.rid;
        this.Label_RoomName.text = idata.name;
        this.Label_OwnerName.text = idata.ownerName;
        this.Label_Number.text = idata.isgaming == 1 ? "2/2":"1/2";
        // this.Label_Number.textColor
        this.Label_Runing.visible = idata.isgaming == 1;
        this.Btn_JoinRoom.visible = idata.isgaming != 1;
        this.Lock.visible = idata.isHasPasswd;

        if (idata.diceMode == "1") //传统模式
            {
                this.Label_RoomScore.text = LocalizationMgr.getText("{0}/局",idata.prize);
            }
        else if (idata.diceMode == "2")
            {
                this.Label_RoomScore.text = LocalizationMgr.getText("最大模式");
            }
        else if (idata.diceMode == "3") //经典大话骰
            {
                
            }
        if(!this.Btn_JoinRoom.hasEventListener(egret.TouchEvent.TOUCH_END))
        {
            this.setOnClickListener();            
        }
    }

    private JoinOnClick(event:egret.TouchEvent):void{
        console.log("点击加入",this.data);
        let idata = this.data;
        idata.rid =          idata[0];//房间ID
        idata.name =         idata[1];//房间名字
        idata.ownerID =      idata[2];//房主ID
        idata.ownerName =    idata[3];  //房主名字
        idata.diceMode =     idata[4];  //房间模式
        idata.prize =        idata[5];   //每局点数
        idata.isgaming =     idata[6];  //是否正在游戏
        idata.isHasPasswd =  idata[7];  //是否有密码
        KFControllerMgr.getCtl(PanelName.DHTRoomListPanel).JoinRoomHandler(idata.rid,idata.name,idata.ownerName,idata.isHasPasswd);
    }

    protected setOnClickListener() {
        this.Btn_JoinRoom.addEventListener(egret.TouchEvent.TOUCH_END,this.JoinOnClick,this);
    }

    protected removeOnClickListener() {
        this.Btn_JoinRoom.removeEventListener(egret.TouchEvent.TOUCH_END,this.JoinOnClick,this);
    }
}