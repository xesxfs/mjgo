var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 商城物品项
 * @author chenwei
 *2016/07/15
 */
var ShopItem = (function (_super) {
    __extends(ShopItem, _super);
    function ShopItem() {
        var _this = _super.call(this) || this;
        _this.touchChildren = false;
        return _this;
    }
    //......弃用........移动到BuyPanel
    ShopItem.prototype.showBuy = function () {
        //充值
        if (this.data.pay) {
            var http = new HttpSender();
            var data = ProtocolHttp.send_z_Pay;
            data.param.goodsid = this.data.id;
            //微信支付
            data.param.pay_type = 1;
            http.send(data, this.wxPay, this);
        }
        else {
            //使用货币购买  
            var msgBox = App.MsgBoxManager.getBoxA();
            if (this.data["price"] > App.DataCenter.UserInfo.httpUserInfo.coin) {
                msgBox.ok = function () {
                    //                 App.mainModule.hallScene.shopPanel.selectShopView(ShopView.pay);
                };
                msgBox.showMsg("钻石数量不够了,是否前往购买");
                return;
            }
            msgBox.ok = function () {
                //钻石购买
                // this.sendBuy();
            };
            msgBox.showMsg("是否确认购买: " + this.data["name"]);
        }
    };
    ShopItem.prototype.wxPay = function (data) {
        if (!data.ret) {
            data = JSON.parse(data.data);
            if (App.DeviceUtils.IsNative) {
                egret.ExternalInterface.call("wxPay", JSON.stringify(data));
            }
            else {
                window["onBridgeReady"](data.success_response);
            }
        }
        else {
            Tips.info(data.desc);
        }
    };
    return ShopItem;
}(eui.ItemRenderer));
__reflect(ShopItem.prototype, "ShopItem");
//# sourceMappingURL=ShopItem.js.map