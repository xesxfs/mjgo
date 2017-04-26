var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ERoomPanel = (function (_super) {
    __extends(ERoomPanel, _super);
    function ERoomPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "ERoomSkin";
        return _this;
    }
    /**组件创建完毕*/
    ERoomPanel.prototype.childrenCreated = function () {
    };
    /**添加到场景中*/
    ERoomPanel.prototype.onEnable = function () {
        this.setCenter();
        this.closeBtn.addEventListener("touchTap", this.hide, this);
        this.resetBtn.addEventListener("touchTap", this.onReset, this);
        this.delBtn.addEventListener("touchTap", this.onDel, this);
        this.noGroup.addEventListener("touchTap", this.onNoGroup, this);
        this.onReset();
    };
    ERoomPanel.prototype.onReset = function () {
        var countIndex = this.roomNoGroup.numChildren;
        for (var i = countIndex - 1; i >= countIndex - 5; i--) {
            var noLab = this.roomNoGroup.getChildAt(i);
            if (noLab.text != "" && noLab.text != null) {
                noLab.text = "";
            }
        }
    };
    ERoomPanel.prototype.onDel = function () {
        var countIndex = this.roomNoGroup.numChildren;
        for (var i = countIndex - 1; i >= countIndex - 5; i--) {
            var noLab = this.roomNoGroup.getChildAt(i);
            if (noLab.text != "" && noLab.text != null) {
                noLab.text = "";
                break;
            }
        }
    };
    ERoomPanel.prototype.onNoGroup = function (e) {
        if ((e.target instanceof eui.Button)) {
            var noBtn = e.target;
            console.log(noBtn.label);
            if (noBtn.label != null && noBtn.label != "") {
                var countIndex = this.roomNoGroup.numChildren;
                for (var i = 5; i < countIndex; i++) {
                    var noLab = this.roomNoGroup.getChildAt(i);
                    if (noLab.text == "" || noLab.text == null) {
                        noLab.text = noBtn.label;
                        if (i == (countIndex - 1)) {
                            this.sendData();
                        }
                        break;
                    }
                }
            }
        }
    };
    ERoomPanel.prototype.sendData = function () {
        // {'cmd':'6','msg':[{'roomId':" "}]}
        var roomId = "";
        var countIndex = this.roomNoGroup.numChildren;
        for (var i = 5; i < countIndex; i++) {
            var noLab = this.roomNoGroup.getChildAt(i);
            roomId += noLab.text;
        }
        ProtocolData.cmd6.msg[0].roomId = roomId;
        App.gameSocket.send(ProtocolData.cmd6);
        this.hide();
    };
    /**从场景中移除*/
    ERoomPanel.prototype.onRemove = function () {
    };
    return ERoomPanel;
}(BasePanel));
__reflect(ERoomPanel.prototype, "ERoomPanel");
//# sourceMappingURL=ERoomPanel.js.map