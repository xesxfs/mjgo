/**
 * @author xiongjian
 * 2016-1-13
 * 
 */
class ScorePanel1 extends BasePanel {
    public constructor() {
        super();
        this.skinName = "ScorePanelSkin1";
    }

    private closeBtn: eui.Button;
    private seeBtn: eui.Button;
    private scoreList: eui.List;

    /**添加到场景中*/
    protected onEnable() {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTouch, this);
        this.seeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.seeTouch, this);
        this.getData();
    }

    /**从场景中移除*/
    protected onRemove() {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTouch, this);
        this.seeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.seeTouch, this);
    }

    /**组件创建完毕*/
    protected childrenCreated() {
    }

    /**关闭弹窗 */
    private closeTouch(e: egret.Event) {
        this.hide();
    }

    /**
     * 查看回放
     */
    private seeTouch() {
        App.PanelManager.open(PanelConst.LookPswPanel);
    }

    /**请求数据 */
    private getData() {
        var http = new HttpSender();
        var sendData = ProtocolHttp.GetScoreList;
        http.send(sendData, this.setData, this);
    }

    /**设置数据 */
    private setData(data) {
        let ac = new eui.ArrayCollection();
        var rList = data;
        var pid = "";
        var sList = [];
        let arr = [];

        for (var key in data.data) {
              console.log(key);
            //   console.log(data.data[key]);
            if (key == "playerID") {
                pid = data.data[key]
            } else {
                sList.push(data.data[key]);
            }


        }

        //console.log(pid);
        //console.log(sList[0]);
        // console.log(sList[0]["userinfo"]);
        // console.log(sList.length);
        if (sList && pid && sList.length > 0) {

           

            for(var i = 0; i < sList.length; i++) {
                 let dataObj = new Object();
                 var uList = [];
                if(sList[i]["userinfo"]){
                var uinfo = JSON.parse(sList[i]["userinfo"]);
                }
               
                // console.log(uinfo);
                for (var j = 0; j < uinfo.length; j++) {
                     var userObj = new Object();
                    //console.log(uinfo[j]["playerID"])
                    if (pid == uinfo[j]["playerID"]) {
                        dataObj["selfName"] = uinfo[j]["name"];
                        dataObj["selfPic"] = uinfo[j]["pic"];
                        dataObj["selfPoint"] = uinfo[j]["point"];
                        dataObj["selfPid"] = pid;
                    } else {
                        //console.log("else " + uinfo[j]["name"]);
                        userObj["name"] = uinfo[j]["name"];
                        userObj["pic"] = uinfo[j]["pic"];
                        userObj["point"] = uinfo[j]["point"];
                        uList.push(userObj);
                        // console.log(uList);
                    }




                }
                
                //时间处理
                var deskBuildDate =parseInt(sList[i]["deskBuildDate"]) ;
                var time = new Date( deskBuildDate* 1000);
               // console.log(time.getSeconds());
                var month = <number> time.getMonth() + 1; 
                // var m = month>=10?month:"0"+month
                var date = time.getFullYear()+"."+month +"."+time.getDate();
                 var minutes = time.getMinutes()>=10?time.getMinutes():"0"+time.getMinutes();
                var seconds =time.getSeconds()>=10?time.getSeconds():"0"+time.getSeconds();
                var utime = time.getHours()+":"+minutes+":"+seconds;

                dataObj["time"] = utime;
                dataObj["date"] = date;
                dataObj["deskCode"] = sList[i]["deskCode"];
                dataObj["score"] = sList[i]["score"];
                dataObj["userList"] = uList;
                dataObj["deskBuildDate"] = deskBuildDate;
               
                
                arr.push(dataObj);
            }
            // console.log(dataObj["userList"][0]["name"]);
        //    console.log(uList);
            //  console.log(arr);
        }
        
        ac.source = arr;
        this.scoreList.dataProvider = ac;
        this.scoreList.itemRenderer = ScoreItem1;
    }

}