var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 用户数据VO
 * @author chenkai
 * @date 2016/6/28
 */
var UserVO = (function () {
    function UserVO() {
        /**用户ID*/
        this.userID = 0;
        /**昵称*/
        this.nickName = "";
        /**积分*/
        this.point = 0;
        /**钻石*/
        this.coin = 0;
        /**独立房卡*/
        this.roomCard = 0;
        /**共付房卡*/
        this.roomCardCoop = 0;
        /**用户IP*/
        this.IP = "";
        /**玩家座位号*/
        this.seatID = 0;
        /**是否是桌子拥有者*/
        this.deskOwner = false;
        /**玩家性别*/
        this.sex = SEX_TYPE.girl;
        /**签到状态 1允许签到  0不允许签到*/
        this.signFlag = 0;
        /**用户头像地址*/
        this._headUrl = "";
        /**是否点击分享链接进入，并玩了一局游戏  1是，0否*/
        this.hadinvited = 0;
        /**验证用户有效性*/
        this.skey = "";
        /**is_vip */
        this.is_vip = 0;
        /**vip等级*/
        this.vipLevel = 0;
        /**金币*/
        this.gold = 0;
    }
    Object.defineProperty(UserVO.prototype, "headUrl", {
        get: function () {
            return this._headUrl;
        },
        //服务端头像默认传送的不是字符串，而是数字，导致加载头像无法识别
        set: function (url) {
            if (url == 1) {
                this._headUrl = "";
            }
            else {
                this._headUrl = url;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置玩家状态
     * @state 状态位
     * @value 状态值
     */
    UserVO.prototype.setState = function (state, value) {
        if (value) {
            this.state = this.state | state;
        }
        else {
            this.state = this.state & (~state);
        }
        console.log(this.state);
    };
    /**
     * 检查玩家状态
     * @state 状态位
     * return true状态位1   false状态位0
     */
    UserVO.prototype.checkState = function (state) {
        return ((this.state & state) > 0);
    };
    return UserVO;
}());
__reflect(UserVO.prototype, "UserVO");
//# sourceMappingURL=UserVO.js.map