/**
 * @author chenwei
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BagView;
(function (BagView) {
    BagView[BagView["props"] = 0] = "props";
    BagView[BagView["act"] = 1] = "act";
    BagView[BagView["face"] = 2] = "face";
    BagView[BagView["scene"] = 3] = "scene";
})(BagView || (BagView = {}));
var BagPanel = (function (_super) {
    __extends(BagPanel, _super);
    function BagPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "BagPanelSkin";
        return _this;
    }
    BagPanel.prototype.onEnable = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.propsType.group.addEventListener(eui.UIEvent.CHANGE, this.onChangeType, this);
        this.setCenter();
        this.getProps();
        this.getFace();
        this.getAct();
        this.getScene();
    };
    BagPanel.prototype.getProps = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_bag;
        data.param.type = 1;
        http.send(data, this.setProps, this);
    };
    BagPanel.prototype.getFace = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_bag;
        data.param.type = 3;
        http.send(data, this.setFace, this);
    };
    BagPanel.prototype.getAct = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_bag;
        data.param.type = 4;
        http.send(data, this.setAct, this);
    };
    BagPanel.prototype.getScene = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_bag;
        data.param.type = 5;
        http.send(data, this.setScene, this);
    };
    BagPanel.prototype.setProps = function (data) {
        if (!data.ret) {
            var ac = new eui.ArrayCollection();
            var rList = data;
            var arr = [];
            if (rList.data)
                for (var i = 0; i < rList.data.length; i++) {
                    var rObj = rList.data[i];
                    var dataObj = new Object();
                    dataObj["uid"] = rObj["uid"];
                    dataObj["type"] = "props";
                    dataObj["propname"] = rObj["propname"];
                    dataObj["count"] = rObj["count"];
                    dataObj["propid"] = rObj["propid"];
                    dataObj["desc"] = rObj["count"] + "个";
                    dataObj["state"] = "unuse";
                    dataObj["icon"] = ItemIcon.getIcon4Name(dataObj["propname"]);
                    arr.push(dataObj);
                }
            ac.source = arr;
            this.propsList.dataProvider = ac;
        }
        else {
            Tips.info(data.desc);
        }
    };
    BagPanel.prototype.setAct = function (data) {
        if (!data.ret) {
            var ac = new eui.ArrayCollection();
            var rList = data;
            var arr = [];
            for (var i = 0; i < rList.data.length; i++) {
                var rObj = rList.data[i];
                var dataObj = new Object();
                dataObj["uid"] = rObj["uid"];
                dataObj["type"] = "act";
                dataObj["propname"] = rObj["propname"];
                dataObj["count"] = rObj["count"];
                dataObj["propid"] = rObj["propid"];
                if (parseInt(rObj["count"]) < 0) {
                    dataObj["desc"] = "永久";
                }
                else {
                    dataObj["desc"] = rObj["count"] + "天";
                }
                dataObj["state"] = "unuse";
                dataObj["icon"] = ItemIcon.getIcon4Name(dataObj["propname"]);
                arr.push(dataObj);
            }
            ac.source = arr;
            this.actList.dataProvider = ac;
            this.actList.selectedIndex = 0;
        }
        else {
            Tips.info(data.desc);
        }
    };
    BagPanel.prototype.setFace = function (data) {
        if (!data.ret) {
            var ac = new eui.ArrayCollection();
            var rList = data;
            var arr = [];
            for (var i = 0; i < rList.data.length; i++) {
                var rObj = rList.data[i];
                var dataObj = new Object();
                dataObj["uid"] = rObj["uid"];
                dataObj["type"] = "face";
                dataObj["propname"] = rObj["propname"];
                dataObj["count"] = rObj["count"];
                dataObj["propid"] = rObj["propid"];
                if (parseInt(rObj["count"]) < 0) {
                    dataObj["desc"] = "永久";
                }
                else {
                    dataObj["desc"] = rObj["count"] + "天";
                }
                dataObj["state"] = "unuse";
                dataObj["icon"] = ItemIcon.getIcon4Name(dataObj["propname"]);
                arr.push(dataObj);
            }
            arr[0]["state"] = "using";
            ac.source = arr;
            this.faceList.dataProvider = ac;
            this.faceList.selectedIndex = 0;
        }
        else {
            Tips.info(data.desc);
        }
    };
    BagPanel.prototype.setScene = function (data) {
        if (!data.ret) {
            var ac = new eui.ArrayCollection();
            var rList = data;
            var arr = [];
            for (var i = 0; i < rList.data.length; i++) {
                var rObj = rList.data[i];
                var dataObj = new Object();
                dataObj["uid"] = rObj["uid"];
                dataObj["type"] = "scene";
                dataObj["propname"] = rObj["propname"];
                dataObj["count"] = rObj["count"];
                dataObj["propid"] = rObj["propid"];
                if (parseInt(rObj["count"]) < 0) {
                    dataObj["desc"] = "永久";
                }
                else {
                    dataObj["desc"] = rObj["count"] + "天";
                }
                dataObj["state"] = "unuse";
                dataObj["icon"] = ItemIcon.getIcon4Name(dataObj["propname"]);
                arr.push(dataObj);
            }
            arr[0]["state"] = "using";
            ac.source = arr;
            this.sceneList.dataProvider = ac;
            this.sceneList.selectedIndex = 0;
        }
        else {
            Tips.info(data.desc);
        }
    };
    BagPanel.prototype.setView = function (viewIndex) {
        this.viewIndex = viewIndex;
    };
    BagPanel.prototype.onChangeType = function (evt) {
        var radioGroup = evt.target;
        this.typeView.selectedIndex = radioGroup.selectedValue;
    };
    BagPanel.prototype.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.propsType.group.removeEventListener(eui.UIEvent.CHANGE, this.onChangeType, this);
    };
    return BagPanel;
}(BasePanel));
__reflect(BagPanel.prototype, "BagPanel");
//# sourceMappingURL=BagPanel.js.map