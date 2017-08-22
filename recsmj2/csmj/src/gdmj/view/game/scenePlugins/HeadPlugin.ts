/**
 * 头像插件
 * @author xiongjian 
 * @date 2017/6/29
 */
class HeadPlugin extends BaseUI {

    private headGroup: eui.Group;

    private playerNum = 4;   //玩家人数

    private zhuangFlag: ZhuangFlag;      //庄家标志


    //-----------头像----------------
    public headUIList: Array<HeadUI> = new Array<HeadUI>();     //所有玩家头像列表
    public headUIList1: Array<HeadUI> = new Array<HeadUI>();     //散开所有玩家头像列表 (定位用)

    public headUIPointXlist = [1, 583, 583, 1];       //开始游戏后个人头像X坐标
    public headUIPointYlist = [848, 709, 30, 137];    //开始游戏后个人头像Y坐标
    private headScaleX = 1;   //游戏开始之后头像X缩小
    private headScaleY = 1;   //游戏开始之后头像Y缩小

    private headUIPointSXlist = [285, 490, 285, 60];       //开始游戏前个人头像X坐标
    private headUIPointSYlist = [671, 423, 147, 423];    //开始游戏前个人头像Y坐标

    //--------------逻辑--------------
    public cardFactory: CardFactory;      //麻将牌工厂
    public cardLogic: CardLogic;          //麻将牌逻辑

    private gameScene: ReGameScene;

    public constructor() {
        super();
        this.skinName = "headPlugin";
    }

    protected childrenCreated() {
        for (var i = 0; i < this.playerNum; i++) {
            this.headUIList.push(<HeadUI>this.headGroup.getChildAt(i));
            this.headUIList1.push(<HeadUI>this.headGroup.getChildAt(i + 4));
        }
        //头像点击
        this.headGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.headTouch, this);
        this.gameScene = App.SceneManager.getScene(SceneConst.ReGameScene);
    }

    protected onEnable() {
        this.init();
    }

    /**
     * 初始化
     */
    public init() {

        this.hideZhuangFlag();
        this.hideOtherHead();
    }

    /**
     * 隐藏其他不需要的头像
     */
    private hideOtherHead() {
        for (let key in this.headUIList1) {
            this.headUIList1[key].visible = false;
        }
    }

    /**重置头像 */
    public resetHeadUI() {
        let len = this.headUIList.length;
        for (let i = 0; i < len; i++) {
            this.headUIList[i].scaleX = 1;
            this.headUIList[i].scaleY = 1;
            this.headUIList[i].x = this.headUIPointSXlist[i];
            this.headUIList[i].y = this.headUIPointSYlist[i];
            this.headUIList[i].nameLabel.visible = true;
        }
        this.gameScene.readyPlugin.hideAllReady();
        this.gameScene.readyPlugin.setUserReady();//重置准备

    }


    //显示已进入房间的玩家头像和准备
    public setInviteUserHead() {
        var userList = App.DataCenter.UserInfo.userList;
        console.log("设置已进入邀请界面玩家的头像,用户列表:", userList);
        for (var key in userList) {
            this.updateUserHead(userList[key]);
        }
    }


    //隐藏托管
    public hideTuoGuan(pos: UserPosition) {
        (<HeadUI>this.headUIList[pos]).hideTuoGuanIcon();
        this.hideUnconect(pos);
    }

    //显示掉线
    public showUnConnect(pos: UserPosition) {
        this.hideTuoGuan(pos);
        (<HeadUI>this.headUIList[pos]).showUnconnect();
    }

    //隐藏掉线
    public hideUnconect(pos: UserPosition) {
        (<HeadUI>this.headUIList[pos]).hideUnconnect();
    }


    /**显示玩家头像、昵称等信息*/
    public updateUserHead(userVo: UserVO) {
        if (userVo) {
            this.cardLogic = CardLogic.getInstance();
            var deskVo: DeskInfo = App.DataCenter.deskInfo;
            userVo.userPos = this.cardLogic.changeSeat(userVo.seatID);
            var headUI: HeadUI = this.headUIList[userVo.userPos];

            headUI.loadImg(userVo.headUrl);

            //开始游戏后隐藏昵称
            if (this.headUIList[0].x == this.headUIPointXlist[0]) {
                headUI.nameLabel.visible = false;
            } else {
                headUI.nameLabel.visible = true;
            }



            headUI.nameLabel.text = StringTool.formatNickName(userVo.nickName);
            headUI.scoreLabel.visible = true;        //显示积分
            headUI.sidai.visible = true;            //显示丝带
            headUI.scoreLabel.text = NumberTool.formatMoney(userVo.point);
            headUI.seatID = userVo.seatID;
            //显示房主标识
            deskVo && (headUI.headOwner.visible = userVo.userID == deskVo.ownerID);
            this.headGroup.addChild(headUI);
        }
    }

    /**更新积分*/
    public updatePoint() {
        var userList = App.DataCenter.UserInfo.userList;
        for (var key in userList) {
            var userVo: UserVO = userList[key];
            this.headUIList[userVo.userPos].scoreLabel.text = NumberTool.formatMoney(userVo.point);

        }
    }

    /**更新指定玩家积分 */
    public updatePointByPos(pos: UserPosition, point) {
        this.headUIList[pos].scoreLabel.text = NumberTool.formatMoney(point);
    }

    //显示庄家图标
    public showZhuangFlag(pos: UserPosition) {
     
        for (let i = 0; i < 4; i++) {

            this.headUIList[i].scaleX = this.headScaleX;
            this.headUIList[i].scaleY = this.headScaleY;
            this.headUIList[i].x = this.headUIPointXlist[i];
            this.headUIList[i].y = this.headUIPointYlist[i];
            this.headUIList[i].nameLabel.visible = false;   //游戏开始隐藏昵称
        }

        if (pos != null) {
            var headUI = this.headUIList[pos];
            var headImg = headUI.headImg;
            headUI.headzhuang.visible = true;
        }

    }

    //隐藏庄家图标
    public hideZhuangFlag() {
        if (this.zhuangFlag) {
            this.zhuangFlag.parent && this.zhuangFlag.parent.removeChild(this.zhuangFlag);
        }
    }

    /**隐藏玩家头像*/
    public hideHeadUI(pos) {
        var headUI: HeadUI = this.headUIList[pos];
        headUI.clear();
    }

    /**清理头像UI*/
    public hideAllHeadUI() {
        var len = this.headUIList.length;
        var headUI: HeadUI;
        for (var i = 0; i < len; i++) {
            headUI = this.headUIList[i];
            headUI.clear();
        }
    }



    /**设置头像位置*/
    public setGameHeadPos(pos = null) {
        console.log("设置头像")
        var time = 500;
        //此处不能用循环处理
        egret.Tween.get(<HeadUI>this.headUIList[0]).to({ x: this.headUIPointXlist[0], y: this.headUIPointYlist[0] }, time).call(() => {
            this.headUIList[0].scaleX = this.headScaleX;
            this.headUIList[0].scaleY = this.headScaleY;
            this.headUIList[0].nameLabel.visible = false;   //游戏开始隐藏昵称
        });
        egret.Tween.get(<HeadUI>this.headUIList[1]).to({ x: this.headUIPointXlist[1], y: this.headUIPointYlist[1] }, time).call(() => {
            this.headUIList[1].scaleX = this.headScaleX;
            this.headUIList[1].scaleY = this.headScaleY;
            this.headUIList[1].nameLabel.visible = false;
        });
        egret.Tween.get(<HeadUI>this.headUIList[2]).to({ x: this.headUIPointXlist[2], y: this.headUIPointYlist[2] }, time).call(() => {
            this.headUIList[2].scaleX = this.headScaleX;
            this.headUIList[2].scaleY = this.headScaleY;
            this.headUIList[2].nameLabel.visible = false;
        });
        egret.Tween.get(<HeadUI>this.headUIList[3]).to({ x: this.headUIPointXlist[3], y: this.headUIPointYlist[3] }, time).call(() => {
            this.headUIList[3].scaleX = this.headScaleX;
            this.headUIList[3].scaleY = this.headScaleY;
            this.headUIList[3].nameLabel.visible = false;
            //需要做延时处理 怕资源未被加载  显示庄
            egret.Tween.get(this).wait(500).call(() => {
                if (pos != null) {
                    var headUI = this.headUIList[pos];
                    var headImg = headUI.headImg;
                    this.zhuangFlag || (this.zhuangFlag = new ZhuangFlag());
                    this.zhuangFlag.x = headUI.x + headImg.x + 96 - 10;
                    this.zhuangFlag.y = headUI.y + headImg.y;
                    this.headGroup.addChild(this.zhuangFlag);
                }
            })
        });
    }

    /**设置开始游戏后的头像 */
    public setPlayingHead() {
        let len = this.headUIList.length;
        for (let i = 0; i < len; i++) {
            this.headUIList[i].scaleX = this.headScaleX;
            this.headUIList[i].scaleY = this.headScaleY;
            this.headUIList[i].x = this.headUIPointXlist[i];
            this.headUIList[i].y = this.headUIPointYlist[i];
        }
    }

    private headTouch(e: egret.Event) {
        // console.log(e.target);
        switch (e.target.parent) {
            case this.headUIList[0]:
                this.getOtherUserInfo(0);

                break;
            case this.headUIList[1]:
                this.getOtherUserInfo(1);
                break;
            case this.headUIList[2]:
                this.getOtherUserInfo(2);
                break;
            case this.headUIList[3]:
                this.getOtherUserInfo(3);
                break;
        }
    }

    /**
     * 发送Http请求玩家信息
     */
    private getOtherUserInfo(num: number) {
        let user: UserVO = App.DataCenter.UserInfo.getUserByPos(num);
        if (user) {
            let http = new HttpSender();
            let data = ProtocolHttp.getOtherUserInfo;
            data.param.uid = user.userID;
            http.send(data, this.updateUserInfo, this);
        }
    }

    /**
     * 更新用户资料
     */
    private updateUserInfo(data) {
        if (!data.ret) {
            App.PanelManager.open(PanelConst.UserInfoPanel, null, this, true, true, data.data);
        }
        else {
            TipsLog.gameInfo(data.desc);
        }
    }

    /**重置 */
    public restUI() {
        this.hideZhuangFlag();
    }

}