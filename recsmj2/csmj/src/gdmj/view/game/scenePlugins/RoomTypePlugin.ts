/**
 * 不同房间规则插件
 * @author xiongjian 
 * @date 2017/6/29
 */
class RoomTypePlugin extends BaseUI {

    public loadingGroup: eui.Group;     //拼命匹配中group
    public loadingLabel: eui.Label;     //拼命匹配中label
    public loadingLabel1: eui.Label;    //牌局已满label
    public friendRoomGroup: eui.Group;  //好友房Group
    public deskNumberLabel: eui.BitmapLabel;  //房间号
    public game_xiugai: eui.Button;     //修改规则按钮
    public game_chakan: eui.Button;     //查看规则按钮
    public game_yaoqing: eui.Button;    //邀请按钮


    public constructor() {
        super();
        this.skinName = "roomTypePlugin";
    }

    /**添加到场景中*/
    protected onEnable() {

    }



    /**组件创建完毕*/
    protected childrenCreated() {
        this.game_xiugai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onXiuGaiTouch, this);
        this.game_yaoqing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYaoQingTouch, this);
        this.game_chakan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChaKanTouch, this);
    }

    /**判断进入房间的类型 */
    public sendRoomType(type: RoomType) {
        if (type == RoomType.FriendRoom) {
            this.friendRoomGroup.visible = true;
            this.loadingGroup.visible = false;
        } else if (type == RoomType.MatchRoom) {
            this.friendRoomGroup.visible = false;
            this.loadingGroup.visible = true;
        }
    }

    /**房主显示 */
    public deskOwnerSet(boolean: Boolean) {
        if (boolean == true) {
            this.game_xiugai.visible = true;
            this.game_chakan.visible = false;
        } else {
            this.game_xiugai.visible = false;
            this.game_chakan.visible = true;
        }
    }

    /**
     * 匹配场loading 设置
     */
    public loadingSet(len) {
        this.loadingGroup.visible = true;

        if (len >= 4) {
            this.loadingLabel.visible = false;
            this.loadingLabel1.visible = true;
            this.loadingLabel1.text = "牌局即将开始"
        } else {
            this.loadingLabel.visible = true;
            this.loadingLabel1.visible = false;
            egret.Tween.removeTweens(this.loadingLabel);
            egret.Tween.get(this.loadingLabel, { loop: true }).wait(300).call(() => {
                this.loadingLabel.text = "拼命匹配中.";
            }).wait(300).call(() => {
                this.loadingLabel.text = "拼命匹配中..";
            }).wait(300).call(() => {
                this.loadingLabel.text = "拼命匹配中...";
            });


        }
    }

    /**显示牌局即将开始 */
    public showStartText() {
        this.loadingLabel.visible = false;
        this.loadingLabel1.visible = true;
        this.loadingLabel1.text = "牌局即将开始"
    }

    /**隐藏loading */
    public hideLoading() {
        this.loadingGroup.visible = false;
    }
    /**隐藏好友房邀请面板 */
    public hideFriendRoom() {
        this.friendRoomGroup.visible = false;
    }

    /**显示loading */
    public showLoading() {
        this.loadingGroup.visible = true;
    }
    /**显示好友房邀请面板 */
    public showFriendRoom() {
        this.friendRoomGroup.visible = true;
    }

    /**修改规则 */
    private onXiuGaiTouch() {
        App.getController(ReGameController.NAME).send100118();

    }

    /**查看规则 */
    private onChaKanTouch() {
        App.getController(ReGameController.NAME).send100117();
    }

    /**邀请好友 */
    private onYaoQingTouch() {
        App.getController(ReGameController.NAME).send100119();
    }

    /**设置房间号 */
    public setRoomNumber(number) {
        if (number && number != "") {
            this.deskNumberLabel.text = number;
        }
    }

}